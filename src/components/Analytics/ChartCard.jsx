// src/components/Analytics/ChartCard.jsx
import React from "react";
import { Paper, Typography } from "@mui/material";

export default function ChartCard({ title, children }) {
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
      <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
