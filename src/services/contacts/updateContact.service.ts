import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { iUpdatedContact, iContactResult } from "../../interfaces/contacts.interface";
import { contactResultSchema } from "../../schemas/contacts.schema";

export const updateContactService = async (
	newContactData: iUpdatedContact,
	contactID: number
): Promise<iContactResult> => {
	const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

	const oldContactData = await contactRepository.findOneBy({
		id: contactID,
	});

	const contact = contactRepository.create({
		...oldContactData,
		...newContactData,
	});

	await contactRepository.save(contact);

	const updatedContact = contactResultSchema.parse(contact);

	return updatedContact;
};
