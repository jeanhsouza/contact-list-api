import { Request, Response } from "express";
import { iUpdatedUser, iUserRequest } from "../interfaces/users.interface";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listAllUsersService } from "../services/users/listAllUsers.service";
import { listOnlyUserService } from "../services/users/listOnlyUser.service";
import { updateUserService } from "../services/users/updateUser.service";

export const createUserController = async (
	request: Request,
	response: Response
) => {
	const userData: iUserRequest = request.body;

	const newUser = await createUserService(userData);

	return response.status(201).json(newUser);
};

export const listAllUserController = async (
	request: Request,
	response: Response
) => {
	const allUsers = await listAllUsersService(request);

	return response.json(allUsers);
};

export const listOnlyUserController = async (
	request: Request,
	response: Response
) => {
	const idUser = parseInt(request.params.id);

	const onlyUser = await listOnlyUserService(idUser);

	return response.status(200).json(onlyUser);
};

export const deleteUserController = async (
	request: Request,
	response: Response
) => {
	const idUser = parseInt(request.params.id);

	await deleteUserService(idUser);

	return response.status(204).send();
};

export const updateUserController = async (
	request: Request,
	response: Response
) => {
	const userData: iUpdatedUser = request.body;
	const idUser = parseInt(request.params.id);

	const updatedUser = await updateUserService(userData, idUser);

	return response.json(updatedUser);
};
