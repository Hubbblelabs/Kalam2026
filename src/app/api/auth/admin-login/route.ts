
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models/admin.model';
import { verifyPassword } from '@/lib/auth';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const validatedData = loginSchema.parse(body);

        // Find admin from admins collection
        const admin = await Admin.findOne({ email: validatedData.email });
        if (!admin) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password - check if passwordHash exists first
        if (!admin.passwordHash) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const isValidPassword = await verifyPassword(admin.passwordHash, validatedData.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Create session
        const session = await getSession();
        session.userId = admin.id;
        session.email = admin.email;
        session.name = admin.name;
        session.role = 'admin';
        session.adminRole = admin.role;
        session.isLoggedIn = true;
        await session.save();

        return NextResponse.json({
            success: true,
            data: {
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: 'admin',
                    adminRole: admin.role,
                },
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid input', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Admin Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
