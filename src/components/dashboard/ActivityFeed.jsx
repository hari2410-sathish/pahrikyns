import React from "react";

const ACTIVITY = [
  { id: 1, text: "Completed lesson: Intro to Kubernetes", time: "2h ago" },
  { id: 2, text: "Scored 85% in Jenkins MCQ test", time: "1 day ago" },
  { id: 3, text: "New course recommended: Terraform Advanced", time: "3 days ago" },
];

export default function ActivityFeed() {
  return (
    <div className="holo-card">
      <div className="widget-header">
        <h3>Recent Activity</h3>
      </div>

      <div className="activity-list">
        {ACTIVITY.map((a) => (
          <div key={a.id} className="activity-row">
            <div>
              <div className="activity-text">{a.text}</div>
              <div className="activity-time">{a.time}</div>
            </div>
            <div className="activity-dot">●</div>
          </div>
        ))}
      </div>
    </div>
  );
}
