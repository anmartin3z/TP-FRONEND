import { ESTADOS, ROLES } from '../constants.js';
import db from '../db.js';

export const getPendings = async (req, res) => {
  const { user_data : { rol, cod_persona } } = req;
  try {
    let notifications = [];
    if(rol == ROLES.OFICIAL){
      const result = await db.query(
        `SELECT s.*, CONCAT(u.nombre, ' ' , u.apellido) as solicitante FROM public.servicio s
        JOIN public.usuario u ON u.cod_persona = s.persona
        WHERE s.estado = $1 
        AND NOT EXISTS ( SELECT 1 FROM public.detalle_servicio ds
          WHERE ds.sevicio = s.id_sevicio AND ds.id_persona = s.persona 
          AND ds.estado != $2
        )
        `,
        [ESTADOS.PENDIENTE, ESTADOS.APROBADO]
      )

      notifications = result.rows.map(row => {
        return {
          id_servicio: row.id_sevicio,
          title: 'Solicitud de vida y residencia',
          detail: `La solicitud de ${row.solicitante} está lista para su aprobación.`
        }
      })

    } else {
      const result = await db.query(
        `SELECT ds.*, CONCAT(u.nombre, ' ' , u.apellido) as solicitante FROM public.detalle_servicio ds
        JOIN public.usuario u ON u.cod_persona = ds.id_persona
        WHERE estado = $1 AND cedula_testigo = $2`, 
        [ESTADOS.PENDIENTE, cod_persona]
      )

      notifications = result.rows.map(row => {
        return {
          id_servicio: row.sevicio,
          title: 'Solicitud de vida y residencia',
          detail: `${row.solicitante} te ha añadido como testigo`
        }
      })
    }
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
