// src/pages/CourseTools.jsx
import React from "react";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import { coursesData } from "../data/coursesData"; // ✅ Correct path

export default function CourseTools() {
  const { category } = useParams();
  const course = coursesData[category];

  if (!course) {
    return <h2>No course found</h2>;
  }

  const tools = Object.keys(course.tools);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {course.title} Tools
      </Typography>

      <Grid container spacing={2}>
        {tools.map((tool) => (
          <Grid item xs={12} md={4} key={tool}>
            <Card>
              <CardContent>
                <Typography variant="h6">{course.tools[tool].title}</Typography>
                <Link to={`/courses/${category}/${tool}`}>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    View Lessons
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
