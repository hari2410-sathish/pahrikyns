import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function LessonSidebar({ lessons, category, tool }) {
  const { lessonId } = useParams();
  const [search, setSearch] = useState("");

  const filtered = lessons.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        width: "260px",
        height: "calc(100vh - 80px)",
        position: "sticky",
        top: "80px",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(14px)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        padding: "25px",
        borderRadius: "14px",
        overflowY: "auto",
        color: "white",
      }}
    >
      <h3 style={{ marginBottom: "15px", fontWeight: "700" }}>GIT Lessons</h3>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search lesson..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.15)",
          marginBottom: "20px",
          background: "rgba(0,0,0,0.25)",
          color: "white",
        }}
      />

      {/* Sidebar Lesson List */}
      {filtered.map((lesson, i) => (
        <motion.div
          whileHover={{ x: 8 }}
          key={lesson.id}
          style={{
            marginBottom: "12px",
          }}
        >
          <Link
            to={`/courses/${category}/${tool}/${lesson.id}`}
            style={{
              display: "block",
              padding: "10px 14px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "15px",
              background:
                lesson.id === lessonId
                  ? "rgba(100, 180, 255, 0.25)"
                  : "rgba(255, 255, 255, 0.05)",
              border:
                lesson.id === lessonId
                  ? "1px solid rgba(100,180,255,0.45)"
                  : "1px solid transparent",
              color: "white",
              transition: "0.25s",
            }}
          >
            {lesson.title}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
