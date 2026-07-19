import crypto from "crypto"
export class RefreshTokenHashService{
     hash(token: string): string {
        const hash = crypto.createHash('sha256').update(token).digest('hex')
        return hash
    }
}