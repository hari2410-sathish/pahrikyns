import React from 'react'
import { List, ListItemButton, ListItemText, ListItemIcon, Chip } from '@mui/material'
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline'
import Engineering from '@mui/icons-material/Engineering'
import Quiz from '@mui/icons-material/Quiz'
import Work from '@mui/icons-material/Work'
import { Link as RouterLink } from 'react-router-dom'

export default function LessonList({ lessons, courseKey }){
  return (
    <List>
      {lessons.map(l => {
        let icon = <PlayCircleOutline />
        if (l.type === 'project') icon = <Work />
        if (l.type === 'test') icon = <Quiz />
        if (l.type === 'interview') icon = <Engineering />

        return (
          <ListItemButton key={l.id} component={RouterLink} to={l.type === 'test' ? `./mock-test` : `./${l.id}`}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={l.title} secondary={l.type === 'test' ? '50 questions — pass 43' : (l.type === 'project' ? 'Hands-on project' : '')} />
            {l.type === 'test' && <Chip label="Mandatory" size="small" color="error" />}
          </ListItemButton>
        )
      })}
    </List>
  )
}
