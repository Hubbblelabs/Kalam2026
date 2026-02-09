import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Registration } from '@/models/registration.model';
import {
  requirePermission,
  handleAdminError,
  parsePagination,
  buildSort,
  buildScopeFilter,
  paginatedResponse,
} from '@/lib/admin-auth';
import { z } from 'zod';

const createRegistrationSchema = z.object({
  user: z.string(),
  event: z.string(),
  status: z.enum(['pending', 'confirmed', 'cancelled']).default('pending'),
  teamName: z.string().optional(),
  teamMembers: z.array(z.string()).optional(),
});

// GET /api/admin/registrations
export async function GET(request: NextRequest) {
  try {
    const ctx = await requirePermission('registrations', 'read');
    await connectDB();

    const { page, limit, skip, sort, search } = parsePagination(
      request.nextUrl.searchParams
    );

    const scopeFilter = buildScopeFilter(ctx, 'registrations');
    const filter: any = { ...scopeFilter };

    const status = request.nextUrl.searchParams.get('status');
    if (status) filter.status = status;

    const eventId = request.nextUrl.searchParams.get('event');
    if (eventId) filter.event = eventId;

    const userId = request.nextUrl.searchParams.get('user');
    if (userId) filter.user = userId;

    const [registrations, total] = await Promise.all([
      Registration.find(filter)
        .populate('user', 'name email phone college')
        .populate('event', 'name slug venue')
        .populate('payment', 'amount status')
        .sort(buildSort(sort))
        .skip(skip)
        .limit(limit)
        .lean(),
      Registration.countDocuments(filter),
    ]);

    const data = registrations.map((r: any) => ({
      id: r._id.toString(),
      user: r.user
        ? { id: r.user._id.toString(), name: r.user.name, email: r.user.email, phone: r.user.phone, college: r.user.college }
        : null,
      event: r.event
        ? { id: r.event._id.toString(), name: r.event.name, slug: r.event.slug, venue: r.event.venue }
        : null,
      payment: r.payment
        ? { id: r.payment._id.toString(), amount: r.payment.amount, status: r.payment.status }
        : null,
      status: r.status,
      teamName: r.teamName,
      teamMembers: r.teamMembers,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    return handleAdminError(error);
  }
}

// POST /api/admin/registrations
export async function POST(request: NextRequest) {
  try {
    await requirePermission('registrations', 'create');
    await connectDB();

    const body = await request.json();
    const data = createRegistrationSchema.parse(body);

    const existing = await Registration.findOne({ user: data.user, event: data.event });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'User already registered for this event' },
        { status: 400 }
      );
    }

    const registration = await Registration.create(data);

    return NextResponse.json({
      success: true,
      data: {
        id: registration._id.toString(),
        status: registration.status,
      },
    }, { status: 201 });
  } catch (error) {
    return handleAdminError(error);
  }
}
