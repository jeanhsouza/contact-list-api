import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { iContactResult } from "../../interfaces/contacts.interface";
import { allContactResultSchema } from "../../schemas/contacts.schema";

export const listAllContactsService = async (
	request: Request
): Promise<iContactResult[]> => {
	const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

	const findContacts: Array<Contact> = await contactRepository.find();

	const allContacts = allContactResultSchema.parse(findContacts);

	return allContacts;
};
