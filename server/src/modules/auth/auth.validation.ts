import { z } from 'zod'

export const registerPayloadSchema = z.object({
    name: z.string().min(6, 'Name must be at least 6 characters'),
    email: z.email('Invalid email'),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(/.*[A-Z].*/, "Password must contain at least one uppercase character")
        .regex(/.*[^A-Za-z0-9].*/, "Password must contain at least one special character")
        .regex(/^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]+$/, "Password contains invalid characters"),
    passwordRetype: z.string(),
    role: z.enum(["CUSTOMER", "ADMIN", "PROVIDER"],'Role must be one of the following: ["CUSTOMER", "ADMIN", "PROVIDER"]').default("CUSTOMER"),
    phone: z.string().regex(/^(\+4|04)[0-9]{8,9}$/, 'Invalid Romanian phone number'),
    providerData: z.object({
        businessName: z.string().min(2, 'Business name must be at least 2 characters long').max(25, 'Business name must be at most 25 characters'),
        description: z.string().max(256, 'Description must be at most 256 characters long').optional(),
        address: z.string().min(1, 'Address is mandatory'),
        city: z.string().min(1, 'City is mandatory'),
        latitude: z.float64(),
        longitude: z.float64(),
        verfied: z.boolean().default(false),
        profileImage: z.base64url().optional()
    }).optional()
}).refine(data => data.password === data.passwordRetype, {
    error: "Passwords don't match",
    path: ["passwordRetype", "password"]
})