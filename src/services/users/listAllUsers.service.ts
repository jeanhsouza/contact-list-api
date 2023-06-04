import { Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { iUserResult } from "../../interfaces/users.interface";
import { allUserResultSchema } from "../../schemas/users.schema";

export const listAllUsersService = async (
	request: Request
): Promise<iUserResult[]> => {
	const movieRepository: Repository<User> = AppDataSource.getRepository(User);

	const findUsers: Array<User> = await movieRepository.find();

	const allUsers = allUserResultSchema.parse(findUsers);

	return allUsers;
};
