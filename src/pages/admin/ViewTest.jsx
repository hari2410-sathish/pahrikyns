// src/pages/admin/ViewTest.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationContext";

export default function ViewTest() {
  const { id } = useParams();
  const nav = useNavigate();
  const { notify } = useNotifications();

  const [test, setTest] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("pahrikyns:tests") || "[]");
    const found = all.find((t) => String(t.id) === String(id));
    if (!found) {
      notify("Test not found", "error");
      return;
    }
    setTest(found);
  }, [id, notify]);

  if (!test) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
        View Test — {test.title}
      </Typography>

      <Paper className="glass-card" sx={{ p: 3, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 800 }}>{test.title}</Typography>
          <Chip label={test.difficulty || "N/A"} />
          <Chip label={test.timeLimit ? `${test.timeLimit} mins` : "No timer"} />
          <Chip label={`${test.questions?.length || 0} Qs`} />
        </Stack>

        {test.tags && (
          <Box sx={{ mb: 2 }}>
            {test.tags.split(",").map((t, i) => (
              <Chip key={i} label={t.trim()} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
        )}

        <Typography sx={{ mb: 1, color: "text.secondary" }}>
          Created: {new Date(test.createdAt).toLocaleString()}
        </Typography>
      </Paper>

      <Paper className="glass-card" sx={{ p: 2 }}>
        {test.questions.map((q, i) => (
          <Accordion key={i} defaultExpanded={i < 1} sx={{ mb: 1, background: "rgba(255,255,255,0.02)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>{`Q${i + 1}. ${q.text}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                {q.choices.map((c, ci) => {
                  const isCorrect = q.correctIndex === ci;
                  return (
                    <Box key={ci} sx={{ p: 1, borderRadius: 1, background: isCorrect ? "rgba(34,197,94,0.06)" : "transparent" }}>
                      <Typography sx={{ fontWeight: isCorrect ? 700 : 400 }}>
                        {String.fromCharCode(65 + ci)}. {c}
                        {isCorrect && <Chip label="Correct" size="small" sx={{ ml: 1, bgcolor: "rgba(34,197,94,0.12)" }} />}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button variant="outlined" onClick={() => nav(-1)}>Back</Button>
        <Button variant="contained" onClick={() => nav(`/admin/take-test/${test.id}`)} sx={{ background: "linear-gradient(90deg,#06b6d4,#7c3aed)" }}>
          Take Test
        </Button>
      </Box>
    </motion.div>
  );
}
