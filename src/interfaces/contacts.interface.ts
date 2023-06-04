import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
	allContactResultSchema,
	updatedContactSchema,
	contactRequestSchema,
	contactResultSchema,
	contactSchema,
} from "../schemas/contacts.schema";

export type contactRequiredKeys = "name" | "email" | "password";

export type iContact = z.infer<typeof contactSchema>;

export type iContactRequest = z.infer<typeof contactRequestSchema>;

export type iUpdatedContactResponse = z.infer<typeof updatedContactSchema>;

export type iUpdatedContact = DeepPartial<iUpdatedContactResponse>;

export type iContactResult = z.infer<typeof contactResultSchema>;

export type iAllContacts = z.infer<typeof allContactResultSchema>;