//src/controllers/authController.js
import db from '../db.js';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  const { cedula, password } = req.body;

  try {
    const result = await db.query(
      'SELECT * FROM public."usuario" WHERE "cod_persona" = $1',
      [cedula]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.status(200).json({

      user: {
        cod_persona: user.cod_persona,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
