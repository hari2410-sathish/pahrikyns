import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function LessonSidebar({ lessons, category, tool }) {
  const location = useLocation();

  return (
    <div
      style={{
        width: "250px",
        background: "rgba(255,255,255,0.08)",
        padding: "20px",
        borderRadius: "12px",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "white" }}>
        {tool.toUpperCase()} Lessons
      </h3>

      {lessons.map((lesson) => {
        const active = location.pathname.endsWith(lesson.id);

        return (
          <Link
            key={lesson.id}
            to={`/courses/${category}/${tool}/${lesson.id}`}
            style={{
              display: "block",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              background: active ? "rgba(0,150,255,0.4)" : "transparent",
              color: active ? "#fff" : "#ccc",
              fontWeight: active ? "bold" : "normal",
              textDecoration: "none",
              transition: "0.2s",
            }}
          >
            {lesson.title}
          </Link>
        );
      })}
    </div>
  );
}
