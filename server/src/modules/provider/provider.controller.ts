import { Request, Response, NextFunction } from "express";
import { ProvidersFilters } from "./provider.types.js";
import { providerRepository } from "./provider.repository.js";
import ApiResponse from "../../types/apiResponse.types.js";
import { Provider, Service } from "@prisma/client";
import { ServiceCreationPayload } from "../service/service.types.js";
import { serviceRepository } from "../service/service.repository.js";

export const getProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filters = req.queryParams as ProvidersFilters

        console.log(filters)

        const providers = await providerRepository.getProviders(filters)

        const response: ApiResponse<Provider[]> = {
            success: true,
            message: "Providers retrieved successfully",
            data: providers
        }

        res.status(200).json(response)

    } catch(err) {
        next(err)
    }
}

export const addService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providerId = parseInt(req.params.id as string)
        const servicePayload = req.body as ServiceCreationPayload

        const serviceData = {
            ...servicePayload,
            providerId
        }

        const service = await serviceRepository.createService(serviceData)

        if(!service)
            throw new Error(`Service for provider with id: ${providerId}, could not be added`)

        const response: ApiResponse<Service> = {
            success: true,
            message: `Service added successfully to provider with id: ${providerId}`,
            data: service
        }

        res.status(201).json(response)
    } catch(err) {
        next(err)
    }
}