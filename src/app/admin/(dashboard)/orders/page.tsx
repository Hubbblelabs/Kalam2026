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
import { adminOrdersApi } from '@/lib/admin-api';
import { toast } from 'sonner';

interface OrderRow {
  id: string;
  orderNumber: string;
  user?: { id: string; name: string; email: string } | null;
  items: { event?: { id: string; name: string }; type: string; amount: number }[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  completed: 'default',
  pending: 'secondary',
  cancelled: 'destructive',
  processing: 'outline',
};

const paymentStatusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  paid: 'default',
  pending: 'secondary',
  failed: 'destructive',
  refunded: 'outline',
};

export default function OrdersPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const columns: Column<OrderRow>[] = [
    {
      key: 'orderNumber',
      header: 'Order #',
      sortable: true,
      render: (row) => (
        <span className="font-mono font-medium">{row.orderNumber}</span>
      ),
    },
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
      key: 'items',
      header: 'Items',
      render: (row) => (
        <div>
          <p className="text-sm">{row.items?.length || 0} item(s)</p>
          {row.items?.slice(0, 2).map((item, i) => (
            <p key={i} className="text-xs text-muted-foreground truncate max-w-[160px]">
              {item.event?.name || item.type}
            </p>
          ))}
          {(row.items?.length || 0) > 2 && (
            <p className="text-xs text-muted-foreground">
              +{row.items.length - 2} more
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'totalAmount',
      header: 'Total',
      sortable: true,
      render: (row) => (
        <span className="font-medium">₹{row.totalAmount?.toLocaleString() || 0}</span>
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
      key: 'paymentStatus',
      header: 'Payment',
      render: (row) => (
        <Badge variant={paymentStatusColors[row.paymentStatus] || 'outline'}>
          {row.paymentStatus}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const fetchData = useCallback(
    (params: any) =>
      adminOrdersApi.list({ ...params, status: statusFilter || undefined }),
    [statusFilter]
  );

  const updateStatus = async (id: string, status: string) => {
    try {
      await adminOrdersApi.update(id, { status });
      toast.success(`Order marked as ${status}`);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update order');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">View and manage orders</p>
        </div>
      </div>

      <DataTable<OrderRow>
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
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        }
        filters={{ status: statusFilter === 'all' ? undefined : statusFilter }}
        actions={(row) => (
          <PermissionGate resource="orders" action="update">
            <div className="flex items-center gap-1">
              {row.status === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus(row.id, 'processing')}
                >
                  Process
                </Button>
              )}
              {row.status === 'processing' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus(row.id, 'completed')}
                >
                  Complete
                </Button>
              )}
              {row.status !== 'cancelled' && row.status !== 'completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                  onClick={() => updateStatus(row.id, 'cancelled')}
                >
                  Cancel
                </Button>
              )}
            </div>
          </PermissionGate>
        )}
      />
    </div>
  );
}
