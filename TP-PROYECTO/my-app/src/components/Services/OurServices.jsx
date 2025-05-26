//Services/OurService.jsx
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ServiceCards from "./ServiceCards";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from "../../config/axiosConfig";

const OurServices = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [puedeSolicitar, setPuedeSolicitar] = useState(false);
  const [certificadoAprobado, setCertificadoAprobado] = useState(false);
  const [testigos, setTestigos] = useState([]);
  const [datosServicio, setDatosServicio] = useState(null); 
  const [cargando, setCargando] = useState(true);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
  const generatePDF = (user) => {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(12);
  doc.text("________________________________________", 20, y); y += 10;
  doc.setFontSize(16);
  doc.text("Certificado de Vida y Residencia", 20, y); y += 10;
  doc.setFontSize(12);
  doc.text("(Conforme al Art 6 Inc. 8 de la Ley 7280 de la Reforma y Modernización de la Policía Nacional)", 20, y); y += 10;
  doc.text("Página 1 de 1", 20, y); y += 10;
  doc.text("________________________________________", 20, y); y += 10;

  // Certificado principal
  const parrafo1 = `CERTIFICO QUE: ${user.nombre} de nacionalidad ${user.nacionalidad}, estado civil ${user.estado_civil} de ${user.edad} años de edad, con Cédula de Identidad Civil N° ${user.cedula}, con fecha de nacimiento ${user.fecha_nacimiento}-`;
  const parrafo2 = `VIVE Y RESIDE: en la casa N° ${user.nro_casa} ubicada en la calle ${user.direccion} del Barrio ${user.barrio} de esta ciudad de ${user.ciudad}`;

  doc.text(doc.splitTextToSize(parrafo1, 170), 20, y); y += 15;
  doc.text(doc.splitTextToSize(parrafo2, 170), 20, y); y += 15;

  doc.text("SEGÚN TESTIGOS, VECINOS DEL LUGAR:", 20, y); y += 10;

  user.testigos.forEach((testigo) => {
    const texto = `• ${testigo.nombre}, de nacionalidad ${testigo.nacionalidad}, mayor de edad, con Cédula de Identidad Civil N° ${testigo.cedula}-`;
    const lineas = doc.splitTextToSize(texto, 170);
    doc.text(lineas, 20, y);
    y += lineas.length * 7;
  });

  y += 5;
  const parrafos = [
    "Se expide el presente CERTIFICADO DE VIDA Y RESIDENCIA, a pedido de la parte interesada, exclusivamente para TRÁMITE LABORAL EN LA REPÚBLICA DEL PARAGUAY, y ante veracidad de los datos de mención, se autoriza su utilización.",
    "VÁLIDO: Seis (6) meses, conforme a la Resolución N° 293, de fecha 24/03/2014 emanada de la Comandancia de la Policía Nacional. –",
    "FINAL DEL INFORME EN CAPITAL Y CENTRAL - GUAIRA - ITAPUA - CONCEPCION - AMAMBAY - ALTO PARANA - CAAGUAZU - NEEMBUCU - MISIONES - PARAGUARI - CAAZAPA - SAN PEDRO - CORDILLERA - PDTE. HAYES - CANINDEYU - BOQUERON - ALTO PARAGUAY.-"
  ];

  parrafos.forEach((texto) => {
    const lineas = doc.splitTextToSize(texto, 170);
    doc.text(lineas, 20, y);
    y += lineas.length * 7;
  });

  doc.text("________________________________________", 20, y); y += 10;
  doc.text(`Fecha de Emisión: ${user.fecha_aprobacion}     Aprobado por: ${user.nombre_oficial}`, 20, y); y += 10;
  doc.text("________________________________________", 20, y); y += 10;

  doc.text("Código de Verificación:", 20, y); y += 10;
  doc.text("Policía Nacional Dirección de Prevención y Seguridad a través del Sistema de Vida y Residencia Electrónicos", 20, y); y += 10;
  doc.text("Acordada N° 10XX/2016", 20, y); y += 10;
  doc.text("________________________________________", 20, y); y += 10;
  doc.text("Código de Verificación: 456738xx", 20, y); y += 10;
  doc.text("Verifique la validez de este documento en https://www.csj.gov.py/vidayresidencia/verificador.aspx", 20, y);

  doc.save("certificado_vida_residencia.pdf");
};

 useEffect(() => {
  const verificarEstado = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.cod_persona) {
      alert("No se encontró información del usuario.");
      return;
    }

    try {
      const { data } = await api.get(`solicitaServicio/estado/${user.cod_persona}`);

      console.log("Estado recibido desde backend:", data.estado);

      if (data.estado === null) {
        setPuedeSolicitar(true);
      } else if (data.estado === "A") {
        setCertificadoAprobado(true);
        setPuedeSolicitar(true);
        setDatosServicio(data); // guardamos para usar id_servicio

        // Obtener testigos por id_servicio
        const { data: testigosData } = await api.get(`detalleServicio/testigos/${data.id_servicio}`);

        setTestigos(testigosData);
      } else {
        setPuedeSolicitar(false);
      }
    } catch (error) {
      console.error("Error al verificar estado del servicio:", error);
      setPuedeSolicitar(false);
    } finally {
      setCargando(false);
    }
  };

  verificarEstado();
}, []);

 

  return (
    <div className="p-5">
      
      <div className="relative flex items-center justify-center mt-20 ">

        <Link
          to="/"
          className="absolute left-0 ml-4"
        >
          <Button className="border border-black rounded-lg ">
            IR A INICIO
          </Button>
        </Link>

        <h1 className="font-bold text-4xl text-center">
          Certificado de Vida y Residencia
        </h1>
      </div>
       {certificadoAprobado && (
        <div className="text-center my-4">
          <button
            onClick={() =>
              generatePDF({
                ...JSON.parse(localStorage.getItem("user")),
                testigos,
                fecha_aprobacion: datosServicio?.fecha_aprobacion,
                nombre_oficial: datosServicio?.nombre_oficial,
              })
            }
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Descargar certificado
          </button>
        </div>
      )} 
     
      {!cargando && puedeSolicitar && (
        <div className="text-center my-4">
        <button
          onClick={toggleFormulario}
          className="bg-tertiary text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          {mostrarFormulario ? "Cancelar" : "Solicitar"}
        </button>
        </div>
      )}

      {!cargando && !puedeSolicitar && (
        <p className="text-red-600 text-center mt-4">
          Ya tienes una solicitud pendiente. Espera a que sea aprobada para hacer una nueva.
        </p>
      )}

      {mostrarFormulario && (
        <div className="w-full flex justify-center">
          <ServiceCards />
        </div>
      )}
      
    </div>
  );
};

export default OurServices;
