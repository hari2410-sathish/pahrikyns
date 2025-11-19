// src/pages/admin/ManageTests.jsx
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
  Chip,
  TextField,
  MenuItem,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";
import { useNotify } from "../../components/NotificationProvider";

export default function ManageTests() {
  const nav = useNavigate();
  const notify = useNotify();

  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const [openDel, setOpenDel] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  // Load all saved tests
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");
    setTests(saved);
  }, []);

  function save(updated) {
    setTests(updated);
    localStorage.setItem("pahrikyns:tests", JSON.stringify(updated));
  }

  function deleteTest(id) {
    setToDelete(id);
    setOpenDel(true);
  }

  function confirmDelete() {
    const updated = tests.filter((t) => t.id !== toDelete);
    save(updated);
    notify("Test deleted!", "success");
    setOpenDel(false);
  }

  // -----------------------
  // FILTER + SEARCH LOGIC
  // -----------------------
  const filtered = useMemo(() => {
    let data = [...tests];

    if (filterDifficulty) {
      data = data.filter(
        (t) =>
          t.difficulty?.toLowerCase() === filterDifficulty.toLowerCase()
      );
    }

    if (search.trim()) {
      data = data.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [tests, search, filterDifficulty]);

  // -----------------------
  // Table Columns
  // -----------------------
  const columns = [
    {
      field: "title",
      headerName: "Test Title",
      flex: 1.3,
      renderCell: (p) => (
        <Typography sx={{ fontWeight: 700 }}>{p.value}</Typography>
      ),
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      width: 130,
      renderCell: (p) => (
        <Chip
          label={p.value || "N/A"}
          size="small"
          sx={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color:
              p.value === "Hard"
                ? "#ef4444"
                : p.value === "Medium"
                ? "#f59e0b"
                : "#22c55e",
          }}
        />
      ),
    },
    {
      field: "questions",
      headerName: "Questions",
      width: 130,
      renderCell: (p) => (
        <Chip
          label={`${p.value.length} Qs`}
          size="small"
          sx={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#06b6d4",
          }}
        />
      ),
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      renderCell: (p) => (
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {p.value
            ?.split(",")
            .map((tag, index) => (
              <Chip
                key={index}
                size="small"
                label={tag.trim()}
                sx={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />
            ))}
        </Stack>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 180,
      renderCell: (p) => (
        <Typography sx={{ opacity: 0.7 }}>
          {new Date(p.value).toLocaleDateString()}
        </Typography>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => nav(`/admin/view-test/${params.row.id}`)}
            sx={{ color: "#06b6d4" }}
          >
            <VisibilityIcon />
          </IconButton>

          <IconButton
            onClick={() => nav(`/admin/edit-test/${params.row.id}`)}
            sx={{ color: "#7c3aed" }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => deleteTest(params.row.id)}
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
        Manage MCQ Tests
      </Typography>

      {/* ACTION BAR */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Button
          variant="contained"
          sx={{
            px: 3,
            background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
          }}
          onClick={() => nav("/admin/add-test")}
        >
          + Create MCQ Test
        </Button>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.1)",
            px: 2,
            width: { xs: "100%", md: 280 },
          }}
        >
          <SearchIcon sx={{ opacity: 0.6, mr: 1 }} />
          <TextField
            variant="standard"
            placeholder="Search test..."
            InputProps={{ disableUnderline: true }}
            fullWidth
            sx={{ color: "#fff" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        {/* Difficulty Filter */}
        <TextField
          select
          label="Filter Difficulty"
          sx={{ width: 200 }}
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </TextField>
      </Stack>

      {/* DATA GRID */}
      <Paper
        className="glass-card"
        sx={{
          height: 560,
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
              background: "rgba(255,255,255,0.05)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            },

            "& .MuiDataGrid-row:hover": {
              background: "rgba(255,255,255,0.06)",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
      </Paper>

      {/* DELETE POPUP */}
      <Dialog open={openDel} onClose={() => setOpenDel(false)}>
        <DialogTitle>Delete Test?</DialogTitle>
        <DialogContent>This cannot be undone.</DialogContent>
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
