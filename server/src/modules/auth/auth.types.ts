export interface AuthRegisterPayload {
    name: string,
    email: string,
    password: string,
    passwordRetype: string,
    role: string,
    phone: string,
    providerData?: {
        businessName: string,
        description?: string
        address: string,
        city: string,
        latitude: string,
        longitude: string,
        verified: boolean
        profileImage?: string
    }
}

export interface TokenPayload {
    sub: string
    role: string
}