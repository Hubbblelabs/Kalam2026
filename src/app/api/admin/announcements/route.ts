import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Announcement } from '@/models/announcement.model';
import {
  requirePermission,
  handleAdminError,
  parsePagination,
  buildSort,
  buildScopeFilter,
  paginatedResponse,
} from '@/lib/admin-auth';
import { z } from 'zod';

const createAnnouncementSchema = z.object({
  title: z.string().min(2).max(200),
  content: z.string().min(1),
  type: z.enum(['info', 'warning', 'urgent', 'event']).default('info'),
  targetAudience: z.enum(['all', 'registered', 'department']).default('all'),
  department: z.string().optional(),
  event: z.string().optional(),
  isActive: z.boolean().default(true),
  publishAt: z.string().optional(),
  expiresAt: z.string().optional(),
});

// GET /api/admin/announcements
export async function GET(request: NextRequest) {
  try {
    const ctx = await requirePermission('announcements', 'read');
    await connectDB();

    const { page, limit, skip, sort, search } = parsePagination(
      request.nextUrl.searchParams
    );

    const scopeFilter = buildScopeFilter(ctx, 'announcements', {
      departmentField: 'department',
      createdByField: 'createdBy',
    });

    const filter: any = { ...scopeFilter };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const type = request.nextUrl.searchParams.get('type');
    if (type) filter.type = type;

    const isActive = request.nextUrl.searchParams.get('isActive');
    if (isActive !== null && isActive !== undefined && isActive !== '') {
      filter.isActive = isActive === 'true';
    }

    const [announcements, total] = await Promise.all([
      Announcement.find(filter)
        .populate('department', 'name')
        .populate('event', 'name')
        .populate('createdBy', 'name email')
        .sort(buildSort(sort))
        .skip(skip)
        .limit(limit)
        .lean(),
      Announcement.countDocuments(filter),
    ]);

    const data = announcements.map((a: any) => ({
      id: a._id.toString(),
      title: a.title,
      content: a.content,
      type: a.type,
      targetAudience: a.targetAudience,
      department: a.department
        ? { id: a.department._id.toString(), name: a.department.name }
        : null,
      event: a.event
        ? { id: a.event._id.toString(), name: a.event.name }
        : null,
      isActive: a.isActive,
      publishAt: a.publishAt,
      expiresAt: a.expiresAt,
      createdBy: a.createdBy
        ? { id: a.createdBy._id.toString(), name: a.createdBy.name }
        : null,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    return handleAdminError(error);
  }
}

// POST /api/admin/announcements
export async function POST(request: NextRequest) {
  try {
    const ctx = await requirePermission('announcements', 'create');
    await connectDB();

    const body = await request.json();
    const data = createAnnouncementSchema.parse(body);

    const announcementData: any = {
      ...data,
      createdBy: ctx.adminId,
    };

    if (data.publishAt) announcementData.publishAt = new Date(data.publishAt);
    if (data.expiresAt) announcementData.expiresAt = new Date(data.expiresAt);

    if (ctx.role === 'department_manager' && ctx.department) {
      announcementData.department = ctx.department;
      announcementData.targetAudience = 'department';
    }

    const announcement = await Announcement.create(announcementData);

    return NextResponse.json({
      success: true,
      data: {
        id: announcement._id.toString(),
        title: announcement.title,
      },
    }, { status: 201 });
  } catch (error) {
    return handleAdminError(error);
  }
}
