"use server"

import {jwtDecode} from "jwt-decode";
import {JWTPayload} from '@/lib/jwtPayload';

export async function getUserIdFromToken(token: string): Promise<string> {
    try {
        const decoded = jwtDecode(token)
        const jwtPayload = new JWTPayload(decoded)
        return jwtPayload.userId;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return "invalidUid";
    }
}

