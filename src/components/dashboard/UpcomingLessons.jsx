import React from "react";

const UPCOMING = [
  { id: 1, title: "Kubernetes – Deployments & Services", when: "Today · 7:30 PM" },
  { id: 2, title: "Terraform – Modules & Workspaces", when: "Tomorrow · 8:00 PM" },
  { id: 3, title: "Linux – User & Permission mgmt", when: "Sat · 6:00 PM" },
];

export default function UpcomingLessons() {
  return (
    <div className="holo-card">
      <div className="widget-header">
        <h3>Upcoming Lessons</h3>
      </div>

      <div className="upcoming-list">
        {UPCOMING.map((u) => (
          <div key={u.id} className="upcoming-row">
            <div className="upcoming-dot" />
            <div>
              <div className="upcoming-title">{u.title}</div>
              <div className="upcoming-time">{u.when}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
