import 'server-only';
import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
    userId?: string;
    email?: string;
    name?: string;
    role?: string;
    adminRole?: string; // superadmin, department_admin, event_admin
    isLoggedIn: boolean;
}

const sessionOptions = {
    password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
    cookieName: 'kalam_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax' as const,
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },
};

export async function getSession(): Promise<IronSession<SessionData>> {
    const cookieStore = await cookies();
    return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function requireAuth() {
    const session = await getSession();

    if (!session.isLoggedIn || !session.userId) {
        throw new Error('Unauthorized');
    }

    return session;
}
