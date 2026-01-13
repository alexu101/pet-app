import { Router } from "express";
import { createPet, deletePet, getAllUserPets, getPetById, updatePet } from "./pet.controller.js";
import { authorize } from "../../middlewares/authorization.js";
import { requireCustomer } from "../../middlewares/requirePrivilege.js";
import { validate } from "../../middlewares/validatePayload.js";
import { getPetValidationSchema, petCreateValidationSchema, petDeleteValidationSchema, petUpdateValidationSchema } from "./pet.validation.js";

const petRouter = Router()

petRouter.post("/", validate(petCreateValidationSchema), authorize, requireCustomer, createPet)
petRouter.put("/:id", validate(petUpdateValidationSchema), authorize, requireCustomer, updatePet)
petRouter.delete("/:id", validate(petDeleteValidationSchema), authorize, requireCustomer, deletePet)
petRouter.get("/", authorize, requireCustomer, getAllUserPets)
petRouter.get("/:id", validate(getPetValidationSchema), authorize, requireCustomer, getPetById)

export default petRouter;