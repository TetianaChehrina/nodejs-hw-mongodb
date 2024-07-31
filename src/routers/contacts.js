import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  createContactSchema,
  createContactUpdateSchema,
} from '../validation/contacts.js';
import isValid from '../middlewares/isValid.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get(
  '/contacts/:contactId',
  isValid,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/contacts/:contactId',
  isValid,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/contacts/:contactId',
  isValid,
  validateBody(createContactUpdateSchema),
  ctrlWrapper(patchContactController),
);
export default router;
