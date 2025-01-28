export class JWTPayload {
    userId: string;
    email: string;
    issuedAt: Date;
    expiresAt: Date;

    constructor(payload: any) {
        this.userId = payload.userId;
        this.email = payload.sub;
        this.issuedAt = new Date(payload.iat * 1000);
        this.expiresAt = new Date(payload.exp * 1000);
    }

    isExpired(): boolean {
        return new Date() > this.expiresAt;
    }

    getRemainingTime(): number {
        return Math.max(0, this.expiresAt.getTime() - new Date().getTime());
    }
}
