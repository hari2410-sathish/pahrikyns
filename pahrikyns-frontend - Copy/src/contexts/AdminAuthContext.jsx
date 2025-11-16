// src/contexts/AdminAuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { isAdminLoggedIn, adminLogout } from "../utils/auth";

export const AdminAuthContext = createContext();

export default function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
  }, []);

  const logout = () => {
    adminLogout();
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, setIsAdmin, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
