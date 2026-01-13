import z from "zod";

export const validateGetProvidersSchema = z.object({
    query: z.object({
        city: z.string().min(3,"City must be at least 3 characters").optional()
    }).optional()
})