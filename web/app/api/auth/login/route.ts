import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const response = await fetch(`${process.env.APP_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    const cookieStore = await cookies()
    cookieStore.set({
        name: 'token',
        value: data.token,
        httpOnly: true,
        path: '/',
    })

    return NextResponse.json(
        { data },
        { status: 200 }
    );
}