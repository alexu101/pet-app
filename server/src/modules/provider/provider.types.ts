import { Prisma } from "@prisma/client"

export interface ProvidersFilters {
    city: string,
    serviceIds: number[]
}

export type ProviderWithRelations = Prisma.ProviderGetPayload<{
    include: {
        workingSchedule?: true
        services?: true,
        bookings?: true
    }
}>

export interface ProviderRelations {
    workingSchedule?: true,
    services?: true,
    bookings?: true
}
