// Services/ServiceCards.jsx
import React, { useState } from "react";
import api from "../../config/axiosConfig";

const ServiceCards = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    cedula_1: "",
    cedula_2: "",
    motivo:"",
  });
  const [nombresTestigos, setNombresTestigos] = useState(["", ""]);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);


  const steps = ["Step 1", "Step 2", "Step 3"];
  const totalSteps = steps.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateIndicators = (stepIndex) => ({
    indicatorClass: (index) =>
      index <= stepIndex ? "bg-blue-800 text-white" : "bg-gray-300 text-gray-600",
    lineClass: (index) => (index < stepIndex ? "bg-blue-800" : "bg-gray-300"),
  });

  const updateProgressBar = (stepIndex) => ((stepIndex + 1) / totalSteps) * 100;

  const handleNext = async () => {
    if (currentStep === 0) {
      const testigosValidos = await validarTestigos();
      if (!testigosValidos) return;
      await insertarServicio();
      await obtenerNombresTestigos();
        // Ocultar formulario
      setMostrarFormulario(false);
       // Recargar la pantalla
      window.location.reload();
      return; // Detener navegación al siguiente paso
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validarTestigos = async () => {
    const cedulas = [formData.cedula_1, formData.cedula_2];
    for (let cedula of cedulas) {
      try {
        const response = await api.get(`usuario/${cedula}`);
        console.log("Respuesta del servidor para cédula:", cedula, response.data);
        if (!response.data || !response.data.cod_persona) {
          alert(`El usuario con cédula ${cedula} no cuenta con identidad electrónica.`);
          return false;
        }
      } catch (error) {
        alert(`Error al verificar la cédula ${cedula}: ${error.message}`);
        return false;
      }
    }
    return true;
  };

  const insertarServicio = async () => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    if (!usuario || !usuario.cod_persona) {
      alert("Usuario no autenticado correctamente.");
      return;
    }

    const fechaSolicitud = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    try {
      const bodyServicio = {
        persona: usuario.cod_persona,
        fecha_solicitud: fechaSolicitud,
        fecha_aprovacion: null, // Ajusta según el flujo de negocio
        fecha_vencimiento: null,
        estado: "P",
        motivo: formData.motivo,
        cod_user_aprueba: null,
      };

      const servicioResponse = await api.post("solicitaServicio", bodyServicio);

      console.log("Servicio registrado correctamente:", servicioResponse.data);

      const servicioData = servicioResponse.data;
      const servicioId = servicioData.id_servicio; // Asegúrate que backend devuelva id_servicio

      // Insertar cada testigo en Detalle_Servicio
      const testigos = [formData.cedula_1, formData.cedula_2];

      await api.post("/detalleServicio", {
        id_persona: usuario.cod_persona,
        servicio_id: servicioId,
        testigos: testigos,
      });

      

      //alert("Servicio registrado exitosamente.");
    } catch (error) {
      console.error("Error al insertar en la tabla servicio:", {
        status: error.response?.status,
        body: error.response?.data || error.message,
      });

      alert(
        `Error al insertar en la tabla servicio: ${
          error.response?.data?.error || error.message || "Sin mensaje del servidor"
        }`
      );
    }
  };

  const obtenerNombresTestigos = async () => {
    const cedulas = [formData.cedula_1, formData.cedula_2];
    const nombres = [];

    for (let cedula of cedulas) {
      try {
        const res = await fetch(`/api/usuario/${cedula}`);
        const data = await res.json();
        nombres.push(data.nombre || "No disponible");
      } catch {
        nombres.push("Error");
      }
    }
    setNombresTestigos(nombres);
  };

  const { indicatorClass, lineClass } = updateIndicators(currentStep);
  const progressPercentage = updateProgressBar(currentStep);

  

  return (
      <>
    {mostrarFormulario && (
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8" onSubmit={(e) => e.preventDefault()}>
        <form>
          {/* Paso 1 */}
          {currentStep === 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Cédula de Identidad Testigos</h2>
              <input
                type="text"
                name="cedula_1"
                placeholder="Cédula Testigo 1"
                value={formData.cedula_1}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
              />
              <input
                type="text"
                name="cedula_2"
                placeholder="Cédula Testigo 2"
                value={formData.cedula_2}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
              />
              <input
                type="text"
                name="motivo"
                placeholder="Motivo de Solicitud"
                value={formData.motivo}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          )}

          {/* Navegación */}
          <div className="flex items-center justify-center mt-8">
            <button
              type="button"
              onClick={handleNext}
              className={`bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition" ${currentStep === 1 ? "hidden" : ""}`}
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    )}
  </>
  );
};

export default ServiceCards;
