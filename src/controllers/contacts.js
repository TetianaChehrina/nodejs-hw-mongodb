import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsControler = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
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

export const getContactByIdControler = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw createHttpError(404, 'Student not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Succesfully found product with id ${contactId}',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
