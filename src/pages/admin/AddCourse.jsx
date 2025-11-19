// src/pages/admin/AddCourse.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";

// 🔥 NEW: useNotifications (combined toaster + panel)
import { useNotifications } from "../../contexts/NotificationContext";

const CATEGORIES = [
  "DevOps",
  "AWS",
  "Linux",
  "Docker",
  "Kubernetes",
  "Security",
  "Automation",
];

export default function AddCourse() {
  const nav = useNavigate();
  const { notify } = useNotifications();

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    duration: "",
    description: "",
    level: "Beginner",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    setForm({ ...form, image: f });
    setPreview(URL.createObjectURL(f));
  }

  function saveCourse() {
    if (!form.title || !form.category || !form.price) {
      notify("Please fill required fields!", "error");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("courses") || "[]");
    const newCourse = { id: Date.now(), ...form };

    saved.unshift(newCourse);
    localStorage.setItem("courses", JSON.stringify(saved));

    notify("Course added successfully!", "success");
    nav("/admin/manage-courses");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
        Add New Course
      </Typography>

      <Paper
        className="glass-card"
        sx={{
          p: 3,
          borderRadius: 3,
          width: "100%",
          maxWidth: 1100,
        }}
      >
        <Stack
          spacing={3}
          direction={{ xs: "column", md: "row" }}
          sx={{ width: "100%" }}
        >
          {/* LEFT FORM AREA */}
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Course Title"
              name="title"
              value={form.title}
              onChange={handleInput}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleInput}
              fullWidth
              sx={{ mb: 2 }}
            >
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
              <TextField
                label="Price (₹)"
                name="price"
                value={form.price}
                onChange={handleInput}
                fullWidth
              />

              <TextField
                label="Duration (hours)"
                name="duration"
                value={form.duration}
                onChange={handleInput}
                fullWidth
              />
            </Stack>

            <TextField
              select
              label="Course Level"
              name="level"
              value={form.level}
              onChange={handleInput}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </TextField>

            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleInput}
              fullWidth
              multiline
              rows={4}
            />
          </Box>

          {/* RIGHT THUMBNAIL AREA */}
          <Box sx={{ width: { xs: "100%", md: 350 } }}>
            <Typography sx={{ fontWeight: 700 }}>Thumbnail</Typography>

            <input
              id="course-thumb"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />

            <label htmlFor="course-thumb">
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                component="span"
                sx={{
                  mt: 2,
                  borderColor: "#06b6d4",
                  color: "#06b6d4",
                  "&:hover": {
                    borderColor: "#7c3aed",
                    color: "#7c3aed",
                  },
                }}
              >
                Upload Image
              </Button>
            </label>

            {/* Preview */}
            <Box
              sx={{
                mt: 2,
                width: "100%",
                height: 200,
                borderRadius: 2,
                overflow: "hidden",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    mt: 8,
                    opacity: 0.6,
                    fontSize: 14,
                  }}
                >
                  No image selected
                </Typography>
              )}
            </Box>
          </Box>
        </Stack>

        {/* BUTTONS */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => nav(-1)}
            sx={{
              px: 3,
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={saveCourse}
            sx={{
              px: 3,
              borderRadius: 2,
              background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
            }}
          >
            Save Course
          </Button>
        </Stack>
      </Paper>
    </motion.div>
  );
}
