// src/components/ProgressBar.jsx — NEON VERSION 3
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProgressBar() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScroll((scrolled / height) * 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* MAIN NEON PROGRESS BEAM */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "6px",
          zIndex: 9999,

          background:
            "linear-gradient(90deg,#06b6d4,#7c3aed,#0ea5e9,#06b6d4)",
          backgroundSize: "300% 100%",

          boxShadow: "0 0 18px #06b6d4aa, 0 0 28px #7c3aedaa",
        }}
        animate={{
          width: `${scroll}%`,
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          width: { ease: "easeOut", duration: 0.1 },
          backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* SHIMMER WHITE SCANLINE */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "6px",
          width: `${scroll}%`,
          zIndex: 9998,
          opacity: 0.4,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          pointerEvents: "none",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* FLOATING PARTICLES */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "6px",
          width: `${scroll}%`,
          zIndex: 9997,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: "1px",
              left: `${Math.random() * 100}%`,
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: ["#06b6d4", "#7c3aed", "#0ea5e9"][i % 3],
              boxShadow: `0 0 12px ${
                ["#06b6d4", "#7c3aed", "#0ea5e9"][i % 3]
              }`,
            }}
            animate={{
              x: ["0%", "120%"],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 1.8 + Math.random() * 1.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </>
  );
}
