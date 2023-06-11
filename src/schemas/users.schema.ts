import { z } from "zod";

export const userSchema = z.object({
	id: z.number(),
	name: z.string().max(45),
	email: z.string().email().max(45),
	fone: z.string().max(45),
	password: z.string().max(20),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
});

export const userRequestSchema = userSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
});

export const userResultSchema = userSchema.omit({ password: true });

export const updatedUserSchema = userRequestSchema.partial();

export const allUserResultSchema = userResultSchema.array();
