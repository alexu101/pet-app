import { Router } from "express";
import { createPet } from "./pet.controller.js";
import { authorize } from "../../middlewares/authorization.js";
import { requireCustomer } from "../../middlewares/requireCustomer.js";
import { validate } from "../../middlewares/validatePayload.js";
import { petValidationSchema } from "./pet.validation.js";

const petRouter = Router()

petRouter.post("/", validate(petValidationSchema), authorize, requireCustomer, createPet)

export default petRouter;