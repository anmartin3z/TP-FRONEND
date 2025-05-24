import React from "react";

const CarsCard = ({ id, ci, name, price }) => {
  return (
    <div
      className="border-2 border-secondary bg-slate-100 text-black rounded-xl mb-2 cursor-pointer"
      key={id}
    >
      <h1 className=" font-bold text-xl ">{ci}</h1>
      <h1 className=" font-bold text-xl ">{name}</h1>
     
      <div className=" flex px-1 pb-2">
        {/* <h3 className=" font-semibold text-xl">${price}</h3> */}
        <button className=" bg-secondary text-Black border text-base md:text-lg px-2 md:px-3 py-1 rounded-md hover:bg-primary transition duration-200 ease-linear">
          Aprobar
        </button>
        <button className=" bg-secondary text-Black border text-base md:text-lg px-2 md:px-3 py-1 rounded-md hover:bg-primary transition duration-200 ease-linear">
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default CarsCard;
