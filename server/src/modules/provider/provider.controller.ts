import { Request, Response, NextFunction } from "express";
import { ProvidersFilters } from "./provider.types.js";
import { providerRepository } from "./provider.repository.js";
import ApiResponse from "../../types/apiResponse.types.js";
import { Provider } from "@prisma/client";

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