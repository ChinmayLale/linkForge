import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicPaths = ['/login', '/signup', '/', '/reset-password'];

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const path = request.nextUrl.pathname;

    const isPublic = publicPaths.includes(path);
    const isAuthenticated = !!token;
    const username = token?.username || '';
    const isLoginPage = path === '/login';
    // console.log("🔍 MIDDLEWARE CHECK:", { path, token, username });

    if (isPublic) {
        if (isAuthenticated && path === '/') {
            return NextResponse.redirect(new URL(`/dashboard/${username}`, request.url));
        }
        if (isAuthenticated && isLoginPage && username) {
            return NextResponse.redirect(new URL(`/dashboard/${encodeURIComponent(username)}`, request.url));
        }
        return NextResponse.next();
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/', '/login', '/signup', '/reset-password'],
};
