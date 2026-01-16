import z from "zod";

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/

export const validateGetProvidersSchema = z.object({
    query: z.object({
        city: z.string().min(3,"City must be at least 3 characters").optional()
    }).optional()
})

export const validateProviderAddServiceSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Service name is required"),
        price: z.float32(),
        duration: z.number().int().min(0, "Duration must be at least 1 minute"),
        active: z.boolean().default(true)
    })
})

export const validateProviderAddAvailabilitySchema = z.object({
    body: z.object({
        weekDay: z.enum([
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY"
        ], 'Weekday must be a value from: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]'),
        startTime: z.string().regex(timeRegex, "Invalid time format. Use HH:MM or HH:MM:SS"),
        endTime: z.string().regex(timeRegex, "Invalid time format. Use HH:MM or HH:MM:SS"),
    }).refine(data => data.startTime < data.endTime, {
        message: "End time must be after start time",
        path: ["startTime", "endTime"]
    })
})

export const validateGetProviderByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int()
    }),
    query: z.object({
        services: z.literal("true", "Services filter can be true or non existent").transform(()=> true).optional(),
        availability: z.literal("true", "Availability filter can be true or non existent").transform(()=> true).optional(),
        bookings: z.literal("true", "Bookings filter can be true or non existent").transform(()=> true).optional()
    })
})