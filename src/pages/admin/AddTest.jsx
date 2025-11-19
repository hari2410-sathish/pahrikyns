// src/pages/admin/AddTest.jsx
import React, { useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  IconButton,
  Tabs,
  Tab,
  Stack,
  Chip,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 🔔 Notifications
import { useNotify } from "../../components/NotificationProvider";

export default function AddTest() {
  const notify = useNotify();
  const nav = useNavigate();

  const [tab, setTab] = useState(0);

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [tags, setTags] = useState("");

  const [questions, setQuestions] = useState([
    {
      text: "",
      choices: ["", ""],
      correctIndex: 0,
    },
  ]);

  // -------------------------
  // Question Operations
  // -------------------------
  function addQuestion() {
    setQuestions((q) => [
      ...q,
      { text: "", choices: ["", ""], correctIndex: 0 },
    ]);
  }

  function removeQuestion(i) {
    if (questions.length === 1) return;
    setQuestions((q) => q.filter((_, idx) => idx !== i));
  }

  function updateQuestion(i, updates) {
    setQuestions((q) =>
      q.map((item, idx) => (idx === i ? { ...item, ...updates } : item))
    );
  }

  function addChoice(qIndex) {
    setQuestions((q) =>
      q.map((item, idx) =>
        idx === qIndex
          ? { ...item, choices: [...item.choices, ""] }
          : item
      )
    );
  }

  function updateChoice(qIndex, cIndex, value) {
    setQuestions((q) =>
      q.map((item, idx) => {
        if (idx !== qIndex) return item;
        const newChoices = item.choices.map((c, ci) =>
          ci === cIndex ? value : c
        );
        return { ...item, choices: newChoices };
      })
    );
  }

  function removeChoice(qIndex, cIndex) {
    setQuestions((q) =>
      q.map((item, idx) => {
        if (idx !== qIndex) return item;
        const newChoices = item.choices.filter((_, ci) => ci !== cIndex);
        return {
          ...item,
          choices: newChoices,
          correctIndex: Math.min(item.correctIndex, newChoices.length - 1),
        };
      })
    );
  }

  // -------------------------
  // Save MCQ Test
  // -------------------------
  function saveTest() {
    if (!title.trim()) return notify("Please enter test title", "error");

    // validation
    for (const q of questions) {
      if (!q.text.trim())
        return notify("All questions must have text!", "error");
      if (q.choices.length < 2)
        return notify("Each question must have 2 choices minimum!", "error");
      if (q.choices.some((c) => !c.trim()))
        return notify("Choices cannot be empty", "error");
    }

    const saved = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");

    const newTest = {
      id: Date.now(),
      title,
      difficulty,
      timeLimit,
      tags,
      questions,
      createdAt: new Date().toISOString(),
    };

    saved.unshift(newTest);

    localStorage.setItem("pahrikyns:tests", JSON.stringify(saved));

    notify("MCQ Test created successfully!", "success");
    nav("/admin/mcq-tests");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
        Create MCQ Test
      </Typography>

      <Paper
        className="glass-card"
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{
            mb: 2,
            "& .MuiTab-root": { color: "#bbb" },
            "& .Mui-selected": { color: "#06b6d4 !important" },
          }}
        >
          <Tab label="Test Details" />
          <Tab label="Questions" />
        </Tabs>

        {/* ---------------------------
            TAB 1: Test Details
        ---------------------------- */}
        {tab === 0 && (
          <Box>
            <TextField
              label="Test Title"
              fullWidth
              sx={{ mb: 2 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Difficulty (Easy / Medium / Hard)"
                fullWidth
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />

              <TextField
                label="Time Limit (mins)"
                fullWidth
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              />
            </Stack>

            <TextField
              label="Tags (comma separated)"
              fullWidth
              sx={{ mt: 2 }}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={() => setTab(1)}
                sx={{
                  px: 3,
                  background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                }}
              >
                Next → Add Questions
              </Button>
            </Box>
          </Box>
        )}

        {/* ---------------------------
            TAB 2: Questions
        ---------------------------- */}
        {tab === 1 && (
          <Box>
            {questions.map((q, i) => (
              <Paper
                key={i}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ fontWeight: 800, mb: 1 }}>
                    Question {i + 1}
                  </Typography>

                  {questions.length > 1 && (
                    <IconButton onClick={() => removeQuestion(i)} color="error">
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  )}
                </Stack>

                <TextField
                  label="Question text"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={q.text}
                  onChange={(e) =>
                    updateQuestion(i, { text: e.target.value })
                  }
                />

                {q.choices.map((c, ci) => (
                  <Stack
                    key={ci}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <TextField
                      label={`Choice ${ci + 1}`}
                      fullWidth
                      value={c}
                      onChange={(e) =>
                        updateChoice(i, ci, e.target.value)
                      }
                    />

                    <IconButton
                      onClick={() =>
                        updateQuestion(i, { correctIndex: ci })
                      }
                      sx={{ color: "#06b6d4" }}
                    >
                      {q.correctIndex === ci ? (
                        <CheckCircleIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </IconButton>

                    {q.choices.length > 2 && (
                      <IconButton
                        color="error"
                        onClick={() => removeChoice(i, ci)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    )}
                  </Stack>
                ))}

                <Button
                  size="small"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => addChoice(i)}
                >
                  Add Choice
                </Button>
              </Paper>
            ))}

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addQuestion}
              >
                Add Question
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                }}
                onClick={saveTest}
              >
                Save Test
              </Button>
            </Stack>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
}
