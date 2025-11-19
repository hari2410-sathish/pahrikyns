// src/pages/admin/EditTest.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationContext";

export default function EditTest() {
  const { id } = useParams();
  const nav = useNavigate();
  const { notify } = useNotifications();

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [tags, setTags] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");
    const found = all.find((t) => String(t.id) === String(id));
    if (!found) {
      notify("Test not found", "error");
      nav("/admin/mcq-tests");
      return;
    }
    setTitle(found.title || "");
    setDifficulty(found.difficulty || "");
    setTimeLimit(found.timeLimit || "");
    setTags(found.tags || "");
    setQuestions(found.questions || []);
  }, [id, nav, notify]);

  function addQuestion() {
    setQuestions((s) => [...s, { text: "", choices: ["", ""], correctIndex: 0 }]);
  }
  function removeQuestion(i) { setQuestions((s) => s.filter((_, idx) => idx !== i)); }
  function updateQuestion(i, changes) { setQuestions((s) => s.map((q, idx) => idx === i ? { ...q, ...changes } : q)); }
  function addChoice(qIndex) { setQuestions((s) => s.map((q, idx) => idx === qIndex ? { ...q, choices: [...q.choices, ""] } : q)); }
  function updateChoice(qIndex, cIndex, value) { setQuestions((s) => s.map((q, idx) => { if (idx !== qIndex) return q; const choices = q.choices.map((c,ci) => ci===cIndex?value:c); return { ...q, choices }; })); }
  function removeChoice(qIndex, cIndex) { setQuestions((s) => s.map((q, idx) => { if (idx !== qIndex) return q; const choices = q.choices.filter((_,ci)=>ci!==cIndex); return { ...q, choices, correctIndex: Math.min(q.correctIndex, choices.length-1) }; })); }

  function save() {
    if (!title.trim()) return notify("Test title required", "error");
    for (const q of questions) {
      if (!q.text.trim()) return notify("Fill all question text", "error");
      if (q.choices.length < 2) return notify("Each question needs 2+ choices", "error");
    }
    const all = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");
    const updated = all.map((t) => (String(t.id) === String(id) ? { ...t, title, difficulty, timeLimit, tags, questions } : t));
    localStorage.setItem("pahrikyns:tests", JSON.stringify(updated));
    notify("Test updated", "success");
    nav("/admin/mcq-tests");
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Edit Test</Typography>

      <Paper className="glass-card" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <TextField label="Title" value={title} onChange={(e)=>setTitle(e.target.value)} fullWidth />
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField label="Difficulty" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} fullWidth />
            <TextField label="Time limit (mins)" value={timeLimit} onChange={(e)=>setTimeLimit(e.target.value)} fullWidth />
          </Stack>
          <TextField label="Tags (comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)} fullWidth />

          {/* Questions */}
          {questions.map((q, i) => (
            <Paper key={i} sx={{ p: 2, background:"rgba(255,255,255,0.02)" }}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontWeight: 800 }}>Question {i+1}</Typography>
                  <IconButton onClick={()=>removeQuestion(i)} color="error" size="small"><RemoveCircleOutlineIcon /></IconButton>
                </Stack>

                <TextField label="Question text" value={q.text} onChange={(e)=>updateQuestion(i, { text: e.target.value })} fullWidth sx={{ mb: 1 }} />

                {q.choices.map((c, ci) => (
                  <Stack key={ci} direction="row" spacing={1} alignItems="center">
                    <TextField label={`Choice ${ci+1}`} value={c} onChange={(e)=>updateChoice(i, ci, e.target.value)} fullWidth />
                    <IconButton onClick={()=>updateQuestion(i, { correctIndex: ci })} sx={{ color: "#06b6d4" }}>
                      {q.correctIndex === ci ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                    </IconButton>
                    {q.choices.length > 2 && <IconButton color="error" onClick={()=>removeChoice(i, ci)}><RemoveCircleOutlineIcon /></IconButton>}
                  </Stack>
                ))}

                <Button size="small" startIcon={<AddCircleOutlineIcon />} onClick={()=>addChoice(i)}>Add choice</Button>
              </Stack>
            </Paper>
          ))}

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={addQuestion}>Add Question</Button>
            <Button variant="contained" sx={{ background: "linear-gradient(90deg,#06b6d4,#7c3aed)" }} onClick={save}>Save Test</Button>
          </Stack>
        </Stack>
      </Paper>
    </motion.div>
  );
}
