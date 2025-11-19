// src/ThemeContext.jsx
import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

// Import your themes
import { futuristic, corporate } from "./theme";

// Create context
export const AppThemeContext = createContext({
  variant: "futuristic",
  setVariant: () => {},
});

export default function AppThemeProvider({ children }) {
  const [variant, setVariant] = useState("futuristic");

  // Select active theme dynamically
  const theme = useMemo(() => {
    switch (variant) {
      case "corporate":
        return corporate;
      default:
        return futuristic;
    }
  }, [variant]);

  return (
    <AppThemeContext.Provider value={{ variant, setVariant }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
