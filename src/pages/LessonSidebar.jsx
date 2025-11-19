// src/components/LessonSidebar.jsx — NEON VERSION 3
import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function LessonSidebar({ lessons, category, tool }) {
  const { lessonId } = useParams();

  return (
    <motion.div
      initial={{ x: -35, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        width: "280px",
        height: "88vh",
        padding: "25px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 0 22px rgba(6,182,212,0.25)",
        backdropFilter: "blur(16px)",
        overflowY: "auto",
        position: "sticky",
        top: "20px",
      }}
      className="neon-sidebar"
    >
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          marginBottom: "22px",
          fontWeight: "900",
          letterSpacing: "1px",
          fontSize: "26px",
          background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {tool.toUpperCase()}
      </motion.h2>

      {/* LESSON LIST */}
      {lessons.map((l, idx) => {
        const active = l.id === lessonId;

        return (
          <Link
            key={l.id}
            to={`/courses/${category}/${tool}/${l.id}`}
            style={{ textDecoration: "none" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{
                scale: 1.04,
                x: 6,
              }}
              style={{
                padding: "14px 20px",
                marginBottom: "12px",
                borderRadius: "14px",
                background: active
                  ? "linear-gradient(135deg, #06b6d4, #7c3aed)"
                  : "rgba(255,255,255,0.05)",
                border: active
                  ? "1px solid rgba(255,255,255,0.3)"
                  : "1px solid rgba(255,255,255,0.07)",
                color: "white",
                fontWeight: active ? "800" : "600",
                fontSize: "15px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: active
                  ? "0 0 18px #06b6d4aa"
                  : "0 0 12px rgba(0,0,0,0.35)",
                transition: "0.3s",
              }}
            >
              {/* Neon strip on active */}
              {active && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "5px",
                    background: "#06b6d4",
                    boxShadow: "0 0 12px #06b6d4aa",
                    borderRadius: "4px",
                  }}
                />
              )}

              {/* Text */}
              Lesson {idx + 1}: {l.title}

              {/* Hover neon swipe */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "2px",
                  width: "0%",
                  background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                  boxShadow: "0 0 12px #06b6d4",
                  transition: "0.3s",
                }}
                className="hover-bar"
              />
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
}
