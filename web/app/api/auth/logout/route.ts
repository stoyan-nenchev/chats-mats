import { redirect } from 'next/navigation'
import {cookies} from "next/headers";

export async function GET(request: Request) {
    (await cookies()).delete('token')
    redirect('/')
}