import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function TopNav() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "#fff",
        color: "#1a1a1a",
        borderBottom: "1px solid #e1e4e8",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
          Greetings, User!
        </Typography>

        <Box
          sx={{
            background: "#f1f3f5",
            px: 2,
            py: 0.8,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: 280,
          }}
        >
          <SearchIcon sx={{ opacity: 0.7 }} />
          <InputBase placeholder="Search..." fullWidth />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton><NotificationsNoneIcon /></IconButton>
          <IconButton><AccountCircleIcon /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
