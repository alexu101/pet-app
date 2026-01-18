import { WeekDay } from "@prisma/client";

export interface WorkingScheduleCreationPayload {
    weekDay: WeekDay
    startTime: Date
    endTime: Date
}