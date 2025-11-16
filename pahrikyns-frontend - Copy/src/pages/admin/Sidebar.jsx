// src/pages/admin/Sidebar.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import QuizIcon from "@mui/icons-material/Quiz";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

export default function Sidebar() {
  const items = [
    { label: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
    { label: "Manage Courses", to: "/admin/manage-courses", icon: <LibraryBooksIcon /> },
    { label: "Add Course", to: "/admin/add-course", icon: <AddBoxIcon /> },
    { label: "Projects", to: "/admin/projects", icon: <WorkspacesIcon /> },
    { label: "MCQ Tests", to: "/admin/mcq-tests", icon: <QuizIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 250,
        background: "rgba(255,255,255,0.04)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        p: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          fontWeight: 800,
          mb: 4,
          letterSpacing: 1,
        }}
      >
        PAHRIKYNS ADMIN
      </Typography>

      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {item.icon}
            {item.label}
          </Box>
        </NavLink>
      ))}
    </Box>
  );
}
