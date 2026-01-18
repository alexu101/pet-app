import { BookingStatus } from "@prisma/client"

export interface BookingCreationPayload {
    date: Date
    startTime: Date
    endTime: Date
    status: BookingStatus
    total: number
}

export interface BookingTime {
    startTime: Date,
    endTime: Date
}