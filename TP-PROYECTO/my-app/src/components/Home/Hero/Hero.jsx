import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
    const [userName, setUserName] = useState("usuario");

  
  
    // Leer nombre del usuario al montar
    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(`${user.nombre}`);
    
    }
  }, []);

    const handleLogout = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user"); // también limpiamos el nombre
      navigate("/");
    };
  

  return (
    <div className="bg-secondary min-h-screen ">
      <div className="container mx-auto py-8 px-4 lg:py-16 lg:px-20 ">
        <div className="flex flex-col md:flex-row gap-6 mt-5 ">
          {/* Sidebar Section */}
          <div className="w-full md:w-1/3 lg:w-1/3 mb-4 ">
            <div className="bg-white p-6 rounded-3xl rounded-lg shadow-md ">
              <div className="flex items-center border rounded-2xl bg-tertiary text-white  p-3">
                <h3 className="text-xl font-bold mb-6">
                  ¡Hola, {userName}!
               </h3>
              </div>
              <div className="space-y-2 text-5">
                <div className="flex items-center p-3 ">
                  <span className="mr-2">📄</span> Mi Perfil
                </div>
                <div className="flex items-center p-3 ">
                  <span className="mr-2">📄</span> Mis Documentos
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">📄</span> Mis Pagos
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">📄</span> Mis consultas / reclamos
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">📑</span> Trámites en Línea
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">🔖</span> Consulta de Expedientes
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">🧩</span> Aplicaciones con ID-e
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">📊</span> Estadísticas
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">🏛️</span> Poderes del Estado
                </div>
                <div className="flex items-center">
                  <span className="mr-2">ℹ️</span> Más información
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">❓</span> Preguntas Frecuentes
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">📣</span> Abrir Ticket
                </div>
                <div className="flex items-center p-3">
                  <span className="mr-2">ℹ️</span> Ver estado del Ticket
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Carpeta Ciudadana
            </h2>
            <div className="flex p-3 border rounded-lg" > 
                <input  class=" w-full" placeholder="Escriba un texto para buscar"></input>
                <svg
              className="h-8 w-8 text-blue-950"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            </div>
            <div className="grid  grid-cols-2 flex">
              {/* Policía Nacional */}
              <div className=" p-4">
                <h3 className="text-xl font-bold mb-4">Policía Nacional</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Certificado de Antecedentes Policiales
                      </p>
                      <p className="text-xs text-gray-500">
                        Policía Nacional (PN)
                      </p>
                    </div>
                    <span className="ml-auto bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      B
                    </span>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Consulta de Datos de Cédula
                      </p>
                      <p className="text-xs text-gray-500">
                        Policía Nacional (PN)
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/Services"
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Certificado Vida y Residencia
                      </p>
                      <p className="text-xs text-gray-500">
                        Policía Nacional (PN)
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Registro Civil */}
              <div className="p-4 ">
                <h3 className="text-xl font-bold mb-4">Registro Civil</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Certificado de Acta de Nacimiento
                      </p>
                      <p className="text-xs text-gray-500">
                        DGREC - Ministerio de Justicia - D.G. del Registro del
                        Estado Civil (REC)
                      </p>
                    </div>
                    <span className="ml-auto bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      B
                    </span>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Certificado de Acta de Nacimiento Hijo/a
                      </p>
                      <p className="text-xs text-gray-500">
                        DGREC - Ministerio de Justicia - D.G. del Registro del
                        Estado Civil (REC)
                      </p>
                    </div>
                    <span className="ml-auto bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      B
                    </span>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Constancia de Acta de Matrimonio
                      </p>
                      <p className="text-xs text-gray-500">
                        DGREC - Ministerio de Justicia - D.G. del Registro del
                        Estado Civil (REC)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

             

              {/* Poder Judicial */}
              <div className=" p-4 ">
                <h3 className="text-xl font-bold mb-4">Poder Judicial</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Informe de Antecedentes Judiciales - Área Penal
                      </p>
                      <p className="text-xs text-gray-500">
                        Poder Judicial - Corte Suprema de Justicia (PJ-CSJ)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Educación */}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">Educación</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Constancia de Cursos
                      </p>
                      <p className="text-xs text-gray-500">
                        Servicio Nacional de Promoción Profesional (SNPP)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Constancia de Grado Académico
                      </p>
                      <p className="text-xs text-gray-500">
                        MEC - Ministerio de Educación y Ciencias (MEC)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Salud */}
              <div className=" p-4 ">
                <h3 className="text-xl font-bold mb-4">Salud</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Certificado Electrónico Internacional de Vacunación
                      </p>
                      <p className="text-xs text-gray-500">
                        Ministerio de Salud Pública y Bienestar Social (MSPBS)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Certificado Electrónico Internacional de Vacunación -
                        Hijos
                      </p>
                      <p className="text-xs text-gray-500">
                        Ministerio de Salud Pública y Bienestar Social (MSPBS)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Certificado de Vacunación Covid-19
                      </p>
                      <p className="text-xs text-gray-500">
                        Ministerio de Salud Pública y Bienestar Social (MSPBS)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Repatriados */}
              <div className=" p-4 ">
                <h3 className="text-xl font-bold mb-4">Repatriados</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Certificado de Repatriación: Exoneración de Impuestos
                        Aduaneros
                      </p>
                      <p className="text-xs text-gray-500">
                        Secretaría de Desarrollo para Repatriados y Refugiados
                        Connacionales (SEDERREC)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Certificado de Repatriación: Reconocimiento de Estudios
                      </p>
                      <p className="text-xs text-gray-500">
                        Secretaría de Desarrollo para Repatriados y Refugiados
                        Connacionales (SEDERREC)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
               {/* Trabajo */}
              <div className=" p-4 ">
                <h3 className="text-xl font-bold mb-4">Trabajo</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Constancia de Cédula MIPYMES
                      </p>
                      <p className="text-xs text-gray-500">
                        Ministerio de Industria y Comercio (MIC)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Constancia de Inscripción de Empleado
                      </p>
                      <p className="text-xs text-gray-500">
                        Ministerio de Trabajo, Empleo y Seguridad Social (MTESS)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Constancia de Salario de Asegurado
                      </p>
                      <p className="text-xs text-gray-500">
                        Instituto de Previsión Social (IPS)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Constancia de ser Asegurado
                      </p>
                      <p className="text-xs text-gray-500">
                        Instituto de Previsión Social (IPS)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">
                        Constancia de ser o no Funcionario Público
                      </p>
                      <p className="text-xs text-gray-500">
                        Ministerio de Economía y Finanzas (MEF)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;