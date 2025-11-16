// src/components/LogoutButton.jsx
import React from "react";
import { Button } from "@mui/material";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logoutAdmin } = useAdminAuth();
  const nav = useNavigate();
  function doLogout() {
    logoutAdmin();
    nav("/admin/login");
  }
  return (
    <Button variant="outlined" size="small" onClick={doLogout} sx={{ color: "inherit", borderColor: "rgba(255,255,255,0.12)" }}>
      Logout
    </Button>
  );
}
