// src/pages/admin/ManageLessons.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

export default function ManageLessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  // Load lessons from localStorage
  useEffect(() => {
    const key = `pahrikyns:lessons:${courseId}`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    setLessons(saved);
  }, [courseId]);

  function remove(id) {
    if (!window.confirm("Delete lesson?")) return;

    const key = `pahrikyns:lessons:${courseId}`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");

    const filtered = saved.filter(
      (l) => String(l.id) !== String(id) && String(l._id) !== String(id)
    );

    localStorage.setItem(key, JSON.stringify(filtered));
    setLessons(filtered);
  }

  return (
    <Box sx={{ px: 3, py: 6 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Manage Lessons (Course {courseId})
      </Typography>

      <Paper sx={{ p: 2 }}>
        <List>
          {lessons.length === 0 && (
            <Typography sx={{ opacity: 0.6, p: 2 }}>
              No lessons found.
            </Typography>
          )}

          {lessons.map((l) => {
            const id = l._id || l.id;
            return (
              <ListItem
                key={id}
                secondaryAction={
                  <Box>
                    <Button
                      component={Link}
                      to={`/admin/courses/${courseId}/lessons/${id}/edit`}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button color="error" onClick={() => remove(id)}>
                      Delete
                    </Button>
                  </Box>
                }
              >
                <ListItemText
                  primary={l.title}
                  secondary={`${l.duration || l.length || ""} mins`}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
}
