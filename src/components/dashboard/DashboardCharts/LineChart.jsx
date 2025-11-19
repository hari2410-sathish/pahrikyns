import React from "react";

export default function LineChart({ data = [2, 6, 4, 8, 6, 10, 9] }) {
  const max = Math.max(...data, 1);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(" ");

  return (
    <div className="holo-card">
      <div className="widget-header">
        <h3>Study Activity (7 days)</h3>
      </div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 120 }}
      >
        <polyline
          points={points}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={`${points} 100,100 0,100 0`}
          fill="#06b6d422"
          stroke="none"
        />
      </svg>
    </div>
  );
}
