import { Request, Response } from "express";
import { iLogin } from "../interfaces/login.interface";
import { createLoginService } from "../services/login/createLogin.service";

export const createLoginController = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const loginData: iLogin = request.body;

	const token = await createLoginService(loginData);

	return response.json({
		token: token,
	});
};
