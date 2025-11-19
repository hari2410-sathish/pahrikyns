// src/devops/docker/Lesson2.jsx
import React, { useEffect, useState, useRef } from "react";

export default function Lesson2({ lessonId = "lesson2", onComplete, onNext }) {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const contentRef = useRef(null);

  // Scroll Progress
  useEffect(() => {
    const el = document.getElementById("lesson-content");
    if (!el) return;

    const handler = () => {
      const total = el.scrollHeight - el.clientHeight;
      const scrollPos = el.scrollTop;
      const percent = total > 0 ? Math.round((scrollPos / total) * 100) : 0;
      setProgress(percent);
    };

    el.addEventListener("scroll", handler);
    handler();

    return () => el.removeEventListener("scroll", handler);
  }, []);

  // Copy Button Handler
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("Copied!");
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("Failed!");
    }
  };

  // Mark Lesson Complete
  const markComplete = () => {
    setCompleted(true);
    onComplete?.(lessonId);
  };

  // Auto Next
  const goNext = () => {
    onNext?.();
  };

  // =======================
  // SAFE CODE BLOCK STRINGS
  // =======================
  const basicDockerfile = `# Basic Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]`;

  const optimizedDockerfile = `# Multi-stage build for smaller image

# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build || true

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]`;

  const dockerignore = `node_modules
dist
.env
.git
.DS_Store
npm-debug.log`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 2 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>

            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-emerald-500 to-cyan-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Table of Contents */}
          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-emerald-600">Overview</a></li>
              <li><a href="#layers" className="hover:text-emerald-600">Layers & Cache</a></li>
              <li><a href="#order" className="hover:text-emerald-600">Ordering</a></li>
              <li><a href="#multi-stage" className="hover:text-emerald-600">Multi-stage Builds</a></li>
              <li><a href="#dockerignore" className="hover:text-emerald-600">.dockerignore</a></li>
              <li><a href="#best" className="hover:text-emerald-600">Best Practices</a></li>
              <li><a href="#examples" className="hover:text-emerald-600">Examples</a></li>
              <li><a href="#quiz" className="hover:text-emerald-600">Quiz</a></li>
            </ul>
          </nav>

          {/* Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={markComplete}
              className={`flex-1 px-3 py-2 rounded shadow ${
                completed ? "bg-green-500 text-white" : "bg-white border"
              }`}
            >
              {completed ? "Completed ✓" : "Mark Complete"}
            </button>

            <button
              onClick={goNext}
              className="px-3 py-2 rounded bg-emerald-600 text-white"
            >
              Next →
            </button>
          </div>

          <div className="mt-4 text-xs text-slate-500">Use cache wisely to speed builds.</div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main
        id="lesson-content"
        ref={contentRef}
        className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 2 — Dockerfile Deep Dive & Layering</h1>
          <p className="text-sm text-slate-600">
            Learn how layers, caching, ordering, multi-stage builds, and .dockerignore optimize images.
          </p>
        </header>

        {/* OVERVIEW */}
        <section id="overview">
          <h2>Overview</h2>
          <p>
            Every Dockerfile instruction creates a layer. Efficient ordering reduces rebuild time and keeps images small.
          </p>
        </section>

        {/* LAYERS */}
        <section id="layers">
          <h2>Dockerfile Layers & Cache</h2>
          <p>
            Layers allow caching. If a step and all previous steps remain unchanged, Docker reuses cached layers.
          </p>

          <div className="mt-3 bg-slate-50 p-3 rounded border text-sm">
            <strong>Layer Execution Order:</strong>
            <pre className="mt-2">FROM → RUN → COPY → ENV → EXPOSE → CMD</pre>
          </div>
        </section>

        {/* ORDERING */}
        <section id="order">
          <h2>Ordering Instructions for Cache Efficiency</h2>
          <pre className="bg-slate-900 text-white p-3 rounded overflow-auto">
{`WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY . .`}
          </pre>
        </section>

        {/* MULTI-STAGE BUILDS */}
        <section id="multi-stage">
          <h2>Multi-Stage Builds</h2>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto">
{optimizedDockerfile}
            </pre>

            <button
              onClick={() => handleCopy(optimizedDockerfile)}
              className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* DOCKERIGNORE */}
        <section id="dockerignore">
          <h2>.dockerignore</h2>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto">
{dockerignore}
            </pre>

            <button
              onClick={() => handleCopy(dockerignore)}
              className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section id="best">
          <h2>Best Practices</h2>
          <ul>
            <li>Always use <b>.dockerignore</b></li>
            <li>Put dependency installation early to maximize cache</li>
            <li>Use multi-stage builds for small images</li>
            <li>Use minimal base images (alpine)</li>
            <li>Avoid copying unnecessary files</li>
          </ul>
        </section>

        {/* EXAMPLES */}
        <section id="examples">
          <h2>Examples</h2>
          <pre className="bg-slate-900 text-white p-3 rounded overflow-auto">
{basicDockerfile}
          </pre>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Mini Quiz</h2>
          <ol>
            <li>What is the purpose of multi-stage builds?</li>
            <li>Why is COPY package.json placed before COPY . ?</li>
            <li>What is .dockerignore used for?</li>
          </ol>
        </section>
      </main>
    </div>
  );
}
