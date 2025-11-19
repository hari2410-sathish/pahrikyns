// src/pages/admin/EditCourse.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Stack,
  Avatar
} from "@mui/material";

import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useParams, useNavigate } from "react-router-dom";
import { useNotify } from "../../components/NotificationProvider";

const categories = [
  { key: "devops", label: "DevOps" },
  { key: "aws", label: "AWS" },
  { key: "os", label: "Operating Systems" },
];

const levels = ["Beginner", "Intermediate", "Advanced"];
const statuses = ["active", "draft"];

export default function EditCourse() {
  const { id } = useParams();
  const nav = useNavigate();
  const notify = useNotify();

  const [form, setForm] = useState({
    title: "",
    category: "devops",
    lessons: 10,
    students: 0,
    level: "Beginner",
    price: 0,
    status: "active",
    preview: null
  });

  // Load selected course
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("courses") || "[]");
    const found = saved.find((c) => String(c.id) === String(id));

    if (found) setForm(found);
  }, [id]);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setForm((s) => ({ ...s, preview: URL.createObjectURL(f) }));
  }

  function save() {
    const saved = JSON.parse(localStorage.getItem("courses") || "[]");

    const updated = saved.map((c) =>
      String(c.id) === String(id) ? { ...c, ...form } : c
    );

    localStorage.setItem("courses", JSON.stringify(updated));

    notify("Course updated successfully!", "success");
    nav("/admin/manage-courses");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
        Edit Course
      </Typography>

      <Paper
        className="glass-card"
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <Stack
          spacing={3}
          direction={{ xs: "column", md: "row" }}
          alignItems="flex-start"
        >
          {/* LEFT SECTION — FORM */}
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Course Title"
              value={form.title}
              onChange={(e) =>
                setForm((s) => ({ ...s, title: e.target.value }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              select
              fullWidth
              label="Category"
              value={form.category}
              onChange={(e) =>
                setForm((s) => ({ ...s, category: e.target.value }))
              }
              sx={{ mb: 2 }}
            >
              {categories.map((c) => (
                <MenuItem key={c.key} value={c.key}>
                  {c.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Level"
              value={form.level}
              onChange={(e) =>
                setForm((s) => ({ ...s, level: e.target.value }))
              }
              sx={{ mb: 2 }}
            >
              {levels.map((l) => (
                <MenuItem key={l} value={l}>
                  {l}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Status"
              value={form.status}
              onChange={(e) =>
                setForm((s) => ({ ...s, status: e.target.value }))
              }
              sx={{ mb: 2 }}
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Lessons"
              type="number"
              value={form.lessons}
              onChange={(e) =>
                setForm((s) => ({ ...s, lessons: Number(e.target.value) }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Enrolled Students"
              type="number"
              value={form.students}
              onChange={(e) =>
                setForm((s) => ({ ...s, students: Number(e.target.value) }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Price (₹)"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm((s) => ({ ...s, price: Number(e.target.value) }))
              }
              sx={{ mb: 2 }}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={save}
                sx={{
                  background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                }}
              >
                Save Changes
              </Button>

              <Button onClick={() => nav(-1)}>Cancel</Button>
            </Stack>
          </Box>

          {/* RIGHT — THUMBNAIL */}
          <Box sx={{ width: 300 }}>
            <Typography sx={{ mb: 1 }}>Thumbnail</Typography>

            <input
              id="edit-thumb"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFile}
            />

            <label htmlFor="edit-thumb">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Change Thumbnail
              </Button>
            </label>

            <Avatar
              variant="rounded"
              src={form.preview}
              sx={{
                width: "100%",
                height: 180,
                mt: 2,
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            />

            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Preview — not uploaded (client-side only)
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </motion.div>
  );
}
