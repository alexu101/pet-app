import jwt from 'jsonwebtoken'
import { TokenPayload } from './auth.types.js'
import { jwtSecret } from '../../config/config.env.js'

export const generateToken = (payload: TokenPayload): string => {
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: '7d'
    })

    return token
}