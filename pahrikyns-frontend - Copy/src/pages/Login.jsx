// src/pages/Login.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotify } from "../components/NotificationProvider";

export default function Login() {
  const navigate = useNavigate();
  const notify = useNotify();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return notify("Please fill in both fields", "error");
    }

    // mock login – replace with backend later
    notify("Logged in successfully!", "success");

    navigate("/dashboard");
  }

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", px: 3, py: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
