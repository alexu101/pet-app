import CustomError from "./CustomError.js";

export class NotFound extends CustomError {
    constructor (message: string) {
        super(message, 404, "NOT_FOUND")
        Object.setPrototypeOf(this, NotFound.prototype)
    }
}