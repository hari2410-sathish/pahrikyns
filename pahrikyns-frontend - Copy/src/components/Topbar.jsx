import React, { useContext } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AdminAuthContext } from "../contexts/AdminAuthContext";
import { adminLogout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { setIsAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  function logout() {
    adminLogout();
    setIsAdmin(false);
    navigate("/admin/login");
  }

  return (
    <Box
      sx={{
        height: 65,
        px: 3,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>
        Admin Panel
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton>
          <AccountCircleIcon sx={{ color: "#fff" }} />
        </IconButton>

        <Button color="error" variant="contained" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}
