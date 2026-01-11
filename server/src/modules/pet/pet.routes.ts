import { Router } from "express";
import { createPet, updatePet } from "./pet.controller.js";
import { authorize } from "../../middlewares/authorization.js";
import { requireCustomer } from "../../middlewares/requireCustomer.js";
import { validate } from "../../middlewares/validatePayload.js";
import { petCreateValidationSchema, petUpdateValidationSchema } from "./pet.validation.js";

const petRouter = Router()

petRouter.post("/", validate(petCreateValidationSchema), authorize, requireCustomer, createPet)
petRouter.put("/:id", validate(petUpdateValidationSchema), authorize, requireCustomer, updatePet)

export default petRouter;