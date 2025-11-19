// src/components/layout/Topbar.jsx
import React from "react";
import { AppBar, Toolbar, Box, InputBase, IconButton, Avatar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Topbar() {
  return (
    <AppBar position="static" elevation={0} color="transparent" sx={{ background: "transparent", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flex: 1, fontWeight: 700 }}>Greetings, Clyde!</Typography>

        <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "60%", background: "#f1f3f5", borderRadius: 8, px: 2, display: "flex", alignItems: "center" }}>
            <SearchIcon color="action" />
            <InputBase placeholder="Search..." sx={{ ml: 1, width: "100%" }} />
          </Box>
        </Box>

        <IconButton><NotificationsNoneIcon /></IconButton>
        <IconButton><SettingsIcon /></IconButton>
        <Avatar sx={{ ml: 1 }}>C</Avatar>
      </Toolbar>
    </AppBar>
  );
}
