import CustomError from "./CustomError.js";

export class Unauthorized extends CustomError {
    constructor () {
        super("Not authorized to perform this action", 401, "UNAUTHORIZED")
        Object.setPrototypeOf(this, Unauthorized.prototype)
    }
}