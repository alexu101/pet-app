import { Request, Response, NextFunction } from "express"
import { PetCreationPayload } from "./pet.types.js"
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