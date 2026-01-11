import { Animal } from "@prisma/client";

export interface PetCreationPayload {
    name: string
    type: Animal
    age?: number
    breed?: string
    weight?: number
    notes?: string
}