import { z } from "zod";
import { userResultSchema } from "./users.schema";

export const contactSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
    fone: z.string().min(11),
	user: userResultSchema,
});

export const contactRequestSchema = contactSchema
	.omit({
		id: true,
		user: true,
	})

export const contactResultSchema = contactSchema

export const updatedContactSchema = contactRequestSchema.partial()

export const allContactResultSchema = contactSchema.array();
