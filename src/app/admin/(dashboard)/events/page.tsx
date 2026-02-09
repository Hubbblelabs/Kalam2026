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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { adminEventsApi, adminCategoriesApi, adminDepartmentsApi } from '@/lib/admin-api';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface EventRow {
  id: string;
  name: string;
  slug: string;
  shortDetail?: string;
  category?: { id: string; name: string; slug: string } | null;
  department?: { id: string; name: string } | null;
  venue?: string;
  fee?: { amount?: number };
  requiresTeam: boolean;
  createdAt: string;
}

const initialForm = {
  name: '',
  slug: '',
  shortDetail: '',
  description: '',
  category: '',
  department: '',
  venue: '',
  feeAmount: '',
  feeDescription: '',
  contactPhone: '',
  contactEmail: '',
  requiresTeam: false,
  minTeamSize: '',
  maxTeamSize: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  bannerImage: '',
};

export default function EventsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [departments, setDepartments] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    Promise.all([
      adminCategoriesApi.list({ limit: 100 }),
      adminDepartmentsApi.list({ limit: 100 }),
    ]).then(([catRes, deptRes]) => {
      setCategories(catRes.data || []);
      setDepartments(deptRes.data || []);
    }).catch(() => {});
  }, []);

  const columns: Column<EventRow>[] = [
    { key: 'name', header: 'Event Name', sortable: true },
    { key: 'slug', header: 'Slug' },
    {
      key: 'category',
      header: 'Category',
      render: (row) => row.category ? <Badge variant="secondary">{row.category.name}</Badge> : '—',
    },
    {
      key: 'department',
      header: 'Department',
      render: (row) => row.department?.name || '—',
    },
    { key: 'venue', header: 'Venue' },
    {
      key: 'fee',
      header: 'Fee',
      render: (row) => row.fee?.amount ? `₹${row.fee.amount}` : 'Free',
    },
    {
      key: 'requiresTeam',
      header: 'Team',
      render: (row) => (
        <Badge variant={row.requiresTeam ? 'default' : 'outline'}>
          {row.requiresTeam ? 'Team' : 'Solo'}
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

  const fetchData = useCallback((params: any) => adminEventsApi.list(params), []);

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const openCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setFormOpen(true);
  };

  const openEdit = async (row: EventRow) => {
    try {
      const res = await adminEventsApi.get(row.id);
      const event = res.data;
      setEditingId(row.id);
      setForm({
        name: event.name || '',
        slug: event.slug || '',
        shortDetail: event.shortDetail || '',
        description: event.description || '',
        category: event.category?._id || event.category?.id || '',
        department: event.department?._id || event.department?.id || '',
        venue: event.venue || '',
        feeAmount: event.fee?.amount?.toString() || '',
        feeDescription: event.fee?.description || '',
        contactPhone: event.contact?.phone || '',
        contactEmail: event.contact?.email || '',
        requiresTeam: event.requiresTeam || false,
        minTeamSize: event.minTeamSize?.toString() || '',
        maxTeamSize: event.maxTeamSize?.toString() || '',
        startDate: event.schedule?.startDate ? new Date(event.schedule.startDate).toISOString().split('T')[0] : '',
        startTime: event.schedule?.startTime || '',
        endDate: event.schedule?.endDate ? new Date(event.schedule.endDate).toISOString().split('T')[0] : '',
        endTime: event.schedule?.endTime || '',
        bannerImage: event.bannerImage || '',
      });
      setFormOpen(true);
    } catch {
      toast.error('Failed to load event details');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data: any = {
        name: form.name,
        slug: form.slug,
        shortDetail: form.shortDetail || undefined,
        description: form.description || undefined,
        category: form.category,
        department: form.department || undefined,
        venue: form.venue || undefined,
        bannerImage: form.bannerImage || undefined,
        requiresTeam: form.requiresTeam,
      };

      if (form.feeAmount) {
        data.fee = { amount: Number(form.feeAmount), description: form.feeDescription || undefined };
      }
      if (form.contactPhone || form.contactEmail) {
        data.contact = { phone: form.contactPhone || undefined, email: form.contactEmail || undefined };
      }
      if (form.startDate || form.startTime || form.endDate || form.endTime) {
        data.schedule = {
          startDate: form.startDate || undefined,
          startTime: form.startTime || undefined,
          endDate: form.endDate || undefined,
          endTime: form.endTime || undefined,
        };
      }
      if (form.requiresTeam) {
        if (form.minTeamSize) data.minTeamSize = Number(form.minTeamSize);
        if (form.maxTeamSize) data.maxTeamSize = Number(form.maxTeamSize);
      }

      if (editingId) {
        await adminEventsApi.update(editingId, data);
        toast.success('Event updated');
      } else {
        await adminEventsApi.create(data);
        toast.success('Event created');
      }
      setFormOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      await adminEventsApi.delete(deleteId);
      toast.success('Event deleted');
      setDeleteOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Manage all events</p>
        </div>
        <PermissionGate resource="events" action="create">
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </PermissionGate>
      </div>

      <DataTable<EventRow>
        columns={columns}
        fetchData={fetchData}
        refreshKey={refreshKey}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <PermissionGate resource="events" action="update">
              <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </PermissionGate>
            <PermissionGate resource="events" action="delete">
              <Button variant="ghost" size="icon" onClick={() => { setDeleteId(row.id); setDeleteOpen(true); }}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </PermissionGate>
          </div>
        )}
      />

      <FormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingId ? 'Edit Event' : 'Create Event'}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Event Name</Label>
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
          <div className="grid gap-2">
            <Label htmlFor="shortDetail">Short Detail</Label>
            <Input id="shortDetail" value={form.shortDetail} onChange={(e) => setForm({ ...form, shortDetail: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Department</Label>
              <Select value={form.department} onValueChange={(val) => setForm({ ...form, department: val })}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {departments.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feeAmount">Fee (₹)</Label>
              <Input id="feeAmount" type="number" value={form.feeAmount} onChange={(e) => setForm({ ...form, feeAmount: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input id="contactPhone" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="requiresTeam"
              checked={form.requiresTeam}
              onCheckedChange={(checked) => setForm({ ...form, requiresTeam: !!checked })}
            />
            <Label htmlFor="requiresTeam">Requires Team</Label>
          </div>
          {form.requiresTeam && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minTeamSize">Min Team Size</Label>
                <Input id="minTeamSize" type="number" value={form.minTeamSize} onChange={(e) => setForm({ ...form, minTeamSize: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxTeamSize">Max Team Size</Label>
                <Input id="maxTeamSize" type="number" value={form.maxTeamSize} onChange={(e) => setForm({ ...form, maxTeamSize: e.target.value })} />
              </div>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="bannerImage">Banner Image URL</Label>
            <Input id="bannerImage" value={form.bannerImage} onChange={(e) => setForm({ ...form, bannerImage: e.target.value })} />
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Event"
        description="This will permanently delete this event. Associated registrations will be affected."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isLoading={isSubmitting}
      />
    </div>
  );
}
