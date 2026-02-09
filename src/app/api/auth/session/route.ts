import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET() {
    try {
        const session = await getSession();

        if (!session.isLoggedIn || !session.userId) {
            return NextResponse.json({
                success: false,
                data: null,
            });
        }

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
