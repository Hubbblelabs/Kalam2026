'use client';

import { useAdminAuth } from '@/contexts/admin-auth-context';
import { hasPermission, type Resource, type Action } from '@/lib/admin-permissions';

/**
 * Component that conditionally renders children based on admin permissions.
 */
export function PermissionGate({
  resource,
  action,
  children,
  fallback = null,
}: {
  resource: Resource;
  action: Action;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { role } = useAdminAuth();
  if (!role || !hasPermission(role, resource, action)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
