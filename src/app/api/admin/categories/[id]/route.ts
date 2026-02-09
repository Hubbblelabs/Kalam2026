import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EventCategory } from '@/models/event-category.model';
import { requirePermission, handleAdminError } from '@/lib/admin-auth';
import { z } from 'zod';

const updateCategorySchema = z.object({
  name: z.string().min(2).max(200).optional(),
  slug: z.string().min(2).max(200).optional(),
});

// GET /api/admin/categories/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('categories', 'read');
    await connectDB();

    const { id } = await params;
    const cat = await EventCategory.findById(id).lean();
    if (!cat) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { id: (cat as any)._id.toString(), name: (cat as any).name, slug: (cat as any).slug },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// PATCH /api/admin/categories/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('categories', 'update');
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = updateCategorySchema.parse(body);

    if (data.slug) {
      const existing = await EventCategory.findOne({ slug: data.slug, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json({ success: false, error: 'Slug already in use' }, { status: 400 });
      }
    }

    const cat = await EventCategory.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!cat) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { id: cat._id.toString(), name: cat.name, slug: cat.slug },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// DELETE /api/admin/categories/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('categories', 'delete');
    await connectDB();

    const { id } = await params;
    const cat = await EventCategory.findByIdAndDelete(id);
    if (!cat) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    return handleAdminError(error);
  }
}
