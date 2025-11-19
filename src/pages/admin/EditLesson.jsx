// src/pages/admin/EditLesson.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Stack,
  Avatar,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 🔔 Notification System
import { useNotify } from "../../components/NotificationProvider";

export default function EditLesson() {
  const { lessonId } = useParams();
  const nav = useNavigate();
  const notify = useNotify();

  const [form, setForm] = useState({
    title: "",
    duration: "",
    order: "",
    tags: "",
    thumbPreview: "",
    videoUrl: "",
  });

  const [thumbFile, setThumbFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // -------------------------------
  // Load existing lesson
  // -------------------------------
  useEffect(() => {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("pahrikyns:lessons:")
    );

    for (const key of keys) {
      const lessons = JSON.parse(localStorage.getItem(key) || "[]");
      const found = lessons.find((l) => String(l.id) === String(lessonId));

      if (found) {
        setForm({
          title: found.title || "",
          duration: found.duration || "",
          order: found.order || "",
          tags: found.tags || "",
          thumbPreview: found.thumbPreview || "",
          videoUrl: found.videoUrl || "",
        });
        break;
      }
    }
  }, [lessonId]);

  // -------------------------------
  // Save Lesson (update localStorage)
  // -------------------------------
  function save() {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("pahrikyns:lessons:")
    );

    for (const key of keys) {
      const lessons = JSON.parse(localStorage.getItem(key) || "[]");

      const idx = lessons.findIndex((l) => String(l.id) === String(lessonId));

      if (idx !== -1) {
        lessons[idx] = {
          ...lessons[idx],
          ...form,
        };

        localStorage.setItem(key, JSON.stringify(lessons));
        notify("Lesson updated!", "success");
        nav(-1);
        return;
      }
    }

    notify("Lesson not found", "error");
  }

  // Thumbnail Upload
  function handleThumb(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbFile(file);
    setForm((s) => ({ ...s, thumbPreview: URL.createObjectURL(file) }));
  }

  // Video Upload
  function handleVideo(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setForm((s) => ({ ...s, videoUrl: URL.createObjectURL(file) }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
        Edit Lesson
      </Typography>

      <Paper
        className="glass-card"
        sx={{
          p: 3,
          borderRadius: 3,
          backdropFilter: "blur(12px)",
        }}
      >
        <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
          {/* LEFT SIDE FORM */}
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Lesson Title"
              value={form.title}
              onChange={(e) =>
                setForm((s) => ({ ...s, title: e.target.value }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Duration (mins)"
              value={form.duration}
              onChange={(e) =>
                setForm((s) => ({ ...s, duration: e.target.value }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Order Number"
              value={form.order}
              onChange={(e) =>
                setForm((s) => ({ ...s, order: e.target.value }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Tags (comma separated)"
              value={form.tags}
              onChange={(e) =>
                setForm((s) => ({ ...s, tags: e.target.value }))
              }
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              sx={{
                px: 3,
                background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
              }}
              onClick={save}
            >
              Save Changes
            </Button>

            <Button sx={{ ml: 2 }} onClick={() => nav(-1)}>
              Cancel
            </Button>
          </Box>

          {/* RIGHT SIDE UPLOADS */}
          <Box sx={{ width: 320 }}>
            {/* Thumbnail Upload */}
            <Typography sx={{ mb: 1, fontWeight: 600 }}>
              Thumbnail Preview
            </Typography>

            <input
              id="thumb-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleThumb}
            />
            <label htmlFor="thumb-upload">
              <Button
                component="span"
                startIcon={<CloudUploadIcon />}
                variant="outlined"
              >
                Upload Thumbnail
              </Button>
            </label>

            <Box sx={{ mt: 2 }}>
              <Avatar
                variant="rounded"
                src={form.thumbPreview}
                sx={{ width: "100%", height: 180 }}
              />
            </Box>

            {/* Video Upload */}
            <Typography sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
              Video Preview
            </Typography>

            <input
              id="video-upload"
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideo}
            />
            <label htmlFor="video-upload">
              <Button
                component="span"
                startIcon={<CloudUploadIcon />}
                variant="outlined"
              >
                Upload Video
              </Button>
            </label>

            <Box sx={{ mt: 2 }}>
              {form.videoUrl ? (
                <video
                  src={form.videoUrl}
                  controls
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              ) : (
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    mt: 1,
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <Typography variant="caption">
                    No video uploaded
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>
        </Stack>
      </Paper>
    </motion.div>
  );
}
