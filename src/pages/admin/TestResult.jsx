// src/pages/admin/TestResult.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationContext";

export default function TestResult() {
  const { resultId } = useParams();
  const nav = useNavigate();
  const { notify } = useNotifications();

  const [result, setResult] = useState(null);
  const [test, setTest] = useState(null);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("pahrikyns:test-results") || "[]");
    const found = results.find((r) => String(r.id) === String(resultId));
    if (!found) {
      notify("Result not found", "error");
      nav("/admin/mcq-tests");
      return;
    }
    setResult(found);

    const allTests = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");
    setTest(allTests.find((t) => String(t.id) === String(found.testId)));
  }, [resultId, nav, notify]);

  if (!result) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Test Result</Typography>

      <Paper className="glass-card" sx={{ p: 3, mb: 2 }}>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 800 }}>{test?.title || "Test"}</Typography>
          <Typography>Score: <strong>{result.score}%</strong> ({result.correct}/{result.total})</Typography>
          <Typography sx={{ fontSize: 13, opacity: 0.7 }}>Completed: {new Date(result.createdAt).toLocaleString()}</Typography>
          <Box>
            <Chip label={`${result.correct} correct`} sx={{ mr: 1 }} />
            <Chip label={`${result.total - result.correct} wrong`} />
          </Box>
        </Stack>
      </Paper>

      <Paper className="glass-card" sx={{ p: 2 }}>
        {result.details.map((d, i) => {
          const q = test?.questions?.[d.questionIndex];
          const selected = d.selected;
          const correctIndex = d.correctIndex;
          const isCorrect = d.correct;
          return (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 700 }}>{`Q${i + 1}. ${q?.text || ""}`}</Typography>
              <Box sx={{ mt: 1 }}>
                {q?.choices?.map((c, ci) => {
                  const sel = selected === ci;
                  const corr = correctIndex === ci;
                  return (
                    <Button key={ci} sx={{
                      display: "block",
                      textAlign: "left",
                      width: "100%",
                      mb: 0.5,
                      justifyContent: "flex-start",
                      background: sel ? (isCorrect ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.06)") : "transparent",
                      border: corr ? "1px solid rgba(34,197,94,0.14)" : "1px solid rgba(255,255,255,0.02)"
                    }}>
                      <Typography>{String.fromCharCode(65 + ci)}. {c}</Typography>
                      {corr && <Chip label="Answer" size="small" sx={{ ml: 1 }} />}
                      {sel && <Chip label={isCorrect ? "You (Correct)" : "You (Wrong)"} size="small" sx={{ ml: 1 }} color={isCorrect ? "success" : "error"} />}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Paper>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => nav("/admin/mcq-tests")}>Back to Tests</Button>
        <Button variant="contained" onClick={() => nav(-1)} sx={{ background: "linear-gradient(90deg,#06b6d4,#7c3aed)" }}>Back</Button>
      </Stack>
    </motion.div>
  );
}
