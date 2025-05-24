import React from "react";
import img5 from "../../assets/img/img5.png";
import img6 from '../../assets/img/img6.png';

const Vision = () => {
  return (
   <footer className=" text-black mt-5" >
         
        
        
             <div className="flex flex-col items-center">
                {/* Contenedor para las imágenes, centradas con espacio entre ellas */}
                <div className="flex justify-center gap-4">
                  <img src={img6} alt="Logo 1" className="w-40" />
                  {/* <img src={img5} alt="Logo 2" className="w-40" /> */}
                </div>

                {/* Texto centrado como ya lo tenías */}
                <p className="text-center py-5">
                  Términos y Condiciones - ¿Qué es la Identidad Electrónica?
                </p>
              </div>
             
        
   </footer>
  );
};

export default Vision;
