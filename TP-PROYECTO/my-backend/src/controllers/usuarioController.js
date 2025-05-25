//src/controllers/usuarioControllers.js

import db from '../db.js';

export const obtenerUsuarioPorCedula = async (req, res) => {
  const { cedula } = req.params; // aquí cedula es cod_persona realmente
  try {
    const result = await db.query('SELECT * FROM usuario WHERE cod_persona = $1', [cedula]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al buscar usuario por cod_persona:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
