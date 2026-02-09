import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/user.model';
import { hashPassword } from '@/lib/auth';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().optional(),
    college: z.string().min(2).max(100),
    department: z.string().min(2).max(100),
});

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const validatedData = registerSchema.parse(body);

        // Check if user exists
        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(validatedData.password);

        // Create user
        const user = await User.create({
            name: validatedData.name,
            email: validatedData.email,
            passwordHash: hashedPassword,
            phone: validatedData.phone,
            college: validatedData.college,
            department: validatedData.department,
        });

        // Create session
        const session = await getSession();
        session.userId = user.id;
        session.email = user.email;
        session.name = user.name;
        session.role = user.role;
        session.isLoggedIn = true;
        await session.save();

        return NextResponse.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
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

        console.error('Register error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
