import React from "react";
import { Link } from "react-router-dom";
import img1 from '../assets/img/img1.png';
import img4 from '../assets/img/img4.png';
import img3 from '../assets/img/img3.png';


const Footer = () => {
  return (
    <footer className=" mt-1 bg-secondary text-blue">
      <div className="flex flex-col md:flex-row justify-between p-8 lg:px-28 md:px-16 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-2xl pb-4">Portal Único de Gobierno</h1>
          <p className=" mb-4 text-sm">
          ¿Qué es el Portal Único de Gobierno?
          </p>
          <Link
             /* to="/about"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Servicios  
            </Link>
            <Link
             /* to="/about"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Instituciones
            </Link>
        </div>
        <div>
          <h1 className=" font-semibold text-xl pb-4 pt-5 md:pt-0">
          Enlaces de Interés
          </h1>
          <div className=" flex flex-col gap-2 font-medium">
            <Link
             /* to="/about"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Identidad Electrónica
            </Link>
            <Link
             /* to="/cars"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Firma Digital
            </Link>
            <Link
            /*  to="/services"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Traductor Guaraní - Español
            </Link>
            <Link
            /*  to="/services"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Decretos presidenciales
            </Link>
            <Link
            /*  to="/services"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Leyes
            </Link>
            <Link
            /*  to="/services"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Base Legislativa
            </Link>
            <Link
            /*  to="/services"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Planes Nacionales
            </Link>
          </div>
        </div>

        <div>
          <h1 className=" font-semibold text-xl pb-4 pt-5 md:pt-0">
          Teléfonos de emergencia
          </h1>
          <div className=" flex flex-col gap-2 font-medium">
            <Link
              /*to="/"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              911 - Policía Nacional

            </Link>
            <Link
             /* to="/"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              132 - Bomberos Voluntarios
            </Link>
            <Link
             /* to="/"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              141 - SEME (Servicio de Emergencia Médica Extrahospitalaria)

            </Link>
            <Link
              /*to="/"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              137 - SOS Mujer

            </Link>
            <Link
              /*to="/"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
               147 - Fono Ayuda (niños)
            </Link>
            <Link
              /*to="/"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
                
                118 - COPACO | Guía telefónica

            </Link>
            <Link
              /*to="/"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >        
              160 - ANDE
            </Link>
            <Link
              /*to="/"*/
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >

              162 - ESSAP
            </Link>
          </div>
        </div>

        
      </div>
      <div className=" mt-1 bg-tertiary text-white">
        <div className="flex flex-col md:flex-row justify-between p-8 lg:px-28 md:px-16 px-5">
          <div >
            <img src={img1} alt="" className="w-40" /> 
          </div>
            <img src={img4} alt="" className="w-40" />
          <div>
          </div>
            <div>
            {/* <img src={img3} alt="" className="w-40" /> */}
            <p className=" text-center py-5">
              Términos y Condiciones - Políticas de Privacidad - Mapa del Sitio
            </p>
            </div>
          
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;
