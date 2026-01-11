import { Response, Request, NextFunction } from "express";
import { Unauthorized } from "../errors/UnauthorizedError.js";
import { TokenPayload, UserClaims } from "../modules/auth/auth.types.js";
import jwt  from 'jsonwebtoken'
import { jwtSecret } from "../config/config.env.js";

const isTokenPayload = (payload: any): payload is TokenPayload => {
    if (typeof payload !== 'object' || payload == null)
        return false

    const obj = payload as Record<string, any>

    return (
        typeof obj.sub === 'number' &&
        typeof obj.role === 'string'
    )
}

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if(!token)
            throw new Unauthorized()

        const decoded = jwt.verify(token, jwtSecret)

        if(!isTokenPayload(decoded))
            throw new Unauthorized()

        const tokenPayload = decoded as TokenPayload

        const claims: UserClaims = {
            userId: tokenPayload.sub,
            userRole: tokenPayload.role
        }

        req.claims = claims

        next()
    } catch(err) {
        next(err)
    }
}