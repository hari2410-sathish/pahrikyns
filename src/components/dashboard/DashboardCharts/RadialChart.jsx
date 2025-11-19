import React from "react";

export default function RadialChart({ percent = 72 }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;

  return (
    <div className="holo-card radial-widget">
      <svg width={120} height={120} viewBox="0 0 120 120">
        <defs>
          <linearGradient id="radial-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#06b6d4" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <g transform="translate(60,60)">
          <circle r={r} fill="#050b12" stroke="#050b12" strokeWidth="10" />
          <circle
            r={r}
            fill="transparent"
            stroke="#111827"
            strokeWidth="10"
            strokeDasharray={`${c} ${c}`}
            transform="rotate(-90)"
          />
          <circle
            r={r}
            fill="transparent"
            stroke="url(#radial-grad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
            transform="rotate(-90)"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fontSize="16"
            fontWeight="800"
            fill="#e5f9ff"
          >
            {percent}%
          </text>
        </g>
      </svg>
      <div className="radial-text">
        <h3>Overall Course Progress</h3>
        <p>Average completion across your active DevOps courses.</p>
      </div>
    </div>
  );
}
