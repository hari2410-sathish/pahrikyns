// src/pages/Home.jsx (NEON V3)
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import HeroPanel from "../components/HeroPanel";
import CourseCard from "../components/CourseCard";
import { motion } from "framer-motion";

export default function Home() {
  const featured = [
    {
      title: "Ubuntu Server",
      subtitle: "Learn Linux commands, file systems, and DevOps setup.",
      students: "1.2k",
    },
    {
      title: "CentOS Admin",
      subtitle: "Configure enterprise Linux servers and manage DevOps environments.",
      students: "890",
    },
    {
      title: "RedHat DevOps",
      subtitle: "Master RedHat Enterprise Linux and automation for CI/CD.",
      students: "650",
    },
    {
      title: "Windows Server",
      subtitle: "Windows server config, networking, enterprise tools.",
      students: "1.5k",
    },
  ];

  return (
    <Box sx={{ position: "relative", zIndex: 2 }}>
      {/* HERO PANEL WITH NEON V3 */}
      <HeroPanel />

      {/* FEATURED COURSES SECTION */}
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: 3,
          py: 6,
          position: "relative",
        }}
      >
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 800,
              letterSpacing: 1,
              background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            ⚡ Featured DevOps Courses
          </Typography>
        </motion.div>

        {/* FEATURED CARDS GRID */}
        <Grid container spacing={3}>
          {featured.map((f, index) => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              {/* Neon V3 Card Animation */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.05 }}
                style={{ cursor: "pointer" }}
                className="holo-card float fade-up"
              >
                <CourseCard {...f} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* WHY CHOOSE US */}
        <Box sx={{ mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 3,
                letterSpacing: 1,
                background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              🌐 Why Choose PAHRIKYNS Teaching?
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {[
              {
                title: "Hands-on Projects",
                subtitle: "Work on real-time projects and labs.",
              },
              {
                title: "Expert Mentorship",
                subtitle: "Guidance from industry professionals.",
              },
              {
                title: "Earn Certificates",
                subtitle: "Industry-recognized training certificates.",
              },
            ].map((card, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.12,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="holo-card float fade-up"
                >
                  <CourseCard
                    title={card.title}
                    subtitle={card.subtitle}
                    students="-"
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
