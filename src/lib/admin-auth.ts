import 'server-only';
import { NextResponse } from 'next/server';
import { getSession } from './session';
import { connectDB } from './db';
import { Admin } from '@/models/admin.model';
import { type AdminRole, type Resource, type Action, hasPermission, isPermissionScoped } from './admin-permissions';

export interface AdminContext {
  adminId: string;
  email: string;
  name: string;
  role: AdminRole;
  department?: string;
  assignedEvents?: string[];
}

/**
 * Verify admin session and return admin context.
 * Throws JSON response if unauthorized.
 */
export async function requireAdmin(): Promise<AdminContext> {
  const session = await getSession();

  if (!session.isLoggedIn || !session.userId || session.role !== 'admin') {
    throw NextResponse.json(
      { success: false, error: 'Unauthorized: Admin access required' },
      { status: 401 }
    );
  }

  await connectDB();
  const admin = await Admin.findById(session.userId).lean();

  if (!admin) {
    throw NextResponse.json(
      { success: false, error: 'Unauthorized: Admin not found' },
      { status: 401 }
    );
  }

  return {
    adminId: admin._id.toString(),
    email: admin.email,
    name: admin.name,
    role: admin.role as AdminRole,
    department: admin.department?.toString(),
    assignedEvents: admin.assignedEvents?.map((e: any) => e.toString()),
  };
}

/**
 * Check if admin has permission for a resource action.
 * Returns the admin context if authorized, throws error response otherwise.
 */
export async function requirePermission(
  resource: Resource,
  action: Action
): Promise<AdminContext> {
  const ctx = await requireAdmin();

  if (!hasPermission(ctx.role, resource, action)) {
    throw NextResponse.json(
      { success: false, error: 'Forbidden: Insufficient permissions' },
      { status: 403 }
    );
  }

  return ctx;
}

/**
 * Build a scope filter for queries based on admin role.
 * Superadmins get no filter (all data).
 * Scoped roles get filtered by department or assigned events.
 */
export function buildScopeFilter(
  ctx: AdminContext,
  resource: Resource,
  options: {
    departmentField?: string;
    eventField?: string;
    createdByField?: string;
  } = {}
): Record<string, any> {
  if (ctx.role === 'superadmin') return {};
  if (!isPermissionScoped(ctx.role, resource)) return {};

  const {
    departmentField = 'department',
    eventField = 'event',
    createdByField = 'createdBy',
  } = options;

  if (ctx.role === 'department_manager' && ctx.department) {
    return { [departmentField]: ctx.department };
  }

  if (ctx.role === 'event_manager' && ctx.assignedEvents?.length) {
    return { [eventField]: { $in: ctx.assignedEvents } };
  }

  // If no valid scope, return impossible filter (no results)
  return { _id: null };
}

/**
 * Standard error handler for admin API routes.
 */
export function handleAdminError(error: unknown): NextResponse {
  if (error instanceof NextResponse) {
    return error;
  }

  console.error('Admin API error:', error);

  if (error instanceof Error && error.name === 'ZodError') {
    return NextResponse.json(
      { success: false, error: 'Validation error', details: (error as any).issues },
      { status: 400 }
    );
  }

  if (error instanceof Error && error.name === 'CastError') {
    return NextResponse.json(
      { success: false, error: 'Invalid ID format' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  );
}

/**
 * Parse pagination params from URL search params.
 */
export function parsePagination(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
  const skip = (page - 1) * limit;
  const sort = searchParams.get('sort') || '-createdAt';
  const search = searchParams.get('search') || '';

  return { page, limit, skip, sort, search };
}

/**
 * Build sort object from sort string (e.g., "-createdAt" → { createdAt: -1 }).
 */
export function buildSort(sort: string): Record<string, 1 | -1> {
  const direction = sort.startsWith('-') ? -1 : 1;
  const field = sort.startsWith('-') || sort.startsWith('+') ? sort.slice(1) : sort;
  return { [field]: direction as 1 | -1 };
}

/**
 * Build paginated response.
 */
export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  };
}
