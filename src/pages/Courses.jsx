// src/pages/Courses.jsx — NEON V3
import React from "react";
import { Box, Grid, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import CourseCard from "../components/CourseCard";

const featured = [
  {
    title: "Ubuntu Server",
    subtitle: "Learn Linux commands, file systems, and DevOps setup.",
    students: "1.2k",
  },
  {
    title: "Docker & Kubernetes",
    subtitle: "Containers + orchestration with real projects.",
    students: "950",
  },
  {
    title: "Terraform Infra",
    subtitle: "IaC for cloud native infra",
    students: "780",
  },
  {
    title: "Jenkins CI/CD",
    subtitle: "Automate builds & pipelines",
    students: "1.1k",
  },
];

const categories = ["All", "DevOps", "Cloud", "Security", "Frontend"];

export default function Courses() {
  return (
    <Box sx={{ py: 8, position: "relative", zIndex: 2 }}>
      {/* PAGE TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            mb: 1,
            background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Explore Courses
        </Typography>

        <Typography sx={{ opacity: 0.75, mb: 4 }}>
          Professional, project-based training for modern engineers.
        </Typography>

        {/* CATEGORY FILTER CHIPS (NEON V3) */}
        <Box sx={{ display: "flex", gap: 2, mb: 5, flexWrap: "wrap" }}>
          {categories.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Chip
                label={c}
                sx={{
                  px: 2,
                  py: 0.5,
                  fontWeight: 700,
                  color: c === "All" ? "#fff" : "#06b6d4",
                  border:
                    c === "All"
                      ? "none"
                      : "2px solid rgba(255,255,255,0.12)",
                  background:
                    c === "All"
                      ? "linear-gradient(90deg,#06b6d4,#7c3aed)"
                      : "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)",
                  boxShadow:
                    c === "All"
                      ? "0 0 14px #06b6d4aa"
                      : "0 0 8px rgba(0,0,0,0.35)",
                  "&:hover": {
                    color: "#7c3aed",
                    borderColor: "#7c3aed",
                    boxShadow: "0 0 14px #7c3aed88",
                  },
                }}
              />
            </motion.div>
          ))}
        </Box>

        {/* FEATURED COURSES GRID */}
        <Grid container spacing={4}>
          {featured.map((f, index) => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.1,
                  ease: "easeOut",
                }}
              >
                <CourseCard
                  title={f.title}
                  subtitle={f.subtitle}
                  students={f.students}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* BENEFITS SECTION */}
        <Box sx={{ mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 3,
                background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Why PAHRIKYNS?
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {[
              {
                title: "Hands-on Projects",
                subtitle: "Work on real systems, not just slides.",
              },
              {
                title: "Expert Mentorship",
                subtitle: "Industry experience & code reviews.",
              },
              {
                title: "Certificate",
                subtitle: "Get recognised credentials on completion.",
              },
            ].map((benefit, i) => (
              <Grid item xs={12} md={4} key={benefit.title}>
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
                  whileHover={{ scale: 1.04 }}
                  className="holo-card float"
                >
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        background:
                          "linear-gradient(90deg,#06b6d4,#7c3aed)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        mb: 1,
                      }}
                    >
                      {benefit.title}
                    </Typography>

                    <Typography sx={{ opacity: 0.8 }}>
                      {benefit.subtitle}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Box>
  );
}
