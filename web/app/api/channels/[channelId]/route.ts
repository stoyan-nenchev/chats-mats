import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

interface ChannelUpdateRequest {
    name?: string;
    description?: string;
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Promise<{ channelId: string }>> }) {
    const channelId = (await (params)).channelId;

    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const initiatorId = url.searchParams.get('initiatorId');

    const response = await fetch(`${process.env.BACKEND_URL}/channels/${channelId}?initiatorId=${initiatorId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json({ message: 'Channel deleted successfully' }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ channelId: string }> }) {
    const channelId = (await (params)).channelId;

    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: ChannelUpdateRequest = await request.json();

    const response = await fetch(`${process.env.BACKEND_URL}/channels/${channelId}`, {
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