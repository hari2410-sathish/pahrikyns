// src/pages/admin/Sidebar.jsx
import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import QuizIcon from "@mui/icons-material/Quiz";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

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
        width: collapsed ? "90px" : "260px",
        transition: "0.25s ease",
        background: "rgba(255,255,255,0.03)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
          mb: 4,
          px: collapsed ? 0 : 1,
        }}
      >
        {!collapsed && (
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 900,
              letterSpacing: 1,
              textShadow: "0 0 10px var(--neon-blue)",
              opacity: 0.95,
            }}
          >
            PAHRIKYNS ADMIN
          </Typography>
        )}

        <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setCollapsed((x) => !x)}
          >
            {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Menu Items */}
      <Box sx={{ flex: 1 }}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
            style={{
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: collapsed ? "12px" : "12px 16px",
              justifyContent: collapsed ? "center" : "flex-start",
              transition: "0.25s ease",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: collapsed ? "28px" : "20px",
                transition: "0.25s ease",
              }}
            >
              {item.icon}
            </Box>

            {!collapsed && (
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                {item.label}
              </Typography>
            )}
          </NavLink>
        ))}
      </Box>

      {/* Footer small label */}
      {!collapsed && (
        <Typography
          sx={{
            textAlign: "center",
            color: "rgba(255,255,255,0.35)",
            fontSize: 12,
            mt: 2,
          }}
        >
          © Pahrikyns 2025
        </Typography>
      )}
    </Box>
  );
}
