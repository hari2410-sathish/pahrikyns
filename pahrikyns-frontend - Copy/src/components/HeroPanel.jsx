// src/components/HeroPanel.jsx
import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppThemeContext } from "../ThemeContext";

export default function HeroPanel() {
  const { variant } = useContext(AppThemeContext);
  const isFuturistic = variant === "futuristic";

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Left Section */}
        <Box sx={{ flex: 1, minWidth: 280 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: isFuturistic ? "primary.main" : "primary.main",
            }}
          >
            PAHRIKYNS Teaching
          </Typography>

          <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
            Master industry tools like AWS, Docker, Jenkins, Kubernetes with
            hands-on projects and real-world scenarios.
          </Typography>

          {/* Buttons */}
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 3 }}
              component={Link}
              to="/register"
            >
              Start Learning FREE
            </Button>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={Link}
              to="/courses"
            >
              View Courses
            </Button>
          </Box>

          {/* Stats */}
          <Box sx={{ display: "flex", gap: 6, mt: 6 }}>
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "primary.main" }}
              >
                5000+
              </Typography>
              <Typography variant="caption" display="block">
                Students
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "primary.main" }}
              >
                25+
              </Typography>
              <Typography variant="caption" display="block">
                Courses
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: "primary.main" }}
              >
                98%
              </Typography>
              <Typography variant="caption" display="block">
                Success Rate
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right floating panel */}
        <Box
          sx={{
            width: { xs: "100%", sm: 420 },
            minHeight: 260,
            borderRadius: 3,
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isFuturistic
              ? "0 12px 40px rgba(6,182,212,0.15)"
              : "0 8px 20px rgba(0,0,0,0.08)",
            background: isFuturistic
              ? "linear-gradient(135deg,#0b1220,#04202a)"
              : "linear-gradient(135deg,#e9f2ff,#ffffff)",
          }}
          className={isFuturistic ? "futuristic-float" : ""}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Professional Courses · Real Projects · Certificates
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
