// src/pages/admin/AddLesson.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Avatar
} from "@mui/material";

import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

import { useParams, useNavigate } from "react-router-dom";
import { useNotify } from "../../components/NotificationProvider";

export default function AddLesson() {
  const { courseId } = useParams();
  const nav = useNavigate();
  const notify = useNotify();

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    order: 1,
    tags: "",
    videoPreview: null,
    thumbPreview: null,
  });

  function update(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  // Thumbnail upload
  function handleThumb(e) {
    const f = e.target.files?.[0];
    if (f) update("thumbPreview", URL.createObjectURL(f));
  }

  // Video upload preview
  function handleVideo(e) {
    const f = e.target.files?.[0];
    if (f) update("videoPreview", URL.createObjectURL(f));
  }

  function save() {
    if (!form.title) return notify("Enter lesson title", "error");

    const key = `pahrikyns:lessons:${courseId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");

    const newLesson = {
      id: Date.now(),
      ...form,
    };

    existing.unshift(newLesson);
    localStorage.setItem(key, JSON.stringify(existing));

    notify("Lesson added successfully!", "success");
    nav(`/admin/manage-courses`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
        Add Lesson (Course {courseId})
      </Typography>

      <Paper
        className="glass-card"
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          
          {/* LEFT - FORM */}
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Lesson Title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              sx={{ mb: 2 }}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Duration (mins)"
                type="number"
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Lesson Order"
                type="number"
                value={form.order}
                onChange={(e) => update("order", Number(e.target.value))}
                sx={{ mb: 2 }}
              />
            </Stack>

            <TextField
              fullWidth
              label="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              sx={{ mb: 2 }}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={save}
                sx={{
                  background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                  px: 3,
                }}
              >
                Save Lesson
              </Button>

              <Button onClick={() => nav(-1)}>Cancel</Button>
            </Stack>
          </Box>

          {/* RIGHT - THUMB + VIDEO */}
          <Box sx={{ width: 300 }}>
            {/* THUMBNAIL */}
            <Typography sx={{ mb: 1 }}>Thumbnail</Typography>

            <input
              id="lesson-thumb"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleThumb}
            />

            <label htmlFor="lesson-thumb">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Thumbnail
              </Button>
            </label>

            <Avatar
              variant="rounded"
              src={form.thumbPreview}
              sx={{
                width: "100%",
                height: 150,
                mt: 2,
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />

            {/* VIDEO */}
            <Typography sx={{ mt: 4, mb: 1 }}>Video Upload</Typography>

            <input
              id="lesson-video"
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideo}
            />

            <label htmlFor="lesson-video">
              <Button
                variant="outlined"
                component="span"
                startIcon={<VideoCameraFrontIcon />}
              >
                Upload Video
              </Button>
            </label>

            {form.videoPreview && (
              <video
                controls
                src={form.videoPreview}
                style={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            )}
          </Box>
        </Stack>
      </Paper>
    </motion.div>
  );
}
