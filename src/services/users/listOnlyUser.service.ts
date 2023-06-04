import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { iUserResult } from "../../interfaces/users.interface";
import { userResultSchema } from "../../schemas/users.schema";

export const listOnlyUserService = async (
	idUser: number
): Promise<iUserResult> => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const findUser = await userRepository.findOne({
		where: {
			id: idUser,
		},
	});

	const onlyUser = userResultSchema.parse(findUser);

	return onlyUser;
};
