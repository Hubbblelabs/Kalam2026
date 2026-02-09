/**
 * Role-Based Access Control (RBAC) system for Kalam 2026 Admin Panel.
 *
 * Roles:
 *  - superadmin: Full access to all modules
 *  - event_manager: Manage events & registrations for assigned events
 *  - department_manager: Manage departments, events & registrations under their department
 */

export type AdminRole = 'superadmin' | 'event_manager' | 'department_manager';

export type Resource =
  | 'dashboard'
  | 'analytics'
  | 'users'
  | 'admins'
  | 'events'
  | 'categories'
  | 'departments'
  | 'registrations'
  | 'payments'
  | 'orders'
  | 'announcements'
  | 'settings';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'manage';

export interface Permission {
  resource: Resource;
  actions: Action[];
  /** If true, access is scoped to user's own department/assigned events */
  scoped?: boolean;
}

const SUPERADMIN_PERMISSIONS: Permission[] = [
  { resource: 'dashboard', actions: ['read'] },
  { resource: 'analytics', actions: ['read'] },
  { resource: 'users', actions: ['create', 'read', 'update', 'delete', 'manage'] },
  { resource: 'admins', actions: ['create', 'read', 'update', 'delete', 'manage'] },
  { resource: 'events', actions: ['create', 'read', 'update', 'delete', 'manage'] },
  { resource: 'categories', actions: ['create', 'read', 'update', 'delete', 'manage'] },
  { resource: 'departments', actions: ['create', 'read', 'update', 'delete', 'manage'] },
  { resource: 'registrations', actions: ['create', 'read', 'update', 'delete', 'manage'] },
  { resource: 'payments', actions: ['read', 'update', 'manage'] },
  { resource: 'orders', actions: ['read', 'update', 'manage'] },
  { resource: 'announcements', actions: ['create', 'read', 'update', 'delete', 'manage'] },
  { resource: 'settings', actions: ['read', 'update', 'manage'] },
];

const EVENT_MANAGER_PERMISSIONS: Permission[] = [
  { resource: 'dashboard', actions: ['read'] },
  { resource: 'events', actions: ['create', 'read', 'update', 'delete'], scoped: true },
  { resource: 'categories', actions: ['read'] },
  { resource: 'departments', actions: ['read'] },
  { resource: 'registrations', actions: ['read', 'update'], scoped: true },
  { resource: 'announcements', actions: ['create', 'read', 'update', 'delete'], scoped: true },
];

const DEPARTMENT_MANAGER_PERMISSIONS: Permission[] = [
  { resource: 'dashboard', actions: ['read'] },
  { resource: 'departments', actions: ['read', 'update'], scoped: true },
  { resource: 'events', actions: ['create', 'read', 'update', 'delete'], scoped: true },
  { resource: 'categories', actions: ['read'] },
  { resource: 'registrations', actions: ['read', 'update'], scoped: true },
  { resource: 'announcements', actions: ['create', 'read', 'update'], scoped: true },
];

const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  superadmin: SUPERADMIN_PERMISSIONS,
  event_manager: EVENT_MANAGER_PERMISSIONS,
  department_manager: DEPARTMENT_MANAGER_PERMISSIONS,
};

/**
 * Check if a given role has permission to perform an action on a resource.
 */
export function hasPermission(
  role: AdminRole,
  resource: Resource,
  action: Action
): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;

  const perm = permissions.find((p) => p.resource === resource);
  if (!perm) return false;

  return perm.actions.includes(action) || perm.actions.includes('manage');
}

/**
 * Check if a role's permission on a resource is scoped (department/event restricted).
 */
export function isPermissionScoped(role: AdminRole, resource: Resource): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;

  const perm = permissions.find((p) => p.resource === resource);
  return perm?.scoped ?? false;
}

/**
 * Get all permissions for a role.
 */
export function getPermissions(role: AdminRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Get all resources accessible by a role.
 */
export function getAccessibleResources(role: AdminRole): Resource[] {
  return (ROLE_PERMISSIONS[role] || []).map((p) => p.resource);
}

/**
 * Navigation items configuration with role-based visibility.
 */
export interface NavItem {
  title: string;
  url: string;
  icon: string; // icon name from lucide-react
  resource: Resource;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const ADMIN_NAV: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', url: '/admin', icon: 'LayoutDashboard', resource: 'dashboard' },
      { title: 'Analytics', url: '/admin/analytics', icon: 'BarChart3', resource: 'analytics' },
    ],
  },
  {
    title: 'Content',
    items: [
      { title: 'Events', url: '/admin/events', icon: 'Calendar', resource: 'events' },
      { title: 'Categories', url: '/admin/categories', icon: 'Tags', resource: 'categories' },
      { title: 'Departments', url: '/admin/departments', icon: 'Building2', resource: 'departments' },
      { title: 'Announcements', url: '/admin/announcements', icon: 'Megaphone', resource: 'announcements' },
    ],
  },
  {
    title: 'People',
    items: [
      { title: 'Users', url: '/admin/users', icon: 'Users', resource: 'users' },
      { title: 'Admins', url: '/admin/admins', icon: 'Shield', resource: 'admins' },
      { title: 'Registrations', url: '/admin/registrations', icon: 'ClipboardList', resource: 'registrations' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { title: 'Orders', url: '/admin/orders', icon: 'Receipt', resource: 'orders' },
      { title: 'Payments', url: '/admin/payments', icon: 'CreditCard', resource: 'payments' },
    ],
  },
  {
    title: 'System',
    items: [
      { title: 'Settings', url: '/admin/settings', icon: 'Settings', resource: 'settings' },
    ],
  },
];

/**
 * Filter navigation items based on admin role.
 */
export function getNavForRole(role: AdminRole): NavGroup[] {
  return ADMIN_NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) => hasPermission(role, item.resource, 'read')),
  })).filter((group) => group.items.length > 0);
}
