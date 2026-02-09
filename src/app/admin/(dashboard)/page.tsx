'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/admin/stat-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { statsApi } from '@/lib/admin-api';
import { useAdminAuth } from '@/contexts/admin-auth-context';
import { PermissionGate } from '@/components/admin/permission-gate';
import {
  Users,
  Calendar,
  ClipboardList,
  Receipt,
  IndianRupee,
  Building2,
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalEvents: number;
  totalRegistrations: number;
  totalOrders: number;
  totalRevenue: number;
  totalDepartments: number;
  recentRegistrations: Array<{
    id: string;
    userName: string;
    userEmail: string;
    eventName: string;
    status: string;
    createdAt: string;
  }>;
  ordersByStatus: Record<string, number>;
  paymentsByStatus: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, role } = useAdminAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const result = await statsApi.get();
        setStats(result.data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || 'Admin'}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <PermissionGate resource="users" action="read">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers ?? 0}
            icon={Users}
            isLoading={isLoading}
          />
        </PermissionGate>
        <StatCard
          title="Events"
          value={stats?.totalEvents ?? 0}
          icon={Calendar}
          isLoading={isLoading}
        />
        <StatCard
          title="Registrations"
          value={stats?.totalRegistrations ?? 0}
          icon={ClipboardList}
          isLoading={isLoading}
        />
        <PermissionGate resource="orders" action="read">
          <StatCard
            title="Orders"
            value={stats?.totalOrders ?? 0}
            icon={Receipt}
            isLoading={isLoading}
          />
        </PermissionGate>
        <PermissionGate resource="payments" action="read">
          <StatCard
            title="Revenue"
            value={stats ? formatCurrency(stats.totalRevenue) : '₹0'}
            icon={IndianRupee}
            isLoading={isLoading}
          />
        </PermissionGate>
        <StatCard
          title="Departments"
          value={stats?.totalDepartments ?? 0}
          icon={Building2}
          isLoading={isLoading}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>Latest event registrations</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : !stats?.recentRegistrations?.length ? (
              <p className="text-sm text-muted-foreground">No registrations yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.recentRegistrations.map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{reg.userName}</p>
                      <p className="text-xs text-muted-foreground">{reg.eventName}</p>
                    </div>
                    <Badge
                      variant={
                        reg.status === 'confirmed' ? 'default' :
                        reg.status === 'cancelled' ? 'destructive' : 'secondary'
                      }
                    >
                      {reg.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <PermissionGate resource="orders" action="read">
          <Card>
            <CardHeader>
              <CardTitle>Orders Overview</CardTitle>
              <CardDescription>Orders by status</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : !stats?.ordersByStatus ? (
                <p className="text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{status}</Badge>
                      </div>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </PermissionGate>
      </div>
    </div>
  );
}
