import { Provider } from "@prisma/client";
import { prisma } from "../../config/config.db.js";
import { ProvidersFilters } from "./provider.types.js";

export const providerRepository = {
    async getProviders(filters: ProvidersFilters): Promise<Provider[]> {
        return await prisma.provider.findMany({
            where: filters
        })
    }
}