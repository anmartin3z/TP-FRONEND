//src/controllers/authController.js
import db from '../db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';

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
    //  Cálculo de edad
    const birthDate = new Date(user.fecha_nacimiento);
    const today = new Date();
    let edad = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      edad--;
    }

    const fechaNacimientoFormateada = birthDate.toISOString().split('T')[0];
    const data = {
        cod_persona: user.cod_persona,
        nombre: user.nombre,
        apellido: user.apellido,
        nacionalidad: user.nacionalidad,
        direccion :user.direccion,
        departamento:user.departamento,
        fecha_nacimiento: fechaNacimientoFormateada,
        ciudad:user.ciudad,
        barrio:user.barrio,
        estado_civil:user.estado_civil,
        nro_casa:user.nro_casa,
        edad: edad,
        rol: user.rol,
      };
    res.status(200).json({
      user: data,
      token: generateToken(data)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
