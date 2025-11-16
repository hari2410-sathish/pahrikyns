// src/pages/admin/ManageTests.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Typography, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// ✅ Notification provider
import { useNotify } from "../../components/NotificationProvider";

export default function ManageTests() {
  const [tests, setTests] = useState([]);
  const notify = useNotify();
  const nav = useNavigate();

  // Load tests
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");
    setTests(saved);
  }, []);

  function remove(id) {
    const filtered = tests.filter((t) => t.id !== id);
    setTests(filtered);
    localStorage.setItem("pahrikyns:tests", JSON.stringify(filtered));

    notify("Test deleted", "success");
  }

  return (
    <AdminLayout>
      <Typography
        variant="h4"
        sx={{ color: "#fff", fontWeight: 900, mb: 2 }}
      >
        Manage Tests
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => nav("/admin/add-test")}
      >
        Create Test
      </Button>

      {tests.length === 0 && <Paper sx={{ p: 3 }}>No tests yet.</Paper>}

      {tests.map((t) => (
        <Paper key={t.id} sx={{ p: 3, mb: 2 }}>
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
    </AdminLayout>
  );
}
