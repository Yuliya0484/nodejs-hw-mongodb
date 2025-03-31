import { Contact } from '../models/contact.js';

export const getContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const [total, contacts] = await Promise.all([
    Contact.countDocuments(),
    Contact.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);
  return {
    contacts,
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
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
