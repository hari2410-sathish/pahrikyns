// src/pages/admin/AddCourse.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Avatar,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";

// ✅ FIXED IMPORT PATH
import { useNotify } from "../../components/NotificationProvider";

const categories = [
  { key: "devops", label: "DevOps" },
  { key: "aws", label: "AWS" },
  { key: "os", label: "Operating Systems" },
];

export default function AddCourse() {
  const nav = useNavigate();
  const notify = useNotify();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("devops");
  const [lessons, setLessons] = useState(10);
  const [students, setStudents] = useState(0);
  const [thumbURL, setThumbURL] = useState(null);

  function onFile(e) {
    const f = e.target.files?.[0];
    if (f) setThumbURL(URL.createObjectURL(f));
  }

  function save() {
    if (!title) return notify("Please provide title", "error");

    const saved = JSON.parse(localStorage.getItem("pahrikyns:courses") || "[]");
    const id = Date.now();

    const newCourse = { id, title, category, lessons, students };
    saved.unshift(newCourse);

    localStorage.setItem("pahrikyns:courses", JSON.stringify(saved));

    notify("Course added", "success");
    nav("/admin/manage-courses");
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Add Course
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
          {/* LEFT SIDE FORM */}
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />

            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ mt: 2 }}
              fullWidth
            >
              {categories.map((c) => (
                <MenuItem key={c.key} value={c.key}>
                  {c.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Lessons"
              type="number"
              value={lessons}
              onChange={(e) => setLessons(Number(e.target.value))}
              sx={{ mt: 2 }}
              fullWidth
            />

            <TextField
              label="Students"
              type="number"
              value={students}
              onChange={(e) => setStudents(Number(e.target.value))}
              sx={{ mt: 2 }}
              fullWidth
            />

            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={save}>
                Save
              </Button>
              <Button sx={{ ml: 2 }} onClick={() => nav(-1)}>
                Cancel
              </Button>
            </Box>
          </Box>

          {/* RIGHT SIDE THUMBNAIL */}
          <Box sx={{ width: 320 }}>
            <Typography sx={{ mb: 1 }}>Thumbnail</Typography>

            <input
              id="thumb"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onFile}
            />
            <label htmlFor="thumb">
              <Button
                component="span"
                startIcon={<CloudUploadIcon />}
                variant="outlined"
              >
                Upload
              </Button>
            </label>

            <Box sx={{ mt: 2 }}>
              <Avatar
                variant="rounded"
                src={thumbURL}
                sx={{ width: "100%", height: 180 }}
              />
            </Box>

            <Paper sx={{ mt: 2, p: 2 }}>
              <Typography variant="caption">
                Thumbnail preview (client-side only)
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
