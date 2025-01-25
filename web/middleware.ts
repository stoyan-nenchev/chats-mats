import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const response = NextResponse.next();

    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    response.headers.set('Authorization', `Bearer ${token}`);

    const url = request.nextUrl;

    if (url.pathname === '/') {
        return NextResponse.redirect(new URL("/chats", request.url));
    }

    return NextResponse.next();
}