// src/pages/Dashboard.jsx
import React from "react";
import { Box, Grid, Paper, Typography, LinearProgress } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        
        {/* Left Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              My Courses
            </Typography>

            <Typography sx={{ mt: 2 }}>Ubuntu Server — 60%</Typography>
            <LinearProgress
              variant="determinate"
              value={60}
              sx={{ mt: 1, borderRadius: 1, height: 8 }}
            />
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Quick Stats
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Certificates earned: <strong>2</strong>
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Active courses: <strong>3</strong>
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}
