import { Router } from "express";
import { register } from "./auth.controller.js";
import { validate } from "../../middlewares/validatePayload.js";
import { registerPayloadSchema } from "./auth.validation.js";

const authRouter = Router();

authRouter.post("/register", validate(registerPayloadSchema), register)
// authRouter.post("/login")

export default authRouter