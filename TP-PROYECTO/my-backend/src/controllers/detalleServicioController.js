// controllers/detalleServicioController.js

import db from "../db.js"; 

export const crearDetalleServicio = async (req, res) => {
  const { servicio_id, testigos, id_persona } = req.body;

  if (!servicio_id || !Array.isArray(testigos) || testigos.length !== 2 || !id_persona) {
    return res.status(400).json({ error: "Datos inválidos. Se requieren 2 testigos, servicio_id e id_persona." });
  }

  // Validar que el servicio existe con ese id_servicio y persona
  try {
    const validacion = await db.query(
      `SELECT 1 FROM public.servicio WHERE id_servicio = $1 AND persona = $2`,
      [servicio_id, id_persona]
    );

    if (validacion.rows.length === 0) {
      return res.status(400).json({
        error: "No existe un servicio con ese id_servicio y persona"
      });
    }

    // Insertar los testigos
    for (let cedula_testigo of testigos) {
      await db.query(
        `INSERT INTO public."detalle_servicio" 
         (id_persona, cedula_testigo, servicio, estado)
         VALUES ($1, $2, $3, $4)`,
        [id_persona, cedula_testigo, servicio_id, 'P'] // estado "P" de pendiente
      );
    }

    res.status(201).json({ message: "Detalle de servicio insertado correctamente." });

  } catch (error) {
    console.error("Error al insertar en Detalle_Servicio:", error.message);
    res.status(500).json({ error: "Error al insertar detalle del servicio: " + error.message });
  }
};


export const obtenerTestigosPorServicio = async (req, res) => {
  const { servicio_id } = req.params;

  try {
    const result = await db.query(
      `SELECT p.nombre, p.apellido, p.nacionalidad, p.cod_persona 
       FROM detalle_servicio ds
       JOIN usuario p ON ds.cedula_testigo = p.cod_persona
       WHERE ds.servicio = $1`,
      [servicio_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron testigos para esta solicitud." });
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener testigos:", error.message);
    res.status(500).json({ error: "Error al obtener testigos: " + error.message });
  }
};