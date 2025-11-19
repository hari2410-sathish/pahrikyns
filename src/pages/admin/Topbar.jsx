// src/pages/admin/Topbar.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Popover,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { motion } from "framer-motion";

import NotificationsPanel from "../../components/NotificationsPanel";
import { useNotifications } from "../../contexts/NotificationContext";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

export default function Topbar() {
  const [anchorUser, setAnchorUser] = useState(null);
  const [anchorNotif, setAnchorNotif] = useState(null);

  const { items } = useNotifications();
  const { logout } = useAdminAuth();

  const unread = items.filter((i) => !i.seen).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Box
        sx={{
          height: 72,
          px: 3,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06))",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        {/* LEFT TITLE */}
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "0.5px",
            textShadow: "0 0 12px rgba(0,255,255,0.3)",
          }}
        >
          Admin Panel
        </Typography>

        {/* RIGHT ICONS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

          {/* NOTIFICATION BELL */}
          <IconButton
            onClick={(e) => setAnchorNotif(e.currentTarget)}
            sx={{
              color: "#fff",
              position: "relative",
              "&:hover": { color: "#06b6d4" },
              transition: "0.25s",
            }}
          >
            <NotificationsIcon sx={{ fontSize: 28 }} />

            {unread > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  background: "#ef4444",
                  width: 18,
                  height: 18,
                  fontSize: 11,
                  borderRadius: "50%",
                  textAlign: "center",
                  lineHeight: "18px",
                  color: "#fff",
                  boxShadow: "0 0 6px rgba(255,0,0,0.6)",
                  animation: "pulse 1.3s infinite",
                }}
              >
                {unread}
              </Box>
            )}
          </IconButton>

          {/* USER PROFILE */}
          <IconButton
            onClick={(e) => setAnchorUser(e.currentTarget)}
            sx={{
              color: "#fff",
              "&:hover": { color: "#7c3aed" },
              transition: "0.25s",
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.15)",
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </Avatar>
          </IconButton>
        </Box>

        {/* NOTIFICATION PANEL */}
        <Popover
          open={Boolean(anchorNotif)}
          anchorEl={anchorNotif}
          onClose={() => setAnchorNotif(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
              width: 350,
            },
          }}
        >
          <NotificationsPanel onClose={() => setAnchorNotif(null)} />
        </Popover>

        {/* USER MENU */}
        <Menu
          anchorEl={anchorUser}
          open={Boolean(anchorUser)}
          onClose={() => setAnchorUser(null)}
          PaperProps={{
            sx: {
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
              width: 200,
              color: "#fff",
            },
          }}
        >
          <MenuItem>
            <SettingsIcon sx={{ mr: 1 }} /> Settings
          </MenuItem>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

          <MenuItem
            onClick={logout}
            sx={{ color: "#ef4444", fontWeight: 700 }}
          >
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Box>
    </motion.div>
  );
}
