// src/pages/Login.jsx — V3 Modern Gradient Premium

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: replace with your real login (notify + navigate)
    if (!email.trim() || !password.trim()) {
      alert("Please fill in both fields");
      return;
    }
    alert("Login success (wire this to backend)");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 0 },
        // 🔮 background gradient like reference
        background:
          "linear-gradient(135deg, #191445 0%, #5a1fdc 45%, #f441c8 100%)",
      }}
    >
      {/* MAIN WRAPPER: illustration left, card right */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* LEFT SIDE — Illustration */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-authentication-security-password-10238492-8297111.png"
            alt="Login illustration"
            style={{
              width: "100%",
              maxWidth: "520px",
            }}
          />
        </Box>

        {/* RIGHT SIDE — White rounded login card */}
        <Paper
          elevation={16}
          sx={{
            flex: 0.9,
            maxWidth: 460,
            borderRadius: 6,
            p: { xs: 3, md: 4 },
            background:
              "linear-gradient(135deg, #ffffff 0%, #f9f4ff 40%, #fdfbff 100%)",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 1.5, color: "#111827" }}
          >
            Welcome Back
          </Typography>
          <Typography
            sx={{
              mb: 4,
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            Log in to continue your learning journey
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 999,
                  backgroundColor: "#ffffff",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: "#9ca3af" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password field */}
            <TextField
              label="Password"
              type={showPass ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 999,
                  backgroundColor: "#ffffff",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#9ca3af" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Gradient Login Button */}
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 0.5,
                py: 1.1,
                borderRadius: 999,
                fontWeight: 700,
                textTransform: "none",
                fontSize: 15,
                background:
                  "linear-gradient(90deg, #f441c8 0%, #9b4dff 40%, #2563eb 100%)",
                color: "white",
                boxShadow: "0 18px 40px rgba(37, 99, 235, 0.45)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #f441c8 0%, #8b3ef0 40%, #1d4ed8 100%)",
                  boxShadow: "0 20px 45px rgba(37, 99, 235, 0.6)",
                },
              }}
            >
              Login
            </Button>
          </form>

          {/* Register link */}
          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            Don&apos;t have an account?{" "}
            <span
              style={{
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Register
            </span>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
