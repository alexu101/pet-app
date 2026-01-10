import { prisma } from "../../config/config.db.js"
import { Role, User } from "../../generated/client.js"
import { AuthRegisterPayload } from "../auth/auth.types.js"
import { UserWithRelations } from "./user.types.js"

export const userRepository = {
    async getUserByEmail(email: string): Promise<UserWithRelations | null> {
        return await prisma.user.findUnique({
            where: {
                email
            },
            omit: {
                password: true
            }
        })
    },

    async createUser(
        email: string,
        name: string,
        password: string,
        role: Role,
        phone: string
    ):  Promise<UserWithRelations | null> {
        return prisma.user.create({
            data: {
                email,
                name,
                password,
                role,
                phone
            },
            omit: {
                password: true
            }
        })
    }
}