// src/pages/dashboard/AccountSettings.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserCog,
  FaLock,
  FaBell,
  FaPalette,
} from "react-icons/fa";

export default function AccountSettings() {
  const [profile, setProfile] = useState({
    name: "Hari Sathish",
    email: "harisathish@gmail.com",
    username: "hari-devops",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    lessonReminders: true,
    darkMode: true,
    soundEffects: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Save profile →", profile);
    alert("Profile saved (dummy). Later hook to backend 🙂");
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    console.log("Update password →", security);
    alert("Password update simulated. Add backend later.");
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    console.log("Save prefs →", preferences);
    alert("Preferences saved (dummy).");
  };

  return (
    <div
      style={{
        padding: "60px 80px",
        minHeight: "100vh",
        color: "white",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* PAGE TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: "30px" }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: 900,
            margin: 0,
          }}
        >
          Account Settings
        </h1>
        <p style={{ opacity: 0.75, marginTop: 8 }}>
          Update your profile, security and dashboard preferences.
        </p>
      </motion.div>

      {/* GRID WRAPPER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: "28px",
        }}
      >
        {/* LEFT COLUMN — PROFILE + SECURITY */}
        <div style={{ display: "grid", gap: "24px" }}>
          {/* PROFILE CARD */}
          <SettingsCard
            icon={<FaUserCog />}
            title="Profile"
            subtitle="Update your basic information."
          >
            <form onSubmit={handleSaveProfile}>
              <div style={fieldRowStyle}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  style={inputStyle}
                />
              </div>

              <div style={fieldRowStyle}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  style={inputStyle}
                />
              </div>

              <div style={fieldRowStyle}>
                <label style={labelStyle}>Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  style={inputStyle}
                />
              </div>

              <button type="submit" style={primaryBtnStyle}>
                Save Profile
              </button>
            </form>
          </SettingsCard>

          {/* SECURITY CARD */}
          <SettingsCard
            icon={<FaLock />}
            title="Security"
            subtitle="Change your password."
          >
            <form onSubmit={handleSaveSecurity}>
              <div style={fieldRowStyle}>
                <label style={labelStyle}>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={security.currentPassword}
                  onChange={handleSecurityChange}
                  style={inputStyle}
                />
              </div>

              <div style={fieldRowStyle}>
                <label style={labelStyle}>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={security.newPassword}
                  onChange={handleSecurityChange}
                  style={inputStyle}
                />
              </div>

              <div style={fieldRowStyle}>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={security.confirmPassword}
                  onChange={handleSecurityChange}
                  style={inputStyle}
                />
              </div>

              <button type="submit" style={secondaryBtnStyle}>
                Update Password
              </button>
            </form>
          </SettingsCard>
        </div>

        {/* RIGHT COLUMN — PREFERENCES */}
        <div style={{ display: "grid", gap: "24px" }}>
          <SettingsCard
            icon={<FaBell />}
            title="Notifications"
            subtitle="Control alerts and reminders."
          >
            <form onSubmit={handleSavePreferences}>
              <ToggleRow
                label="Email alerts"
                description="Course updates, new lessons, announcements."
                checked={preferences.emailAlerts}
                onChange={() => handleToggle("emailAlerts")}
              />
              <ToggleRow
                label="Lesson reminders"
                description="Daily / weekly study reminders."
                checked={preferences.lessonReminders}
                onChange={() => handleToggle("lessonReminders")}
              />
              <ToggleRow
                label="Sound effects"
                description="Play subtle sounds for notifications."
                checked={preferences.soundEffects}
                onChange={() => handleToggle("soundEffects")}
              />

              <button type="submit" style={{ ...primaryBtnStyle, marginTop: 18 }}>
                Save Notification Settings
              </button>
            </form>
          </SettingsCard>

          <SettingsCard
            icon={<FaPalette />}
            title="Appearance"
            subtitle="Personalize how your dashboard looks."
          >
            <ToggleRow
              label="Dark mode"
              description="Use the neon dark theme (recommended)."
              checked={preferences.darkMode}
              onChange={() => handleToggle("darkMode")}
            />

            <div style={{ marginTop: 18, fontSize: 13, opacity: 0.7 }}>
              * Theme switching is only visual right now. Later you can hook this
              with your real theme toggle context.
            </div>
          </SettingsCard>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   REUSABLE SETTINGS CARD
────────────────────────────────────────────────────────────── */
function SettingsCard({ icon, title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: "26px 28px",
        borderRadius: "22px",
        background: "rgba(15,23,42,0.92)",
        border: "1px solid rgba(148,163,184,0.3)",
        boxShadow: "0 0 28px rgba(15,23,42,0.9)",
        backdropFilter: "blur(22px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
            background:
              "radial-gradient(circle at 30% 0,#06b6d4,#4f46e5)",
          }}
        >
          <span style={{ fontSize: 20 }}>{icon}</span>
        </div>
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            {title}
          </h2>
          <p style={{ margin: 0, opacity: 0.65, fontSize: 13 }}>{subtitle}</p>
        </div>
      </div>

      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOGGLE ROW COMPONENT
────────────────────────────────────────────────────────────── */
function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div
      style={{
        padding: "12px 6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{label}</div>
        {description && (
          <div style={{ fontSize: 12, opacity: 0.7 }}>{description}</div>
        )}
      </div>

      {/* Toggle switch */}
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: 46,
          height: 24,
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span
          style={{
            position: "absolute",
            cursor: "pointer",
            inset: 0,
            backgroundColor: checked ? "#22c55e55" : "#64748b55",
            borderRadius: 999,
            transition: "0.25s",
            boxShadow: checked
              ? "0 0 12px rgba(34,197,94,0.7)"
              : "0 0 6px rgba(148,163,184,0.4)",
          }}
        />
        <span
          style={{
            position: "absolute",
            height: 18,
            width: 18,
            left: checked ? 24 : 4,
            bottom: 3,
            backgroundColor: checked ? "#22c55e" : "#e5e7eb",
            borderRadius: "50%",
            transition: "0.25s",
          }}
        />
      </label>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SHARED INLINE STYLES
────────────────────────────────────────────────────────────── */
const fieldRowStyle = {
  marginBottom: 16,
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const labelStyle = {
  fontSize: 13,
  opacity: 0.75,
};

const inputStyle = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(148,163,184,0.5)",
  background: "rgba(15,23,42,0.95)",
  color: "white",
  outline: "none",
  fontSize: 14,
};

const primaryBtnStyle = {
  marginTop: 8,
  padding: "10px 20px",
  borderRadius: 999,
  border: "none",
  background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryBtnStyle = {
  ...primaryBtnStyle,
  background: "linear-gradient(90deg,#22c55e,#16a34a)",
};
