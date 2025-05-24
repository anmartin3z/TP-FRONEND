import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AboutUs = () => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        cedula,
        password
      });

      alert(res.data.message);

      // Guardar token o lo que necesites
      localStorage.setItem("authToken", res.data.token);
       // Guardar datos del usuario
     localStorage.setItem("user", JSON.stringify(res.data.user));


      // Redirigir
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
      <div className="flex flex-col md:flex-row bg-tertiary">
        <div className="w-full sm:w-1/2 mb-4 px-2 text-white">
          <div className="h-flex py-4 px-6">
            <h3 className="text-2xl font-bold text-md mb-6">Identidad Electrónica</h3>
            <div className="mt-5">El Portal Paraguay requiere autenticación y autorización con tu cédula de identidad.</div>
            <div className="mt-5">Tus datos serán procesados de manera segura para proteger tu confidencialidad.</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
          <div className="w-full mb-4 px-2 bg-secondary">
            <div className="h-flex py-4 px-6">
              <h3 className="text-2xl font-bold text-md mb-6">Autenticación</h3>
              <div>Autentícate con Identidad Electrónica</div>
              <div className="border mt-5">
                <input
                  className="form-control w-full p-3"
                  placeholder="Número de cédula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </div>
              <div className="border mt-5">
                <input
                  type="password"
                  className="form-control w-full p-3"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center py-5 text-white">
                <button onClick={handleLogin} className="border bg-tertiary rounded p-2">
                  Inicia sesión
                </button>
                
                  <button className="border bg-tertiary p-2">Cancelar</button>
               
              </div>

              <div className="text-right py-full mt-10">Crear cuenta ¿Has olvidado tu clave?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
