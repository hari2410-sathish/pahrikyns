// src/components/NavBar.jsx

import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { Link } from "react-router-dom";

import { navbarCourses } from "../data/navbarCourses";
import { AppThemeContext } from "../ThemeContext";

import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const [courseMenu, setCourseMenu] = useState(null);
  const [toolMenuAnchor, setToolMenuAnchor] = useState(null);
  const [tools, setTools] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { variant, setVariant } = useContext(AppThemeContext);

  const openCourseMenu = (e) => setCourseMenu(e.currentTarget);
  const closeCourseMenu = () => setCourseMenu(null);

  const openToolsMenu = (e, list) => {
    setTools(list);
    setToolMenuAnchor(e.currentTarget);
  };

  const closeToolsMenu = () => setToolMenuAnchor(null);

  const closeAllMenus = () => {
    closeCourseMenu();
    closeToolsMenu();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        px: 3,
        py: 1,
        backgroundColor: "background.paper",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* ========== MOBILE HAMBURGER BUTTON ========== */}
        <IconButton
          sx={{ display: { xs: "block", md: "none" } }}
          color="inherit"
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Sidebar Drawer */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* LOGO */}
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          PAHRIKYNS Teaching
        </Typography>

        {/* ================= MAIN DESKTOP NAV ================= */}
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          flexWrap="wrap"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {/* LEVEL 1 MENU: CATEGORIES */}
          <Button color="inherit" onClick={openCourseMenu}>
            Courses ▾
          </Button>

          <Menu
            anchorEl={courseMenu}
            open={Boolean(courseMenu)}
            onClose={closeCourseMenu}
          >
            {navbarCourses.map((course) => (
              <MenuItem
                key={course.name}
                sx={{ fontWeight: "bold" }}
                onClick={(e) => openToolsMenu(e, course.tools)}
              >
                {course.icon} &nbsp; {course.name} ▶
              </MenuItem>
            ))}
          </Menu>

          {/* LEVEL 2 MENU: TOOLS */}
          <Menu
            anchorEl={toolMenuAnchor}
            open={Boolean(toolMenuAnchor)}
            onClose={closeToolsMenu}
          >
            {tools.map((tool) => (
              <MenuItem
                key={tool.name}
                onClick={closeAllMenus}
                component={Link}
                to={tool.path}
              >
                {tool.icon} &nbsp; {tool.name}
              </MenuItem>
            ))}
          </Menu>

          {/* SEARCH BAR */}
          <SearchBar />

          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>

          <Button color="inherit" component={Link} to="/admin/login">
            Admin
          </Button>

          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
          >
            Register
          </Button>

          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>

          {/* THEME SWITCH BUTTON */}
          <IconButton
            color="inherit"
            onClick={() =>
              setVariant(
                variant === "futuristic" ? "corporate" : "futuristic"
              )
            }
          >
            {variant === "futuristic" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
