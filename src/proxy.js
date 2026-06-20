import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
    // Get current session
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const { pathname } = request.nextUrl;

    // Redirect unauthenticated users
    if (!session) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    const role = session.user?.role || "user";

    // Routing for dashboard
    if (pathname === '/dashboard') {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    // Admin check
    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    // Librarian check
    if (pathname.startsWith('/dashboard/librarian') && role !== 'librarian') {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    // User check
    if (pathname.startsWith('/dashboard/user') && role !== 'user') {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    // Allow access if all checks pass
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile',
        '/dashboard/:path*',
        '/payment-success',
        '/choose-role'
    ]
};