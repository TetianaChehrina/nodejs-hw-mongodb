import { Router } from 'express';
import {
  getAllContactsControler,
  getContactByIdControler,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getAllContactsControler));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdControler));
export default router;
