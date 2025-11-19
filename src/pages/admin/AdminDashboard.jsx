// src/pages/admin/AdminDashboard.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import { motion } from "framer-motion";

import {
  StatCard,
  ChartCard,
  RealTimeChart,
  MiniLine,
  MiniBar,
  PieMini,
} from "../../components/Analytics";

import { exportToCSV, aggregateByMonth } from "../../utils/analytics";

// demo data (you will replace with API)
const users = [
  { month: "Jan", users: 200 }, { month: "Feb", users: 350 }, { month: "Mar", users: 500 },
  { month: "Apr", users: 800 }, { month: "May", users: 1200 }, { month: "Jun", users: 1500 },
  { month: "Jul", users: 1800 }, { month: "Aug", users: 2400 }, { month: "Sep", users: 3000 },
  { month: "Oct", users: 3300 }, { month: "Nov", users: 4200 },
];
const revenue = [
  { month: "Jan", revenue: 4000 }, { month: "Feb", revenue: 6500 }, { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 9000 }, { month: "May", revenue: 15000 }, { month: "Jun", revenue: 12000 },
  { month: "Jul", revenue: 9000 }, { month: "Aug", revenue: 14500 }, { month: "Sep", revenue: 17000 },
  { month: "Oct", revenue: 21000 }, { month: "Nov", revenue: 27000 },
];

const courseSplit = [
  { name: "DevOps", value: 45 },
  { name: "AWS", value: 30 },
  { name: "OS", value: 15 },
  { name: "Security", value: 10 },
];

const topCourses = [
  { title: "Complete DevOps", students: 1240, revenue: 9800 },
  { title: "AWS Mastery", students: 860, revenue: 6800 },
  { title: "Linux Fundamentals", students: 420, revenue: 2400 },
];

export default function AdminDashboard() {
  const [range, setRange] = useState("30");
  const [anchor, setAnchor] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const usersFiltered = useMemo(() => {
    if (range === "all") return users;
    const count = range === "7" ? 3 : range === "30" ? 6 : 9;
    return users.slice(-count);
  }, [range]);

  const revenueFiltered = useMemo(() => {
    if (range === "all") return revenue;
    const count = range === "7" ? 3 : range === "30" ? 6 : 9;
    return revenue.slice(-count);
  }, [range]);

  const totalStudents = Math.max(...users.map((u) => u.users)) + 1200;
  const totalCourses = 48;
  const monthlyRevenue = `$${Math.max(...revenue.map((r) => r.revenue)).toLocaleString()}`;
  const activeInstructors = 12;

  function handleExport() {
    // basic CSV from combined months
    const header = ["month", "users", "revenue"];
    const months = usersFiltered.map((u) => u.month);
    const rows = months.map((m) => {
      const u = usersFiltered.find((x) => x.month === m)?.users || "";
      const r = revenueFiltered.find((x) => x.month === m)?.revenue || "";
      return [m, u, r];
    });
    exportToCSV(`analytics-${range || "all"}.csv`, header, rows);
  }

  function refresh() {
    // placeholder - hook to API refresh
    setAnchor(null);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>Admin Dashboard — Analytics</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            label="From"
            type="date"
            value={fromDate}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <TextField
            size="small"
            label="To"
            type="date"
            value={toDate}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setToDate(e.target.value)}
          />

          <Stack direction="row" spacing={1}>
            <Button size="small" variant={range === "7" ? "contained" : "outlined"} onClick={() => setRange("7")}>7d</Button>
            <Button size="small" variant={range === "30" ? "contained" : "outlined"} onClick={() => setRange("30")}>30d</Button>
            <Button size="small" variant={range === "90" ? "contained" : "outlined"} onClick={() => setRange("90")}>90d</Button>
            <Button size="small" variant={range === "all" ? "contained" : "outlined"} onClick={() => setRange("all")}>All</Button>
          </Stack>

          <IconButton onClick={refresh}><RefreshIcon /></IconButton>
          <Button startIcon={<DownloadIcon />} onClick={handleExport} sx={{ background: "linear-gradient(90deg,#06b6d4,#7c3aed)" }}>Export CSV</Button>
        </Stack>
      </Box>

      {/* KPI row */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Students" value={totalStudents.toLocaleString()} subtitle="Active learners" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Courses" value={totalCourses} subtitle="Published courses" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Monthly Revenue" value={monthlyRevenue} subtitle="Best month rolling" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Active Instructors" value={activeInstructors} subtitle="Teaching now" /></Grid>
      </Grid>

      {/* Main charts row */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <ChartCard title="User Growth">
            <Box sx={{ height: { xs: 220, md: 320 } }}>
              <MiniLine data={usersFiltered.map((u) => ({ time: u.month, value: u.users }))} dataKey="value" stroke="#06b6d4" />
            </Box>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Revenue Growth">
            <Box sx={{ height: { xs: 220, md: 320 } }}>
              <MiniBar data={revenueFiltered.map((r) => ({ time: r.month, value: r.revenue }))} dataKey="value" fill="#7c3aed" />
            </Box>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Realtime + Course split + Top courses */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <ChartCard title="Realtime Active Visitors">
            <RealTimeChart wsUrl="ws://localhost:4000" />
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <ChartCard title="Course Split">
            <PieMini data={courseSplit} />
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <ChartCard title="Top Courses">
            <Stack spacing={1}>
              {topCourses.map((t, i) => (
                <Paper key={i} sx={{ p: 1.25, background: "rgba(255,255,255,0.02)" }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography sx={{ fontWeight: 800 }}>{t.title}</Typography>
                      <Typography sx={{ fontSize: 12, opacity: 0.75 }}>{t.students} students • ${t.revenue}</Typography>
                    </Box>
                    <Chip label={`#${i + 1}`} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "#fff" }} />
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Drilldown / cohort / funnel (demo cards) */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <ChartCard title="User Cohort (last months)">
            <Typography sx={{ color: "text.secondary" }}>Cohort heatmap placeholder — replace with your cohort data / matrix visualization.</Typography>
            <Box sx={{ mt: 2 }} />
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Signup Funnel">
            <Stack spacing={1}>
              <Paper sx={{ p: 2, background: "rgba(255,255,255,0.02)" }}>
                <Typography sx={{ fontWeight: 800 }}>Landing → Signups: 12,400</Typography>
                <Typography sx={{ fontSize: 13, opacity: 0.7 }}>Conversion: 4.3%</Typography>
              </Paper>
              <Paper sx={{ p: 2, background: "rgba(255,255,255,0.02)" }}>
                <Typography sx={{ fontWeight: 800 }}>Signups → Active Students: 5,400</Typography>
                <Typography sx={{ fontSize: 13, opacity: 0.7 }}>Conversion: 43.5%</Typography>
              </Paper>
            </Stack>
          </ChartCard>
        </Grid>
      </Grid>
    </motion.div>
  );
}
