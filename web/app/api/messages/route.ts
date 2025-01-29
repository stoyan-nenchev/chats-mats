import { NextResponse } from 'next/server';
import {cookies} from "next/headers";

export async function POST(request: Request) {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messageRequest = await request.json();

    const response = await fetch(`${process.env.APP_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageRequest),
    });

    const data = await response.json();
    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json(data);
}