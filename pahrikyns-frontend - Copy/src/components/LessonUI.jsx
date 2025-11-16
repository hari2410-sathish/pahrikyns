import React from "react";
import { Paper } from "@mui/material";

export default function LessonUI({ title, children }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "background.default",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>{title}</h1>
      {children}
    </Paper>
  );
}
