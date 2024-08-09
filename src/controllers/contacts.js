import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contact = await getContactById(_id);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Succesfully found contact with id ${contactId}',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const contact = await createContact(req.body, req.user._id);

    res.status(201).json({
      status: 201,
      message: `Successfully created a contact`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await updateContact(_id, req.body);
    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Succesfully patched a contact',
      data: result.contact,
    });
  } catch (err) {
    next(err);
  }
};
