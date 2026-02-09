import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Announcement } from '@/models/announcement.model';
import { requirePermission, handleAdminError } from '@/lib/admin-auth';
import { z } from 'zod';

const updateAnnouncementSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  content: z.string().min(1).optional(),
  type: z.enum(['info', 'warning', 'urgent', 'event']).optional(),
  targetAudience: z.enum(['all', 'registered', 'department']).optional(),
  department: z.string().optional(),
  event: z.string().optional(),
  isActive: z.boolean().optional(),
  publishAt: z.string().nullable().optional(),
  expiresAt: z.string().nullable().optional(),
});

// GET /api/admin/announcements/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('announcements', 'read');
    await connectDB();

    const { id } = await params;
    const ann = await Announcement.findById(id)
      .populate('department', 'name')
      .populate('event', 'name')
      .populate('createdBy', 'name email')
      .lean();

    if (!ann) {
      return NextResponse.json({ success: false, error: 'Announcement not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: ann });
  } catch (error) {
    return handleAdminError(error);
  }
}

// PATCH /api/admin/announcements/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('announcements', 'update');
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = updateAnnouncementSchema.parse(body);

    const updateData: any = { ...data };
    if (data.publishAt) updateData.publishAt = new Date(data.publishAt);
    if (data.publishAt === null) updateData.publishAt = null;
    if (data.expiresAt) updateData.expiresAt = new Date(data.expiresAt);
    if (data.expiresAt === null) updateData.expiresAt = null;

    const ann = await Announcement.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!ann) {
      return NextResponse.json({ success: false, error: 'Announcement not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { id: ann._id.toString(), title: ann.title },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// DELETE /api/admin/announcements/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('announcements', 'delete');
    await connectDB();

    const { id } = await params;
    const ann = await Announcement.findByIdAndDelete(id);
    if (!ann) {
      return NextResponse.json({ success: false, error: 'Announcement not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    return handleAdminError(error);
  }
}
