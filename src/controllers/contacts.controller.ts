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

	const newContact = await createContactService(contactData);

	return response.status(201).json(newContact);
};

export const listAllContactController = async (
	request: Request,
	response: Response
) => {
	const allContacts = await listAllContactsService(request);

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
	const idContact = parseInt(request.params.id);

	const updatedContact = await updateContactService(contactData, idContact);

	return response.json(updatedContact);
};