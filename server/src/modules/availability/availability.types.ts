import { WeekDay } from "@prisma/client";

export interface AvailabilityCreationPayload {
    weekDay: WeekDay
    startTime: Date
    endTime: Date
}