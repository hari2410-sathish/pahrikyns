// src/pages/admin/TakeTest.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationContext";

export default function TakeTest() {
  const { id } = useParams();
  const nav = useNavigate();
  const { notify } = useNotifications();

  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({}); // { qIndex: selectedIndex }
  const [timeLeft, setTimeLeft] = useState(null); // seconds
  const timerRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");
    const found = all.find((t) => String(t.id) === String(id));
    if (!found) {
      notify("Test not found", "error");
      nav("/admin/mcq-tests");
      return;
    }
    setTest(found);

    // initialize answers if saved in sessionStorage
    const savedKey = `pahrikyns:attempt:${id}`;
    const savedSession = JSON.parse(sessionStorage.getItem(savedKey) || "{}");
    setAnswers(savedSession.answers || {});

    if (found.timeLimit) {
      // timeLimit in minutes → convert to seconds
      const secs = Number(found.timeLimit) * 60;
      const prevRemain = savedSession.timeLeft ?? secs;
      setTimeLeft(prevRemain);
    }
    // cleanup on unmount
    return () => {
      clearInterval(timerRef.current);
    };
  }, [id, nav, notify]);

  // start countdown
  useEffect(() => {
    if (timeLeft == null) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t == null) return t;
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(); // auto submit
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // persist progress to sessionStorage
  useEffect(() => {
    if (!test) return;
    const savedKey = `pahrikyns:attempt:${id}`;
    sessionStorage.setItem(savedKey, JSON.stringify({ answers, timeLeft }));
  }, [answers, timeLeft, id, test]);

  function selectAnswer(qIndex, idx) {
    setAnswers((s) => ({ ...s, [qIndex]: idx }));
  }

  function calcProgress() {
    if (!test) return 0;
    const total = test.questions.length;
    const answered = Object.keys(answers).length;
    return Math.round((answered / total) * 100);
  }

  function formatTimeLeft(secs) {
    if (secs == null) return "";
    const mm = String(Math.floor(secs / 60)).padStart(2, "0");
    const ss = String(secs % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function handleSubmit() {
    if (!test) return;
    setSubmitting(true);

    // compute score
    let correct = 0;
    const total = test.questions.length;
    const details = [];

    test.questions.forEach((q, i) => {
      const sel = typeof answers[i] === "number" ? answers[i] : null;
      const ok = sel !== null && sel === q.correctIndex;
      if (ok) correct += 1;
      details.push({ questionIndex: i, selected: sel, correctIndex: q.correctIndex, correct: ok });
    });

    const score = Math.round((correct / total) * 100); // percentage

    // save result
    const results = JSON.parse(localStorage.getItem("pahrikyns:test-results") || "[]");
    const resultObj = {
      id: Date.now(),
      testId: test.id,
      score,
      correct,
      total,
      details,
      createdAt: new Date().toISOString(),
    };
    results.unshift(resultObj);
    localStorage.setItem("pahrikyns:test-results", JSON.stringify(results));

    // clear session attempt
    sessionStorage.removeItem(`pahrikyns:attempt:${id}`);

    // navigate to result page
    navigateToResult(resultObj.id);
  }

  function navigateToResult(resultId) {
    setSubmitting(false);
    nav(`/admin/test-result/${resultId}`);
  }

  if (!test) return null;

  const progress = calcProgress();
  const totalQs = test.questions.length;
  const secsLeft = timeLeft;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
        {test.title}
      </Typography>

      <Paper className="glass-card" sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography sx={{ fontWeight: 800 }}>{test.title}</Typography>
            <Typography sx={{ fontSize: 13, opacity: 0.8 }}>{test.questions.length} questions</Typography>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            {secsLeft != null && <Typography sx={{ fontWeight: 800 }}>{formatTimeLeft(secsLeft)}</Typography>}
            <Typography sx={{ fontSize: 12, opacity: 0.7 }}>{progress}% completed</Typography>
            <Box sx={{ width: 200, mt: 1 }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          </Box>
        </Stack>
      </Paper>

      <Box>
        {test.questions.map((q, i) => (
          <Paper key={i} className="glass-card" sx={{ p: 2, mb: 2 }}>
            <Typography sx={{ fontWeight: 800, mb: 1 }}>{`Q${i + 1}. ${q.text}`}</Typography>

            <RadioGroup value={typeof answers[i] === "number" ? String(answers[i]) : ""} onChange={(e) => selectAnswer(i, Number(e.target.value))}>
              {q.choices.map((c, ci) => (
                <FormControlLabel key={ci} value={String(ci)} control={<Radio />} label={c} />
              ))}
            </RadioGroup>
          </Paper>
        ))}
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => nav(-1)}>Cancel</Button>
        <Button variant="contained" disabled={submitting} sx={{ background: "linear-gradient(90deg,#06b6d4,#7c3aed)" }} onClick={handleSubmit}>
          Submit Test
        </Button>
      </Stack>
    </motion.div>
  );
}
