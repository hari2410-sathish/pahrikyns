// src/pages/admin/ManageCourses.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Stack,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationContext";

export default function ManageCourses() {
  const nav = useNavigate();
  const { notify } = useNotifications();

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  // Load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("courses") || "[]");
    setRows(saved);
  }, []);

  // Save back to storage
  function saveRows(newList) {
    setRows(newList);
    localStorage.setItem("courses", JSON.stringify(newList));
  }

  // Filtered rows
  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    return rows.filter((r) =>
      r.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  // Delete course dialog
  function deleteCourse(id) {
    setToDelete(id);
    setOpenDel(true);
  }

  function confirmDelete() {
    const updated = rows.filter((r) => r.id !== toDelete);
    saveRows(updated);
    notify("Course deleted!", "success");
    setOpenDel(false);
  }

  // Table columns
  const columns = [
    {
      field: "image",
      headerName: "Thumbnail",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.preview || "/placeholder.jpg"}
          style={{
            height: 46,
            width: 70,
            borderRadius: 6,
            objectFit: "cover",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
      ),
    },

    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ fontWeight: 600 }}>{params.value}</Typography>
      ),
    },

    { field: "category", headerName: "Category", width: 140 },

    {
      field: "level",
      headerName: "Level",
      width: 130,
      renderCell: (p) => (
        <Chip
          label={p.value}
          size="small"
          sx={{
            background: "rgba(255,255,255,0.08)",
            color: "#06b6d4",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />
      ),
    },

    { field: "price", headerName: "Price", width: 100 },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (p) => (
        <Chip
          label={p.value === "active" ? "ACTIVE" : "DRAFT"}
          color={p.value === "active" ? "success" : "warning"}
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 230,
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => nav(`/admin/edit-course/${id}`)}
              sx={{ color: "#7c3aed" }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={() => nav(`/admin/add-lesson/${id}`)}
              sx={{ color: "#06b6d4" }}
            >
              <AddPhotoAlternateIcon />
            </IconButton>

            <IconButton sx={{ color: "error.main" }} onClick={() => deleteCourse(id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
        Manage Courses
      </Typography>

      {/* Top Action Bar */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={() => nav("/admin/add-course")}
          sx={{
            background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
            px: 3,
            py: 1,
            borderRadius: 2,
          }}
        >
          + Add Course
        </Button>

        {/* Search Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.08)",
            px: 2,
            width: { xs: "100%", md: 280 },
          }}
        >
          <SearchIcon sx={{ mr: 1, opacity: 0.6 }} />
          <TextField
            variant="standard"
            placeholder="Search course..."
            InputProps={{ disableUnderline: true }}
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ color: "#fff" }}
          />
        </Box>

        {/* Clear all */}
        <Button
          variant="outlined"
          sx={{
            borderColor: "#f87171",
            color: "#f87171",
            "&:hover": { borderColor: "#ef4444", color: "#ef4444" },
          }}
          onClick={() => {
            saveRows([]);
            notify("All courses cleared (demo)", "info");
          }}
        >
          Clear All
        </Button>
      </Stack>

      {/* Table */}
      <Paper
        className="glass-card"
        sx={{
          height: 550,
          p: 1,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(r) => r.id}
          disableRowSelectionOnClick
          sx={{
            color: "#fff",
            border: "none",

            "& .MuiDataGrid-columnHeaders": {
              background: "rgba(255,255,255,0.04)",
            },

            "& .MuiDataGrid-row:hover": {
              background: "rgba(255,255,255,0.03)",
              cursor: "pointer",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid rgba(255,255,255,0.08)",
            },
          }}
        />
      </Paper>

      {/* Delete Dialog */}
      <Dialog open={openDel} onClose={() => setOpenDel(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this course?
        </DialogContent>
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
