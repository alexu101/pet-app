import { Prisma } from "@prisma/client"

export interface ProvidersFilters {
    city?: string
}

export type ProviderWithRelations = Prisma.ProviderGetPayload<{
    include: {
        availability?: true
        services?: true,
        bookings?: true
    }
}>

export interface ProviderRelations {
    availability?: true,
    services?: true,
    bookings?: true
}
