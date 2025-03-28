import { Contact } from '../models/contact.js';

export const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (contactData) => {
  const createdContact = await Contact.create(contactData);
  return createdContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await Contact.findOneAndDelete({ _id: contactId });
  return deletedContact;
};

export const patchContact = async (contactId, contactData) => {
  const updateContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    contactData,
    { new: true },
  );
  return updateContact;
};
