import { Router } from "express";
import { addAvailability, addService, getProviders } from "./provider.controller.js";
import { authorize } from "../../middlewares/authorization.js";
import { requireCustomer, requireProvider } from "../../middlewares/requirePrivilege.js";
import { validate } from "../../middlewares/validatePayload.js";
import { validateGetProvidersSchema, validateProviderAddAvailabilitySchema, validateProviderAddServiceSchema } from "./provider.validation.js";

const providerRouter = Router()

providerRouter.get("/", validate(validateGetProvidersSchema), authorize, requireCustomer, getProviders)
providerRouter.post("/services", validate(validateProviderAddServiceSchema), authorize, requireProvider, addService)
providerRouter.post("/availability", validate(validateProviderAddAvailabilitySchema), authorize, requireProvider, addAvailability)

export default providerRouter