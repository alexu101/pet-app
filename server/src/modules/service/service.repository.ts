import { Service } from "@prisma/client";
import { ServiceCreationPayload } from "./service.types.js";
import { prisma } from "../../config/config.db.js";

export const serviceRepository = {
    async createService(payload: ServiceCreationPayload & {providerId: number}): Promise<Service | null> {
        return prisma.service.create({
            data: payload
        })
    },
    async getMultipleServicesByIds(ids: number[]): Promise<Service[]> {
        return prisma.service.findMany({
            where: {
                id: {in : ids}
            }
        })
    }
}