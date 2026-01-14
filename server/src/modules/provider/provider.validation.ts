import z from "zod";

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
    }),
    params: z.object({
        id: z.coerce.number().int()
    })
})