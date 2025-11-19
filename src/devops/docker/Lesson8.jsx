import React, { useEffect, useState, useRef } from "react";

export default function Lesson8({
  lessonId = "lesson8",
  onComplete,
  onNext,
  onPrev,
}) {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const contentRef = useRef(null);

  /* ───────────────────────── Scroll progress ───────────────────────── */
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

  /* ───────────────────────── Keyboard shortuts ───────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "n" || e.key === "N") onNext?.();
      if (e.key === "p" || e.key === "P") onPrev?.();
      if (e.key === "c" || e.key === "C") markComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  /* ───────────────────────── Copy timeout ───────────────────────── */
  useEffect(() => {
    let t;
    if (copied) t = setTimeout(() => setCopied(""), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label || "Copied");
    } catch {
      setCopied("Copy failed");
    }
  };

  const markComplete = () => {
    setCompleted(true);
    onComplete?.(lessonId);
  };

  const autoNext = () => onNext?.();

  /* ───────────────────────── Code blocks ───────────────────────── */
  const createNamed = `docker volume create data
docker volume inspect data`;

  const mountExample = `docker run -d --name mysql \\
  -e MYSQL_ROOT_PASSWORD=root \\
  -v data:/var/lib/mysql mysql:8`;

  const bindMount = `docker run -d --name web \\
  -p 8080:80 \\
  -v $(pwd)/site:/usr/share/nginx/html nginx`;

  const volumeLs = `docker volume ls
docker volume rm data
docker volume prune -f`;

  return (
    <div
      id="lesson-root"
      className="flex flex-col md:flex-row gap-6 p-4 md:p-8"
    >
      {/* ───────────────────────── SIDEBAR ───────────────────────── */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 8 TOC</h3>
              <span className="text-sm text-slate-600">{progress}%</span>
            </div>

            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-amber-500 to-red-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#intro" className="hover:text-amber-600">Intro</a></li>
              <li><a href="#types" className="hover:text-amber-600">Types</a></li>
              <li><a href="#named" className="hover:text-amber-600">Named Volumes</a></li>
              <li><a href="#bind" className="hover:text-amber-600">Bind Mounts</a></li>
              <li><a href="#clean" className="hover:text-amber-600">Cleanup</a></li>
              <li><a href="#quiz" className="hover:text-amber-600">Quiz</a></li>
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
              {completed ? "Completed ✓" : "Mark complete"}
            </button>

            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 bg-amber-600 text-white rounded">
                Next
              </button>
              <button onClick={() => onPrev?.()} className="px-3 py-2 border rounded">
                Prev
              </button>
            </div>
          </div>

          {/* Shortcut hint */}
          <div className="mt-4 text-xs text-slate-500">
            Shortcuts: N / P / C
          </div>
        </div>
      </aside>

      {/* ───────────────────────── MAIN CONTENT ───────────────────────── */}
      <main
        id="lesson-content"
        ref={contentRef}
        className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 8 — Docker Volumes</h1>
          <p className="text-sm text-slate-600">How to persist and manage data in Docker.</p>
        </header>

        {/* INTRO */}
        <section id="intro">
          <h2>What Are Volumes?</h2>
          <p>
            Containers are ephemeral. When a container stops or gets removed,
            everything inside <strong>/</strong> vanishes.
          </p>

          <p>Volumes solve this problem by providing <strong>persistent storage</strong>.</p>

          <ul>
            <li>Retain data after container removal</li>
            <li>Share data across multiple containers</li>
            <li>Store DB data safely</li>
          </ul>
        </section>

        {/* TYPES */}
        <section id="types">
          <h2>Types of Volumes</h2>
          <ul>
            <li><strong>Named volumes</strong> — managed by Docker</li>
            <li><strong>Bind mounts</strong> — map host folder → container folder</li>
            <li><strong>Anonymous volumes</strong> — auto-created</li>
          </ul>
        </section>

        {/* NAMED VOLUMES */}
        <section id="named">
          <h2>Named Volumes</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{createNamed}</code></pre>
            <button
              onClick={() => handleCopy(createNamed, "named volume")}
              className="absolute right-2 top-2 text-xs bg-white border px-2 py-1 rounded"
            >
              Copy
            </button>
          </div>

          <h3 className="mt-4">MySQL with persistent data</h3>
          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{mountExample}</code></pre>
            <button
              onClick={() => handleCopy(mountExample, "mysql volume")}
              className="absolute right-2 top-2 text-xs bg-white border px-2 py-1 rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* BIND MOUNTS */}
        <section id="bind">
          <h2>Bind Mounts</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{bindMount}</code></pre>
            <button
              onClick={() => handleCopy(bindMount, "bind mount")}
              className="absolute right-2 top-2 text-xs bg-white border px-2 py-1 rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* CLEANUP */}
        <section id="clean">
          <h2>Volume Cleanup</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{volumeLs}</code></pre>
            <button
              onClick={() => handleCopy(volumeLs, "cleanup")}
              className="absolute right-2 top-2 text-xs bg-white border px-2 py-1 rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>Why are volumes needed?</li>
            <li>Difference between named and bind mounts?</li>
            <li>Where do bind mounts store data?</li>
            <li>Why avoid anonymous volumes?</li>
          </ol>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="mt-3 px-3 py-2 border rounded"
          >
            {showAnswers ? "Hide" : "Show"} Answers
          </button>

          {showAnswers && (
            <div className="mt-3 bg-slate-100 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>To persist data across container deletions.</li>
                <li>Named = managed by Docker. Bind = host filesystem mapped.</li>
                <li>Bind mounts store data directly on host machine folders.</li>
                <li>Hard to manage, can fill system unknowingly.</li>
              </ol>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mt-6 flex justify-between">
          <button onClick={() => onPrev?.()} className="px-3 py-2 border rounded">
            ← Prev
          </button>
          <button onClick={autoNext} className="px-3 py-2 bg-amber-600 text-white rounded">
            Next →
          </button>
        </footer>

        {copied && (
          <div className="mt-3 text-green-600 text-sm">{copied}</div>
        )}
      </main>
    </div>
  );
}
