import { Prisma } from "@prisma/client";

export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        provider: true,
        customer: true
    },
    omit: {
        password: true
    }
}>

export type UserWithRelationsAuth = Prisma.UserGetPayload<{
    include: {
        provider: true,
        customer: true
    }
}>