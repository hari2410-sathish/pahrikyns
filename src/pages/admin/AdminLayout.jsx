// src/pages/admin/AdminLayout.jsx
import React from "react";
import { Box } from "@mui/material";
import AppSidebar from "../../components/layout/AppSidebar";

import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdminLayout() {
  const { visible } = useLoading();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "transparent" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Topbar />

        {/* Page Content - FULL WIDTH */}
        <Box sx={{ p: { xs: 2, md: 3 }, width: "100%", maxWidth: "100%" }}>
          <Outlet />
        </Box>
      </Box>

      {/* Global Loading */}
      <LoadingSpinner open={visible} />
    </Box>
  );
}
