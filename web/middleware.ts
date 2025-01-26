import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const fullUrl = request.url
    const { pathname } = new URL(fullUrl);

    if (!token && pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const url = request.nextUrl;

    if (token && url.pathname === '/') {
        return NextResponse.redirect(new URL("/chats", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|api|favicon.ico|static|assets).*)',
    ],
};