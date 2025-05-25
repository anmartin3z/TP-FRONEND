// Admin/CarsCard.jsx
import React, { useEffect, useState } from "react";

const CarsCard = ({
  id,
  ci,
  name,
  direccion,
  nacionalidad,
  departamento,
  ciudad,
  barrio,
  nro_casa,
  onActualizarEstado,
}) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.rol);
    }
  }, []);

  // Si no es rol 1, no mostrar nada
  if (userRole !== 1) {
    return null;
  }

  return (
    <div className="border-2 border-secondary bg-slate-100 text-black rounded-xl mb-2 cursor-pointer p-4">
      <h1 className="font-bold text-xl">
        {ci} - {name} | Nacionalidad: {nacionalidad}
      </h1>
      <h1 className="text-lg">Departamento: {departamento}</h1>
      <h1 className="text-lg">Ciudad: {ciudad}</h1>
      <h1 className="text-lg">Barrio: {barrio}</h1>
      <h1 className="text-lg">
        Dirección: {direccion}, Casa Nro. {nro_casa}
      </h1>

      <div className="flex px-1 pt-2 gap-2">
        <button
          onClick={() => onActualizarEstado(id, "A")}
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700"
        >
          Aprobar
        </button>
        <button
          onClick={() => onActualizarEstado(id, "R")}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default CarsCard;
