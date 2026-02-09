import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EventCategory } from '@/models/event-category.model';
import {
  requirePermission,
  handleAdminError,
  parsePagination,
  buildSort,
  paginatedResponse,
} from '@/lib/admin-auth';
import { z } from 'zod';

const createCategorySchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
});

// GET /api/admin/categories
export async function GET(request: NextRequest) {
  try {
    await requirePermission('categories', 'read');
    await connectDB();

    const { page, limit, skip, sort, search } = parsePagination(
      request.nextUrl.searchParams
    );

    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    const [categories, total] = await Promise.all([
      EventCategory.find(filter)
        .sort(buildSort(sort || 'name'))
        .skip(skip)
        .limit(limit)
        .lean(),
      EventCategory.countDocuments(filter),
    ]);

    const data = categories.map((c: any) => ({
      id: c._id.toString(),
      name: c.name,
      slug: c.slug,
    }));

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    return handleAdminError(error);
  }
}

// POST /api/admin/categories
export async function POST(request: NextRequest) {
  try {
    await requirePermission('categories', 'create');
    await connectDB();

    const body = await request.json();
    const data = createCategorySchema.parse(body);

    const existing = await EventCategory.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    const category = await EventCategory.create(data);

    return NextResponse.json({
      success: true,
      data: {
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
      },
    }, { status: 201 });
  } catch (error) {
    return handleAdminError(error);
  }
}
