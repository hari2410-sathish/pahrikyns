// src/components/layout/AppSidebar.jsx
import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { Link } from "react-router-dom";
import { navbarCourses } from "../../data/navbarCourses";
import { AppThemeContext } from "../../ThemeContext";

export default function AppSidebar({ open, onClose }) {
  const { variant, setVariant } = React.useContext(AppThemeContext);
  const [profileOpen, setProfileOpen] = useState(false);

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
          width: 300,
          background: "linear-gradient(180deg, #050b14, #061221, #020617)",
          backdropFilter: "blur(25px)",
          borderRight: "1px solid rgba(6, 182, 212, 0.4)",
          boxShadow: "0 0 35px #06b6d455",
          color: "white",
          overflow: "hidden",
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
          borderBottom: "1px solid rgba(6,182,212,0.15)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, background: "-webkit-linear-gradient(#06b6d4,#7c3aed)", WebkitBackgroundClip: "text", color: "transparent" }}
        >
          PAHRIKYNS
        </Typography>

        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* USER PROFILE (LOGIN DROPDOWN) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 2,
          cursor: "pointer",
          "&:hover": { background: "rgba(6,182,212,0.15)" },
        }}
        onClick={() => setProfileOpen(!profileOpen)}
      >
        <Avatar
          sx={{
            width: 42,
            height: 42,
            background: "linear-gradient(135deg,#06b6d4,#7c3aed)",
            boxShadow: "0 0 18px #06b6d455",
          }}
        />
        <Box>
          <Typography sx={{ fontWeight: 800 }}>Hari Sathish</Typography>
          <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
            DevOps Student
          </Typography>
        </Box>
      </Box>

      {profileOpen && (
        <Box
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <button className="sidebar-profile-dropdown-btn">Profile</button>
          <button className="sidebar-profile-dropdown-btn">Settings</button>
          <button className="sidebar-profile-dropdown-btn">Logout</button>
        </Box>
      )}

      <Divider sx={{ my: 1, borderColor: "rgba(6,182,212,0.15)" }} />

      {/* MAIN LINKS */}
      <List sx={{ py: 1 }}>
        <ListItemButton component={Link} to="/" onClick={onClose}>
          <ListItemIcon><HomeIcon sx={{ color: "#06eaff" }} /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton component={Link} to="/courses" onClick={onClose}>
          <ListItemIcon><SchoolIcon sx={{ color: "#22e0ff" }} /></ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>

        <ListItemButton component={Link} to="/dashboard" onClick={onClose}>
          <ListItemIcon><DashboardIcon sx={{ color: "#7c3aed" }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </List>

      {/* DEVOPS TOOLS LIST */}
      <Divider sx={{ my: 2, borderColor: "rgba(6,182,212,0.15)" }} />
      <Typography sx={{ px: 2, py: 1, opacity: 0.7, fontSize: 12 }}>DEVOPS TOOLS</Typography>

      {navbarCourses[0].tools.map((tool) => (
        <ListItemButton key={tool.name} component={Link} to={tool.path} onClick={onClose}>
          <ListItemIcon>{tool.icon}</ListItemIcon>
          <ListItemText primary={tool.name} />
        </ListItemButton>
      ))}

      {/* THEME SWITCH */}
      <Divider sx={{ my: 2, borderColor: "rgba(6,182,212,0.15)" }} />
      <ListItemButton onClick={toggleTheme}>
        <ListItemIcon>
          {variant === "futuristic" ? (
            <LightModeIcon sx={{ color: "yellow" }} />
          ) : (
            <DarkModeIcon sx={{ color: "#90caf9" }} />
          )}
        </ListItemIcon>
        <ListItemText primary={variant === "futuristic" ? "Light Mode" : "Futuristic Mode"} />
      </ListItemButton>
    </Drawer>
  );
}
