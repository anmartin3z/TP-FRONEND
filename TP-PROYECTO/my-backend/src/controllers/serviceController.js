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

export const getDetail = async (req, res) => {
  const { user_data : { rol, cod_persona } } = req;
  const { id } = req.params;
  try {
    let data = null;
    if(rol == ROLES.OFICIAL){
      const result = await db.query(
        `SELECT CONCAT(u.nombre, ' ' , u.apellido) as solicitante, 
        u.cod_persona as cedula_solicitante, u.departamento, u.ciudad, u.barrio, u.nro_casa, u.direccion, s.fecha_solicitud,
        u.email, u.celular, CONCAT(du.nombre, ' ' , du.apellido) as testigo, du.cod_persona as cedula_testigo 
        FROM public.servicio s 
        JOIN public.usuario u ON u.cod_persona = s.persona
        JOIN public.detalle_servicio ds ON s.id_sevicio = ds.sevicio AND s.persona = ds.id_persona 
        JOIN public.usuario du ON ds.cedula_testigo  = du.cod_persona
        WHERE s.id_sevicio = $1 AND s.estado = $2
        AND NOT EXISTS ( SELECT 1 FROM public.detalle_servicio ds
          WHERE ds.sevicio = s.id_sevicio AND ds.id_persona = s.persona 
          AND ds.estado != $3
        )
        `,
        [id, ESTADOS.PENDIENTE, ESTADOS.APROBADO]
      )

      if(result.rows.length == 0){
        return res.status(404).json({error:'No existe la solicitud con el id servicio proporcionado'})
      }
      
      const {
        solicitante,
        cedula_solicitante,
        departamento,
        ciudad,
        barrio,
        nro_casa,
        direccion,
        fecha_solicitud,
        email,
        celular
      } = result.rows[0];

      const testigos = result.rows.map(r => ({
        testigo: r.testigo,
        cedula_testigo: r.cedula_testigo
      }));

      data = {
        solicitante,
        cedula_solicitante,
        departamento,
        ciudad,
        barrio,
        nro_casa,
        direccion,
        fecha_solicitud,
        email,
        celular,
        testigos
      };

    } else {      
      const result = await db.query(
        `SELECT CONCAT(u.nombre, ' ' , u.apellido) as solicitante, 
        u.departamento, u.ciudad, u.barrio, u.nro_casa, u.direccion, s.fecha_solicitud
        FROM public.detalle_servicio ds
        JOIN public.servicio s ON s.id_sevicio = ds.sevicio AND s.persona = ds.id_persona 
        JOIN public.usuario u ON u.cod_persona = s.persona
        WHERE sevicio = $1 AND  cedula_testigo = $2 AND ds.estado = $3 AND s.estado = $3`,
        [id, cod_persona, ESTADOS.PENDIENTE]
      )

      if(result.rows.length == 0){
        return res.status(404).json({error:'No existe la solicitud con el id servicio proporcionado'})
      }
      data = result.rows[0];
    }
    return res.status(200).json(data)
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({error: 'Ocurrio un error inesperado'})
  }

}

export const doAction = async (req, res) => {
  const { id_servicio , status, reason }  = req.body;
  const { user_data : { rol, cod_persona } } = req;
  if(!id_servicio || !status){
    return res.status(400).json({error: 'Es necesario proporcionar el id de la solicitud y el estado'})
  }

  const validStatus = Object.values(ESTADOS)
  if(!validStatus){
    return res.status(400).json({error: `Código de estado ${status} no valido, valores posibles ${validStatus.join(', ')}`})
  }
  
  let result = null;
  if(rol === ROLES.OFICIAL){
    result = await db.query(`UPDATE public.servicio s
      SET fecha_aprovacion = CURRENT_DATE, cod_user_aprueba = $2, estado = $4
      WHERE s.id_sevicio = $1 AND estado = $3
    `, [id_servicio, cod_persona, ESTADOS.PENDIENTE, status]);
  } else {
    result = await db.query(`UPDATE public.detalle_servicio ds
      SET estado = $4
      WHERE ds.sevicio = $1 AND cedula_testigo = $2 AND estado = $3
    `, [id_servicio, cod_persona, ESTADOS.PENDIENTE, status]);
  }
  
  if(result.rowCount == 0){
    return res.status(404).json({error: 'No se realizo la actualizacion del estado'})
  }

  return res.status(200).json({msg: 'Se realizo correctamente el cambio de estado'})

}