import { Contact } from '../models/contact.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
  type,
  isFavourite,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactsQuery = Contact.find({ userId });

  if (type) {
    contactsQuery.where('contactType').equals(type);
  }
  if (isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(isFavourite);
  }

  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const totalPages = Math.ceil(contactsCount / perPage);
  return {
    data: contacts,
    page,
    perPage,
    totalItems: contactsCount,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (contactData, userId) => {
  const createdContact = await Contact.create({ ...contactData, userId });
  return createdContact;
};

export const deleteContact = async (contactId, userId) => {
  const deletedContact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return deletedContact;
};

export const patchContact = async (contactId, contactData, userId) => {
  const updateContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    contactData,
    { new: true },
  );
  return updateContact;
};
