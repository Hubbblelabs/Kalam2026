'use client';

import { useState, useCallback } from 'react';
import { DataTable, type Column } from '@/components/admin/data-table';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { PermissionGate } from '@/components/admin/permission-gate';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { adminRegistrationsApi } from '@/lib/admin-api';
import { toast } from 'sonner';
import { Trash2, Check, X } from 'lucide-react';

interface RegRow {
  id: string;
  user?: { id: string; name: string; email: string; phone?: string; college?: string } | null;
  event?: { id: string; name: string; slug: string; venue?: string } | null;
  payment?: { id: string; amount: number; status: string } | null;
  status: string;
  teamName?: string;
  teamMembers?: string[];
  createdAt: string;
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  confirmed: 'default',
  pending: 'secondary',
  cancelled: 'destructive',
};

export default function RegistrationsPage() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const columns: Column<RegRow>[] = [
    {
      key: 'user',
      header: 'User',
      render: (row) => (
        <div>
          <p className="font-medium">{row.user?.name || '—'}</p>
          <p className="text-xs text-muted-foreground">{row.user?.email || ''}</p>
        </div>
      ),
    },
    {
      key: 'event',
      header: 'Event',
      render: (row) => row.event?.name || '—',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <Badge variant={statusColors[row.status] || 'outline'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'teamName',
      header: 'Team',
      render: (row) => row.teamName || '—',
    },
    {
      key: 'payment',
      header: 'Payment',
      render: (row) =>
        row.payment ? (
          <Badge variant={row.payment.status === 'SUCCESS' ? 'default' : 'outline'}>
            ₹{row.payment.amount} - {row.payment.status}
          </Badge>
        ) : (
          '—'
        ),
    },
    {
      key: 'createdAt',
      header: 'Registered',
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const fetchData = useCallback(
    (params: any) => adminRegistrationsApi.list({ ...params, status: statusFilter || undefined }),
    [statusFilter]
  );

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminRegistrationsApi.update(id, { status });
      toast.success(`Registration ${status}`);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      await adminRegistrationsApi.delete(deleteId);
      toast.success('Registration deleted');
      setDeleteOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Registrations</h1>
          <p className="text-muted-foreground">Manage event registrations</p>
        </div>
      </div>

      <DataTable<RegRow>
        columns={columns}
        fetchData={fetchData}
        refreshKey={refreshKey}
        toolbar={
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        }
        filters={{ status: statusFilter === 'all' ? undefined : statusFilter }}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <PermissionGate resource="registrations" action="update">
              {row.status !== 'confirmed' && (
                <Button
                  variant="ghost"
                  size="icon"
                  title="Confirm"
                  onClick={() => updateStatus(row.id, 'confirmed')}
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
              )}
              {row.status !== 'cancelled' && (
                <Button
                  variant="ghost"
                  size="icon"
                  title="Cancel"
                  onClick={() => updateStatus(row.id, 'cancelled')}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </PermissionGate>
            <PermissionGate resource="registrations" action="delete">
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

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Registration"
        description="This will permanently delete this registration."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isLoading={isSubmitting}
      />
    </div>
  );
}
