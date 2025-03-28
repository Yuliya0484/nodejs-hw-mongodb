import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import express from 'express';
import { getContacts, getContactById } from './services/contacts.js';

const PORT = process.env.PORT || getEnvVar('PORT');

export const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const contacts = await getContacts();
    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
      status: 200,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      message: 'Successfully found contact with id{contactId}!',
      data: contact,
      status: 200,
    });
    return;
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong!',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
