import React from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const nav = useNavigate();

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Admin Panel
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Add Course</Typography>
            <Button variant="contained" onClick={() => nav("/admin/add-course")}>
              Add Course
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Manage Courses</Typography>
            <Button variant="contained" onClick={() => nav("/admin/manage-courses")}>
              Manage Courses
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
