//src/routes/index.js
import express from 'express';
import authRoutes from './auth.js';
import servicioRoutes from './servicio.js';
import estadoRoutes from './servicio.js';
import detalleServicioRoutes from './detalleServicio.js';
import usuarioRoutes from './usuario.js';


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/usuario', usuarioRoutes);
router.use('/servicio', servicioRoutes);
router.use('/detalle_servicio', detalleServicioRoutes);
router.use('/servicio', estadoRoutes); 


export default router;
