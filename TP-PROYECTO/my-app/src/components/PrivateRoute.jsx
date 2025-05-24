// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // Evita flicker

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) return null; // o un spinner opcional

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
