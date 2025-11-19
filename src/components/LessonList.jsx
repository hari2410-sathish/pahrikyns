// src/pages/LessonList.jsx — NEON VERSION 3
import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Chip,
  Box,
} from "@mui/material";
import PlayCircleOutline from "@mui/icons-material/PlayCircleOutline";
import Engineering from "@mui/icons-material/Engineering";
import Quiz from "@mui/icons-material/Quiz";
import Work from "@mui/icons-material/Work";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

export default function LessonList({ lessons, courseKey }) {
  return (
    <List sx={{ position: "relative", zIndex: 2, mt: 2 }}>
      {lessons.map((l, index) => {
        let icon = <PlayCircleOutline sx={{ color: "#06b6d4" }} />;
        let neonColor = "#06b6d4";

        if (l.type === "project") {
          icon = <Work sx={{ color: "#a855f7" }} />;
          neonColor = "#a855f7";
        }

        if (l.type === "test") {
          icon = <Quiz sx={{ color: "#ef4444" }} />;
          neonColor = "#ef4444";
        }

        if (l.type === "interview") {
          icon = <Engineering sx={{ color: "#38bdf8" }} />;
          neonColor = "#38bdf8";
        }

        return (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <ListItemButton
              component={RouterLink}
              to={l.type === "test" ? `./mock-test` : `./${l.id}`}
              sx={{
                borderRadius: 2,
                mb: 1.5,
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(14px)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "0.25s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 0 16px ${neonColor}88`,
                  borderColor: neonColor,
                },
              }}
            >
              {/* LEFT NEON STRIP */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "4px",
                  height: "100%",
                  background: neonColor,
                  boxShadow: `0 0 12px ${neonColor}`,
                  opacity: 0.9,
                }}
              />

              {/* ICON */}
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  "& svg": {
                    fontSize: 28,
                    filter: `drop-shadow(0 0 6px ${neonColor})`,
                    transition: "0.25s",
                  },
                  ".MuiListItemButton-root:hover & svg": {
                    transform: "scale(1.15)",
                  },
                }}
              >
                {icon}
              </ListItemIcon>

              {/* TEXT */}
              <ListItemText
                primary={l.title}
                secondary={
                  l.type === "test"
                    ? "50 questions • pass mark 43"
                    : l.type === "project"
                    ? "Hands-on project"
                    : l.type === "interview"
                    ? "Interview preparation"
                    : ""
                }
                primaryTypographyProps={{
                  fontWeight: 700,
                  sx: { color: "white" },
                }}
                secondaryTypographyProps={{
                  sx: { opacity: 0.7, fontSize: 13 },
                }}
              />

              {/* CHIP LABELS */}
              {l.type === "test" && (
                <Chip
                  label="Mandatory"
                  size="small"
                  sx={{
                    ml: 1,
                    fontWeight: 700,
                    background: "rgba(239,68,68,0.25)",
                    color: "#ff7777",
                    border: "1px solid rgba(239,68,68,0.4)",
                    textTransform: "uppercase",
                    backdropFilter: "blur(6px)",
                  }}
                />
              )}
            </ListItemButton>
          </motion.div>
        );
      })}
    </List>
  );
}
