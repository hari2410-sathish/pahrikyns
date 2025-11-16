import React, { useContext, useState } from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../utils/auth";
import { AdminAuthContext } from "../../contexts/AdminAuthContext";

export default function AdminLogin() {
  const nav = useNavigate();
  const { setIsAdmin } = useContext(AdminAuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const result = adminLogin(email, password);

    if (result.success) {
      setIsAdmin(true);
      nav("/admin/dashboard");
    } else {
      alert(result.message);
    }
  }

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Admin Login</Typography>

        <TextField 
          fullWidth label="Email" 
          sx={{ mb: 2 }} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField 
          fullWidth label="Password" 
          type="password"
          sx={{ mb: 2 }} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Login
        </Button>
      </Paper>
    </Box>
  );
}
