// src/components/NotificationsPanel.jsx
import React from "react";
import { Box, Paper, Typography, IconButton, Stack, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNotifications } from "../contexts/NotificationContext";

export default function NotificationsPanel({ onClose }) {
  const { items, markSeen, remove, clearAll } = useNotifications();

  return (
    <Paper sx={{ width: 360, maxHeight: "70vh", overflowY: "auto", p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography sx={{ fontWeight: 800 }}>Notifications</Typography>
        <Box>
          <Button size="small" onClick={clearAll}>Clear</Button>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </Box>
      </Box>

      <Stack spacing={1}>
        {items.length === 0 && <Typography sx={{ opacity: 0.6 }}>No notifications</Typography>}

        {items.map((it) => (
          <Paper key={it.id} sx={{ p: 1.25, background: it.seen ? "rgba(255,255,255,0.02)" : "linear-gradient(90deg, rgba(6,182,212,0.04), rgba(124,58,237,0.03))" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>{it.title}</Typography>
                <Typography sx={{ fontSize: 13, opacity: 0.85 }}>{it.message}</Typography>
                <Typography sx={{ fontSize: 11, opacity: 0.6 }}>{new Date(it.createdAt).toLocaleString()}</Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Button size="small" onClick={() => markSeen(it.id)}>Mark</Button>
                <Button size="small" color="error" onClick={() => remove(it.id)}>Delete</Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
