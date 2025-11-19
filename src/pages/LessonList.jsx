// src/pages/LessonList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Box
} from "@mui/material";

import { gitLessons } from "../devops/git/GitLessons";
import { dockerLessons } from "../devops/docker/DockerLessons";
import { jenkinsLessons } from "../devops/jenkins/JenkinsLessons";

export default function LessonList() {
  const { category, tool } = useParams();

  const toolMap = {
    git: gitLessons,
    docker: dockerLessons,
    jenkins: jenkinsLessons,
  };

  const raw = toolMap[tool];

  if (!raw) {
    return (
      <Box sx={{ p: 6 }}>
        <Typography variant="h4">No lessons found for "{tool}"</Typography>
      </Box>
    );
  }

  const lessonsArray = raw.map((item, idx) => ({
    id: item.id,
    title: item.title,
  }));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 5,
        background: "linear-gradient(160deg, #04070f, #0c0f21, #11162d)",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: 900,
          letterSpacing: 1,
          color: "white",
          textShadow: "0px 3px 8px rgba(0,0,0,0.6)",
        }}
      >
        {tool.toUpperCase()} — Lessons ({lessonsArray.length})
      </Typography>

      <Grid container spacing={3}>
        {lessonsArray.map((l, idx) => (
          <Grid key={l.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                borderRadius: "18px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)",
                transition: "0.3s ease",
                boxShadow:
                  "0px 8px 18px rgba(0,0,0,0.4), inset 0px 0px 0px rgba(255,255,255,0.1)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  background: "rgba(255,255,255,0.08)",
                  boxShadow: "0px 12px 28px rgba(0,0,0,0.5)",
                },
              }}
            >
              <CardActionArea
                component={Link}
                to={`/courses/${category}/${tool}/${l.id}`}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: "0.5px",
                      color: "#fff",
                    }}
                  >
                    {l.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      opacity: 0.7,
                      color: "#b0c4ff",
                    }}
                  >
                    Lesson {idx + 1} • {tool.toUpperCase()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
