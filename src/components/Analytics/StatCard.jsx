// src/components/Analytics/StatCard.jsx
import React from "react";
import { Paper, Typography } from "@mui/material";

export default function StatCard({ title, value, subtitle }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
      }}
    >
      <Typography sx={{ fontSize: 14, opacity: 0.7 }}>{subtitle}</Typography>
      <Typography sx={{ fontSize: 32, fontWeight: 800 }}>{value}</Typography>
      <Typography sx={{ opacity: 0.9 }}>{title}</Typography>
    </Paper>
  );
}
