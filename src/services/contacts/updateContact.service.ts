import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import {
	iUpdatedContact,
	iContactResult,
} from "../../interfaces/contacts.interface";
import { contactResultSchema } from "../../schemas/contacts.schema";
import { AppError } from "../../errors";
import { User } from "../../entities/users.entity";

export const updateContactService = async (
	newContactData: iUpdatedContact,
	contactID: number,
	userID: number
): Promise<iUpdatedContact> => {
	const contactRepository: Repository<Contact> =
		AppDataSource.getRepository(Contact);
	const usersRepository: Repository<User> = AppDataSource.getRepository(User);

	const user: User | null = await usersRepository.findOneBy({
		id: userID,
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}
	const oldContactData = await contactRepository.findOne({
		where: { id: contactID },
		relations: { user: true },
	});

	const contact = contactRepository.create({
		...oldContactData,
		...newContactData,
	});

	await contactRepository.save(contact);

	const updatedContact = contactResultSchema.parse(contact);

	return updatedContact;
};
