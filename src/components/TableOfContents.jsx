// src/components/TableOfContents.jsx — NEON VERSION 3
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TableOfContents() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const headers = Array.from(
      document.querySelectorAll("h2, h3, h4")
    ).map((el) => ({
      text: el.innerText,
      id: el.id || (el.id = el.innerText.replace(/\s+/g, "-").toLowerCase()),
      level: el.tagName,
    }));

    setItems(headers);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        padding: "20px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 0 18px rgba(6,182,212,0.18)",
        backdropFilter: "blur(18px)",
      }}
    >
      {/* TITLE */}
      <h3
        style={{
          marginBottom: "14px",
          fontSize: "20px",
          fontWeight: "800",
          background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Table of Contents
      </h3>

      {/* LIST */}
      <div>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            onClick={() => scrollTo(item.id)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 10, scale: 1.03 }}
            style={{
              cursor: "pointer",
              padding: "10px 14px",
              borderRadius: "12px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              position: "relative",

              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              transition: "0.25s ease",

              paddingLeft:
                item.level === "H2"
                  ? "14px"
                  : item.level === "H3"
                  ? "28px"
                  : "40px",
            }}
          >
            {/* Neon left accent */}
            <div
              style={{
                width: "4px",
                height: "100%",
                background:
                  item.level === "H2"
                    ? "#06b6d4"
                    : item.level === "H3"
                    ? "#7c3aed"
                    : "#38bdf8",
                borderRadius: "4px",
                boxShadow: `0 0 10px ${
                  item.level === "H2"
                    ? "#06b6d4aa"
                    : item.level === "H3"
                    ? "#7c3aedaa"
                    : "#38bdf8aa"
                }`,
              }}
            />

            {/* Text */}
            <span
              style={{
                color: "white",
                fontWeight: item.level === "H2" ? "700" : "500",
                fontSize: item.level === "H2" ? "16px" : "14px",
                opacity: 0.9,
              }}
            >
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
