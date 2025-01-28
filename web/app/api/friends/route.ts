import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {getUserIdFromToken} from "@/lib/auth";

interface FriendRequest {
    senderId: string;
    receiverId: string;
}

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);
    const response = await fetch(`${process.env.BACKEND_URL}/friends/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: FriendRequest = await request.json();
    body.senderId = await getUserIdFromToken(token);

    const response = await fetch(`${process.env.BACKEND_URL}/friends/add`, {
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

export async function DELETE(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: FriendRequest = await request.json();

    const response = await fetch(`${process.env.BACKEND_URL}/friends/remove`, {
        method: 'DELETE',
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

    return NextResponse.json({ message: 'Friend removed successfully' }, { status: 200 });
}
