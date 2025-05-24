import React, { useState } from "react";

const ServiceCards = () => {
  // Estado para el paso actual
  const [currentStep, setCurrentStep] = useState(0);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    cedula_1: "",
    cedula_2: "",
   
  });

  // Lista de pasos
  const steps = ["Step 1: Personal Info", "Step 2: Address", "Step 3: Review & Submit"];
  const totalSteps = steps.length;

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Actualizar los indicadores y líneas
  const updateIndicators = (stepIndex) => {
    return {
      indicatorClass: (index) =>
        index <= stepIndex
          ? "bg-blue-800 text-white"
          : "bg-gray-300 text-gray-600",
      lineClass: (index) =>
        index < stepIndex ? "bg-blue-800" : "bg-gray-300",
    };
  };

  // Calcular el progreso de la barra
  const updateProgressBar = (stepIndex) => {
    return ((stepIndex + 1) / totalSteps) * 100;
  };

  // Mostrar el paso actual
  const showStep = (index) => {
    setCurrentStep(index);
  };

  // Avanzar al siguiente paso
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Form Submitted!");
      console.log("Form Data:", formData);
    }
  };

  // Retroceder al paso anterior
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { indicatorClass, lineClass } = updateIndicators(currentStep);
  const progressPercentage = updateProgressBar(currentStep);

  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
      {/* Indicadores de pasos */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 w-full">
          {/* Step 1 */}
          <div className="relative flex-1 flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${indicatorClass(
                0
              )}`}
            >
              1
            </div>
            <div
              className={`absolute w-full h-1 left-0 top-1/2 transform translate-y-[-50%] z-[-1] transition-colors duration-300 ${lineClass(
                0
              )}`}
            ></div>
          </div>
          {/* Step 2 */}
          <div className="relative flex-1 flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${indicatorClass(
                1
              )}`}
            >
              2
            </div>
            <div
              className={`absolute w-full h-1 left-0 top-1/2 transform translate-y-[-50%] z-[-1] transition-colors duration-300 ${lineClass(
                1
              )}`}
            ></div>
          </div>
          {/* Step 3 */}
          <div>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${indicatorClass(
                2
              )}`}
            >
              3
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-blue-800 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Contenido del formulario */}
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Step 1 */}
        <div className={`step ${currentStep === 0 ? "" : "hidden"}`}>
          <h2 className="text-xl font-semibold mb-4"> Cedula de Identidad Testigos</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="Cedula_1"
              placeholder="Cedula Testigo 1"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-gray-500"
            />
            <input
              type="text"
              name="Cedula_2"
              placeholder="Cedula Testigo 2"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-gray-500"
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className={`step ${currentStep === 1 ? "" : "hidden"}`}>
          <h2 className="text-xl font-semibold mb-4">Esperando a que los testigos acepten</h2>
           <p className="mb-4">Se a enviado una notificación a los testigos.</p> 
          <ul className="list-disc pl-5 space-y-2">
            <li > 
              <strong>Nombre:</strong> <span>{formData.name || " DEBE TRAER DE LA BASE DE DATOS "}</span>
              <strong className="px-5">Cedula:</strong>{" "}
              <span>{formData.Cedula_1 || " "}</span>
            </li>
            
            <li > 
              <strong>Nombre:</strong> <span>{formData.name || "DEBE TRAER DE LA BASE DE DATOS "}</span>
              <strong className="px-5">Cedula:</strong>{" "}
              <span>{formData.Cedula_2 || " "}</span>
            </li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className={`step ${currentStep === 2 ? "" : "hidden"}`}>
          <h2 className="text-xl font-semibold mb-4">Esperando a que el oficial encargado apruebe</h2>
         {/* <p className="mb-4">Please review your information before submitting.</p>
            <li>
              <strong>Name:</strong> <span>{formData.name || "John Doe"}</span>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <span>{formData.email || "john.doe@example.com"}</span>
            </li>
            <li>
              <strong>Address:</strong>{" "}
              <span>{`${formData.street || "123 Main St"}, ${
                formData.city || "City"
              }, ${formData.postalCode || "12345"}`}</span>
            </li>
          </ul>*/ }
       
        </div>

        {/* Navegación */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrev}
            className={`bg-gray-300 text-gray-700 px-6 py-2 rounded-lg ${
              currentStep === 0 ? "hidden" : ""
            }`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`bg-gray-600 text-white px-6 py-2 rounded-lg ${
              currentStep === 2 ? "hidden" : ""
            }`}
          >
            Aceptar
          </button> 
        </div>
      </form>
    </div>
  );
};

export default ServiceCards;