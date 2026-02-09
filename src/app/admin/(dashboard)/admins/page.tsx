'use client';

import { useState, useCallback, useEffect } from 'react';
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
import { adminAdminsApi, adminDepartmentsApi } from '@/lib/admin-api';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface AdminRow {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  department?: { id: string; name: string; code: number } | null;
  assignedEvents: string[];
  createdAt: string;
}

const initialForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  role: 'event_manager' as string,
  department: '',
};

export default function AdminsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [departments, setDepartments] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    adminDepartmentsApi.list({ limit: 100 }).then((res) => {
      setDepartments(res.data || []);
    }).catch(() => {});
  }, []);

  const roleBadge: Record<string, "default" | "secondary" | "outline"> = {
    superadmin: 'default',
    event_manager: 'secondary',
    department_manager: 'outline',
  };

  const columns: Column<AdminRow>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (
        <Badge variant={roleBadge[row.role] || 'secondary'}>
          {row.role.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (row) => row.department?.name || '—',
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const fetchData = useCallback((params: any) => adminAdminsApi.list(params), []);

  const openCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setFormOpen(true);
  };

  const openEdit = (row: AdminRow) => {
    setEditingId(row.id);
    setForm({
      name: row.name,
      email: row.email,
      password: '',
      phone: row.phone || '',
      role: row.role,
      department: row.department?.id || '',
    });
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data: any = { ...form };
      if (editingId && !data.password) delete data.password;
      if (!data.department) delete data.department;

      if (editingId) {
        await adminAdminsApi.update(editingId, data);
        toast.success('Admin updated');
      } else {
        await adminAdminsApi.create(data);
        toast.success('Admin created');
      }
      setFormOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      await adminAdminsApi.delete(deleteId);
      toast.success('Admin deleted');
      setDeleteOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admins & Roles</h1>
          <p className="text-muted-foreground">Manage admin accounts and role assignments</p>
        </div>
        <PermissionGate resource="admins" action="create">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        </PermissionGate>
      </div>

      <DataTable<AdminRow>
        columns={columns}
        fetchData={fetchData}
        refreshKey={refreshKey}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <PermissionGate resource="admins" action="update">
              <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </PermissionGate>
            <PermissionGate resource="admins" action="delete">
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

      <FormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingId ? 'Edit Admin' : 'Create Admin'}
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
              <Select value={form.role} onValueChange={(val) => setForm({ ...form, role: val })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                  <SelectItem value="event_manager">Event Manager</SelectItem>
                  <SelectItem value="department_manager">Department Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {form.role !== 'superadmin' && (
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select value={form.department} onValueChange={(val) => setForm({ ...form, department: val })}>
                <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </FormModal>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Admin"
        description="This will permanently remove this admin's access."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isLoading={isSubmitting}
      />
    </div>
  );
}
