import { Pet } from "@prisma/client";
import { prisma } from "../../config/config.db.js";
import { PetCreationPayload, PetUpdatePayload } from "./pet.types.js";

export const petRepository = {
    async createPet(petData: PetCreationPayload & {ownerId: number}): Promise<Pet> {
        return prisma.pet.create({
            data: petData
        })
    },

    async getPetByIdAndOwner(petId: number, ownerId: number): Promise<Pet | null> {
        return prisma.pet.findFirst({
            where: {
                id: petId,
                ownerId
            }
        })
    },

    async updatePet(petUpdates: PetUpdatePayload, id: number): Promise<Pet | null> {
        return prisma.pet.update({
            where: {
                id
            },
            data: petUpdates
        })
    }
}