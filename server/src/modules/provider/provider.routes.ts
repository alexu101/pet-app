import { Router } from "express";
import { addWorkingSchedule, addService, getProviderById, getProviders } from "./provider.controller.js";
import { authorize } from "../../middlewares/authorization.js";
import { requireCustomer, requireProvider } from "../../middlewares/requirePrivilege.js";
import { validate } from "../../middlewares/validatePayload.js";
import { validateGetProviderByIdSchema, validateGetProvidersSchema, validateProviderAddWorkingScheduleSchema, validateProviderAddServiceSchema } from "./provider.validation.js";

const providerRouter = Router()

providerRouter.get("/", validate(validateGetProvidersSchema), authorize, requireCustomer, getProviders)
providerRouter.get("/:id", validate(validateGetProviderByIdSchema), authorize, requireCustomer, getProviderById)
providerRouter.post("/services", validate(validateProviderAddServiceSchema), authorize, requireProvider, addService)
providerRouter.post("/workingSchedule", validate(validateProviderAddWorkingScheduleSchema), authorize, requireProvider, addWorkingSchedule)
providerRouter.post("/:id/availability")

export default providerRouter