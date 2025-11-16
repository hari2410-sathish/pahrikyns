// src/pages/admin/EditCourse.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

// ✅ FIXED PATH
import { useNotify } from "../../components/NotificationProvider";

const categories = [
  { key: "devops", label: "DevOps" },
  { key: "aws", label: "AWS" },
  { key: "os", label: "OS" }
];

export default function EditCourse() {
  const { id } = useParams();
  const nav = useNavigate();
  const notify = useNotify();

  const [form, setForm] = useState({
    title: "",
    category: "devops",
    lessons: 10,
    students: 0
  });

  // Load selected course
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pahrikyns:courses") || "[]");
    const found = saved.find((c) => String(c.id) === String(id));
    if (found) setForm(found);
  }, [id]);

  function save() {
    const saved = JSON.parse(localStorage.getItem("pahrikyns:courses") || "[]");

    const updated = saved.map((c) =>
      String(c.id) === String(id) ? { ...c, ...form } : c
    );

    localStorage.setItem("pahrikyns:courses", JSON.stringify(updated));

    notify("Course updated", "success");
    nav("/admin/manage-courses");
  }

  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Edit Course
      </Typography>

      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Title"
          value={form.title}
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm((s) => ({ ...s, title: e.target.value }))
          }
        />

        <TextField
          select
          fullWidth
          label="Category"
          value={form.category}
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm((s) => ({ ...s, category: e.target.value }))
          }
        >
          {categories.map((c) => (
            <MenuItem key={c.key} value={c.key}>
              {c.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Lessons"
          type="number"
          value={form.lessons}
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm((s) => ({
              ...s,
              lessons: Number(e.target.value)
            }))
          }
        />

        <TextField
          fullWidth
          label="Students"
          type="number"
          value={form.students}
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm((s) => ({
              ...s,
              students: Number(e.target.value)
            }))
          }
        />

        <Button variant="contained" onClick={save}>
          Save
        </Button>

        <Button sx={{ ml: 2 }} onClick={() => nav(-1)}>
          Cancel
        </Button>
      </Paper>
    </div>
  );
}
