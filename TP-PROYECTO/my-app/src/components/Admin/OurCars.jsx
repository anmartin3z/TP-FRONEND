// Admin/OurCars.jsx
import React, { useEffect, useState } from "react";
import CarsCard from "./CarsCard";

const OurCars = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
  const fetchSolicitudes = async () => {
    try {
      const res = await fetch("/api/servicio/pendientes");
      if (!res.ok) throw new Error("Error al obtener solicitudes");
      const data = await res.json();
      console.log("Solicitudes recibidas:", data);
      setSolicitudes(data);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
    }
  };

  fetchSolicitudes();
}, []);

  const handleActualizarEstado = async (id, nuevoEstado) => {
    await fetch(`/api/servicio/estado/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: nuevoEstado }),
    });

    // Remover del estado local (elimina del DOM)
    setSolicitudes((prev) => prev.filter((item) => item.id_servicio !== id));
  };

  return (
    <div className="container pt-24">
      <h1 className="font-bold text-4xl text-center">
        Aprobaciones Administrativas
      </h1>

      <div className="grid grid-cols-1 gap-5 mt-5">
       {solicitudes?.length > 0 ? (
        solicitudes.map((item) => (
          <CarsCard
            key={item.id_servicio}
            id={item.id_servicio}
            ci={item.persona}
            name={item.nombre}
            direccion={item.direccion}
            nacionalidad={item.nacionalidad}
            departamento={item.departamento}
            ciudad={item.ciudad}
            barrio={item.barrio}
            nro_casa={item.nro_casa}
            onActualizarEstado={handleActualizarEstado}
          />
          ))
        ) : (
          <p className="text-center text-gray-500">No hay solicitudes pendientes</p>
        )}
      </div>
    </div>
  );
};

export default OurCars;
