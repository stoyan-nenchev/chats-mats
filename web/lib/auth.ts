import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (token: string | undefined): string | null => {
    if (!token) return null;

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded.userId;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
};
