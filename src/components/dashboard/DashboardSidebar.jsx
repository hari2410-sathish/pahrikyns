// src/components/dashboard/DashboardSidebar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NAV_LINKS = [
  { label: "Dashboard", icon: <DashboardIcon fontSize="small" />, to: "/dashboard" },
  { label: "My Courses", icon: <SchoolIcon fontSize="small" />, to: "/my-courses" },
  { label: "Lesson Progress", icon: <MenuBookIcon fontSize="small" />, to: "/dashboard/progress" },
  {
    label: "MCQ Tests",
    icon: <QuizIcon fontSize="small" />,
    to: "/dashboard/tests",
    badge: 3,
  },
  {
    label: "Certificates",
    icon: <WorkspacePremiumIcon fontSize="small" />,
    to: "/dashboard/certificates",
  },
  { label: "Bookmarks", icon: <BookmarkIcon fontSize="small" />, to: "/dashboard/bookmarks" },
  { label: "Settings", icon: <SettingsIcon fontSize="small" />, to: "/dashboard/settings" },
];

const MOCK_PROGRESS = 72;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to) => {
    if (!to) return false;
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  const handleSignOut = () => {
    // 🔥 later, replace with Firebase signOut(auth)
    localStorage.clear(); // clear any saved auth/progress for now
    navigate("/login");
  };

  const goProfile = () => {
    navigate("/profile");
    setProfileOpen(false);
  };

  const goAccountSettings = () => {
    navigate("/account-settings");
    setProfileOpen(false);
  };

  return (
    <aside
      className={`neon-sidebar holo-card ${collapsed ? "sidebar-collapsed" : ""}`}
    >
      {/* Logo / Title */}
      <div className="sidebar-header">
        <div className="sidebar-logo" />
        {!collapsed && (
          <div className="sidebar-title">
            <div className="sidebar-brand">PAHRIKYNS</div>
            <div className="sidebar-sub">Teaching</div>
          </div>
        )}

        <button
          className="sidebar-toggle secondary-btn"
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? "➜" : "◀"}
        </button>
      </div>

      {/* Profile quick section */}
      <div
        className={`sidebar-profile ${profileOpen ? "open" : ""}`}
        onClick={() => setProfileOpen((o) => !o)}
      >
        <div className="sidebar-avatar" />
        {!collapsed && (
          <div className="sidebar-profile-meta">
            <div className="sidebar-user">Hari Sathish</div>
            <div className="sidebar-role">Student · DevOps</div>
          </div>
        )}
        {!collapsed && (
          <button className="sidebar-profile-toggle">
            <ExpandMoreIcon fontSize="small" />
          </button>
        )}
      </div>

      {/* Profile dropdown actions */}
      {!collapsed && profileOpen && (
        <div className="sidebar-profile-dropdown">
          <button onClick={goProfile}>View profile</button>
          <button onClick={goAccountSettings}>Account settings</button>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}

      {/* Progress bar */}
      <div className="sidebar-progress-wrapper">
        <div className="sidebar-progress-track">
          <div
            className="sidebar-progress-fill"
            style={{ height: `${MOCK_PROGRESS}%` }}
          />
        </div>
        {!collapsed && (
          <div className="sidebar-progress-text">
            <span>{MOCK_PROGRESS}%</span>
            <span>Course progress</span>
          </div>
        )}
      </div>

      {/* Nav links */}
      <nav className="sidebar-nav">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`sidebar-link nav-item-v2 ${
              isActive(item.to) ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {!collapsed && (
              <span className="sidebar-link-label">{item.label}</span>
            )}
            {!collapsed && item.badge && (
              <span className="sidebar-badge">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
