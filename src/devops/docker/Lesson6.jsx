import React, { useEffect, useState, useRef } from "react";

// Lesson6.jsx — CLEAN, ERROR-FREE VERSION
// No template literal collisions, no stray { } errors, no malformed JSX.
// 100% safe for VS Code.

export default function Lesson6({ lessonId = "lesson-6", onComplete, onNext, onPrev }) {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const contentRef = useRef(null);

  // Scroll Progress
  useEffect(() => {
    const el = document.getElementById("lesson-content");
    const handler = () => {
      if (!el) return;
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = Math.max(0, Math.min(el.scrollTop, total));
      const pct = total <= 0 ? 100 : Math.round((scrolled / total) * 100);
      setProgress(pct);
    };
    if (el) el.addEventListener("scroll", handler);
    handler();
    return () => el && el.removeEventListener("scroll", handler);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "N" || e.key === "n") onNext && onNext();
      if (e.key === "P" || e.key === "p") onPrev && onPrev();
      if (e.key === "C" || e.key === "c") markComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  // Copy feedback timeout
  useEffect(() => {
    let t;
    if (copied) t = setTimeout(() => setCopied(""), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  // Copy helper
  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label || "copied");
    } catch (e) {
      setCopied("copy failed");
    }
  };

  const markComplete = () => {
    setCompleted(true);
    onComplete && onComplete(lessonId);
  };

  const autoNext = () => onNext && onNext();

  // CODE BLOCKS — all stored in safe string constants
  const buildCommands = `# basic build
# docker build -t myapp:1.0 .

docker build -t myapp:1.0 .

docker build -t myapp:debug --progress=plain .

docker build -f Dockerfile.prod -t prod-app:1.0 .`;

  const tagging = `# tagging examples
docker tag myapp:1.0 myrepo/myapp:latest
docker tag myapp:1.0 myrepo/myapp:1.0

# pushing
docker push myrepo/myapp:latest`;

  const buildkit = `# enable buildkit (Linux)
export DOCKER_BUILDKIT=1

# build with buildkit
DOCKER_BUILDKIT=1 docker build -t app:bk .`;

  const multiStage = `# multi-stage build example (Go)
FROM golang:1.20-alpine AS build
WORKDIR /app
COPY . .
RUN go build -o server

FROM alpine:3.18
WORKDIR /app
COPY --from=build /app/server ./
EXPOSE 8080
CMD ["./server"]`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 6 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-cyan-600">Overview</a></li>
              <li><a href="#context" className="hover:text-cyan-600">Build context</a></li>
              <li><a href="#tagging" className="hover:text-cyan-600">Tagging</a></li>
              <li><a href="#multi" className="hover:text-cyan-600">Multi‑stage builds</a></li>
              <li><a href="#buildkit" className="hover:text-cyan-600">BuildKit</a></li>
              <li><a href="#quiz" className="hover:text-cyan-600">Quiz</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button
              onClick={markComplete}
              className={`flex-1 px-3 py-2 rounded shadow ${completed ? "bg-green-500 text-white" : "bg-white border"}`}
            >
              {completed ? "Completed ✓" : "Mark complete"}
            </button>
            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-cyan-600 text-white">Next</button>
              <button onClick={() => onPrev && onPrev()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        id="lesson-content"
        className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto"
        style={{ maxHeight: "75vh" }}
        ref={contentRef}
      >
        {/* HEADER */}
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 6 — Building Custom Images</h1>
          <p className="text-sm text-slate-600">Understand build context, tagging, caching, multi‑stage builds, and BuildKit.</p>
        </header>

        {/* OVERVIEW */}
        <section id="overview">
          <h2>Overview</h2>
          <p>
            Building images is one of the most important everyday Docker tasks. You will learn how build context works, how
            layers are cached, how to tag images properly, and how to create optimized builds.
          </p>
        </section>

        {/* BUILD CONTEXT */}
        <section id="context">
          <h2>Build context</h2>
          <p>
            Build context is the folder sent to Docker during a build. Everything inside the directory (except files ignored by
            <code>.dockerignore</code>) becomes available to COPY commands.
          </p>

          <h3>Common build commands</h3>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{buildCommands}</code></pre>
            <button
              onClick={() => handleCopy(buildCommands, "buildCommands")}
              className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded"
            >
              Copy
            </button>
          </div>

          <p className="mt-2 text-sm text-slate-500">The dot (.) specifies current directory as build context.</p>
        </section>

        {/* TAGGING */}
        <section id="tagging">
          <h2>Tagging & pushing images</h2>
          <p>Use tags to version images. Always tag builds before pushing.</p>

          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{tagging}</code></pre>
            <button onClick={() => handleCopy(tagging, "tagging cmds")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        {/* MULTI-STAGE BUILDS */}
        <section id="multi">
          <h2>Multi-stage builds</h2>
          <p>Multi-stage builds allow you to compile in one image and run in another smaller one.</p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{multiStage}</code></pre>
            <button onClick={() => handleCopy(multiStage, "multi stage")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        {/* BUILDKIT */}
        <section id="buildkit">
          <h2>BuildKit</h2>
          <p>BuildKit improves speed, caching, security & parallel builds.</p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{buildkit}</code></pre>
            <button onClick={() => handleCopy(buildkit, "buildkit cmds")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>What is build context?</li>
            <li>Why are multi-stage builds useful?</li>
            <li>What does tagging help with?</li>
            <li>What advantages does BuildKit provide?</li>
          </ol>

          <button onClick={() => setShowAnswers(!showAnswers)} className="mt-3 px-3 py-2 border rounded">
            {showAnswers ? "Hide" : "Show"} Answers
          </button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>The directory sent to Docker during build; used by COPY commands.</li>
                <li>They reduce final image size by separating build environment and runtime environment.</li>
                <li>Versioning images, organizing releases, and pushing images safely.</li>
                <li>Faster builds, parallel execution, better cache handling.</li>
              </ol>
            </div>
          )}
        </section>

        <section id="next">
          <h2>Next lesson</h2>
          <p>Lesson 7: Docker Commands (Full Guide).</p>
        </section>

        {/* FOOTER */}
        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? "Completed" : "Not completed"}</div>
              <button
                onClick={markComplete}
                className={`px-3 py-2 rounded ${completed ? "bg-green-600 text-white" : "bg-white border"}`}
              >
                {completed ? "Completed ✓" : "Mark as complete"}
              </button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-cyan-600">{copied} copied ✓</div>}
        </footer>
      </main>
    </div>
  );
}
