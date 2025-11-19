// src/components/Footer.jsx — NEON V3
import React from "react";
import { Box, Typography, Grid, IconButton, Link as MuiLink } from "@mui/material";
import { motion } from "framer-motion";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 8,
        pt: 6,
        pb: 3,
        px: 3,
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(18px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* NEON AURORA TOP GLOW */}
      <Box
        sx={{
          position: "absolute",
          top: -70,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          height: 120,
          background: "radial-gradient(circle, #06b6d455, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.6,
        }}
      />

      {/* NEON DIVIDER LINE */}
      <Box
        sx={{
          width: "100%",
          height: "2px",
          background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
          boxShadow: "0 0 12px #06b6d4",
          borderRadius: "2px",
          mb: 4,
          opacity: 0.8,
        }}
        className="fade-up"
      />

      {/* MAIN FOOTER CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Grid container spacing={4} sx={{ maxWidth: 1280, mx: "auto" }}>
          {/* BRAND SECTION */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 1,
              }}
            >
              PAHRIKYNS Teaching
            </Typography>

            <Typography sx={{ opacity: 0.8, lineHeight: 1.6 }}>
              Professional DevOps learning with real projects, neon futuristic UI
              and premium training materials.
            </Typography>
          </Grid>

          {/* LINKS SECTION */}
          <Grid item xs={6} md={2}>
            <Typography sx={{ fontWeight: 700, mb: 2, opacity: 0.9 }}>
              Quick Links
            </Typography>

            {["Home", "Courses", "Login", "Register"].map((text) => (
              <MuiLink
                key={text}
                href={"#" + text.toLowerCase()}
                underline="none"
                sx={{
                  display: "block",
                  mb: 1,
                  color: "white",
                  opacity: 0.75,
                  fontWeight: 600,
                  position: "relative",
                  "&:hover": {
                    opacity: 1,
                    color: "#06b6d4",
                  },
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                    transition: "0.3s ease",
                  },
                  "&:hover:after": {
                    width: "100%",
                  },
                }}
              >
                {text}
              </MuiLink>
            ))}
          </Grid>

          {/* COURSES SECTION */}
          <Grid item xs={6} md={2}>
            <Typography sx={{ fontWeight: 700, mb: 2, opacity: 0.9 }}>
              DevOps Tools
            </Typography>

            {["Docker", "Kubernetes", "Ansible", "Jenkins"].map((tool) => (
              <MuiLink
                key={tool}
                href="#"
                underline="none"
                sx={{
                  display: "block",
                  mb: 1,
                  color: "white",
                  opacity: 0.75,
                  fontWeight: 600,
                  "&:hover": {
                    opacity: 1,
                    color: "#7c3aed",
                  },
                }}
              >
                {tool}
              </MuiLink>
            ))}
          </Grid>

          {/* SOCIAL MEDIA */}
          <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: 700, mb: 2, opacity: 0.9 }}>
              Follow Us
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              {[FacebookIcon, InstagramIcon, GitHubIcon, LinkedInIcon].map(
                (Icon, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      color: "white",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      "&:hover": {
                        background: "rgba(255,255,255,0.12)",
                        boxShadow: "0 0 14px #06b6d4",
                        color: "#06b6d4",
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                )
              )}
            </Box>
          </Grid>
        </Grid>
      </motion.div>

      {/* BOTTOM COPYRIGHT */}
      <Typography
        sx={{
          mt: 5,
          textAlign: "center",
          opacity: 0.6,
          fontSize: 13,
        }}
      >
        © {new Date().getFullYear()} PAHRIKYNS Teaching. All rights reserved.
      </Typography>
    </Box>
  );
}
