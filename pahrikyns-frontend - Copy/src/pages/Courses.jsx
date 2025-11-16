// src/pages/Courses.jsx
import React from 'react'
import { Box, Grid, Typography, TextField, Stack, Button } from '@mui/material'
import CourseCard from '../components/CourseCard'

const data = [
  { title:'AWS: EC2 & S3', subtitle:'Cloud infra from zero to production', students:'1.1k' },
  { title:'DevOps: Docker & Kubernetes', subtitle:'CI/CD and orchestration', students:'950' },
  { title:'Linux: Ubuntu Server', subtitle:'Server administration & scripting', students:'1.2k' }
]

export default function Courses() {
  return (
    <Box sx={{ maxWidth:1280, mx:'auto', px:3, py:6 }}>

      {/* Header + Search */}
      <Stack 
        direction={{ xs:'column', md:'row' }} 
        spacing={2} 
        justifyContent="space-between" 
        alignItems="center"
      >
        <Box>
          <Typography variant='h4' sx={{ fontWeight:800 }}>
            Explore Courses
          </Typography>
          <Typography color='text.secondary'>
            Start your journey with these beginner-friendly courses
          </Typography>
        </Box>

        <Stack direction='row' spacing={2} alignItems='center'>
          <TextField 
            placeholder='Search courses...' 
            size='small' 
            variant='outlined' 
          />
          <Button variant='contained'>All</Button>
        </Stack>
      </Stack>

      {/* Course List */}
      <Grid container spacing={3} sx={{ mt:3 }}>
        {data.map(c => (
          <Grid item xs={12} md={4} key={c.title}>
            <CourseCard {...c} />
          </Grid>
        ))}
      </Grid>
      
    </Box>
  )
}
