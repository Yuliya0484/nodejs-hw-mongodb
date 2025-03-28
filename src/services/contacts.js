import { contact } from '../models/contact.js';

export const getContacts = async () => contact.find();

export const getContactById = async (contactId) => contact.findById(contactId);
