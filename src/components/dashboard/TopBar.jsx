// src/components/dashboard/TopBar.jsx

import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { searchIndex } from "../../data/searchIndex"; // AUTO GENERATED INDEX
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // 🔍 Fuzzy Search Config
  const fuse = useMemo(() => {
    return new Fuse(searchIndex, {
      keys: ["title", "category", "type", "description"],
      threshold: 0.45, // more spelling errors allowed
    });
  }, []);

  // 🔍 Filtered Results
  const results = query ? fuse.search(query).map((r) => r.item).slice(0, 8) : [];

  // ⭐ NEW — Continue Learning Function
  const handleContinueLearning = () => {
    const data = JSON.parse(localStorage.getItem("continueLearning"));

    if (data?.path) {
      navigate(data.path);
    } else {
      // no last lesson → take to courses page
      navigate("/courses");
    }
  };

  const handleSelect = (route) => {
    setQuery("");
    navigate(route);
  };

  return (
    <header className="dashboard-topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">Student Dashboard</h1>
        <p className="topbar-sub">
          Track your DevOps, AWS, OS & Cloud learning progress.
        </p>
      </div>

      {/* 🔥 SEARCH BOX + DROPDOWN */}
      <div className="topbar-right" style={{ position: "relative" }}>
        <input
          className="topbar-search"
          placeholder="Search lessons, courses, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* 🔥 Suggestions (Inline) */}
        {query && (
          <div className="search-results-popup">
            {results.length > 0 ? (
              results.map((item, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleSelect(item.route)}
                >
                  {/* ICON LEFT */}
                  <span className="search-result-icon">{item.icon}</span>

                  {/* TITLE + CATEGORY */}
                  <div className="search-result-text">
                    <strong>{item.title}</strong>
                    <span className="search-result-type">{item.category}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-result-item no-result">No results found</div>
            )}
          </div>
        )}

        {/* BUTTONS */}
        <button className="secondary-btn">🔔</button>

        {/* ⭐ UPDATED — ADDED onClick */}
        <button
          className="neon-btn-v2 shockwave"
          onClick={handleContinueLearning}
        >
          Continue Learning
        </button>
      </div>
    </header>
  );
}
