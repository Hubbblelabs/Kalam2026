'use client';

import { useState, useCallback } from 'react';
import { DataTable, type Column } from '@/components/admin/data-table';
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
import { adminPaymentsApi } from '@/lib/admin-api';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

interface PaymentRow {
  id: string;
  user?: { id: string; name: string; email: string } | null;
  order?: { id: string; orderNumber: string } | null;
  gateway: string;
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  amount: number;
  currency: string;
  status: string;
  paidAt?: string;
  createdAt: string;
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  SUCCESS: 'default',
  CREATED: 'secondary',
  FAILED: 'destructive',
  REFUNDED: 'outline',
};

export default function PaymentsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const columns: Column<PaymentRow>[] = [
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
      key: 'order',
      header: 'Order',
      render: (row) => row.order?.orderNumber || '—',
    },
    {
      key: 'gateway',
      header: 'Gateway',
      render: (row) => (
        <div>
          <p className="text-sm">{row.gateway}</p>
          {row.gatewayPaymentId && (
            <p className="text-xs text-muted-foreground font-mono">{row.gatewayPaymentId}</p>
          )}
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (row) => (
        <span className="font-medium">
          ₹{row.amount.toLocaleString()} {row.currency !== 'INR' ? row.currency : ''}
        </span>
      ),
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
      key: 'paidAt',
      header: 'Paid At',
      sortable: true,
      render: (row) =>
        row.paidAt ? new Date(row.paidAt).toLocaleString() : '—',
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const fetchData = useCallback(
    (params: any) =>
      adminPaymentsApi.list({ ...params, status: statusFilter || undefined }),
    [statusFilter]
  );

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminPaymentsApi.update(id, { status });
      toast.success(`Payment marked as ${status}`);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update payment');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">View and manage payment transactions</p>
        </div>
      </div>

      <DataTable<PaymentRow>
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
              <SelectItem value="CREATED">Created</SelectItem>
              <SelectItem value="SUCCESS">Success</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
              <SelectItem value="REFUNDED">Refunded</SelectItem>
            </SelectContent>
          </Select>
        }
        filters={{ status: statusFilter === 'all' ? undefined : statusFilter }}
        actions={(row) => (
          <PermissionGate resource="payments" action="update">
            <div className="flex items-center gap-1">
              {row.status === 'CREATED' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus(row.id, 'SUCCESS')}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Mark Success
                </Button>
              )}
              {row.status === 'SUCCESS' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus(row.id, 'REFUNDED')}
                >
                  Refund
                </Button>
              )}
            </div>
          </PermissionGate>
        )}
      />
    </div>
  );
}
