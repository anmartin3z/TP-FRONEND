// src/routes/servicio.js
import express from 'express';
import db from '../db.js';
import { crearServicio, actualizarEstado,obtenerSolicitudesPendientes  } from '../controllers/servicioController.js';

const router = express.Router();

router.post('/', crearServicio);
router.put("/estado/:id", actualizarEstado);
router.get("/pendientes", obtenerSolicitudesPendientes);

router.get('/estado/:id_persona', async (req, res) => {
  const { id_persona } = req.params;

  try {
    const result = await db.query(
      `SELECT estado FROM servicio 
       WHERE persona = $1 AND estado = 'P'
       ORDER BY fecha_solicitud DESC LIMIT 1`,
      [id_persona]
    );

    if (result.rows.length === 0) {
      return res.json({ estado: null }); // No hay solicitud pendiente
    }

    return res.json({ estado: 'P' }); // Hay una solicitud pendiente
  } catch (error) {
    console.error("Error al consultar estado de solicitud:", error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});
export default router; // <-- exportación correcta para ESModules
