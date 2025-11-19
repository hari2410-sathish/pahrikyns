// src/components/Analytics/RealTimeChart.jsx
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RealTimeChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newPoint = {
        time: new Date().toLocaleTimeString().slice(3, 8),
        value: Math.floor(Math.random() * 100),
      };
      setData((prev) => [...prev.slice(-19), newPoint]);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="time" stroke="#ccc" hide />
        <YAxis hide />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#34d399"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
