// src/components/LoadingSpinner.jsx
import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function LoadingSpinner({ open }) {
  return (
    <Backdrop sx={{ zIndex: 9999, color: "#fff" }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
