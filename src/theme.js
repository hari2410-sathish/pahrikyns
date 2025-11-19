// src/theme.js
import { createTheme } from "@mui/material/styles";

/* ------------------------------------------------------
   FUTURISTIC THEME (Your original, 100% kept)
------------------------------------------------------ */
export const futuristic = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#06b6d4" },
    secondary: { main: "#7c3aed" },
    background: { default: "#05060a", paper: "#071021" },
    text: { primary: "#e6f7fb", secondary: "#9fbfc9" }
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "Inter, Roboto, sans-serif" },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          backdropFilter: "blur(8px) saturate(150%)",
          boxShadow: "0 6px 30px rgba(2,6,23,0.6)",
          border: "1px solid rgba(255,255,255,0.03)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, textTransform: "none" },
        containedPrimary: {
          background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
          color: "#fff"
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(180deg, rgba(5,7,12,0.6), rgba(5,7,12,0.3))",
          borderBottom: "1px solid rgba(255,255,255,0.03)"
        }
      }
    }
  }
});

/* ------------------------------------------------------
   CORPORATE THEME (New clean light mode)
------------------------------------------------------ */
export const corporate = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    background: { default: "#f5f7fa", paper: "#ffffff" },
    text: { primary: "#1a1a1a", secondary: "#4a5568" }
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h4: { fontWeight: 800 }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#fff",
          boxShadow:
            "0px 2px 8px rgba(0,0,0,0.05), 0px 1px 3px rgba(0,0,0,0.03)",
          border: "1px solid rgba(0,0,0,0.06)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#ffffff",
          color: "#1a1a1a",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
        }
      }
    }
  }
});
