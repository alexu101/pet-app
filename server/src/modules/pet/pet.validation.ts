import z from "zod";

export const petCreateValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name must be at least 1 character long').max(30, 'Name must be at least 30 characters long'),
        type: z.enum(["DOG", "CAT", "BIRD", "OTHER"], "Pet must be one of these types: ['CAT', 'DOG', 'BIRD', 'OTHER']").default("DOG"),
        age: z.int().min(1, "Age must be at least 1 (years)").max(150, "Age must be at most 150 (years)").optional(),
        breed: z.string().max(30, "Breed name must be at most 30 characters long").optional(),
        weight: z.float32().min(0, "Weight must be higher than 0 (kgs)").optional(),
        notes: z.string().min(0, "Notes cannot be empty").max(256, "Notes cannot be longer than 256 characters").optional()
    })
})

export const petUpdateValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name must be at least 1 character long').max(30, 'Name must be at least 30 characters long').optional(),
        type: z.enum(["DOG", "CAT", "BIRD", "OTHER"], "Pet must be one of these types: ['CAT', 'DOG', 'BIRD', 'OTHER']").optional(),
        age: z.int().min(1, "Age must be at least 1 (years)").max(150, "Age must be at most 150 (years)").optional(),
        breed: z.string().max(30, "Breed name must be at most 30 characters long").optional(),
        weight: z.float32().min(0, "Weight must be higher than 0 (kgs)").optional(),
        notes: z.string().min(0, "Notes cannot be empty").max(256, "Notes cannot be longer than 256 characters").optional()
    }),
    params: z.object({
        id: z.coerce.number().int().positive()
    })
})

export const petDeleteValidationSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    })
})

export const getPetValidationSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    })
})