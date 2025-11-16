// src/routes/ProtectedAdminRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../contexts/AdminAuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { isAdmin } = useContext(AdminAuthContext);

  // Not logged in → redirect to admin login
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in → allow access
  return children;
}
