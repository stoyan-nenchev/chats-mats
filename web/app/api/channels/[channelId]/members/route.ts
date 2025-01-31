import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {getUserIdFromToken} from "@/lib/auth";

interface ChannelMemberRequest {
    memberId: string;
    requesterId: string;
    role: string;
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ channelId: string }> }) {
    const channelId = (await (params)).channelId;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: ChannelMemberRequest = await request.json();
    body.requesterId = await getUserIdFromToken(token);

    const response = await fetch(`${process.env.APP_URL}/channels/${channelId}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data)

    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ channelId: string }> }) {
    const channelId = (await (params)).channelId;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: ChannelMemberRequest = await request.json();
    body.requesterId = await getUserIdFromToken(token);

    const response = await fetch(`${process.env.APP_URL}/channels/${channelId}/members`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data)

    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ channelId: string }> }) {
    const channelId = (await (params)).channelId;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: ChannelMemberRequest = await request.json();

    const response = await fetch(`${process.env.APP_URL}/channels/${channelId}/members`, {
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

    return NextResponse.json(data, { status: 200 });
}