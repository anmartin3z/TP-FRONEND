import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Services from "./pages/Services";
import PrivateRoute from "./components/PrivateRoute";
import ServicePreview from "./components/Services/ServicePreview";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/services" element={<PrivateRoute><Services /></PrivateRoute>} />
          <Route path="/services/request/:id" element={<PrivateRoute><ServicePreview/></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
