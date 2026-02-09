'use client';

import { useState, useCallback } from 'react';
import { DataTable, type Column } from '@/components/admin/data-table';
import { FormModal } from '@/components/admin/form-modal';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { PermissionGate } from '@/components/admin/permission-gate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { adminDepartmentsApi } from '@/lib/admin-api';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface DeptRow {
  id: string;
  code: number;
  name: string;
  category: string;
}

const initialForm = { code: '', name: '', category: '' };

export default function DepartmentsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns: Column<DeptRow>[] = [
    { key: 'code', header: 'Code', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
  ];

  const fetchData = useCallback((params: any) => adminDepartmentsApi.list(params), []);

  const openCreate = () => { setEditingId(null); setForm(initialForm); setFormOpen(true); };

  const openEdit = (row: DeptRow) => {
    setEditingId(row.id);
    setForm({ code: String(row.code), name: row.name, category: row.category });
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = { code: Number(form.code), name: form.name, category: form.category };
      if (editingId) {
        await adminDepartmentsApi.update(editingId, data);
        toast.success('Department updated');
      } else {
        await adminDepartmentsApi.create(data);
        toast.success('Department created');
      }
      setFormOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save department');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      await adminDepartmentsApi.delete(deleteId);
      toast.success('Department deleted');
      setDeleteOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete department');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">Manage academic departments</p>
        </div>
        <PermissionGate resource="departments" action="create">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </PermissionGate>
      </div>

      <DataTable<DeptRow>
        columns={columns}
        fetchData={fetchData}
        refreshKey={refreshKey}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <PermissionGate resource="departments" action="update">
              <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </PermissionGate>
            <PermissionGate resource="departments" action="delete">
              <Button variant="ghost" size="icon" onClick={() => { setDeleteId(row.id); setDeleteOpen(true); }}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </PermissionGate>
          </div>
        )}
      />

      <FormModal open={formOpen} onOpenChange={setFormOpen} title={editingId ? 'Edit Department' : 'Create Department'} onSubmit={handleSubmit} isLoading={isSubmitting}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Code</Label>
            <Input id="code" type="number" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          </div>
        </div>
      </FormModal>

      <ConfirmDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Department" description="This will permanently delete this department." confirmLabel="Delete" onConfirm={handleDelete} isLoading={isSubmitting} />
    </div>
  );
}
