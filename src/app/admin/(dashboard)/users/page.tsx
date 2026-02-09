'use client';

import { useState, useCallback } from 'react';
import { DataTable, type Column } from '@/components/admin/data-table';
import { FormModal } from '@/components/admin/form-modal';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { PermissionGate } from '@/components/admin/permission-gate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { adminUsersApi } from '@/lib/admin-api';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface UserRow {
  id: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  department?: string;
  role: string;
  hasPaidEntryFee: boolean;
  createdAt: string;
}

const initialForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  college: '',
  department: '',
  role: 'user' as 'user' | 'admin',
  hasPaidEntryFee: false,
};

export default function UsersPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns: Column<UserRow>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Phone' },
    { key: 'college', header: 'College', sortable: true },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (
        <Badge variant={row.role === 'admin' ? 'default' : 'secondary'}>
          {row.role}
        </Badge>
      ),
    },
    {
      key: 'hasPaidEntryFee',
      header: 'Entry Fee',
      render: (row) => (
        <Badge variant={row.hasPaidEntryFee ? 'default' : 'outline'}>
          {row.hasPaidEntryFee ? 'Paid' : 'Unpaid'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const fetchData = useCallback((params: any) => adminUsersApi.list(params), []);

  const openCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setFormOpen(true);
  };

  const openEdit = (row: UserRow) => {
    setEditingId(row.id);
    setForm({
      name: row.name,
      email: row.email,
      password: '',
      phone: row.phone || '',
      college: row.college || '',
      department: row.department || '',
      role: row.role as 'user' | 'admin',
      hasPaidEntryFee: row.hasPaidEntryFee,
    });
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data: any = { ...form };
      if (editingId && !data.password) delete data.password;

      if (editingId) {
        await adminUsersApi.update(editingId, data);
        toast.success('User updated');
      } else {
        await adminUsersApi.create(data);
        toast.success('User created');
      }
      setFormOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      await adminUsersApi.delete(deleteId);
      toast.success('User deleted');
      setDeleteOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage platform users</p>
        </div>
        <PermissionGate resource="users" action="create">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </PermissionGate>
      </div>

      <DataTable<UserRow>
        columns={columns}
        fetchData={fetchData}
        refreshKey={refreshKey}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <PermissionGate resource="users" action="update">
              <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </PermissionGate>
            <PermissionGate resource="users" action="delete">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { setDeleteId(row.id); setDeleteOpen(true); }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </PermissionGate>
          </div>
        )}
      />

      {/* Create/Edit Modal */}
      <FormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingId ? 'Edit User' : 'Create User'}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password {editingId && '(leave empty to keep)'}</Label>
            <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} {...(!editingId && { required: true, minLength: 8 })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={form.role} onValueChange={(val) => setForm({ ...form, role: val as 'user' | 'admin' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="college">College</Label>
              <Input id="college" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            </div>
          </div>
        </div>
      </FormModal>

      {/* Delete Dialog */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete User"
        description="This will permanently delete this user and all associated data."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isLoading={isSubmitting}
      />
    </div>
  );
}
