import React from "react";

export default function NotificationCard({ notifications = [] }) {
  return (
    <div className="notification-card">
      <div className="widget-header">
        <h3>Notifications</h3>
      </div>

      <div className="notification-list">
        {notifications.length === 0 && (
          <p style={{ opacity: 0.6 }}>No notifications yet.</p>
        )}

        {notifications.map((note, i) => (
          <div key={i} className="notification-row">
            <span className="notification-dot">●</span>
            <div className="notification-text">
              <strong>{note.title}</strong>
              <span>{note.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
