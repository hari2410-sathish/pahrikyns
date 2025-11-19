import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Container, Grid, Typography, Button, Chip } from '@mui/material'
import LessonList from '../components/LessonList'
import { useProgress } from '../contexts/ProgressContext'

// function to build lesson outline according to your rules
function buildLessons(toolKey, type='devops'){
  // 5 learning, 3 projects, 1 mock test, 1 interview = 10
  const lessons = []
  for (let i=1;i<=5;i++) lessons.push({ id:`learn-${i}`, type:'lesson', title:`${toolKey} - Concept ${i}` })
  for (let i=1;i<=3;i++) lessons.push({ id:`proj-${i}`, type:'project', title:`${toolKey} - Project ${i}` })
  lessons.push({ id:'mock-test', type:'test', title:'Mock Test (50 Q)'})
  lessons.push({ id:'interview', type:'interview', title:'Mock Interview (10 Q)' })
  return lessons
}

export default function ToolCourse(){
  const { category, tool } = useParams() // route: /courses/:category/:tool
  const lessons = buildLessons(tool)
  const { isUnlocked } = useProgress()
  const courseKey = `${category}:${tool}`

  return (
    <Container sx={{ py:6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ fontWeight:800 }}>{tool.toUpperCase()} — {category}</Typography>
          <Typography sx={{ color:'text.secondary', mt:1 }}>Complete learning modules, projects and tests to unlock next tool.</Typography>

          <Box sx={{ mt:4 }}>
            <LessonList lessons={lessons} courseKey={courseKey} />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p:3, borderRadius:2, boxShadow:2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight:700 }}>Progress</Typography>
            <Typography sx={{ mt:1, color:'text.secondary' }}>
              Passing score to unlock next tool: <strong>43 / 50</strong>
            </Typography>

            <Box sx={{ mt:2 }}>
              {isUnlocked(courseKey) ? <Chip label="Unlocked ✅" color="success" /> : <Chip label="Locked 🔒 (pass mock test)" color="warning" />}
            </Box>

            <Box sx={{ mt:3 }}>
              <Button fullWidth component={RouterLink} to={`/courses/${category}/${tool}/mock-test`} variant="contained">Take Mock Test</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
