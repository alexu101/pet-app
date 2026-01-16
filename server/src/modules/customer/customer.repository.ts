import { Customer } from "@prisma/client";
import { prisma } from "../../config/config.db.js";

export const customerRepository = {
    async getCustomerByUserId(userId: number): Promise<Customer | null> {
        return prisma.customer.findUnique({
            where: {
                userId
            }
        })
    }
}