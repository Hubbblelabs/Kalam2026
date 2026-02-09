import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/event.model';
import {
  requirePermission,
  handleAdminError,
  parsePagination,
  buildSort,
  buildScopeFilter,
  paginatedResponse,
} from '@/lib/admin-auth';
import { z } from 'zod';

const createEventSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  shortDetail: z.string().optional(),
  description: z.string().optional(),
  category: z.string(),
  department: z.string().optional(),
  schedule: z
    .object({
      startDate: z.string().optional(),
      startTime: z.string().optional(),
      endDate: z.string().optional(),
      endTime: z.string().optional(),
    })
    .optional(),
  venue: z.string().optional(),
  fee: z
    .object({
      amount: z.number().optional(),
      description: z.string().optional(),
    })
    .optional(),
  bannerImage: z.string().optional(),
  contact: z
    .object({
      phone: z.string().optional(),
      email: z.string().optional(),
    })
    .optional(),
  requiresTeam: z.boolean().default(false),
  minTeamSize: z.number().optional(),
  maxTeamSize: z.number().optional(),
});

// GET /api/admin/events
export async function GET(request: NextRequest) {
  try {
    const ctx = await requirePermission('events', 'read');
    await connectDB();

    const { page, limit, skip, sort, search } = parsePagination(
      request.nextUrl.searchParams
    );

    const scopeFilter = buildScopeFilter(ctx, 'events', {
      eventField: '_id',
    });

    const filter: any = { ...scopeFilter };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { shortDetail: { $regex: search, $options: 'i' } },
      ];
    }

    const category = request.nextUrl.searchParams.get('category');
    if (category) filter.category = category;

    const department = request.nextUrl.searchParams.get('department');
    if (department) filter.department = department;

    const [events, total] = await Promise.all([
      Event.find(filter)
        .populate('category', 'name slug')
        .populate('department', 'name code')
        .populate('createdBy', 'name email')
        .sort(buildSort(sort))
        .skip(skip)
        .limit(limit)
        .lean(),
      Event.countDocuments(filter),
    ]);

    const data = events.map((e: any) => ({
      id: e._id.toString(),
      name: e.name,
      slug: e.slug,
      shortDetail: e.shortDetail,
      category: e.category
        ? { id: e.category._id.toString(), name: e.category.name, slug: e.category.slug }
        : null,
      department: e.department
        ? { id: e.department._id.toString(), name: e.department.name }
        : null,
      schedule: e.schedule,
      venue: e.venue,
      fee: e.fee,
      requiresTeam: e.requiresTeam,
      minTeamSize: e.minTeamSize,
      maxTeamSize: e.maxTeamSize,
      bannerImage: e.bannerImage,
      contact: e.contact,
      createdBy: e.createdBy
        ? { id: e.createdBy._id.toString(), name: e.createdBy.name }
        : null,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    return handleAdminError(error);
  }
}

// POST /api/admin/events
export async function POST(request: NextRequest) {
  try {
    const ctx = await requirePermission('events', 'create');
    await connectDB();

    const body = await request.json();
    const data = createEventSchema.parse(body);

    // Check slug uniqueness
    const existing = await Event.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Event with this slug already exists' },
        { status: 400 }
      );
    }

    // For department managers, force their department
    const eventData: any = {
      ...data,
      createdBy: ctx.adminId,
    };

    if (ctx.role === 'department_manager' && ctx.department) {
      eventData.department = ctx.department;
    }

    const event = await Event.create(eventData);

    return NextResponse.json({
      success: true,
      data: {
        id: event._id.toString(),
        name: event.name,
        slug: event.slug,
      },
    }, { status: 201 });
  } catch (error) {
    return handleAdminError(error);
  }
}
