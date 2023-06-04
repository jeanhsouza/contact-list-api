import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { Repository } from "typeorm";
import { iContactRequest, iContactResult } from "../../interfaces/contacts.interface";
import { contactResultSchema } from "../../schemas/contacts.schema";

export const createContactService = async (
	contactData: iContactRequest
): Promise<iContactResult> => {
	const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

	const contact: Contact = contactRepository.create(contactData);

	await contactRepository.save(contact);

	const newContact = contactResultSchema.parse(Contact);

	return newContact;
};
