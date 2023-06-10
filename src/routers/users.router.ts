import { Router } from "express";
import {
	createUserController,
	deleteUserController,
	listAllUserController,
	listOnlyUserController,
	updateUserController,
} from "../controllers/users.controller";
import {
	ensureTokenMiddleware,
	ensureValidTokenMiddleware,
	validateBodyMiddleware,
	validateEmailExistsMiddleware,
	validateUserExistMiddleware,
} from "../middlewares/users.middleware";
import {
    updatedUserSchema,
	userRequestSchema,
} from "../schemas/users.schema";

export const usersRoutes: Router = Router();

usersRoutes.post(
	"",
	validateEmailExistsMiddleware,
	validateBodyMiddleware(userRequestSchema),
	createUserController
);
usersRoutes.get("", ensureValidTokenMiddleware, listAllUserController);
usersRoutes.get(
	"/:id",
	validateUserExistMiddleware,
	ensureTokenMiddleware,
	listOnlyUserController
);
usersRoutes.patch(
	"/:id",
	validateUserExistMiddleware,
	ensureTokenMiddleware,
	validateBodyMiddleware(updatedUserSchema),
	validateEmailExistsMiddleware,
	updateUserController
);
usersRoutes.delete(
	"/:id",
	validateUserExistMiddleware,
	ensureTokenMiddleware,
	deleteUserController
);
