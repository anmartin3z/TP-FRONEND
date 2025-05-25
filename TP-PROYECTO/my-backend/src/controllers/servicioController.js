// controllers/servicioController.js
import db from '../db.js';

export const crearServicio = async (req, res) => {
  const {
    persona,
    fecha_solicitud,
    fecha_aprovacion,
    fecha_vencimiento,
    estado,
    motivo,
    cod_user_aprueba,
  } = req.body;

  try {
    const personaResult = await db.query(
      `SELECT cod_persona FROM public.usuario WHERE cod_persona = $1`,
      [persona]
    );
    if (personaResult.rows.length === 0) {
      return res.status(400).json({ error: `El usuario con Cod_persona ${persona} no existe.` });
    }

    if (cod_user_aprueba !== null) {
      const aprobadorResult = await db.query(
        `SELECT cod_persona FROM public.usuario WHERE cod_persona = $1`,
        [cod_user_aprueba]
      );
      if (aprobadorResult.rows.length === 0) {
        return res.status(400).json({ error: `El aprobador con cod_persona ${cod_user_aprueba} no existe.` });
      }
    }

    const result = await db.query(
      `INSERT INTO public."servicio" 
        (persona, fecha_solicitud, fecha_aprovacion, fecha_vencimiento, estado, motivo, cod_user_aprueba)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id_servicio`,
      [
        persona,
        fecha_solicitud,
        fecha_aprovacion,
        fecha_vencimiento,
        estado,
        motivo,
        cod_user_aprueba,
      ]
    );

    res.status(201).json({ id_servicio: result.rows[0].id_servicio });
  } catch (error) {
    console.error("Error al insertar servicio:", error.message);
    res.status(500).json({ error: `Error al insertar servicio: ${error.message}` });
  }
};

export const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    await db.query(
      "UPDATE servicio SET estado = $1 WHERE id_servicio = $2",
      [estado, id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ success: false, error });
  }
};

export const obtenerSolicitudesPendientes = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT c.id_servicio, c.persona,u.nombre||' '||u.apellido nombre, u.nacionalidad,u.departamento,u.ciudad, u.barrio,u.direccion,u.nro_casa FROM servicio c, usuario u WHERE c.persona = u.cod_persona and c.estado = 'T'"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener solicitudes pendientes:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
