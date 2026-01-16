import { Request, Response, NextFunction } from "express";
import { ProviderRelations, ProvidersFilters, ProviderWithRelations } from "./provider.types.js";
import { providerRepository } from "./provider.repository.js";
import ApiResponse from "../../types/apiResponse.types.js";
import { Availability, Provider, Service } from "@prisma/client";
import { ServiceCreationPayload } from "../service/service.types.js";
import { serviceRepository } from "../service/service.repository.js";
import { AvailabilityCreationPayload } from "../availability/availability.types.js";
import { availabilityRepository } from "../availability/availability.repository.js";

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
        const providerId = req.provider?.id as number
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

export const addAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providerId = req.provider?.id as number
        const availabilityPayload = req.body as AvailabilityCreationPayload

        const startTime = new Date(`1970-01-01T${availabilityPayload.startTime}:00Z`)
        const endTime = new Date(`1970-01-01T${availabilityPayload.endTime}:00Z`)

        const availabilityData = {
            weekDay: availabilityPayload.weekDay,
            providerId,
            startTime,
            endTime
        }

        const newAvailability = await availabilityRepository.createAvailability(availabilityData)

        if(!newAvailability)
            throw new Error(`Availability for provider with id: ${providerId}, could not be added`)

        const relations: ProviderRelations = {
            availability: true
        }

        const providerAvailability = await availabilityRepository.getAllAvailabilityByProviderId(providerId)

        const response: ApiResponse<Availability[]> = {
            success: true,
            message: `Availability added successfully to provider with id: ${providerId}`,
            data: providerAvailability
        }

        res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

export const getProviderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string)
        const relationsFilters = req.queryParams as ProviderRelations

        const provider = await providerRepository.getProviderById(id, relationsFilters)

        if(!provider)
            throw new Error("Provider could not be retrieved")

        const response: ApiResponse<ProviderWithRelations> = {
            success: true,
            message: "Provider retrieved successfully",
            data: provider
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }
}