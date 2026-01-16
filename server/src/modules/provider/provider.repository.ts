import { Provider } from "@prisma/client";
import { prisma } from "../../config/config.db.js";
import { ProviderRelations, ProvidersFilters, ProviderWithRelations } from "./provider.types.js";

export const providerRepository = {
    async getProviders(filters: ProvidersFilters): Promise<Provider[]> {
        return prisma.provider.findMany({
            where: filters
        })
    },

    async getProviderByUserId(userId: number): Promise<Provider | null> {
        return prisma.provider.findUnique({
            where: {
                userId
            }
        })
    },

    async getProviderById(id: number, relations: ProviderRelations ): Promise<ProviderWithRelations | null> {
        return prisma.provider.findUnique({
            where: {
                id
            },
            include: relations
        })
    }
}