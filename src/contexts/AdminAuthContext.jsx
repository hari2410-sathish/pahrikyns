// src/contexts/AdminAuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { isAdminLoggedIn, adminLogout } from "../utils/auth";

// MAIN CONTEXT
export const AdminAuthContext = createContext();

// CUSTOM HOOK (🔥 this was missing)
export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

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
