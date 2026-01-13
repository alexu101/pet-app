import { Router } from "express";
import { addService, getProviders } from "./provider.controller.js";
import { authorize } from "../../middlewares/authorization.js";
import { requireCustomer, requireProvider } from "../../middlewares/requirePrivilege.js";
import { validate } from "../../middlewares/validatePayload.js";
import { validateGetProvidersSchema, validateProviderAddServiceSchema } from "./provider.validation.js";

const providerRouter = Router()

providerRouter.get("/", validate(validateGetProvidersSchema), authorize, requireCustomer, getProviders)
providerRouter.post("/:id/services", validate(validateProviderAddServiceSchema), authorize, requireProvider, addService)

export default providerRouter