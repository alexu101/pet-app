import { WorkingSchedule } from "@prisma/client";
import { prisma } from "../../config/config.db.js";
import { WorkingScheduleCreationPayload } from "./workingSchedule.types.js";

export const workingScheduleRepository = {
    async createWorkingSchedule(data: WorkingScheduleCreationPayload & {providerId: number}): Promise<WorkingSchedule | null> {
        return prisma.workingSchedule.create({
            data
        })
    },

    async getAllWorkingScheduleByProviderId(providerId: number): Promise<WorkingSchedule[]> {
        return prisma.workingSchedule.findMany({
            where: {
                providerId
            }
        })
    }
}