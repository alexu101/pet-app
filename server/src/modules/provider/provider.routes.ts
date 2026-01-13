import { Router } from "express";
import { getProviders } from "./provider.controller.js";
import { authorize } from "../../middlewares/authorization.js";
import { requireCustomer } from "../../middlewares/requireCustomer.js";
import { validate } from "../../middlewares/validatePayload.js";
import { validateGetProvidersSchema } from "./provider.validation.js";

const providerRouter = Router()

providerRouter.get("/", validate(validateGetProvidersSchema), authorize, requireCustomer, getProviders)

export default providerRouter