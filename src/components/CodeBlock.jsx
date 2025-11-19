// src/components/CodeBlock.jsx
import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-json";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-tomorrow.css"; // Base theme

// Line numbers
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

export default function CodeBlock({ language = "bash", code = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "25px",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 8px 25px rgba(0,0,0,0.45)",
        background: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* COPY BUTTON */}
      <button
        onClick={copyCode}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "6px 12px",
          fontSize: "12px",
          background: "rgba(255,255,255,0.2)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          backdropFilter: "blur(6px)",
          transition: "0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.35)")}
        onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
      >
        Copy
      </button>

      {/* CODE */}
      <pre className="line-numbers" style={{ margin: 0 }}>
        <code ref={ref} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
