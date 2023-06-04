import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { Repository } from "typeorm";
import { Contact } from "../entities/contacts.entity";
import { AppDataSource } from "../data-source";

export const validateContactExistMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { id } = request.params;

	if (!parseInt(id)) {
		throw new AppError("Params 'id' must be a number!", 400);
	}

	const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

	const findContact = await contactRepository.findOne({
		where: {
			id: parseInt(id),
		},
	});

	if (!findContact) {
		throw new AppError("Contact not found", 404);
	}

	return next();
};







