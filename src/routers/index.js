import express from 'express';

import authRouter from './auth.js';

import contactsRoutes from './contacts.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/contacts', contactsRoutes);

export default router;
