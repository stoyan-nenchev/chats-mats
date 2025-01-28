import { getUserIdFromToken } from "@/lib/auth";
import {cookies} from "next/headers";
import { type NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return NextResponse.json({ error: "No token provided." }, { status: 401 });
    }

    const userId = await getUserIdFromToken(token);

    if (!userId) {
        return NextResponse.json({ error: "Invalid or expired token." }, { status: 403 });
    }

    return NextResponse.json({ success: true, userId });
}