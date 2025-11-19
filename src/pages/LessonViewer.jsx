import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Typography, Paper } from '@mui/material'
import ReactPlayer from 'react-player'

export default function LessonViewer(){
  const { category, tool, lessonId } = useParams()

  // For demo, render type by id pattern. Replace with real fetch.
  const isProject = lessonId?.startsWith('proj-')
  return (
    <Container sx={{ py:6 }}>
      <Typography variant='h4' sx={{ fontWeight:800 }}>{tool.toUpperCase()} — {lessonId}</Typography>
      <Paper sx={{ mt:3, p:3 }}>
        <Typography variant='h6'>Lesson Content</Typography>
        <Typography sx={{ mt:2, color:'text.secondary' }}>
          This is placeholder lesson content for {lessonId}. Replace with content from backend (HTML/MD).
        </Typography>

        {!isProject && (
          <Box sx={{ mt:3 }}>
            <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" controls width="100%" />
          </Box>
        )}

      </Paper>
    </Container>
  )
}
