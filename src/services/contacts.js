import { SORT_ORDER } from '../constants/index.js';
import { ContactCollection } from '../db/models/contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find({ userId });
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite === true) {
    contactsQuery.where('isFavourite').equals(true);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactCollection.find({ userId }).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (contactData) => {
  const contact = await ContactCollection.create(contactData);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (
  contactId,
  userId,
  contactData,
  option = {},
) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    contactData,
    {
      new: true,
      includeResultMetadata: true,
      ...option,
    },
  );

  if (!result || !result.value) return null;
  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};
