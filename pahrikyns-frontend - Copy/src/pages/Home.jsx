// src/pages/Home.jsx
import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import HeroPanel from '../components/HeroPanel'
import CourseCard from '../components/CourseCard'

export default function Home() {
  const featured = [
    { title:'Ubuntu Server', subtitle:'Learn Linux commands, file systems, and DevOps setup.', students:'1.2k' },
    { title:'CentOS Admin', subtitle:'Configure enterprise Linux servers and manage DevOps environments.', students:'890' },
    { title:'RedHat DevOps', subtitle:'Master RedHat Enterprise Linux and automation for CI/CD', students:'650' },
    { title:'Windows Server', subtitle:'Windows server config, networking, enterprise tools.', students:'1.5k' }
  ]

  return (
    <Box>
      <HeroPanel />

      <Box sx={{ maxWidth:1280, mx:'auto', px:3, py:6 }}>
        <Typography variant='h4' sx={{ mb:3, fontWeight:800 }}>
          PAHRIKYNS DevOps Courses
        </Typography>

        {/* Featured Courses */}
        <Grid container spacing={3}>
          {featured.map(f => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              <CourseCard {...f} />
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Box sx={{ mt:6 }}>
          <Typography variant='h5' sx={{ fontWeight:800, mb:2 }}>
            Why Choose PAHRIKYNS Teaching?
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <CourseCard
                title='Hands-on Projects'
                subtitle='Work on real-time projects and labs.'
                students='-'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CourseCard
                title='Expert Mentorship'
                subtitle='Guidance from industry professionals.'
                students='-'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CourseCard
                title='Earn Certificate'
                subtitle='Industry-recognized certificates.'
                students='-'
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
