import React, { useEffect, useState, useRef } from "react";

// FULL FIXED — ERROR-FREE — COMPLETE LESSON20.JSX

export default function Lesson20({ lessonId = "lesson-20", onComplete, onNext, onPrev }) {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const contentRef = useRef(null);

  /* ─────────────────────── Scroll Progress ─────────────────────── */
  useEffect(() => {
    const el = document.getElementById("lesson-content");
    const handler = () => {
      if (!el) return;
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = Math.max(0, Math.min(el.scrollTop, total));
      setProgress(total <= 0 ? 100 : Math.round((scrolled / total) * 100));
    };
    el?.addEventListener("scroll", handler);
    handler();
    return () => el?.removeEventListener("scroll", handler);
  }, []);

  /* ─────────────────────── Keyboard Shortcuts ─────────────────────── */
  useEffect(() => {
    const key = (e) => {
      if (e.key === "N" || e.key === "n") onNext?.();
      if (e.key === "P" || e.key === "p") onPrev?.();
      if (e.key === "C" || e.key === "c") markComplete();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onNext, onPrev]);

  /* ─────────────────────── Copy Toast ─────────────────────── */
  useEffect(() => {
    let t;
    if (copied) t = setTimeout(() => setCopied(""), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async (text, label) => {
    try { 
      await navigator.clipboard.writeText(text); 
      setCopied(label || "copied"); 
    } 
    catch { setCopied("copy failed"); }
  };

  const markComplete = () => { setCompleted(true); onComplete?.(lessonId); };
  const next = () => onNext?.();

  /* ─────────────────────── Code Blocks ─────────────────────── */
  const slimImage = `# Use small base images
FROM node:18-alpine
RUN apk add --no-cache python3`;

  const multiStage = `# Multi-stage example
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html`;

  const userNonRoot = `# Avoid root
RUN adduser -D appuser
USER appuser`;

  const tagStrategy = `# Tag strategy
myapp:latest
myapp:1.2.0
myapp:1.2.0-rc1`;

  const scanCmd = `trivy image myapp:latest`;

  const networkPolicy = `services:
  api:
    networks: [backend]
  db:
    networks: [backend]
networks:
  backend:`;

  const volumeBest = `volumes:
  db_data:`;

  const healthExample = `HEALTHCHECK CMD curl -f http://localhost:3000/health || exit 1`;

  const cleanup = `docker system prune -a`;

  /* ─────────────────────── JSX Render ─────────────────────── */

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">

          {/* PROGRESS */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 20 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-600 to-emerald-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* TABLE OF CONTENTS */}
          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#image" className="hover:text-green-700">Image Optimization</a></li>
              <li><a href="#security" className="hover:text-green-700">Security</a></li>
              <li><a href="#tagging" className="hover:text-green-700">Tagging Strategy</a></li>
              <li><a href="#networks" className="hover:text-green-700">Networking</a></li>
              <li><a href="#volumes" className="hover:text-green-700">Volumes</a></li>
              <li><a href="#health" className="hover:text-green-700">Healthchecks</a></li>
              <li><a href="#ci" className="hover:text-green-700">CI/CD</a></li>
              <li><a href="#quiz" className="hover:text-green-700">Quiz</a></li>
            </ul>
          </nav>

          {/* BUTTONS */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={markComplete}
              className={`flex-1 px-3 py-2 rounded shadow ${
                completed ? "bg-green-600 text-white" : "bg-white border"
              }`}
            >
              {completed ? "Completed ✓" : "Mark complete"}
            </button>

            <div className="flex flex-col gap-2">
              <button onClick={next} className="px-3 py-2 rounded bg-green-700 text-white">Next</button>
              <button onClick={() => onPrev?.()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        id="lesson-content"
        ref={contentRef}
        className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 20 — Docker Best Practices</h1>
          <p className="text-sm text-slate-600">Final mastery: optimization, security, automation, consistency.</p>
        </header>

        {/* IMAGE OPTIMIZATION */}
        <section id="image">
          <h2>Image Optimization</h2>
          <p>Use light images, combine RUN commands, and use multi-stage builds.</p>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white"><code>{slimImage}</code></pre>
            <button onClick={() => copy(slimImage, "Slim image")} className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded">Copy</button>
          </div>

          <h3 className="mt-4">Multi-stage Builds</h3>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{multiStage}</code></pre>
            <button onClick={() => copy(multiStage, "multiStage")} className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded">Copy</button>
          </div>
        </section>

        {/* SECURITY */}
        <section id="security">
          <h2>Security Best Practices</h2>

          <h3>Run as non-root user</h3>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white"><code>{userNonRoot}</code></pre>
            <button onClick={() => copy(userNonRoot, "nonRoot")} className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded">Copy</button>
          </div>

          <h3 className="mt-4">Image Scanning</h3>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white"><code>{scanCmd}</code></pre>
            <button onClick={() => copy(scanCmd, "scanCmd")} className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded">Copy</button>
          </div>
        </section>

        {/* TAGGING */}
        <section id="tagging">
          <h2>Tagging Strategy</h2>
          <p>Use semantic versioning for clarity.</p>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white"><code>{tagStrategy}</code></pre>
            <button onClick={() => copy(tagStrategy, "tags")} className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded">Copy</button>
          </div>
        </section>

        {/* NETWORKING */}
        <section id="networks">
          <h2>Networking</h2>
          <p>Use internal networks for secure communication.</p>

          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white"><code>{networkPolicy}</code></pre>
            <button onClick={() => copy(networkPolicy, "networkPolicy")} className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded">Copy</button>
          </div>
        </section>

        {/* VOLUMES */}
        <section id="volumes">
          <h2>Volumes & Storage</h2>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white"><code>{volumeBest}</code></pre>
            <button onClick={() => copy(volumeBest, "volumeBest")} className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded">Copy</button>
          </div>
        </section>

        {/* HEALTHCHECKS */}
        <section id="health">
          <h2>Healthchecks</h2>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white"><code>{healthExample}</code></pre>
            <button onClick={() => copy(healthExample, "healthExample")} className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded">Copy</button>
          </div>
        </section>

        {/* CI/CD */}
        <section id="ci">
          <h2>CI/CD Integration</h2>
          <p>Build, test, scan, and push images automatically.</p>

          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white"><code>{cleanup}</code></pre>
            <button onClick={() => copy(cleanup, "cleanup")} className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded">Copy</button>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Mini Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>Why use multi-stage builds?</li>
            <li>Why run containers as non-root?</li>
            <li>What is semantic tagging?</li>
            <li>Why use healthchecks?</li>
          </ol>

          <button className="mt-3 px-3 py-2 border rounded" onClick={() => setShowAnswers(!showAnswers)}>
            {showAnswers ? "Hide" : "Show"} Answers
          </button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>Reduces final image size.</li>
                <li>Improves security.</li>
                <li>Versioning strategy like 1.2.0 / 1.2.1.</li>
                <li>Ensures app is healthy before receiving traffic.</li>
              </ol>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mt-8">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Shortcuts: N / P / C</span>
            <button
              onClick={markComplete}
              className={`px-3 py-2 rounded ${completed ? "bg-green-600 text-white" : "bg-white border"}`}
            >
              {completed ? "Completed ✓" : "Mark complete"}
            </button>
          </div>

          {copied && (
            <div className="mt-3 text-sm text-green-600">{copied} copied ✓</div>
          )}
        </footer>

      </main>
    </div>
  );
}
