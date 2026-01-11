import { Pet } from "@prisma/client";
import { prisma } from "../../config/config.db.js";
import { PetCreationPayload } from "./pet.types.js";

export const petRepository = {
    async createPet(petData: PetCreationPayload & {ownerId: number}): Promise<Pet> {
        return prisma.pet.create({
            data: petData
        })
    }
}