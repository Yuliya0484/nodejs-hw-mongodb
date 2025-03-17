import { contact } from '../models/contact.js';

export const getContacts = async () => {
  const contacts = await contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contact.findById(contactId);
  return contact;
};
