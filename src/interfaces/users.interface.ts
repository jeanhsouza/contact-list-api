import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
	allUserResultSchema,
	updatedUserSchema,
	userRequestSchema,
	userResultSchema,
	userSchema,
} from "../schemas/users.schema";

export type UserRequiredKeys = "name" | "email" | "password";

export type iUser = z.infer<typeof userSchema>;

export type iUserRequest = z.infer<typeof userRequestSchema>;

export type iUpdatedUserResponse = z.infer<typeof updatedUserSchema>;

export type iUpdatedUser = DeepPartial<iUpdatedUserResponse>;

export type iUserResult = z.infer<typeof userResultSchema>;

export type iAllUsers = z.infer<typeof allUserResultSchema>;
