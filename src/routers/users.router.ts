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
	"/profile",
	ensureValidTokenMiddleware,
	ensureTokenMiddleware,
	listOnlyUserController
);
usersRoutes.patch(
	"",
	ensureValidTokenMiddleware,
	ensureTokenMiddleware,
	validateBodyMiddleware(updatedUserSchema),
	validateEmailExistsMiddleware,
	updateUserController
);
usersRoutes.delete(
	"",
	ensureValidTokenMiddleware,
	ensureTokenMiddleware,
	deleteUserController
);
