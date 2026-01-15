import { Availability } from "@prisma/client";
import { prisma } from "../../config/config.db.js";
import { AvailabilityCreationPayload } from "./availability.types.js";

export const availabilityRepo = {
    async createAvailability(data: AvailabilityCreationPayload & {providerId: number}): Promise<Availability | null> {
        return prisma.availability.create({
            data
        })
    }
}