// src/pages/admin/AddLesson.jsx
import React, { useState } from "react";
import { Typography, Paper, TextField, Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

// ✅ FIXED IMPORT PATH
import { useNotify } from "../../components/NotificationProvider";

export default function AddLesson() {
  const { courseId } = useParams();
  const nav = useNavigate();
  const notify = useNotify();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  function save() {
    const key = `pahrikyns:lessons:${courseId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");

    existing.unshift({
      id: Date.now(),
      title,
      duration,
    });

    localStorage.setItem(key, JSON.stringify(existing));

    notify("Lesson added", "success");
    nav("/admin/manage-courses");
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Add Lesson (Course {courseId})
      </Typography>

      <Paper sx={{ p: 3 }}>
        <TextField
          label="Lesson Title"
          fullWidth
          sx={{ mb: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Duration (mins)"
          fullWidth
          sx={{ mb: 2 }}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <Button variant="contained" onClick={save}>
          Save Lesson
        </Button>
      </Paper>
    </Box>
  );
}
