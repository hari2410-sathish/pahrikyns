// src/pages/admin/Projects.jsx
import React, { useState, useEffect } from "react";
import { Typography, Paper, Box, Button, Grid } from "@mui/material";

// ✅ FIXED IMPORT PATH
import { useNotify } from "../../components/NotificationProvider";

export default function Projects() {
  const notify = useNotify();
  const [projects, setProjects] = useState([]);

  // Load saved projects
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pahrikyns:projects") || "[]");
    setProjects(saved);
  }, []);

  function addDemo() {
    const next = [
      {
        id: Date.now(),
        name: `Project ${Date.now()}`,
        level: "Intermediate",
      },
      ...projects,
    ];

    setProjects(next);
    localStorage.setItem("pahrikyns:projects", JSON.stringify(next));
    notify("Project added", "success");
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Projects
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={addDemo}>
        Add Demo Project
      </Button>

      <Grid container spacing={2}>
        {projects.map((p) => (
          <Grid item xs={12} md={6} key={p.id}>
            <Paper sx={{ p: 2 }}>
              <Typography sx={{ fontWeight: 700 }}>{p.name}</Typography>
              <Typography sx={{ opacity: 0.7 }}>Level: {p.level}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
