import express from 'express';
import authRoutes from './auth.js';
import serviceRoutes from './service.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/service', serviceRoutes);

export default router;
