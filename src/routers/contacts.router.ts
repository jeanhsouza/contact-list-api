import { Router } from "express";
import {
	createContactController,
	deleteContactController,
	listAllContactController,
	updateContactController,
} from "../controllers/contacts.controller";
import {
	ensureTokenMiddleware,
	ensureValidTokenMiddleware,
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
	ensureValidTokenMiddleware,
	validateBodyMiddleware(contactRequestSchema),
	createContactController
);

contactsRoutes.get("", ensureValidTokenMiddleware, listAllContactController);

contactsRoutes.patch(
	"/:id",
	validateContactExistMiddleware,
	ensureValidTokenMiddleware,
	validateBodyMiddleware(updatedContactSchema),
	updateContactController
);

contactsRoutes.delete(
	"/:id",
	validateContactExistMiddleware,
	ensureValidTokenMiddleware,
	deleteContactController
);
