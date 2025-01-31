import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

interface UserUpdateRequest {
    name: string;
    email: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
        return NextResponse.json({ error: 'Missing user id.' }, { status: 401 });
    }

    const response = await fetch(`${process.env.APP_URL}/users/${id}`, {
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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: UserUpdateRequest = await request.json();

    const response = await fetch(`${process.env.APP_URL}/users/${id}`, {
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

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${process.env.APP_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}