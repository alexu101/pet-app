import CustomError from "./CustomError.js";

export class ResourceConflict extends CustomError {
    constructor (message: string) {
        super(message, 409, "CONFLICT")
        Object.setPrototypeOf(this, ResourceConflict.prototype)
    }
}