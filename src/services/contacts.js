import { Contact } from '../models/contact.js';

export const getContacts = async () => Contact.find();

export const getContactById = async (contactId) => Contact.findById(contactId);
