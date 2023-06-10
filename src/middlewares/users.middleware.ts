import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { ZodTypeAny } from "zod";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { AppDataSource } from "../data-source";
import { UserRequiredKeys } from "../interfaces/users.interface";
import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken"

export const validateUserExistMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { id } = request.params;

	if (!parseInt(id)) {
		throw new AppError("Params 'id' must be a number!", 400);
	}

	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const findUser = await userRepository.findOne({
		where: {
			id: parseInt(id),
		},
	});

	if (!findUser) {
		throw new AppError("User not found", 404);
	}

	return next();
};

export const validateEmailExistsMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { email } = request.body;

	const payloadKeys: string[] = Object.keys(request.body);
	const requiredKeys: UserRequiredKeys[] = ["name", "email", "password"];

	const filteredKeys: string[] = requiredKeys.filter(
		(elem) => !payloadKeys.includes(elem)
	);

	const hasRequiredKeys: boolean = requiredKeys.some((key: any) =>
		payloadKeys.includes(key)
	);

	if (!hasRequiredKeys) {
		throw new AppError(
			"At least one of those keys must be send: (name, email or password)",
			400
		);
	}

	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	if (email) {
		const findEmailUser = await userRepository.findOne({
			where: {
				email: email,
			},
		});

		if (findEmailUser) {
			throw new AppError("Email already exists", 409);
		}
	}

	return next();
};

export const validateBodyMiddleware =
	(schema: ZodTypeAny) =>
	(request: Request, response: Response, next: NextFunction): void => {
		const validated = schema.parse(request.body);

		request.body = validated;

		return next();
	};

export const ensureTokenMiddleware = (
	request: Request,
	response: Response,
	next: NextFunction
): void => {
	const authToken: any = request.headers.authorization;

	if (!authToken) {
		throw new AppError("Missing bearer token", 401);
	}

	const token: string = authToken.split(" ")[1];

	return verify(token, process.env.SECRET_KEY!, async (error, decoded: any) => {
		if (error) {
			throw new AppError(error.message, 401);
		}

		const userID: number = parseInt(response.locals.userId);
		const userRepository: Repository<User> = AppDataSource.getRepository(User);

		const findUser = await userRepository.findOne({
			where: {
				id: decoded.sub,
			},
		});

		if (findUser?.id !== userID) {
			throw new AppError("Insufficient permission", 403);
		}
		return next();
	});
};

export const ensureValidTokenMiddleware = (
	request: Request,
	response: Response,
	next: NextFunction
): void => {
	const authToken: any = request.headers.authorization;

	if (!authToken) {
		throw new AppError("Missing bearer token", 401);
	}

	const token: string = authToken.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
        if (error) {
            return response.status(401).json({
                message: "invalid token"
            })
        }

        response.locals.userId = decoded.sub

        return next()
    })
};


