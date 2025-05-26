//src/routes/index.js
import express from 'express';
import authRoutes from './auth.js';
import solicitaServicioRoutes from './solicitaServicio.js';
import estadoRoutes from './solicitaServicio.js';
import detalleServicioRoutes from './detalleServicio.js';
import usuarioRoutes from './usuario.js';

import serviceRoutes from './service.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/usuario', usuarioRoutes);
router.use('/solicitaServicio', solicitaServicioRoutes);
router.use('/detalleServicio', detalleServicioRoutes);
router.use('/service', serviceRoutes);

export default router;
