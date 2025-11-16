import React from 'react'
import { Box, Grid, Typography, Container } from '@mui/material'
import CourseCard from '../components/CourseCard'

// sample categories & tools data (replace with API data)
const data = [
  { key:'devops', title:'DevOps', tools: ['github','jenkins','docker','kubernetes','terraform','ansible','splunk','prometheus','grafana'] },
  { key:'aws', title:'AWS', tools: ['ec2','s3','iam','lambda','rds','vpc','cloudwatch'] },
  { key:'os', title:'Operating Systems', tools: ['ubuntu','centos','redhat','windows'] }
]

export default function CoursesList(){
  return (
    <Container sx={{ py:6 }}>
      <Typography variant="h4" sx={{ mb:3, fontWeight:800 }}>All Programs</Typography>

      <Grid container spacing={4}>
        {data.map(cat => (
          <Grid item xs={12} md={4} key={cat.key}>
            <Box sx={{ mb:2 }}>
              <Typography variant="h6" sx={{ fontWeight:700 }}>{cat.title}</Typography>
            </Box>

            <Grid container spacing={2}>
              {cat.tools.map(t => (
                <Grid item xs={12} key={t}>
                  <CourseCard title={t.toUpperCase()} subtitle={`Full ${cat.title} track: ${t}`} level="Pro" students="—" link={`/courses/${cat.key}/${t}`} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
