// src/pages/LessonList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography, Grid } from "@mui/material";

// import your lessons map/array (adjust path if needed)
import { gitLessons } from "../devops/git/GitLessons";

export default function LessonList() {
  const { category, tool } = useParams();

  // Map of available tool lesson exports
  const toolMap = {
    git: gitLessons,
    // add other tools when available
  };

  const raw = toolMap[tool];

  if (!raw) {
    return (
      <div style={{ padding: 40 }}>
        <Typography variant="h5">No lessons found for "{tool}"</Typography>
      </div>
    );
  }

  // Normalize data to a list of { id, title, component }
  let lessonsArray = [];

  if (Array.isArray(raw)) {
    // case: exported as array e.g. [{ id: "lesson-1", title:"Lesson 1", component }, ...]
    lessonsArray = raw.map((item, idx) => ({
      id: item.id || `lesson-${idx + 1}`,
      title: item.title || `Lesson ${idx + 1}`,
      component: item.component || null,
    }));
  } else if (typeof raw === "object") {
    // case: exported as object e.g. { "lesson-1": Lesson1, "lesson-2": Lesson2, ... }
    lessonsArray = Object.keys(raw).map((key, idx) => {
      const comp = raw[key];
      return {
        id: key,
        title: // if the component exported included a static title prop, use it; otherwise fallback
          comp && comp.title ? comp.title : `Lesson ${idx + 1}`,
        component: comp,
      };
    });
  } else {
    return (
      <div style={{ padding: 40 }}>
        <Typography variant="h5">Unsupported lessons data structure</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "700" }}>
        {tool.toUpperCase()} — Lessons ({lessonsArray.length})
      </Typography>

      <Grid container spacing={3}>
        {lessonsArray.map((l, idx) => (
          <Grid item xs={12} sm={6} md={4} key={l.id}>
            <Card
              sx={{
                borderRadius: "12px",
                bgcolor: "background.paper",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <CardActionArea
                component={Link}
                to={`/courses/${category}/${tool}/${l.id}`}
                sx={{
                  "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {l.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                    {`Lesson ${idx + 1} • ${tool.toUpperCase()}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
