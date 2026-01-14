import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaDriverAdapterError } from "../types/prisma.types.js";

const defaultMessage = "Prisma Client Known Request Error"

export const parseUniqueConstraintError = (err: PrismaClientKnownRequestError): string => {
    const errorMeta = err.meta

    if(!errorMeta)
        return defaultMessage

    const driverError = errorMeta.driverAdapterError as PrismaDriverAdapterError
    const constraint: Record<"fields", string[]> = driverError.cause.constraint
    const fields = constraint.fields
    const parsedErrorMessage = `${fields.length > 1 ? "The combination of following properties" : "Property"} { ${fields.join(", ").replaceAll('"','')} } must be unique`

    return parsedErrorMessage
}