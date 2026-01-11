import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { validate } from "../../middlewares/validatePayload.js";
import { loginValidationSchema, registerValidationSchema } from "./auth.validation.js";

const authRouter = Router();

authRouter.post("/register", validate(registerValidationSchema), register)
authRouter.post("/login", validate(loginValidationSchema), login)

export default authRouter