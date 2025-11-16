// src/pages/admin/EditLesson.jsx
import React, { useEffect, useState } from "react";
import { Typography, Paper, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

// ✅ FIXED IMPORT PATH
import { useNotify } from "../../components/NotificationProvider";

export default function EditLesson() {
  const { lessonId } = useParams();
  const nav = useNavigate();
  const notify = useNotify();

  const [form, setForm] = useState({
    title: "",
    duration: "",
  });

  // Load existing lesson
  useEffect(() => {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("pahrikyns:lessons:")
    );

    for (const k of keys) {
      const items = JSON.parse(localStorage.getItem(k) || "[]");
      const found = items.find((it) => String(it.id) === String(lessonId));
      if (found) {
        setForm(found);
        break;
      }
    }
  }, [lessonId]);

  function save() {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("pahrikyns:lessons:")
    );

    for (const k of keys) {
      const items = JSON.parse(localStorage.getItem(k) || "[]");
      const idx = items.findIndex((it) => String(it.id) === String(lessonId));

      if (idx !== -1) {
        items[idx] = { ...items[idx], ...form };
        localStorage.setItem(k, JSON.stringify(items));
        notify("Lesson updated", "success");
        nav(-1);
        return;
      }
    }

    notify("Lesson not found", "error");
  }

  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Edit Lesson
      </Typography>

      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Title"
          sx={{ mb: 2 }}
          value={form.title}
          onChange={(e) =>
            setForm((s) => ({ ...s, title: e.target.value }))
          }
        />

        <TextField
          fullWidth
          label="Duration"
          sx={{ mb: 2 }}
          value={form.duration}
          onChange={(e) =>
            setForm((s) => ({ ...s, duration: e.target.value }))
          }
        />

        <Button variant="contained" onClick={save}>
          Save
        </Button>
      </Paper>
    </div>
  );
}
