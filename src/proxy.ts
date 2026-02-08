import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

// Define session options directly here since we can't import from lib/session (server-only)
// Or better, move session options to a shared config file that isn't server-only
// For now, duplicating the minimal config needed to check the cookie existence
const sessionOptions = {
    password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
    cookieName: 'kalam_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // specific protected routes
    const protectedRoutes = ['/dashboard', '/admin', '/account'];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedRoute) {
        const response = NextResponse.next();
        const cookieStore = await cookies();
        const session = await getIronSession(cookieStore, sessionOptions);

        // @ts-ignore - session type is strict but we just check presence
        if (!session.isLoggedIn) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            url.searchParams.set('callbackUrl', encodeURI(pathname));
            return NextResponse.redirect(url);
        }

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
