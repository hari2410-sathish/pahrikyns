import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography, Paper, Box } from '@mui/material'

export default function ProjectPage(){
  const { category, tool, lessonId } = useParams()
  return (
    <Container sx={{ py:6 }}>
      <Paper sx={{ p:3 }}>
        <Typography variant='h5'>Project: {lessonId}</Typography>
        <Typography sx={{ mt:2, color:'text.secondary' }}>
          Project instructions placeholder. Add steps, repo template links, expected deliverables and marking rubric.
        </Typography>
        <Box sx={{ mt:3 }}>
          <Typography variant='subtitle1'>Starter Repo</Typography>
          <Typography>https://github.com/your-org/starter-{tool}</Typography>
        </Box>
      </Paper>
    </Container>
  )
}
