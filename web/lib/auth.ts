"use server"

import jwt from 'jsonwebtoken';

export async function getUserIdFromToken(token: string | undefined): Promise<string | null> {
    if (!token) return null;

    try {
        const decoded: any = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

        return decoded.userId;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
};

