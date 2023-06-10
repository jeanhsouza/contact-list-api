import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { iContactResult } from "../../interfaces/contacts.interface";
import { allContactResultSchema } from "../../schemas/contacts.schema";
import { AppError } from "../../errors";
import { User } from "../../entities/users.entity";

export const listAllContactsService = async (
	request: Request,
	userID: number
): Promise<iContactResult[]> => {
	const contactRepository: Repository<Contact> =
		AppDataSource.getRepository(Contact);
	
	const findContacts: Array<Contact> = await contactRepository.find({
		relations: {
			user: true,
		},
		where: {
			user: {
				id : userID
			},
		},
	});

	const allContacts = allContactResultSchema.parse(findContacts);

	return allContacts;
};
