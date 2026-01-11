import { UserWithRelations } from "../user/user.types.js"

export interface AuthRegisterPayload {
    name: string,
    email: string,
    password: string,
    passwordRetype: string,
    role: string,
    phone: string,
    providerData?: ProviderData
}

export interface AuthLoginPayload {
    email: string,
    password: string
}

export interface ProviderData {
    businessName: string,
    description?: string
    address: string,
    city: string,
    latitude: number,
    longitude: number,
    verified: boolean
    profileImage?: string
}

export interface TokenPayload {
    sub: number
    role: string
}

export interface AuthResponse {
    user: UserWithRelations,
    token: string
}

export interface UserClaims {
    userId: number,
    userRole: string
}