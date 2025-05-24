
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ServiceCards from "./ServiceCards"; // Importa el componente

const OurServices = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
  return (
    <div >
      <div >
        <Link
          to="/"
          className="hover:text-primary transition duration-200 ease-linear "
        >
          <Button className="mt-20 border border-black text-left  rounded-lg  ">IR A INICIO</Button>
        </Link>

        <h1 className="font-bold text-4xl text-center ">
          Certificado de Vida y Residencia
        </h1>
      </div>
      <button
        onClick={toggleFormulario}
        className="bg-tertiary text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        {mostrarFormulario ? "Cancelar" : "Solicitar"}
      </button>

      {mostrarFormulario && (
        <div className="w-full flex justify-center">
          <ServiceCards />
        </div>
      )}
    </div>
  );
};

export default OurServices;