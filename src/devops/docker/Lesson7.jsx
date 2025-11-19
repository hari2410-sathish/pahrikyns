// src/devops/docker/Lesson7.jsx
import React, { useEffect, useState, useRef } from "react";

export default function Lesson7({ lessonId = "lesson7", onComplete, onNext, onPrev }) {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const contentRef = useRef(null);

  /* ───────────────────────── Scroll Progress ───────────────────────── */
  useEffect(() => {
    const el = document.getElementById("lesson-content");
    const handler = () => {
      if (!el) return;
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = el.scrollTop;
      const pct = total > 0 ? Math.round((scrolled / total) * 100) : 100;
      setProgress(pct);
    };
    if (el) el.addEventListener("scroll", handler);
    handler();
    return () => el && el.removeEventListener("scroll", handler);
  }, []);

  /* ───────────────────────── Keyboard Shortcuts ───────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "n" || e.key === "N") onNext?.();
      if (e.key === "p" || e.key === "P") onPrev?.();
      if (e.key === "c" || e.key === "C") markComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  /* ───────────────────────── Copy helper ───────────────────────── */
  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label || "Copied!");
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("Copy failed");
    }
  };

  const markComplete = () => {
    setCompleted(true);
    onComplete?.(lessonId);
  };

  const autoNext = () => onNext?.();

  /* ───────────────────────── Code Blocks ───────────────────────── */
  const containerBasics = `docker run nginx
docker run -d nginx
docker run --name web -d nginx
docker run -d -p 8080:80 nginx`;

  const inspectCmd = `docker inspect web
docker image inspect nginx`;

  const logsCmd = `docker logs web
docker logs -f web`;

  const execCmd = `docker exec -it web /bin/sh`;

  const stopRemove = `docker stop web
docker rm web
docker rmi nginx`;

  const systemCmds = `docker system df
docker system prune -f`;

  const networkCmds = `docker network ls
docker network create appnet
docker run -d --net appnet --name redis redis`;

  const volumeCmds = `docker volume ls
docker volume create data
docker run -d -v data:/var/lib/mysql mysql`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">

      {/* ───────────────────── SIDEBAR ───────────────────── */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 7 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>

            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-white/80 p-3 rounded shadow text-sm">
            <ul className="space-y-2">
              <li><a href="#basics" className="hover:text-green-600">Container Basics</a></li>
              <li><a href="#inspect" className="hover:text-green-600">Inspect</a></li>
              <li><a href="#logs" className="hover:text-green-600">Logs</a></li>
              <li><a href="#exec" className="hover:text-green-600">Exec</a></li>
              <li><a href="#remove" className="hover:text-green-600">Remove</a></li>
              <li><a href="#system" className="hover:text-green-600">System</a></li>
              <li><a href="#network" className="hover:text-green-600">Networking</a></li>
              <li><a href="#volume" className="hover:text-green-600">Volumes</a></li>
              <li><a href="#quiz" className="hover:text-green-600">Quiz</a></li>
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

            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-green-600 text-white">Next</button>
              <button onClick={() => onPrev?.()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500">Keys: N / P / C</div>
        </div>
      </aside>

      {/* ───────────────────── MAIN CONTENT ───────────────────── */}
      <main
        id="lesson-content"
        ref={contentRef}
        className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 7 — Docker Commands Full Guide</h1>
          <p className="text-sm text-slate-600">Most-used Docker CLI commands for devOps engineers.</p>
        </header>

        {/* BASICS */}
        <section id="basics">
          <h2>Container Basics</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{containerBasics}</code></pre>
            <button
              onClick={() => handleCopy(containerBasics, "Container basics")}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >Copy</button>
          </div>
        </section>

        {/* INSPECT */}
        <section id="inspect">
          <h2>Inspect Containers & Images</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{inspectCmd}</code></pre>
            <button
              onClick={() => handleCopy(inspectCmd, "inspect")}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >Copy</button>
          </div>
        </section>

        {/* LOGS */}
        <section id="logs">
          <h2>Logs</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{logsCmd}</code></pre>
            <button
              onClick={() => handleCopy(logsCmd, "logs")}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >Copy</button>
          </div>
        </section>

        {/* EXEC */}
        <section id="exec">
          <h2>Exec into container</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{execCmd}</code></pre>
            <button
              onClick={() => handleCopy(execCmd, "exec")}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >Copy</button>
          </div>
        </section>

        {/* STOP & REMOVE */}
        <section id="remove">
          <h2>Stop & Remove</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{stopRemove}</code></pre>
            <button
              onClick={() => handleCopy(stopRemove, "stop/remove")}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >Copy</button>
          </div>
        </section>

        {/* SYSTEM */}
        <section id="system">
          <h2>System Cleanup</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{systemCmds}</code></pre>
            <button
              onClick={() => handleCopy(systemCmds, "system")}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >Copy</button>
          </div>
        </section>

        {/* NETWORK */}
        <section id="network">
          <h2>Networking</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{networkCmds}</code></pre>
            <button
              onClick={() => handleCopy(networkCmds, "network")}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >Copy</button>
          </div>
        </section>

        {/* VOLUME */}
        <section id="volume">
          <h2>Volumes</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{volumeCmds}</code></pre>
            <button
              onClick={() => handleCopy(volumeCmds, "volumes")}
              className="absolute right-2 top-2 bg-white border px-2 py-1 text-xs rounded"
            >Copy</button>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Mini Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>How to run a container in background?</li>
            <li>How to exec into a running container?</li>
            <li>How to inspect a container?</li>
            <li>How to clean unused Docker objects?</li>
          </ol>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="mt-3 px-3 py-2 border rounded"
          >
            {showAnswers ? "Hide Answers" : "Show Answers"}
          </button>

          {showAnswers && (
            <div className="mt-3 bg-slate-100 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>docker run -d image</li>
                <li>docker exec -it container sh</li>
                <li>docker inspect container</li>
                <li>docker system prune -f</li>
              </ol>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mt-6 flex justify-between">
          <button onClick={() => onPrev?.()} className="px-3 py-2 border rounded">← Prev</button>
          <button onClick={autoNext} className="px-3 py-2 bg-green-600 text-white rounded">Next →</button>
        </footer>

        {copied && (
          <div className="mt-3 text-green-600 text-sm">{copied}</div>
        )}
      </main>
    </div>
  );
}
