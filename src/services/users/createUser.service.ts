import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { Repository } from "typeorm";
import { iUserRequest, iUserResult } from "../../interfaces/users.interface";
import { userResultSchema } from "../../schemas/users.schema";

export const createUserService = async (
	userData: iUserRequest
): Promise<iUserResult> => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const user: User = userRepository.create(userData);

	await userRepository.save(user);

	const newUser = userResultSchema.parse(user);

	return newUser;
};
