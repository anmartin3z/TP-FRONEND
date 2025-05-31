// Services/ServicePreview.jsx
import React from "react";
import { CheckCircle, XCircle, User, MapPin, IdCard } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../config/axiosConfig";

const ServicePreview = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [solicitud, setSolicitud] = useState({});
    const [motivo, setMotivoRechazo] = useState({});

    useEffect(() => {
        api.get(`/service/${id}`)
            .then((response) => setSolicitud(response.data))
            .catch((error) => alert(error?.response?.data?.error) || 'Ocurrio un error al obtener el registro')
    }, [id]);

    const doAction = (action) => { 
        api.post(`/service/action`, {id_servicio: id, status: action,reason:motivo})
            .then(() => {
                alert('Se realizo correctamente la actualizacion del registro')
                navigate('/home')
            })
            .catch((error) => alert(error?.response?.data?.error) || 'Ocurrio un error inesperado')
    }

    return (
        <>
            <Navbar />

            <main className="pt-20 pb-10 px-4 bg-gray-50 flex flex-col">
                <div className="max-w-4xl w-full mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">

                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
                        <User className="w-6 h-6 text-blue-600" />
                        Vista previa de la solicitud
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Solicitante</h3>
                            <p className="text-sm">Nombre: <span className="font-medium">{solicitud.solicitante}</span></p>
                            {solicitud.cedula_solicitante && (
                                <p className="text-sm">C.I: <span className="font-medium">{solicitud.cedula_solicitante}</span></p>
                            )}

                            {solicitud.email && (
                                <p className="text-sm">Email: <span className="font-medium">{solicitud.email}</span></p>
                            )}

                            {solicitud.celular && (
                                <p className="text-sm">Celular: <span className="font-medium">{solicitud.celular}</span></p>
                            )}

                            {solicitud.fecha_solicitud && (
                                <p className="text-sm">Fecha de solicitud: <span className="font-medium">{new Date(solicitud.fecha_solicitud).toLocaleDateString('es-PY')}</span></p>
                            )}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dirección</h3>
                            <p className="text-sm"><MapPin className="inline w-4 h-4 mr-1 text-gray-500" /> {solicitud.direccion}</p>
                            <p className="text-sm">Departamento: <span className="font-medium">{solicitud.departamento}</span></p>
                            <p className="text-sm">Ciudad: <span className="font-medium">{solicitud.ciudad}</span></p>
                            <p className="text-sm">Barrio: <span className="font-medium">{solicitud.barrio}</span></p>
                        </div>
                    </div>
                      
                    {solicitud.testigos && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Testigos asignados</h3>
                            <ul className="divide-y divide-gray-100 text-sm">
                                {solicitud.testigos.map((t, idx) => (
                                    <li key={idx} className="py-3 flex items-center gap-4">
                                        <IdCard className="w-5 h-5 text-indigo-500 mt-1" />
                                        <div>
                                            <p className="font-medium">{t.testigo}</p>
                                            <p className="text-xs text-gray-500">C.I.: {t.cedula_testigo}</p>
                                        </div>
                                             
                                        
              
                                        <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                                            Aprobado
                                        </span>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    )}
                 
                    <input  className="form-control w-full p-3" placeholder="Motivo de Rechazo" onChange={(e) => setMotivoRechazo(e.target.value)}   />
                     
                    <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-100">
                      
                       <button
                            onClick={() => doAction('R')}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition"
                        >
                            <XCircle className="w-5 h-5" />
                            Rechazar
                        </button>
                        <button
                            onClick={() => doAction('A')}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition"
                        >
                            <CheckCircle className="w-5 h-5" />
                            Aprobar
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </>

    );
};

export default ServicePreview;
