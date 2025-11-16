// src/pages/CourseDetail.jsx
import React from 'react'
import { Box, Typography, Button, Grid, Paper } from '@mui/material'

export default function CourseDetail() {
  return (
    <Box sx={{ maxWidth:1200, mx:'auto', px:3, py:6 }}>

      <Grid container spacing={3}>
        
        {/* Left side: course content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p:3 }}>
            <Typography variant="h4" sx={{ fontWeight:800 }}>
              Course Title
            </Typography>

            <Typography sx={{ mt:2 }} color="text.secondary">
              Course long description, lessons list, and learning resources.
              You can connect dynamic content later from backend or local data.
            </Typography>
          </Paper>
        </Grid>

        {/* Right side: enroll box */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p:3 }}>
            <Typography variant="h6" sx={{ fontWeight:700 }}>
              Enroll
            </Typography>

            <Button 
              fullWidth 
              variant="contained" 
              sx={{ mt:2 }}
            >
              Start Learning
            </Button>
          </Paper>
        </Grid>

      </Grid>

    </Box>
  )
}
