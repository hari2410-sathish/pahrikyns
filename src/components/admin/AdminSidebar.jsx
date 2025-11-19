// src/components/admin/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ADMIN_LINKS = [
  { label: "Dashboard", icon: <DashboardIcon fontSize="small" />, to: "/admin/dashboard" },
  { label: "Manage Courses", icon: <LibraryBooksIcon fontSize="small" />, to: "/admin/manage-courses" },
  { label: "Add Course", icon: <AddBoxIcon fontSize="small" />, to: "/admin/add-course", badge: "New" },
  { label: "Projects", icon: <WorkspacesIcon fontSize="small" />, to: "/admin/projects" },
  { label: "MCQ Tests", icon: <AssignmentIcon fontSize="small" />, to: "/admin/mcq-tests" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const isActive = (to) =>
    location.pathname === to || location.pathname.startsWith(to + "/");

  return (
    <aside
      className={`neon-sidebar holo-card admin-sidebar ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className="sidebar-header">
        <div className="sidebar-logo" />
        {!collapsed && (
          <div className="sidebar-title">
            <div className="sidebar-brand">PAHRIKYNS</div>
            <div className="sidebar-sub">ADMIN</div>
          </div>
        )}

        <button
          className="sidebar-toggle secondary-btn"
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? "☰" : "◀"}
        </button>
      </div>

      {/* Admin profile */}
      <div
        className={`sidebar-profile ${profileOpen ? "open" : ""}`}
        onClick={() => setProfileOpen((o) => !o)}
      >
        <div className="sidebar-avatar" />
        {!collapsed && (
          <div className="sidebar-profile-meta">
            <div className="sidebar-user">Admin</div>
            <div className="sidebar-role">Platform Owner</div>
          </div>
        )}
        {!collapsed && (
          <button className="sidebar-profile-toggle">
            <ExpandMoreIcon fontSize="small" />
          </button>
        )}
      </div>

      {!collapsed && profileOpen && (
        <div className="sidebar-profile-dropdown">
          <button>Admin profile</button>
          <button>System settings</button>
          <button>Logout</button>
        </div>
      )}

      {/* Nav */}
      <nav className="sidebar-nav admin-nav">
        {ADMIN_LINKS.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`sidebar-link nav-item-v2 ${
              isActive(item.to) ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="sidebar-link-label">{item.label}</span>
                {item.badge && <span className="sidebar-badge admin-badge">{item.badge}</span>}
              </>
            )}
          </Link>
        ))}
      </nav>

      {!collapsed && (
        <div className="admin-sidebar-footer">
          <span className="admin-status-dot" />{" "}
          <span className="admin-status-text">Analytics live</span>
        </div>
      )}
    </aside>
  );
}
