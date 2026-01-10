import CustomError from "./CustomError.js";

export class NotFound extends CustomError {
    constructor () {
        super("Resource not found", 404, "NOT_FOUND")
        Object.setPrototypeOf(this, NotFound.prototype)
    }
}