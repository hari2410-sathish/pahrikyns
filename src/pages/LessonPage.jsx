// src/pages/LessonPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Lesson sets
import { gitLessons } from "../devops/git/GitLessons";
import { dockerLessons } from "../devops/docker/DockerLessons";
import { jenkinsLessons } from "../devops/jenkins/JenkinsLessons";

// Components
import LessonSidebar from "../components/LessonSidebar";
import ProgressBar from "../components/ProgressBar";
import TableOfContents from "../components/TableOfContents";

export default function LessonPage() {
  const { category, tool, lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Map all devops tools
  const categoryMap = {
    devops: {
      git: gitLessons,
      docker: dockerLessons,
      jenkins: jenkinsLessons,
    },
  };

  const lessons = categoryMap[category]?.[tool];
  if (!lessons) return <h1>Lessons not found</h1>;

  const index = lessons.findIndex((l) => l.id === lessonId);
  const lesson = lessons[index];
  if (!lesson) return <h1>Lesson not found</h1>;

  const LessonComponent = lesson.component;

  // Completion System
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("completedLessons") || "{}")
  );

  const markCompleted = () => {
    const updated = { ...completed, [lessonId]: true };
    setCompleted(updated);
    localStorage.setItem("completedLessons", JSON.stringify(updated));
  };

  // Auto-next on scroll end
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 10;

      if (bottom && index < lessons.length - 1) {
        navigate(`/courses/${category}/${tool}/${lessons[index + 1].id}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index, lessons, navigate, category, tool]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && index > 0) {
        navigate(`/courses/${category}/${tool}/${lessons[index - 1].id}`);
      }
      if (e.key === "ArrowRight" && index < lessons.length - 1) {
        navigate(`/courses/${category}/${tool}/${lessons[index + 1].id}`);
      }
      if (e.key.toLowerCase() === "c") {
        markCompleted();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  // ⭐ Continue Learning + Progress Tracking
  useEffect(() => {
    // Save last visited lesson
    localStorage.setItem(
      "continueLearning",
      JSON.stringify({
        path: location.pathname,
        tool: tool,
        lessonId: lessonId,
      })
    );

    // Save course progress
    let progress = JSON.parse(localStorage.getItem("courseProgress")) || {};
    const courseId = tool; // Docker / Git / Jenkins

    progress[courseId] = (progress[courseId] || 0) + 5;
    if (progress[courseId] > 100) progress[courseId] = 100;

    localStorage.setItem("courseProgress", JSON.stringify(progress));
  }, [tool, lessonId]);

  return (
    <div style={{ display: "flex", gap: "32px", padding: "32px", minHeight: "100vh" }}>
      <ProgressBar />
      <LessonSidebar lessons={lessons} category={category} tool={tool} />

      <AnimatePresence mode="wait">
        <motion.div
          key={lessonId}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.97 }}
          transition={{ duration: 0.45 }}
          style={{
            flex: 1,
            padding: "40px",
            borderRadius: "22px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
          }}
        >
          <h1>{lesson.title}</h1>
          <TableOfContents />
          <LessonComponent />

          <button onClick={markCompleted}>
            {completed[lessonId] ? "✔ Completed" : "Mark as Completed"}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
