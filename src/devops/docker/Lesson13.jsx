import React, { useEffect, useState, useRef } from "react";

// Lesson13 — Docker Security Basics (non-root, capabilities, readonly FS, seccomp, scanning, rootless)
export default function Lesson13({
  lessonId = "lesson13",
  onComplete,
  onNext,
  onPrev,
}) {
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
      setProgress(total > 0 ? Math.round((scrolled / total) * 100) : 100);
    };
    el?.addEventListener("scroll", handler);
    handler();
    return () => el?.removeEventListener("scroll", handler);
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

  /* ───────────────────────── Copy Timeout ───────────────────────── */
  useEffect(() => {
    let t;
    if (copied) t = setTimeout(() => setCopied(""), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async (text, label) => {
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

  const next = () => onNext?.();

  /* ───────────────────────── CODE BLOCKS ───────────────────────── */
  const nonRoot = `# Run container as non-root user
USER node

# Or via CLI
docker run -u 1000:1000 myapp`;

  const dropCaps = `# Drop all capabilities except NET_BIND_SERVICE
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE myapp`;

  const readOnlyFs = `# Run container with read-only root filesystem
docker run --read-only myapp`;

  const seccomp = `# Use default or custom seccomp profile
docker run --security-opt seccomp=default.json myapp`;

  const scanImage = `# Scan image for vulnerabilities
trivy image myapp:1.0

# Or Docker scan (Snyk)
docker scan myapp:1.0`;

  const rootless = `# Install rootless Docker (Linux)
curl -fsSL https://get.docker.com/rootless | sh
export PATH=$HOME/bin:$PATH`;

  /* ───────────────────────── RETURN JSX ───────────────────────── */
  return (
    <div id="lesson-root" className="flex flex-col md:flex-row gap-6 p-4 md:p-8">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 13 TOC</h3>
              <span className="text-sm text-slate-600">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-red-500 to-orange-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#goals" className="hover:text-red-600">Goals</a></li>
              <li><a href="#root" className="hover:text-red-600">Non-root user</a></li>
              <li><a href="#caps" className="hover:text-red-600">Capabilities</a></li>
              <li><a href="#fs" className="hover:text-red-600">Readonly FS</a></li>
              <li><a href="#seccomp" className="hover:text-red-600">Seccomp</a></li>
              <li><a href="#scan" className="hover:text-red-600">Scanning</a></li>
              <li><a href="#rootless" className="hover:text-red-600">Rootless Docker</a></li>
              <li><a href="#quiz" className="hover:text-red-600">Quiz</a></li>
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
              <button onClick={next} className="px-3 py-2 rounded bg-red-600 text-white">Next</button>
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
          <h1 className="text-2xl font-extrabold">Lesson 13 — Docker Security Basics</h1>
          <p className="text-sm text-slate-600">
            Secure containers using least privilege, user isolation, capabilities, seccomp, scanning & rootless mode.
          </p>
        </header>

        {/* GOALS */}
        <section id="goals">
          <h2>Learning Goals</h2>
          <ul>
            <li>Run containers as non-root</li>
            <li>Drop unnecessary Linux capabilities</li>
            <li>Protect filesystem with read-only mode</li>
            <li>Use seccomp to block harmful syscalls</li>
            <li>Scan container images</li>
            <li>Understand rootless Docker</li>
          </ul>
        </section>

        {/* NON-ROOT USER */}
        <section id="root">
          <h2>1. Running as Non-Root</h2>
          <p>Most images run as root by default. This is dangerous.</p>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{nonRoot}</code></pre>
            <button onClick={() => copy(nonRoot, "nonRoot")} className="absolute top-2 right-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="caps">
          <h2>2. Dropping Capabilities</h2>
          <p>Containers inherit many Linux capabilities—drop all except what is needed.</p>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{dropCaps}</code></pre>
            <button onClick={() => copy(dropCaps, "caps")} className="absolute top-2 right-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        {/* READ-ONLY FS */}
        <section id="fs">
          <h2>3. Read-Only Filesystem</h2>
          <p>Prevents unauthorized writes inside the container.</p>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{readOnlyFs}</code></pre>
            <button onClick={() => copy(readOnlyFs, "readonly")} className="absolute top-2 right-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        {/* SECCOMP */}
        <section id="seccomp">
          <h2>4. Seccomp Profiles</h2>
          <p>Seccomp blocks dangerous Linux syscalls. Docker’s default profile is good.</p>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{seccomp}</code></pre>
            <button onClick={() => copy(seccomp, "seccomp")} className="absolute top-2 right-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        {/* SCANNING */}
        <section id="scan">
          <h2>5. Image Scanning</h2>
          <p>Scan images for vulnerabilities before deploying.</p>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{scanImage}</code></pre>
            <button onClick={() => copy(scanImage, "scan")} className="absolute top-2 right-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        {/* ROOTLESS */}
        <section id="rootless">
          <h2>6. Rootless Docker</h2>
          <p>Docker runs without root privileges—safer for developers & CI systems.</p>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded overflow-auto"><code>{rootless}</code></pre>
            <button onClick={() => copy(rootless, "rootless")} className="absolute top-2 right-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>Why avoid running containers as root?</li>
            <li>What does dropping capabilities do?</li>
            <li>What does seccomp protect?</li>
            <li>Why use rootless Docker?</li>
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
                <li>It gives attackers full system control if container escapes.</li>
                <li>Makes containers operate with only required privileges.</li>
                <li>Blocks dangerous Linux syscalls.</li>
                <li>Safer because Docker daemon won't need root.</li>
              </ol>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mt-6 flex justify-between items-center">
          <button onClick={() => onPrev?.()} className="px-3 py-2 border rounded">
            ← Prev
          </button>
          <button onClick={next} className="px-3 py-2 bg-red-600 text-white rounded">
            Next →
          </button>
        </footer>

        {copied && <div className="text-green-600 mt-3 text-sm">{copied}</div>}
      </main>
    </div>
  );
}
