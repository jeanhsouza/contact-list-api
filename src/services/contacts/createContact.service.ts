import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { Repository } from "typeorm";
import { iContactRequest, iContactResult } from "../../interfaces/contacts.interface";
import { contactResultSchema } from "../../schemas/contacts.schema";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors";

export const createContactService = async (
	contactData: iContactRequest, userID: number
): Promise<iContactResult> => {
	const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
	const usersRepository: Repository<User> = AppDataSource.getRepository(User)
	
	const user: User | null = await usersRepository.findOneBy({
        id: userID
    })    

	if (!user) {
        throw new AppError("User not found", 404)
    }
	
	const contact: Contact = contactRepository.create({...contactData, user});

	await contactRepository.save(contact);

	const newContact = contactResultSchema.parse(contact);

	return newContact;
};
