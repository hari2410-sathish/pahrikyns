// src/components/Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { Link } from "react-router-dom";
import { navbarCourses } from "../data/navbarCourses";
import { AppThemeContext } from "../ThemeContext";

export default function Sidebar({ open, onClose }) {
  const { variant, setVariant } = React.useContext(AppThemeContext);

  const toggleTheme = () => {
    setVariant(variant === "futuristic" ? "corporate" : "futuristic");
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          background: "linear-gradient(180deg,#040b12,#07121e,#040b12)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          color: "white",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 2,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          PAHRIKYNS
        </Typography>

        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* MAIN NAV */}
      <List sx={{ py: 1 }}>
        <ListItemButton component={Link} to="/" onClick={onClose}>
          <ListItemIcon>
            <HomeIcon sx={{ color: "#5ee5ff" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton component={Link} to="/courses" onClick={onClose}>
          <ListItemIcon>
            <SchoolIcon sx={{ color: "#a6ffcf" }} />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>

        <ListItemButton component={Link} to="/dashboard" onClick={onClose}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#ffd06a" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* CATEGORY: DevOps - dynamic listing */}
        <Typography
          sx={{ px: 2, py: 1, opacity: 0.6, fontSize: 13, letterSpacing: 1 }}
        >
          DEVOPS TOOLS
        </Typography>

        {navbarCourses[0].tools.map((tool) => (
          <ListItemButton
            key={tool.name}
            component={Link}
            to={tool.path}
            onClick={onClose}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{tool.icon}</ListItemIcon>
            <ListItemText primary={tool.name} />
          </ListItemButton>
        ))}

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* AUTH */}
        <ListItemButton component={Link} to="/login" onClick={onClose}>
          <ListItemIcon>
            <LoginIcon sx={{ color: "#8bc6ff" }} />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItemButton>

        <ListItemButton component={Link} to="/admin/login" onClick={onClose}>
          <ListItemIcon>
            <AdminPanelSettingsIcon sx={{ color: "#ff839a" }} />
          </ListItemIcon>
          <ListItemText primary="Admin Login" />
        </ListItemButton>

        {/* Theme Toggle */}
        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />
        <ListItemButton onClick={toggleTheme}>
          <ListItemIcon>
            {variant === "futuristic" ? (
              <LightModeIcon sx={{ color: "yellow" }} />
            ) : (
              <DarkModeIcon sx={{ color: "#90caf9" }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              variant === "futuristic" ? "Light Mode" : "Futuristic Mode"
            }
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
