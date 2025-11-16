// src/pages/admin/AddTest.jsx
import React, { useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

function emptyQuestion() {
  return { text: "", choices: ["", ""], correctIndex: 0 };
}

export default function AddTest() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([emptyQuestion()]);

  function addQuestion() {
    setQuestions((q) => [...q, emptyQuestion()]);
  }
  function removeQuestion(i) {
    setQuestions((q) => q.filter((_, idx) => idx !== i));
  }
  function updateQuestion(i, changes) {
    setQuestions((q) => q.map((one, idx) => (idx === i ? { ...one, ...changes } : one)));
  }
  function addChoice(qIndex) {
    setQuestions((q) => q.map((one, idx) => (idx === qIndex ? { ...one, choices: [...one.choices, ""] } : one)));
  }
  function updateChoice(qIndex, cIndex, value) {
    setQuestions((q) => q.map((one, idx) => {
      if (idx !== qIndex) return one;
      const choices = one.choices.map((c, ci) => (ci === cIndex ? value : c));
      return { ...one, choices };
    }));
  }
  function removeChoice(qIndex, cIndex) {
    setQuestions((q) => q.map((one, idx) => {
      if (idx !== qIndex) return one;
      const choices = one.choices.filter((_, ci) => ci !== cIndex);
      const correctIndex = Math.min(one.correctIndex, choices.length - 1);
      return { ...one, choices, correctIndex };
    }));
  }

  function saveTest() {
    if (!title) return alert("Please set test title");
    if (questions.some((q) => !q.text || q.choices.length < 2)) return alert("Fill all questions and at least 2 choices");
    const saved = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");
    saved.unshift({ id: Date.now(), title, questions });
    localStorage.setItem("pahrikyns:tests", JSON.stringify(saved));
    alert("Test saved (demo)");
    window.location.href = "/admin/mcq-tests";
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Create MCQ Test</Typography>

      <Paper sx={{ p: 3 }}>
        <TextField label="Test Title" fullWidth sx={{ mb: 2 }} value={title} onChange={(e) => setTitle(e.target.value)} />

        {questions.map((q, i) => (
          <Box key={i} sx={{ mb: 2, p: 2, borderRadius: 1, background: "rgba(255,255,255,0.02)" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>Question {i + 1}</Typography>
              <Box>
                <IconButton onClick={() => addChoice(i)} title="Add choice"><AddCircleOutline /></IconButton>
                {questions.length > 1 && <IconButton onClick={() => removeQuestion(i)} title="Remove question"><RemoveCircleOutline /></IconButton>}
              </Box>
            </Box>

            <TextField label="Question text" fullWidth sx={{ mb: 1 }} value={q.text} onChange={(e) => updateQuestion(i, { text: e.target.value })} />
            {q.choices.map((c, ci) => (
              <Box key={ci} sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
                <TextField label={`Choice ${ci + 1}`} fullWidth value={c} onChange={(e) => updateChoice(i, ci, e.target.value)} />
                <Button variant={q.correctIndex === ci ? "contained" : "outlined"} onClick={() => updateQuestion(i, { correctIndex: ci })}>Correct</Button>
                {q.choices.length > 2 && <IconButton onClick={() => removeChoice(i, ci)}><RemoveCircleOutline /></IconButton>}
              </Box>
            ))}
          </Box>
        ))}

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={addQuestion}>Add Question</Button>
          <Button variant="outlined" onClick={saveTest}>Save Test</Button>
        </Box>
      </Paper>
    </Box>
  );
}
