// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  Pie,
  PieChart,
  Cell,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ------- SAMPLE DATA -------
const usersData = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 350 },
  { month: "Mar", users: 500 },
  { month: "Apr", users: 800 },
  { month: "May", users: 1200 },
];

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 6500 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 9000 },
  { month: "May", revenue: 15000 },
];

const courseSplit = [
  { name: "DevOps", value: 45 },
  { name: "AWS", value: 35 },
  { name: "OS", value: 20 },
];

const PIE_COLORS = ["#06b6d4", "#7c3aed", "#22c55e"];

// ------- COMPONENT -------
export default function AdminDashboard() {
  const stats = [
    { label: "Total Students", value: "12,540" },
    { label: "Total Courses", value: "48" },
    { label: "Monthly Revenue", value: "$25,430" },
    { label: "Active Instructors", value: "12" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Admin Dashboard
      </Typography>

      {/* ------------ STATS CARDS ------------ */}
      <Grid container spacing={3}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Paper
              className="glass-card"
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                backdropFilter: "blur(12px)",
              }}
            >
              <Typography
                sx={{ fontSize: 32, fontWeight: 900, color: "#06b6d4" }}
              >
                {s.value}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>{s.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ------------ CHARTS ------------ */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper className="glass-card" sx={{ p: 3 }}>
            <Typography sx={{ mb: 2, fontWeight: 700 }}>User Growth</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={usersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#06b6d4"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="glass-card" sx={{ p: 3 }}>
            <Typography sx={{ mb: 2, fontWeight: 700 }}>
              Revenue Growth
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* ------------ PIE CHART + ACTIVITIES ------------ */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper className="glass-card" sx={{ p: 3 }}>
            <Typography sx={{ mb: 2, fontWeight: 700 }}>Course Split</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={courseSplit}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {courseSplit.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper className="glass-card" sx={{ p: 3 }}>
            <Typography sx={{ mb: 2, fontWeight: 700 }}>
              Recent Activities
            </Typography>

            <Box sx={{ maxHeight: 250, overflowY: "auto" }}>
              {[
                "New student enrolled in AWS",
                "DevOps course updated",
                "New lesson added in Docker",
                "Payment received from student",
                "New OS project uploaded",
              ].map((item, i) => (
                <Paper
                  key={i}
                  sx={{
                    p: 2,
                    mb: 1,
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 2,
                  }}
                >
                  <Typography>{item}</Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
}
