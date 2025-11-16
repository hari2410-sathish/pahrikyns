// src/pages/admin/Topbar.jsx
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Topbar() {
  return (
    <Box
      sx={{
        height: 65,
        px: 3,
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
      }}
    >
      <Typography
        sx={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}
      >
        Admin Panel
      </Typography>

      <IconButton
        sx={{
          color: "#fff",
          "&:hover": { opacity: 0.8 },
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
}
