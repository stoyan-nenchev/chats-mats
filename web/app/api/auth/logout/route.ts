import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    (await cookies()).delete('token')
    return NextResponse.json({ success: true });
}