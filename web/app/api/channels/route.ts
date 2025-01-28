import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {getUserIdFromToken} from "@/lib/auth";

interface ChannelCreateRequest {
    requesterId: string;
    name: string;
    description: string;
}

interface ChannelsResponse {
    id: string;
    name: string;
    isOwner: boolean;
}

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const response = await fetch(`${process.env.BACKEND_URL}/channels/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        return NextResponse.json({ error: response.statusText }, { status: response.status });
    }

    const data: ChannelsResponse = await response.json();

    return NextResponse.json(data, { status: 201 });
}

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = await getUserIdFromToken(token);
    const body: ChannelCreateRequest = await request.json();
    body.requesterId = userId!;

    const response = await fetch(`${process.env.BACKEND_URL}/channels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
}
