import { Request, Response, NextFunction } from "express"
import { PetCreationPayload, PetUpdatePayload } from "./pet.types.js"
import { petRepository } from "./pet.repository.js"
import { Unauthorized } from "../../errors/UnauthorizedError.js"
import ApiResponse from "../../types/apiResponse.types.js"
import { Pet } from "@prisma/client"

export const createPet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as PetCreationPayload
        const customerId = req.customer?.id

        if(!customerId)
            throw new Unauthorized()

        const petData = {
            ...payload,
            ownerId: customerId
        }

        const newPet = await petRepository.createPet(petData)

        if(!newPet)
            throw new Error("Pet creation failed")

        const response: ApiResponse<Pet> = {
            success: true,
            message: "Pet added successfully",
            data: newPet
        }

        res.status(201).json(response)
    } catch(err) {
        next(err)
    }
}

export const updatePet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const petId = parseInt(req.params.id as string)
        const ownerId = req.customer?.id
        const petUpdates = req.body as PetUpdatePayload

        if(!ownerId)
            throw new Unauthorized()

        const ownsPet = await petRepository.getPetByIdAndOwner(petId, ownerId)

        if(!ownsPet)
            throw new Unauthorized()

        const updatedPet = await petRepository.updatePet(petUpdates, petId)

        if(!updatedPet)
            throw new Error("Pet could not be updated")

        const response: ApiResponse<Pet> = {
            success: true,
            message: "Pet updated successfully",
            data: updatedPet
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }
}