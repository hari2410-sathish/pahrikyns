// src/pages/Register.jsx — V3 Modern Gradient Premium

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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register() {
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  function updateField(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      return alert("Please fill all fields");
    }

    alert("Registration success! (connect backend here)");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 4 },
        background:
          "linear-gradient(135deg, #191445 0%, #5a1fdc 45%, #f441c8 100%)",
      }}
    >
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
        {/* LEFT ILLUSTRATION */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/register-account-10238490-8297110.png"
            alt="Register illustration"
            style={{ width: "100%", maxWidth: "520px" }}
          />
        </Box>

        {/* RIGHT — WHITE CARD */}
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
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 2, color: "#111827" }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{ mb: 4, fontSize: 14, color: "#6b7280" }}
          >
            Join and start your learning journey today
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <TextField
              label="Full Name"
              fullWidth
              sx={{ mb: 2.5, "& .MuiOutlinedInput-root": { borderRadius: 999 } }}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: "#9ca3af" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* EMAIL */}
            <TextField
              label="Email"
              fullWidth
              sx={{ mb: 2.5, "& .MuiOutlinedInput-root": { borderRadius: 999 } }}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: "#9ca3af" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* PHONE */}
            <TextField
              label="Phone"
              fullWidth
              sx={{ mb: 2.5, "& .MuiOutlinedInput-root": { borderRadius: 999 } }}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon sx={{ color: "#9ca3af" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* PASSWORD */}
            <TextField
              label="Password"
              type={showPass ? "text" : "password"}
              fullWidth
              sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 999 } }}
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
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

            {/* BUTTON */}
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 1,
                py: 1.2,
                borderRadius: 999,
                fontWeight: 700,
                textTransform: "none",
                fontSize: 15,
                background:
                  "linear-gradient(90deg, #f441c8 0%, #9b4dff 40%, #2563eb 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #f441c8 0%, #8b3ef0 40%, #1d4ed8 100%)",
                },
              }}
            >
              Register
            </Button>
          </form>

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            Already have an account?{" "}
            <span
              style={{ color: "#2563eb", cursor: "pointer", fontWeight: 600 }}
            >
              Login
            </span>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
