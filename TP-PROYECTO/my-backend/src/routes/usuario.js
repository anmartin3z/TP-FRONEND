//routes/usuario.js
import express from 'express';
import { obtenerUsuarioPorCedula } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/:cedula', obtenerUsuarioPorCedula);

export default router;
