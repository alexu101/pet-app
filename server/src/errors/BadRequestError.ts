import CustomError from "./CustomError.js";

export class BadRequest extends CustomError {
    constructor (message: string) {
        super(message, 400, "BAD_REQUEST")
        Object.setPrototypeOf(this, BadRequest.prototype)
    }
}