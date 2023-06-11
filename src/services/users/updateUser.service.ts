import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { iUpdatedUser, iUserResult } from "../../interfaces/users.interface";
import { userResultSchema } from "../../schemas/users.schema";

export const updateUserService = async (
	newUserData: iUpdatedUser,
	idUser: number
): Promise<iUserResult> => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const oldUserData = await userRepository.findOneBy({
		id: idUser,
	});

	const user = userRepository.create({
		...oldUserData,
		...newUserData,
	});

	await userRepository.save(user);
	const updatedUser = userResultSchema.parse(user);

	return updatedUser;
};
