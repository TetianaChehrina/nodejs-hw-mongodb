import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import {
  getAllContactsControler,
  getContactByIdControler,
} from './controllers/contacts.js';

const PORT = Number(env('PORT', '3000'));
export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', getAllContactsControler);
  app.get('/contacts/:contactId', getContactByIdControler);
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
