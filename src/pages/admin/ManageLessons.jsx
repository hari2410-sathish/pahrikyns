// src/pages/admin/ManageLessons.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SearchIcon from "@mui/icons-material/Search";

import { useParams, useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationContext";

export default function ManageLessons() {
  const { courseId } = useParams();
  const nav = useNavigate();
  const { notify } = useNotifications();

  const [lessons, setLessons] = useState([]);
  const [search, setSearch] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const key = `pahrikyns:lessons:${courseId}`;

  // Load lessons from storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    setLessons(saved);
  }, [courseId]);

  function saveLessons(updated) {
    setLessons(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  }

  function deleteLesson(id) {
    setToDelete(id);
    setOpenDel(true);
  }

  function confirmDelete() {
    const updated = lessons.filter((l) => l.id !== toDelete);
    saveLessons(updated);
    notify("Lesson removed!", "success");
    setOpenDel(false);
  }

  // Filter By Search
  const filtered = useMemo(() => {
    if (!search.trim()) return lessons;
    return lessons.filter((l) =>
      l.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [lessons, search]);

  // Table Columns
  const columns = [
    {
      field: "thumbPreview",
      headerName: "Thumb",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.thumbPreview || "/placeholder.jpg"}
          style={{
            width: 70,
            height: 45,
            borderRadius: 6,
            objectFit: "cover",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
      ),
    },

    {
      field: "title",
      headerName: "Lesson Title",
      flex: 1,
      renderCell: (p) => (
        <Typography sx={{ fontWeight: 600 }}>{p.value}</Typography>
      ),
    },

    {
      field: "duration",
      headerName: "Duration",
      width: 120,
      renderCell: (p) => (
        <Chip
          label={`${p.value} min`}
          size="small"
          sx={{
            background: "rgba(255,255,255,0.06)",
            color: "#06b6d4",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />
      ),
    },

    { field: "order", headerName: "Order", width: 90 },

    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      renderCell: (p) => (
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {p.value
            ?.split(",")
            .map((t, i) => (
              <Chip
                key={i}
                size="small"
                label={t.trim()}
                sx={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />
            ))}
        </Stack>
      ),
    },

    {
      field: "videoPreview",
      headerName: "Video",
      width: 120,
      renderCell: (p) => (
        <IconButton sx={{ color: "#7c3aed" }}>
          <OndemandVideoIcon />
        </IconButton>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => nav(`/admin/edit-lesson/${courseId}/${params.row.id}`)}
            sx={{ color: "#06b6d4" }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => deleteLesson(params.row.id)}
            sx={{ color: "error.main" }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
        Manage Lessons – Course {courseId}
      </Typography>

      {/* ACTION BAR */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
        alignItems="center"
      >
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
            px: 3,
          }}
          onClick={() => nav(`/admin/add-lesson/${courseId}`)}
        >
          + Add Lesson
        </Button>

        {/* Search Input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 2,
            px: 2,
            width: { xs: "100%", md: 280 },
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <SearchIcon sx={{ opacity: 0.6, mr: 1 }} />
          <TextField
            variant="standard"
            placeholder="Search lesson..."
            InputProps={{ disableUnderline: true }}
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ color: "#fff" }}
          />
        </Box>
      </Stack>

      {/* TABLE */}
      <Paper
        className="glass-card"
        sx={{
          height: 550,
          p: 1,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <DataGrid
          rows={filtered}
          columns={columns}
          getRowId={(r) => r.id}
          disableRowSelectionOnClick
          sx={{
            color: "#fff",

            "& .MuiDataGrid-columnHeaders": {
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            },

            "& .MuiDataGrid-row:hover": {
              background: "rgba(255,255,255,0.03)",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid rgba(255,255,255,0.08)",
            },
          }}
        />
      </Paper>

      {/* DELETE DIALOG */}
      <Dialog open={openDel} onClose={() => setOpenDel(false)}>
        <DialogTitle>Delete Lesson?</DialogTitle>
        <DialogContent>This action cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDel(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}
