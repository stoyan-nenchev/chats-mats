import { NextResponse } from 'next/server';
import {cookies} from "next/headers";

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    const { userId } = params;
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/messages/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json(data);
}
