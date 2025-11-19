import React from "react";

export default function UserProfileCard() {
  return (
    <div className="holo-card">
      <div className="profile-header">
        <div className="profile-avatar" />
        <div>
          <div className="profile-name">Hari Sathish</div>
          <div className="profile-role">DevOps Student</div>
        </div>
      </div>

      <div className="profile-meta">
        <div>
          <div className="profile-meta-label">Track</div>
          <div className="profile-meta-value">DevOps + Cloud</div>
        </div>
        <div>
          <div className="profile-meta-label">Level</div>
          <div className="profile-meta-value">Intermediate</div>
        </div>
        <div>
          <div className="profile-meta-label">Streak</div>
          <div className="profile-meta-value">5 days 🔥</div>
        </div>
      </div>

      <button className="neon-btn-v2" style={{ width: "100%", marginTop: 10 }}>
        View Profile
      </button>
    </div>
  );
}
