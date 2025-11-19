import React, { useState } from "react";

export default function Heatmap({ data }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="holo-card">
      <div className="widget-header">
        <h3>Study Heatmap (Last 30 days)</h3>
      </div>

      <div className="heatmap-grid">
        {data.map((d, i) => (
          <div
            key={i}
            className={`heat-cell intensity-${d.intensity}`}
            onMouseEnter={() => setHover(d)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </div>

      {hover && (
        <div className="heat-tooltip">
          📅 {hover.date} — {hover.hours} hrs
        </div>
      )}
    </div>
  );
}
