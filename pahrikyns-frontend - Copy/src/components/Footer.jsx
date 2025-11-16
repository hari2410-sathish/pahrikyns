// src/components/Footer.jsx
import React from 'react'
import { Box, Grid, Typography, Link as MLink, IconButton } from '@mui/material'
import LinkedIn from '@mui/icons-material/LinkedIn'
import GitHub from '@mui/icons-material/GitHub'
import YouTube from '@mui/icons-material/YouTube'
import Twitter from '@mui/icons-material/Twitter'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 6,
        background: 'linear-gradient(180deg, #07131F, #050A0F)',
        color: '#bcdde6',
        backdropFilter: "blur(8px)",
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: 1280, mx: 'auto', px: 3 }}>

        {/* Column 1 */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#06b6d4' }}>
            PAHRIKYNS DevSecOps
          </Typography>
          <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.65)' }}>
            Building the next generation of secure cloud architects and automation experts.
          </Typography>
        </Grid>

        {/* Column 2 */}
        <Grid item xs={6} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Quick Links
          </Typography>

          <MLink display="block" href="/" sx={{ mt: 1, color: 'inherit' }}>
            Home
          </MLink>

          <MLink display="block" href="/courses" sx={{ mt: 1, color: 'inherit' }}>
            Courses
          </MLink>

          <MLink display="block" href="/login" sx={{ mt: 1, color: 'inherit' }}>
            Login
          </MLink>
        </Grid>

        {/* Column 3 */}
        <Grid item xs={6} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Support
          </Typography>

          <MLink display="block" href="#" sx={{ mt: 1, color: 'inherit' }}>
            Help Center
          </MLink>

          <MLink display="block" href="#" sx={{ mt: 1, color: 'inherit' }}>
            Privacy Policy
          </MLink>
        </Grid>

        {/* Column 4 */}
        <Grid item xs={12} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Connect
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <IconButton size="small" sx={{ color: 'inherit' }}>
              <LinkedIn />
            </IconButton>
            <IconButton size="small" sx={{ color: 'inherit' }}>
              <GitHub />
            </IconButton>
            <IconButton size="small" sx={{ color: 'inherit' }}>
              <YouTube />
            </IconButton>
            <IconButton size="small" sx={{ color: 'inherit' }}>
              <Twitter />
            </IconButton>
          </Box>

          <MLink
            href="mailto:support@pahrikynsteaching.com"
            sx={{ mt: 2, display: "block", color: 'rgba(255,255,255,0.7)' }}
          >
            support@pahrikynsteaching.com
          </MLink>
        </Grid>
      </Grid>

      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        © 2025 PAHRIKYNS Teaching. All Rights Reserved.
      </Box>
    </Box>
  )
}
