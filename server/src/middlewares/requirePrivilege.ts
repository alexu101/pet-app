import { Request, Response, NextFunction } from "express";
import { customerRepository } from "../modules/customer/customer.repository.js";
import { Unauthorized } from "../errors/UnauthorizedError.js";
import { providerRepository } from "../modules/provider/provider.repository.js";

export const requireCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.claims?.userId

        if(!userId)
            throw new Unauthorized()

        const customer = await customerRepository.getCustomerByUserId(userId)

        if(!customer)
            throw new Error("Unable to identify user as a customer")

        req.customer = customer

        next()
    } catch(err) {
        next(err)
    }
}

export const requireProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.claims?.userId

        if(!userId)
            throw new Unauthorized()

        const provider = await providerRepository.getProviderByUserId(userId)

        if(!provider)
            throw new Error("Unable to identify user as a provider")

        req.provider = provider

        next()
    } catch(err) {
        next(err)
    }
}