import { Customer } from "@prisma/client";
import { UserClaims } from "../modules/auth/auth.types.js";

declare global {
    namespace Express {
        interface Request {
            claims?: UserClaims
            customer?: Customer
            queryParams?: Record<string, any>
        }
    }
}