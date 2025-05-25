import React, { useState, useEffect, useRef } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import img from '../assets/img/img.png';
import { useNavigate } from "react-router-dom";
import NotificationButton from "./NotificationButton";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("usuario");
  const [menu, setMenu] = useState(false); // Para el menú responsivo
  const [isOpen, setIsOpen] = useState(false); // Para el dropdown
  const dropdownRef = useRef(null); // Para detectar clics fuera del dropdown
  const [userRole, setUserRole] = useState(null); // Nuevo estado para rol


  // Leer nombre del usuario al montar
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    setUserName(`${user.nombre} ${user.apellido}`);
    setUserRole(user.rol); // Guardar el rol
  }
}, []);
  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = () => setMenu(!menu);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // también limpiamos el nombre
    navigate("/");
  };

  return (
    <header className="fixed w-full z-10 bg-secondary text-blue py-4">
      {/* Desktop navigation section */}
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-2xl">
            <img src={img} alt="Logo" className="w-40" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-xl">
          <NotificationButton/>
          <Link
            to="/home"
            className="hover:text-primary transition duration-200 ease-linear"
          >
            <svg
              className="h-8 w-8 text-blue-950"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="5 12 3 12 12 3 21 12 19 12" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg>
          </Link>
          
           
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
          

          {/* Dropdown Menu */}
          <div className=" relative inline-block text-left" ref={dropdownRef}>
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-tertiary text-white px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-[#002d80]"
                id="menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setIsOpen(!isOpen)}
              >
                {userName}
                <svg
                  className="-mr-1 size-5 text-gray-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Mostrar el dropdown solo si isOpen es true */}
            {isOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menubutton"
                tabIndex="-1"
              >
               
               
                <div className="py-1" role="none">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2"
                  >
                    Mi Perfil
                  </Link>
                  
                </div>
                <div className="py-1" role="none">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-3"
                  >
                    Msi Documentos
                  </Link>
                </div>
                <div className="py-1" role="none">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-4"
                  >
                    Mis Pagos
                  </Link>
                </div>
                 <div className="py-1" role="none">
                 
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700"
                    >
                    Cerrar sesión
                  </button>
                  
                </div>
              </div>
              
            )}
          </div>
        </div>

       
      </nav>

      
    </header>
  );
};

export default Navbar;