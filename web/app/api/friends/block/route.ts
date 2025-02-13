import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {getUserIdFromToken} from "@/lib/auth";

interface FriendRequest {
    senderId: string;
    receiverId: string;
}

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: FriendRequest = await request.json();
    body.senderId = await getUserIdFromToken(token);

    const response = await fetch(`${process.env.APP_URL}/friends/block`, {
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

    return NextResponse.json(data, { status: 200 });
}