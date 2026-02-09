import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models/admin.model';

export async function GET() {
    try {
        const session = await getSession();

        if (!session.isLoggedIn || !session.userId) {
            return NextResponse.json({
                success: false,
                data: null,
            });
        }

        // If this is an admin session, fetch full admin details from DB
        if (session.role === 'admin') {
            await connectDB();
            const admin = await Admin.findById(session.userId).lean();
            
            if (!admin) {
                return NextResponse.json({
                    success: false,
                    data: null,
                });
            }

            // Update session with latest role if needed
            if (admin.role !== session.adminRole) {
                session.adminRole = admin.role;
                await session.save();
            }

            return NextResponse.json({
                success: true,
                data: {
                    user: {
                        id: admin._id.toString(),
                        name: admin.name,
                        email: admin.email,
                        role: 'admin',
                        adminRole: admin.role,
                    },
                },
            });
        }

        // Regular user session
        return NextResponse.json({
            success: true,
            data: {
                user: {
                    id: session.userId,
                    name: session.name,
                    email: session.email,
                    role: session.role,
                    adminRole: session.adminRole,
                },
            },
        });
    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
