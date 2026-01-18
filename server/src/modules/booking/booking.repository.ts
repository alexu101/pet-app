import { Booking } from "@prisma/client";
import { BookingCreationPayload } from "./booking.types.js";
import { prisma } from "../../config/config.db.js";

export const bookingRepository = {
    async createBooking (bookingPayload: BookingCreationPayload & {
        petId: number,
        providerId: number,
        customerId: number
    }): Promise<Booking | null> {
        return prisma.booking.create({
            data: bookingPayload
        })
    },

    async getBookingsByProviderIdAndDate(providerId: number, date: Date) {
        return prisma.booking.findMany({
            where: {
                providerId,
                date
            },
            orderBy: {
                updatedAt: 'asc'
            }
        })
    }
}