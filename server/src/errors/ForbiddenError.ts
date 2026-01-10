import CustomError from "./CustomError.js";

export class Forbidden extends CustomError {
    constructor () {
        super("Forbidden request", 403, "FORBIDDEN")
        Object.setPrototypeOf(this, Forbidden.prototype)
    }
}