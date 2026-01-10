import CustomError from "./CustomError.js";

export class BadRequest extends CustomError {
    constructor () {
        super("Bad request. Potentially malformed request", 400, "BAD_REQUEST")
        Object.setPrototypeOf(this, BadRequest.prototype)
    }
}