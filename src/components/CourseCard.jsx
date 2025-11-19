// src/components/CourseCard.jsx — NEON V3
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function CourseCard({ title, subtitle, students }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        rotateX: 4,
        rotateY: -4,
      }}
      className="holo-card float"
      style={{ cursor: "pointer" }}
    >
      <Box sx={{ p: 2.2 }}>
        {/* TITLE */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </Typography>

        {/* SUBTITLE */}
        <Typography
          sx={{
            fontSize: 14,
            opacity: 0.75,
            mb: 2,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </Typography>

        {/* STUDENT COUNT */}
        <Typography
          sx={{
            fontSize: 13,
            opacity: 0.55,
            letterSpacing: 0.5,
            mt: 1,
          }}
        >
          👥 {students} students
        </Typography>
      </Box>

      {/* HOLOGRAM SCAN-LINE EFFECT */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.05) 45%, transparent 100%)",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* GLOW ON HOVER */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "18px",
          boxShadow: "0 0 22px #06b6d4aa",
          opacity: 0,
          transition: "0.25s",
        }}
        className="card-glow"
      />
    </motion.div>
  );
}
