// PREMIUM ANIMATED NAVBAR
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
  Box,
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

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="nav-animate"
      sx={{
        px: 3,
        py: 1,
        background: "rgba(8,12,20,0.55)",
        backdropFilter: "blur(20px)",
        animation: "bgFloat 6s infinite ease-in-out",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
        
        {/* MOBILE BUTTON */}
        <IconButton
          sx={{ display: { xs: "block", md: "none" }, color: "white" }}
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* LOGO + TITLE */}
        <Box
          component={Link}
          to="/"
          sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
        >
          <Box
            component="img"
            src="/assets/logos/jenkins.png"
            alt="logo"
            className="logo-animated"
            sx={{
              width: 43,
              height: 43,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #00eaff",
            }}
          />

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 900,
              background: "linear-gradient(90deg,#00eaff,#6a11cb)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            PAHRIKYNS Teaching
          </Typography>
        </Box>

        {/* CENTER NAV ITEMS */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          sx={{
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
            ml: 5,
          }}
        >
          <Button className="nav-item" component={Link} to="/" sx={{ color: "white", fontWeight: 600 }}>
            Home
          </Button>

          <Button
            className="nav-item"
            sx={{ color: "white", fontWeight: 600 }}
            onClick={(e) => setCourseMenu(e.currentTarget)}
          >
            Courses ▾
          </Button>

          {/* LEVEL MENU */}
          <Menu anchorEl={courseMenu} open={Boolean(courseMenu)} onClose={() => setCourseMenu(null)}>
            {navbarCourses.map((course) => (
              <MenuItem
                key={course.name}
                onClick={(e) => {
                  setToolMenuAnchor(e.currentTarget);
                  setCourseMenu(null);
                  setTools(course.tools);
                }}
              >
                {course.icon} &nbsp; {course.name} ▶
              </MenuItem>
            ))}
          </Menu>

          <Menu anchorEl={toolMenuAnchor} open={Boolean(toolMenuAnchor)} onClose={() => setToolMenuAnchor(null)}>
            {tools.map((tool) => (
              <MenuItem key={tool.name} component={Link} to={tool.path}>
                {tool.icon} &nbsp; {tool.name}
              </MenuItem>
            ))}
          </Menu>

          {/* SEARCH BAR ANIMATED */}
          <Box className="search-focus">
            <SearchBar />
          </Box>
        </Stack>

        {/* RIGHT SECTION */}
        <Stack direction="row" spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
          
          <Button className="nav-item" component={Link} to="/dashboard" sx={{ color: "white", fontWeight: 600 }}>
            Dashboard
          </Button>

          <Button className="nav-item" component={Link} to="/admin/login" sx={{ color: "white", fontWeight: 600 }}>
            Admin
          </Button>

          <Button
            component={Link}
            to="/register"
            className="gradient-shift"
            sx={{
              color: "white",
              fontWeight: 700,
              px: 3,
              borderRadius: 2,
            }}
          >
            Register
          </Button>

          <Button className="nav-item" component={Link} to="/login" sx={{ color: "white", fontWeight: 600 }}>
            Login
          </Button>

          {/* THEME TOGGLE ANIMATED */}
          <IconButton
            className="theme-rotate"
            sx={{ color: "white" }}
            onClick={() =>
              setVariant(variant === "futuristic" ? "corporate" : "futuristic")
            }
          >
            {variant === "futuristic" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
