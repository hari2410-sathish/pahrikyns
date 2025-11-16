// src/pages/admin/MCQTests.jsx
import React, { useState, useEffect } from "react";
import { Typography, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// ✅ Add Notification Provider
import { useNotify } from "../../components/NotificationProvider";

export default function MCQTests() {
  const [tests, setTests] = useState([]);
  const notify = useNotify();
  const nav = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");
    setTests(saved);
  }, []);

  function remove(id) {
    const next = tests.filter((t) => t.id !== id);
    setTests(next);
    localStorage.setItem("pahrikyns:tests", JSON.stringify(next));
    notify("Test deleted", "success");
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        MCQ Tests
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => nav("/admin/add-test")}
      >
        Create Test
      </Button>

      {tests.length === 0 && <Paper sx={{ p: 2 }}>No tests yet.</Paper>}

      {tests.map((t) => (
        <Paper key={t.id} sx={{ p: 2, mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>{t.title}</Typography>

            <Box>
              <Button onClick={() => nav(`/admin/view-test/${t.id}`)}>
                View
              </Button>

              <Button color="error" onClick={() => remove(t.id)}>
                Delete
              </Button>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
