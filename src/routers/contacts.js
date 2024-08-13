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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactRouter = Router();
contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getAllContactsController));
contactRouter.get(
  '/:contactId',
  isValid,
  ctrlWrapper(getContactByIdController),
);
contactRouter.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactRouter.post(
  '',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
),
  contactRouter.delete(
    '/:contactId',
    isValid,
    ctrlWrapper(deleteContactController),
  );
contactRouter.patch(
  '/:contactId',
  isValid,
  upload.single('photo'),
  validateBody(createContactUpdateSchema),
  ctrlWrapper(patchContactController),
);
export default contactRouter;
