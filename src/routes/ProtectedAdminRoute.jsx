// src/routes/ProtectedAdminRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../contexts/AdminAuthContext"; // ✅ Correct path

export default function ProtectedAdminRoute({ children }) {
  const { isAdmin } = useContext(AdminAuthContext);

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
