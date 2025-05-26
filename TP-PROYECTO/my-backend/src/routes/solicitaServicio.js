// src/routes/SolicitaServicio.js
import express from 'express';
import db from '../db.js';
import { crearServicio } from '../controllers/solicitaServicioController.js';

const router = express.Router();

router.post('/', crearServicio);


router.get('/estado/:id_persona', async (req, res) => {
  const { id_persona } = req.params;

  try {
    const result = await db.query(
      `SELECT id_servicio, estado, fecha_aprovacion, cod_user_aprueba
       FROM servicio 
       WHERE persona = $1 
       ORDER BY fecha_solicitud DESC 
       LIMIT 1`,
      [id_persona]
    );

    if (result.rows.length === 0) {
      return res.json({ estado: null });
    }

    const servicio = result.rows[0];

    // Trae nombre del aprobador si hay
    let nombre_oficial = "";
    if (servicio.cod_user_aprueba) {
      const oficialResult = await db.query(
        `SELECT nombre FROM usuario WHERE cod_persona = $1`,
        [servicio.cod_user_aprueba]
      );
      if (oficialResult.rows.length > 0) {
        nombre_oficial = oficialResult.rows[0].nombre;
      }
    }

    res.json({
      ...servicio,
      nombre_oficial
    });
  } catch (error) {
    console.error('Error al obtener estado del servicio:', error.message);
    res.status(500).json({ error: 'Error al obtener estado del servicio' });
  }
});

export default router; // <-- exportación correcta para ESModules
