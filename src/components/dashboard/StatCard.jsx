import React from "react";

export default function StatCard({
  title,
  value,
  trendLabel,
  trendValue,
  trendUp,
}) {
  return (
    <div className="holo-card stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
      {trendLabel && (
        <div className="stat-trend">
          <span className="stat-trend-label">{trendLabel}</span>
          <span className={`stat-trend-value ${trendUp ? "up" : "down"}`}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
}
