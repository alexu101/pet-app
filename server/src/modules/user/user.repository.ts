import { prisma } from "../../config/config.db.js"
import { Role, User } from "@prisma/client"
import { AuthRegisterPayload, ProviderData } from "../auth/auth.types.js"
import { UserWithRelations, UserWithRelationsAuth } from "./user.types.js"

const relations = {
    provider: true,
    customer: true
}

export const userRepository = {
    async getUserByEmail(email: string): Promise<UserWithRelations | null> {
        return await prisma.user.findUnique({
            where: {
                email
            },
            omit: {
                password: true
            },
            include: relations
        })
    },

    async getUserByEmailAuth(email: string): Promise<UserWithRelationsAuth | null> {
        return await prisma.user.findUnique({
            where: {
                email
            },
            include: relations
        })
    },

    async createUser(
        email: string,
        name: string,
        password: string,
        role: Role,
        phone: string,
        providerData: ProviderData | undefined
    ):  Promise<UserWithRelations | null> {
        return prisma.user.create({
            data: {
                email,
                name,
                password,
                role,
                phone,
                ...(role === "CUSTOMER" && {
                    customer: {
                        create: {}
                    }
                }),
                ...(providerData && role === "PROVIDER" && {
                    provider: {
                        create: providerData
                    }
                })
            },
            omit: {
                password: true
            },
            include: relations
        })
    }
}