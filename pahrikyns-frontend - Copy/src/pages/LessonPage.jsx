// src/pages/LessonPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import all Git lessons
import { gitLessons } from "../devops/git/GitLessons";

// Sidebar Component
import LessonSidebar from "../components/LessonSidebar";

export default function LessonPage() {
  const { category, tool, lessonId } = useParams();
  const navigate = useNavigate();

  // Map categories to lesson collections
  const categoryMap = {
    devops: {
      git: gitLessons,
    },
  };

  const lessons = categoryMap[category]?.[tool];

  if (!lessons) return <h1>Lessons not found</h1>;

  const index = lessons.findIndex((l) => l.id === lessonId);
  const lesson = lessons[index];

  if (!lesson) return <h1>Lesson not found</h1>;

  const LessonComponent = lesson.component;

  // Previous & Next Buttons
  const goPrev = () => {
    if (index > 0) {
      navigate(`/courses/${category}/${tool}/${lessons[index - 1].id}`);
    }
  };

  const goNext = () => {
    if (index < lessons.length - 1) {
      navigate(`/courses/${category}/${tool}/${lessons[index + 1].id}`);
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      
      {/* LEFT SIDEBAR */}
      <LessonSidebar lessons={lessons} category={category} tool={tool} />

      {/* RIGHT CONTENT */}
      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.05)",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        {/* LESSON CONTENT */}
        <LessonComponent />

        {/* PREV / NEXT BUTTONS */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={goPrev}
            disabled={index === 0}
            style={{
              padding: "10px 20px",
              background: index === 0 ? "#555" : "#0af",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: index === 0 ? "not-allowed" : "pointer",
            }}
          >
            ⬅ Previous
          </button>

          <button
            onClick={goNext}
            disabled={index === lessons.length - 1}
            style={{
              padding: "10px 20px",
              background:
                index === lessons.length - 1 ? "#555" : "limegreen",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor:
                index === lessons.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}
