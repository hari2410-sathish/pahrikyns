// src/pages/admin/ManageCourses.jsx
import React, { useEffect, useState } from "react";
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
  DialogActions
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

// ✅ FIXED IMPORT PATH
import { useNotify } from "../../components/NotificationProvider";

export default function ManageCourses() {
  const nav = useNavigate();
  const notify = useNotify();

  const [rows, setRows] = useState([]);
  const [openDel, setOpenDel] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  // Load all courses
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pahrikyns:courses") || "[]");
    setRows(saved);
  }, []);

  function persist(newRows) {
    setRows(newRows);
    localStorage.setItem("pahrikyns:courses", JSON.stringify(newRows));
  }

  function handleDelete(id) {
    setToDelete(id);
    setOpenDel(true);
  }

  function confirmDelete() {
    const filtered = rows.filter((r) => r.id !== toDelete);
    persist(filtered);
    setOpenDel(false);
    notify("Course deleted", "success");
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 340, flex: 1 },
    { field: "category", headerName: "Category", width: 140 },
    { field: "lessons", headerName: "Lessons", width: 110 },
    { field: "students", headerName: "Students", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 240,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="contained"
              onClick={() => nav(`/admin/edit-course/${id}`)}
            >
              Edit
            </Button>

            <Button
              size="small"
              onClick={() => nav(`/admin/add-lesson/${id}`)}
            >
              Add Lesson
            </Button>

            <IconButton color="error" onClick={() => handleDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      }
    }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Manage Courses
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => nav("/admin/add-course")}
        >
          Add Course
        </Button>

        <Button
          onClick={() => {
            localStorage.setItem("pahrikyns:courses", JSON.stringify([]));
            persist([]);
            notify("All courses cleared", "info");
          }}
        >
          Clear All (demo)
        </Button>
      </Stack>

      <Paper sx={{ height: 520, p: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.id}
          disableSelectionOnClick
        />
      </Paper>

      <Dialog open={openDel} onClose={() => setOpenDel(false)}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this course?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDel(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
