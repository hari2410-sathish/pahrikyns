// src/pages/admin/AdminLayout.jsx
import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { motion } from "framer-motion";

export default function AdminLayout() {
  const { visible } = useLoading();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#0f172a" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Topbar />

        {/* Page animation wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box className="glass-card" sx={{ p: 3 }}>
              <Outlet />
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Global Loading Overlay */}
      <LoadingSpinner open={visible} />
    </Box>
  );
}
