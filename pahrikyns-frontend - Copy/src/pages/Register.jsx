// src/pages/Register.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNotify } from "../components/NotificationProvider";

export default function Register() {
  const notify = useNotify();

  const [otpSent, setOtpSent] = useState(false);

  // Form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    otp: ""
  });

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function sendOtp(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.dob || !form.password) {
      return notify("Please fill all fields", "error");
    }

    if (form.password.length < 10) {
      return notify("Password must be at least 10 characters", "error");
    }

    // Mock OTP sending (replace with backend)
    setOtpSent(true);
    notify("OTP sent to your email", "success");
  }

  function verifyOtp() {
    if (!form.otp.trim()) {
      return notify("Enter OTP", "error");
    }

    // Mock verify
    notify("Registration successful!", "success");
  }

  return (
    <Box sx={{ maxWidth: 520, mx: "auto", px: 3, py: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
          Register
        </Typography>

        <form onSubmit={sendOtp}>
          <TextField
            label="Full name"
            fullWidth
            sx={{ mb: 2 }}
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <TextField
            label="Phone"
            fullWidth
            sx={{ mb: 2 }}
            required
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          <TextField
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mb: 2 }}
            required
            value={form.dob}
            onChange={(e) => updateField("dob", e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{ minLength: 10 }}
            required
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
          />

          {!otpSent ? (
            <Button type="submit" variant="contained" fullWidth>
              Send OTP
            </Button>
          ) : (
            <>
              <TextField
                label="Enter OTP"
                fullWidth
                sx={{ my: 2 }}
                value={form.otp}
                onChange={(e) => updateField("otp", e.target.value)}
              />

              <Button variant="contained" fullWidth onClick={verifyOtp}>
                Verify & Register
              </Button>
            </>
          )}
        </form>
      </Paper>
    </Box>
  );
}
