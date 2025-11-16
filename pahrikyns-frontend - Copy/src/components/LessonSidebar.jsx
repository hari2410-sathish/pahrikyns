// src/components/LessonSidebar.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { List, ListItemButton, ListItemText, Box, Typography } from "@mui/material";

export default function LessonSidebar({ lessons }) {
  const { tool, lessonId } = useParams();

  const items = Object.keys(lessons).map((key) => ({
    id: key,
    title: `Lesson ${key.split("-")[1]}`,
    path: `/devops/${tool}/${key}`,
  }));

  return (
    <Box
      sx={{
        width: 260,
        height: "calc(100vh - 70px)",
        overflowY: "auto",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        p: 2,
        position: "sticky",
        top: 70,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        {tool.toUpperCase()} Lessons
      </Typography>

      <List>
        {items.map((lesson) => (
          <ListItemButton
            key={lesson.id}
            component={Link}
            to={lesson.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              backgroundColor:
                lesson.id === lessonId ? "primary.main" : "transparent",
              color: lesson.id === lessonId ? "#fff" : "inherit",
              "&:hover": {
                backgroundColor:
                  lesson.id === lessonId ? "primary.dark" : "action.hover",
              },
            }}
          >
            <ListItemText primary={lesson.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
