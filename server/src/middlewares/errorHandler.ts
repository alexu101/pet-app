import { NextFunction, Request, Response } from "express"
import CustomError from "../errors/CustomError.js"
import ApiResponse from "../types/apiResponse.types.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client"
import { parseUniqueConstraintError } from "../utils/parsePrismaErrorMessage.js"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let errorType = "INTERNAL_SERVER_ERROR"
    let errorMessage = err.message
    let errorStatusCode = 500;

    if (err instanceof CustomError) {
        errorType = err.type
        errorStatusCode = err.statusCode
    } else if(err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                errorMessage = parseUniqueConstraintError(err)
                break
            default:
                break
        }
    }

    const response: ApiResponse<null> = {
        success: false,
        message: errorMessage
    }

    res.status(errorStatusCode).json(response)
}