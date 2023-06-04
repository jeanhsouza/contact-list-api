import { Router } from "express";
import {
	createContactController,
	deleteContactController,
	listAllContactController,
	updateContactController,
} from "../controllers/contacts.controller";
import {
	ensureTokenMiddleware,
	validateBodyMiddleware
} from "../middlewares/users.middleware";
import {
    updatedContactSchema,
	contactRequestSchema,
} from "../schemas/contacts.schema";
import { validateContactExistMiddleware } from "../middlewares/contacts.middleware";

export const contactsRoutes: Router = Router();

contactsRoutes.post(
	"",
	validateBodyMiddleware(contactRequestSchema),
	createContactController
);

contactsRoutes.get("", ensureTokenMiddleware, listAllContactController);

contactsRoutes.patch(
	"/:id",
	validateContactExistMiddleware,
	ensureTokenMiddleware,
	validateBodyMiddleware(updatedContactSchema),
	updateContactController
);

contactsRoutes.delete(
	"/:id",
	validateContactExistMiddleware,
	ensureTokenMiddleware,
	deleteContactController
);
