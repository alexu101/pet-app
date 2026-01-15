import { Provider } from "@prisma/client";
import { prisma } from "../../config/config.db.js";
import { ProvidersFilters, ProviderWithRelations } from "./provider.types.js";

const relations = {
    availability: true,
    services: true,
    bookings: true
}

export const providerRepository = {
    async getProviders(filters: ProvidersFilters): Promise<Provider[]> {
        return await prisma.provider.findMany({
            where: filters
        })
    },

    async getProviderByUserId(userId: number): Promise<Provider | null> {
        return await prisma.provider.findUnique({
            where: {
                userId
            }
        })
    },

    async getProviderByIdWithRelations(id: number): Promise<ProviderWithRelations | null> {
        return await prisma.provider.findUnique({
            where: {
                id
            },
            include: relations
        })
    }
}