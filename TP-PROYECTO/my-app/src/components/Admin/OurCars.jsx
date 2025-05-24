import React from "react";
import CarsCard from "./CarsCard";

const OurCars = () => {
  const carsData = [
    {
      id: 0,
      name: "Alejandro Nicolás Martinez López",
      ci:"3333333",
      name_1: "Luis Reyes",
      ci_1:"1111111",
      name_2: "Matias Jaqueline",
      ci_2:"00000000",
      
    },
    {
      id: 1,
      name: "Luis Reyes",
      ci:"1111111",
      name_1: "Alejandro Nicolás Martinez López",
      ci_1:"33333333",
      name_2: "Matias Jaqueline",
      ci_2:"00000000",
    },
    
  ];

  return (
    <div className=" container pt-24">
      <div>
        <h1 className=" font-bold text-4xl text-center">
          Aprobaciones Administrativas
        </h1>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5 mt-5">
        {carsData.map((item) => {
          return (
            <div>
              <CarsCard
                key={item.id}
                ci={item.ci}
                ci_1={item.ci_1}
                ci_2={item.ci_2}
                name={item.name}
                name_1={item.name_1}
                name_2={item.name_2}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurCars;
