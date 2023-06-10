import { Request, Response } from "express";
import { iUpdatedContact, iContactRequest } from "../interfaces/contacts.interface";
import { createContactService } from "../services/contacts/createContact.service";
import { deleteContactService } from "../services/contacts/deleteContact.service";
import { listAllContactsService } from "../services/contacts/listAllContacts.service";
import { updateContactService } from "../services/contacts/updateContact.service";

export const createContactController = async (
	request: Request,
	response: Response
) => {
	const contactData: iContactRequest = request.body;
	const userID: number = parseInt(response.locals.userId)

	const newContact = await createContactService(contactData, userID);

	return response.status(201).json(newContact);
};

export const listAllContactController = async (
	request: Request,
	response: Response
) => {
	const userID: number = parseInt(response.locals.userId)
	const allContacts = await listAllContactsService(request, userID);

	return response.json(allContacts);
};

export const deleteContactController = async (
	request: Request,
	response: Response
) => {
	const idContact = parseInt(request.params.id);

	await deleteContactService(idContact);

	return response.status(204).send();
};

export const updateContactController = async (
	request: Request,
	response: Response
) => {
	const contactData: iUpdatedContact = request.body;
	const contactID = parseInt(request.params.id);

	const updatedContact = await updateContactService(contactData, contactID);

	return response.json(updatedContact);
};