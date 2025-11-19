// src/components/HeroPanel.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HeroPanel() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 12 },
        color: "white",
      }}
    >
      {/* Animated Background Blobs */}
      <div className="hero-blob hero-blob-1"></div>
      <div className="hero-blob hero-blob-2"></div>

      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 4,
          position: "relative",
          zIndex: 10,
        }}
        className="fade-in-up"
      >
        {/* LEFT SECTION */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              letterSpacing: "-1.5px",
              background: "linear-gradient(90deg,#00eaff,#6a11cb)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            PAHRIKYNS Teaching
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: 600,
              lineHeight: 1.6,
              opacity: 0.9,
              mb: 4,
            }}
          >
            Become a master in DevOps tools like Docker, Kubernetes, Jenkins,
            Terraform, Ansible & more with real industry-grade projects and
            clean structured learning.
          </Typography>

          {/* CTA BUTTONS */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              className="premium-btn"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                background: "linear-gradient(90deg,#00eaff,#6a11cb)",
                fontWeight: 800,
                color: "white",
              }}
              component={Link}
              to="/register"
            >
              Start Learning FREE
            </Button>

            <Button
              variant="outlined"
              size="large"
              className="premium-btn"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                color: "#00eaff",
                borderColor: "#00eaff",
                fontWeight: 700,
                "&:hover": {
                  borderColor: "#6a11cb",
                  color: "#6a11cb",
                },
              }}
              component={Link}
              to="/courses"
            >
              View Courses
            </Button>
          </Box>

          {/* STATS */}
          <Box sx={{ display: "flex", gap: 6, mt: 6 }}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  background: "linear-gradient(90deg,#00eaff,#6a11cb)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                5000+
              </Typography>
              <Typography variant="caption">Students</Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  background: "linear-gradient(90deg,#00eaff,#6a11cb)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                25+
              </Typography>
              <Typography variant="caption">Courses</Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  background: "linear-gradient(90deg,#00eaff,#6a11cb)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                98%
              </Typography>
              <Typography variant="caption">Success Rate</Typography>
            </Box>
          </Box>
        </Box>

        {/* RIGHT FLOAT PANEL */}
        <Box
          sx={{
            width: { xs: "100%", sm: 420 },
            minHeight: 260,
            borderRadius: 4,
            p: 4,
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 40px rgba(0, 136, 255, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          className="fade-in-up"
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.6,
            }}
          >
            🎓 Professional Courses  
            🔥 Real Projects  
            🏆 Industry Certificates
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
