import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {getUserIdFromToken} from "@/lib/auth";

interface ChannelUpdateRequest {
    requesterId: string;
    name?: string;
    description?: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ channelId: string }> }) {
    const id = (await (params)).channelId;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${process.env.APP_URL}/channels/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Promise<{ channelId: string }>> }) {
    const channelId = (await (params)).channelId;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const initiatorId = await getUserIdFromToken(token);

    const response = await fetch(`${process.env.APP_URL}/channels/${channelId}?initiatorId=${initiatorId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    console.log(data)

    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json({ message: 'Channel deleted successfully' }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ channelId: string }> }) {
    const channelId = (await (params)).channelId;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: ChannelUpdateRequest = await request.json();
    body.requesterId = await getUserIdFromToken(token);

    const response = await fetch(`${process.env.APP_URL}/channels/${channelId}`, {
        method: 'PUT',
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

    return NextResponse.json(data, { status: 200 });
}