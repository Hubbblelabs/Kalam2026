'use client';

import { useState, useCallback } from 'react';
import { DataTable, type Column } from '@/components/admin/data-table';
import { FormModal } from '@/components/admin/form-modal';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { PermissionGate } from '@/components/admin/permission-gate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { adminCategoriesApi } from '@/lib/admin-api';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface CatRow {
  id: string;
  name: string;
  slug: string;
}

const initialForm = { name: '', slug: '' };

export default function CategoriesPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns: Column<CatRow>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'slug', header: 'Slug', sortable: true },
  ];

  const fetchData = useCallback((params: any) => adminCategoriesApi.list(params), []);

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const openCreate = () => { setEditingId(null); setForm(initialForm); setFormOpen(true); };

  const openEdit = (row: CatRow) => {
    setEditingId(row.id);
    setForm({ name: row.name, slug: row.slug });
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await adminCategoriesApi.update(editingId, form);
        toast.success('Category updated');
      } else {
        await adminCategoriesApi.create(form);
        toast.success('Category created');
      }
      setFormOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      await adminCategoriesApi.delete(deleteId);
      toast.success('Category deleted');
      setDeleteOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Event Categories</h1>
          <p className="text-muted-foreground">Manage event categories</p>
        </div>
        <PermissionGate resource="categories" action="create">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </PermissionGate>
      </div>

      <DataTable<CatRow>
        columns={columns}
        fetchData={fetchData}
        refreshKey={refreshKey}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <PermissionGate resource="categories" action="update">
              <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </PermissionGate>
            <PermissionGate resource="categories" action="delete">
              <Button variant="ghost" size="icon" onClick={() => { setDeleteId(row.id); setDeleteOpen(true); }}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </PermissionGate>
          </div>
        )}
      />

      <FormModal open={formOpen} onOpenChange={setFormOpen} title={editingId ? 'Edit Category' : 'Create Category'} onSubmit={handleSubmit} isLoading={isSubmitting}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => {
                const name = e.target.value;
                setForm((f) => ({ ...f, name, slug: editingId ? f.slug : generateSlug(name) }));
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </div>
        </div>
      </FormModal>

      <ConfirmDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Category" description="This will permanently delete this category. Events using it will be affected." confirmLabel="Delete" onConfirm={handleDelete} isLoading={isSubmitting} />
    </div>
  );
}
