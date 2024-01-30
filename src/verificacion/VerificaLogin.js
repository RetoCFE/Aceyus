import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element }) => {
  const isLoggedIn = () => {
    // Implementa tu lógica de verificación de inicio de sesión aquí
    const token = localStorage.getItem('token'); // Ejemplo: obtener el token del localStorage
    return !!token; // Devolver true si el token existe, false si no
  };

  return isLoggedIn() ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
