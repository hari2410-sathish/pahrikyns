// src/devops/docker/Lesson5.jsx
import React, { useEffect, useState, useRef } from "react";

// Props:
// - lessonId = "lesson5"
// - onComplete()
// - onNext()
// - onPrev()

export default function Lesson5({ lessonId = "lesson5", onComplete, onNext, onPrev }) {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const contentRef = useRef(null);

  // Scroll Progress
  useEffect(() => {
    const el = document.getElementById("lesson-content");
    if (!el) return;

    const handler = () => {
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = el.scrollTop;
      const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
      setProgress(pct);
    };

    el.addEventListener("scroll", handler);
    handler();
    return () => el.removeEventListener("scroll", handler);
  }, []);

  // Keyboard Shortcuts (N/P/C)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "n" || e.key === "N") onNext?.();
      if (e.key === "p" || e.key === "P") onPrev?.();
      if (e.key === "c" || e.key === "C") markComplete();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Copy handler
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("Copied!");
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("Failed!");
    }
  };

  // Mark Complete
  const markComplete = () => {
    setCompleted(true);
    onComplete?.(lessonId);
  };

  // Auto Next
  const autoNext = () => onNext?.();

  // Code examples
  const simpleDockerfile = `# Simple Dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
`;

  const entrypointDockerfile = `FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
ENTRYPOINT ["/usr/local/bin/gunicorn"]
CMD ["--bind", "0.0.0.0:8000", "app:app"]
`;

  const healthcheckExample = `HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1`;

  const dockerfileBest = `# Best practices summary
# 1. Pin base images
# 2. Use .dockerignore
# 3. Minimize layers and clean caches
# 4. Prefer multi-stage builds
`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 5 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>

            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-rose-500 to-yellow-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-rose-600">Overview</a></li>
              <li><a href="#instructions" className="hover:text-rose-600">Key Instructions</a></li>
              <li><a href="#examples" className="hover:text-rose-600">Examples</a></li>
              <li><a href="#healthcheck" className="hover:text-rose-600">HEALTHCHECK</a></li>
              <li><a href="#best" className="hover:text-rose-600">Best Practices</a></li>
              <li><a href="#troubleshoot" className="hover:text-rose-600">Troubleshooting</a></li>
              <li><a href="#quiz" className="hover:text-rose-600">Quiz</a></li>
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
              {completed ? "Completed ✓" : "Complete"}
            </button>

            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-rose-600 text-white">
                Next →
              </button>
              <button
                onClick={() => onPrev?.()}
                className="px-3 py-2 rounded bg-white border"
              >
                ← Prev
              </button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            Keys: N (next), P (prev), C (complete)
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        id="lesson-content"
        ref={contentRef}
        className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        {/* HEADER */}
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 5 — Dockerfile Basics</h1>
          <p className="text-sm text-slate-600">
            Learn Dockerfile fundamental instructions and how they impact layers.
          </p>
        </header>

        {/* OVERVIEW */}
        <section id="overview">
          <h2>Overview</h2>
          <p>
            A Dockerfile defines how to build a Docker image—each instruction creates a layer.
            Efficient ordering reduces build time and keeps images small.
          </p>
        </section>

        {/* INSTRUCTIONS */}
        <section id="instructions">
          <h2>Key Instructions</h2>

          <h3>FROM</h3>
          <p>Defines the base image. Every Dockerfile must start here.</p>

          <h3>WORKDIR</h3>
          <p>Sets working directory for all future instructions.</p>

          <h3>COPY vs ADD</h3>
          <p>Use COPY unless you need ADD’s extra features (tar extraction, URL fetch).</p>

          <h3>RUN</h3>
          <p>Runs commands at build time. Combine commands to reduce layers.</p>

          <h3>CMD vs ENTRYPOINT</h3>
          <p>
            ENTRYPOINT is fixed executable; CMD is default arguments. They can be used together.
          </p>

          <h3>ENV & ARG</h3>
          <p>ARG = build-time only. ENV = persists inside containers.</p>

          <h3>EXPOSE & VOLUME</h3>
          <p>EXPOSE documents ports. VOLUME defines mount points.</p>

          <h3>USER</h3>
          <p>Use non-root users for better security.</p>
        </section>

        {/* EXAMPLES */}
        <section id="examples">
          <h2>Examples</h2>

          <h3>Simple Node.js Dockerfile</h3>
          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{simpleDockerfile}</code></pre>
            <button
              onClick={() => handleCopy(simpleDockerfile)}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >
              Copy
            </button>
          </div>

          <h3>ENTRYPOINT Example</h3>
          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{entrypointDockerfile}</code></pre>
            <button
              onClick={() => handleCopy(entrypointDockerfile)}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >
              Copy
            </button>
          </div>

          <h3>HEALTHCHECK</h3>
          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{healthcheckExample}</code></pre>
            <button
              onClick={() => handleCopy(healthcheckExample)}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* HEALTHCHECK */}
        <section id="healthcheck">
          <h2>HEALTHCHECK</h2>
          <p>
            HEALTHCHECK tells Docker how to test container health. Used in orchestration systems.
          </p>
        </section>

        {/* BEST PRACTICES */}
        <section id="best">
          <h2>Best Practices</h2>
          <ul>
            <li>Use minimal base images (alpine).</li>
            <li>Keep build context small with .dockerignore.</li>
            <li>Combine RUN instructions to minimize layers.</li>
            <li>Don’t store secrets in Dockerfile.</li>
            <li>Use multi-stage builds for optimized sizes.</li>
          </ul>

          <div className="relative mt-3">
            <pre className="bg-slate-900 text-white p-3 rounded overflow-auto">
{dockerfileBest}
            </pre>
            <button
              onClick={() => handleCopy(dockerfileBest)}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* TROUBLESHOOT */}
        <section id="troubleshoot">
          <h2>Troubleshooting</h2>
          <ul>
            <li>If build fails, check .dockerignore & context size.</li>
            <li>Use `docker build --progress=plain` for verbose output.</li>
            <li>Use `docker history` to see layer sizes.</li>
            <li>Ensure correct permissions with COPY --chown.</li>
          </ul>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Quiz</h2>
          <ol>
            <li>What does RUN do?</li>
            <li>When to use ENTRYPOINT vs CMD?</li>
            <li>Why use .dockerignore?</li>
            <li>How to reduce final image size?</li>
          </ol>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="mt-3 px-3 py-2 border rounded"
          >
            {showAnswers ? "Hide Answers" : "Show Answers"}
          </button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol>
                <li>RUN executes commands during build and creates layers.</li>
                <li>ENTRYPOINT = fixed executable, CMD = default args.</li>
                <li>.dockerignore reduces build context & speeds builds.</li>
                <li>Use multi-stage builds + alpine images.</li>
              </ol>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mt-6">
          <div className="flex justify-between">
            <button onClick={() => onPrev?.()} className="px-4 py-2 rounded bg-white border">
              ← Prev
            </button>
            <button onClick={autoNext} className="px-4 py-2 rounded bg-rose-600 text-white">
              Next →
            </button>
          </div>

          {copied && (
            <div className="mt-3 text-sm text-green-600">
              {copied}
            </div>
          )}
        </footer>
      </main>
    </div>
  );
}
