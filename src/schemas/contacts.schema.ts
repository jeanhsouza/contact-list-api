import { z } from "zod";
import { userSchema } from "./users.schema";

export const contactSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
    fone: z.string().min(11),
	user: userSchema,
});

export const contactRequestSchema = contactSchema
	.omit({
		id: true,
		user: true,
	})

export const contactResultSchema = contactSchema.omit({ id: true });

export const contactsResultSchema = contactSchema

export const updatedContactSchema = contactRequestSchema

export const allContactResultSchema = contactResultSchema.array();
