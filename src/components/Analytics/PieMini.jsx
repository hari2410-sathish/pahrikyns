// src/components/Analytics/PieMini.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#06b6d4", "#7c3aed", "#facc15", "#ef4444"];

export default function PieMini({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          innerRadius={50}
          outerRadius={85}
          paddingAngle={4}
          cx="50%"
          cy="50%"
        >
          {data.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
