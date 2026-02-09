import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/event.model';
import { requirePermission, handleAdminError, buildScopeFilter } from '@/lib/admin-auth';
import { z } from 'zod';

const updateEventSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  slug: z.string().min(2).max(200).optional(),
  shortDetail: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
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
  requiresTeam: z.boolean().optional(),
  minTeamSize: z.number().optional(),
  maxTeamSize: z.number().optional(),
});

// GET /api/admin/events/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('events', 'read');
    await connectDB();

    const { id } = await params;
    const event = await Event.findById(id)
      .populate('category', 'name slug')
      .populate('department', 'name code')
      .populate('createdBy', 'name email')
      .lean();

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (event as any)._id.toString(),
        name: (event as any).name,
        slug: (event as any).slug,
        shortDetail: (event as any).shortDetail,
        description: (event as any).description,
        category: (event as any).category,
        department: (event as any).department,
        schedule: (event as any).schedule,
        venue: (event as any).venue,
        fee: (event as any).fee,
        bannerImage: (event as any).bannerImage,
        contact: (event as any).contact,
        requiresTeam: (event as any).requiresTeam,
        minTeamSize: (event as any).minTeamSize,
        maxTeamSize: (event as any).maxTeamSize,
        createdBy: (event as any).createdBy,
        createdAt: (event as any).createdAt,
        updatedAt: (event as any).updatedAt,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// PATCH /api/admin/events/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await requirePermission('events', 'update');
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = updateEventSchema.parse(body);

    // Scope check for non-superadmins
    const scopeFilter = buildScopeFilter(ctx, 'events', { eventField: '_id' });
    const event = await Event.findOne({ _id: id, ...scopeFilter });

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found or access denied' },
        { status: 404 }
      );
    }

    // Check slug uniqueness if changing
    if (data.slug && data.slug !== event.slug) {
      const slugExists = await Event.findOne({ slug: data.slug, _id: { $ne: id } });
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Slug already in use' },
          { status: 400 }
        );
      }
    }

    Object.assign(event, data);
    await event.save();

    return NextResponse.json({
      success: true,
      data: {
        id: event._id.toString(),
        name: event.name,
        slug: event.slug,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// DELETE /api/admin/events/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await requirePermission('events', 'delete');
    await connectDB();

    const { id } = await params;
    const scopeFilter = buildScopeFilter(ctx, 'events', { eventField: '_id' });
    const event = await Event.findOneAndDelete({ _id: id, ...scopeFilter });

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    return handleAdminError(error);
  }
}
