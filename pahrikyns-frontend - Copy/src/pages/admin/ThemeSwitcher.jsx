// src/pages/admin/ThemeSwitcher.jsx
import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AppThemeContext } from "../../ThemeContext";

export default function ThemeSwitcher(){
  const { variant, setVariant } = useContext(AppThemeContext);
  return (
    <IconButton onClick={() => setVariant(variant === "futuristic" ? "corporate" : "futuristic")} sx={{ color: 'inherit' }}>
      {variant === "futuristic" ? <LightModeIcon/> : <DarkModeIcon/>}
    </IconButton>
  );
}
