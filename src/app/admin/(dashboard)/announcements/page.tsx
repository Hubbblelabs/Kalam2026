'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { DataTable, type Column } from '@/components/admin/data-table';
import { FormModal } from '@/components/admin/form-modal';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { PermissionGate } from '@/components/admin/permission-gate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { adminAnnouncementsApi } from '@/lib/admin-api';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface AnnouncementRow {
  id: string;
  title: string;
  content: string;
  type: string;
  targetAudience: string;
  department?: { id: string; name: string } | null;
  event?: { id: string; name: string } | null;
  isActive: boolean;
  publishAt?: string;
  expiresAt?: string;
  createdBy?: { id: string; name: string; email: string } | null;
  createdAt: string;
}

const typeColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  info: 'default',
  warning: 'secondary',
  urgent: 'destructive',
  event: 'outline',
};

const INITIAL_FORM = {
  title: '',
  content: '',
  type: 'info',
  targetAudience: 'all',
  isActive: true,
  publishAt: '',
  expiresAt: '',
};

export default function AnnouncementsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns: Column<AnnouncementRow>[] = [
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[220px]">
            {row.content}
          </p>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (row) => (
        <Badge variant={typeColors[row.type] || 'outline'}>{row.type}</Badge>
      ),
    },
    {
      key: 'targetAudience',
      header: 'Audience',
      render: (row) => (
        <span className="text-sm capitalize">{row.targetAudience}</span>
      ),
    },
    {
      key: 'isActive',
      header: 'Active',
      render: (row) => (
        <Badge variant={row.isActive ? 'default' : 'secondary'}>
          {row.isActive ? 'Yes' : 'No'}
        </Badge>
      ),
    },
    {
      key: 'publishAt',
      header: 'Publish',
      sortable: true,
      render: (row) =>
        row.publishAt ? new Date(row.publishAt).toLocaleDateString() : 'Immediately',
    },
    {
      key: 'expiresAt',
      header: 'Expires',
      render: (row) =>
        row.expiresAt ? new Date(row.expiresAt).toLocaleDateString() : 'Never',
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const fetchData = useCallback(
    (params: any) => adminAnnouncementsApi.list(params),
    []
  );

  const openCreate = () => {
    setEditId(null);
    setForm(INITIAL_FORM);
    setFormOpen(true);
  };

  const openEdit = (row: AnnouncementRow) => {
    setEditId(row.id);
    setForm({
      title: row.title,
      content: row.content,
      type: row.type,
      targetAudience: row.targetAudience,
      isActive: row.isActive,
      publishAt: row.publishAt ? new Date(row.publishAt).toISOString().slice(0, 16) : '',
      expiresAt: row.expiresAt ? new Date(row.expiresAt).toISOString().slice(0, 16) : '',
    });
    setFormOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: any = {
        title: form.title,
        content: form.content,
        type: form.type,
        targetAudience: form.targetAudience,
        isActive: form.isActive,
      };
      if (form.publishAt) payload.publishAt = new Date(form.publishAt).toISOString();
      if (form.expiresAt) payload.expiresAt = new Date(form.expiresAt).toISOString();

      if (editId) {
        await adminAnnouncementsApi.update(editId, payload);
        toast.success('Announcement updated');
      } else {
        await adminAnnouncementsApi.create(payload);
        toast.success('Announcement created');
      }
      setFormOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      await adminAnnouncementsApi.delete(deleteId);
      toast.success('Announcement deleted');
      setDeleteOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Manage announcements and notifications</p>
        </div>
        <PermissionGate resource="announcements" action="create">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            New Announcement
          </Button>
        </PermissionGate>
      </div>

      <DataTable<AnnouncementRow>
        columns={columns}
        fetchData={fetchData}
        refreshKey={refreshKey}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <PermissionGate resource="announcements" action="update">
              <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </PermissionGate>
            <PermissionGate resource="announcements" action="delete">
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

      {/* Create / Edit Modal */}
      <FormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editId ? 'Edit Announcement' : 'Create Announcement'}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              rows={4}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Select
                value={form.targetAudience}
                onValueChange={(v) => setForm({ ...form, targetAudience: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="registered">Registered Users</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publishAt">Publish At</Label>
              <Input
                id="publishAt"
                type="datetime-local"
                value={form.publishAt}
                onChange={(e) => setForm({ ...form, publishAt: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiresAt">Expires At</Label>
              <Input
                id="expiresAt"
                type="datetime-local"
                value={form.expiresAt}
                onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={form.isActive}
              onCheckedChange={(checked) =>
                setForm({ ...form, isActive: checked === true })
              }
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Announcement"
        description="This announcement will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isLoading={isSubmitting}
      />
    </div>
  );
}
