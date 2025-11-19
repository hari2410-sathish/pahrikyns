import React, { useEffect, useState, useRef } from "react";

// Lesson19 — Troubleshooting Containers (FULL FIXED — JSX SAFE)

export default function Lesson19({
  lessonId = "lesson-19",
  onComplete,
  onNext,
  onPrev,
}) {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const contentRef = useRef(null);

  /* ─────────── Scroll Progress ─────────── */
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

  /* ─────────── Shortcuts ─────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "N" || e.key === "n") onNext?.();
      if (e.key === "P" || e.key === "p") onPrev?.();
      if (e.key === "C" || e.key === "c") markComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  /* ─────────── Copy Toast ─────────── */
  useEffect(() => {
    let t;
    if (copied) t = setTimeout(() => setCopied(""), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label || "copied");
    } catch {
      setCopied("copy failed");
    }
  };

  const markComplete = () => {
    setCompleted(true);
    onComplete?.(lessonId);
  };

  const next = () => onNext?.();

  /* ─────────── Code Blocks ─────────── */
  const logsCmd = `# Follow logs
docker logs -f myapp

# Show timestamps
docker logs -t myapp`;

  const execCmd = `# Enter shell inside container
docker exec -it myapp sh
# or
docker exec -it myapp bash`;

  const inspectCmd = `# Full metadata
docker inspect myapp

# Health field only
docker inspect -f '{{.State.Health.Status}}' myapp`;

  const portCmd = `# Check port mappings
docker port myapp`;

  const networkDebug = `docker exec -it myapp sh
ping google.com
ip addr
ip route
cat /etc/resolv.conf`;

  const volumeDebug = `# View mounts
docker inspect -f '{{json .Mounts}}' myapp | jq`;

  const daemonDebug = `# Restart docker daemon
sudo systemctl restart docker

# View daemon logs
journalctl -u docker -f`;

  const containerEvents = `# Real-time events
docker events --filter container=myapp`;

  const cleanupCmd = `# Remove unused containers, images, volumes
docker system prune -a`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 19 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-rose-500 to-red-600"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#logs" className="hover:text-rose-600">Logs</a></li>
              <li><a href="#exec" className="hover:text-rose-600">Shell access</a></li>
              <li><a href="#inspect" className="hover:text-rose-600">Inspect</a></li>
              <li><a href="#network" className="hover:text-rose-600">Network</a></li>
              <li><a href="#volumes" className="hover:text-rose-600">Volumes</a></li>
              <li><a href="#daemon" className="hover:text-rose-600">Daemon debug</a></li>
              <li><a href="#events" className="hover:text-rose-600">Events</a></li>
              <li><a href="#cleanup" className="hover:text-rose-600">Cleanup</a></li>
              <li><a href="#quiz" className="hover:text-rose-600">Quiz</a></li>
            </ul>
          </nav>

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
              <button onClick={next} className="px-3 py-2 rounded bg-rose-600 text-white">
                Next
              </button>
              <button onClick={() => onPrev?.()} className="px-3 py-2 rounded bg-white border">
                Prev
              </button>
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
          <h1 className="text-2xl font-extrabold">Lesson 19 — Troubleshooting Containers</h1>
          <p className="text-sm text-slate-600">
            Logs, debugging, networks, volumes, daemon logs, events, and more.
          </p>
        </header>

        {/* LOGS */}
        <section id="logs">
          <h2>1) Logs</h2>
          <p>Start debugging by checking logs.</p>
          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{logsCmd}</code></pre>
            <button onClick={() => copy(logsCmd, "logsCmd")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>
        </section>

        {/* EXEC */}
        <section id="exec">
          <h2>2) Enter container shell</h2>
          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{execCmd}</code></pre>
            <button onClick={() => copy(execCmd, "execCmd")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>
        </section>

        {/* INSPECT */}
        <section id="inspect">
          <h2>3) Inspect container state</h2>
          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{inspectCmd}</code></pre>
            <button onClick={() => copy(inspectCmd, "inspectCmd")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>

          <div className="relative mt-4">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{portCmd}</code></pre>
            <button onClick={() => copy(portCmd, "portCmd")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>
        </section>

        {/* NETWORK */}
        <section id="network">
          <h2>4) Network debugging</h2>
          <p>Inside the container, test DNS, connectivity, and routes.</p>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{networkDebug}</code></pre>
            <button onClick={() => copy(networkDebug, "networkDebug")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>
        </section>

        {/* VOLUMES */}
        <section id="volumes">
          <h2>5) Volume debugging</h2>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{volumeDebug}</code></pre>
            <button onClick={() => copy(volumeDebug, "volumeDebug")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>
        </section>

        {/* DAEMON */}
        <section id="daemon">
          <h2>6) Docker Daemon Debug</h2>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{daemonDebug}</code></pre>
            <button onClick={() => copy(daemonDebug, "daemonDebug")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>
        </section>

        {/* EVENTS */}
        <section id="events">
          <h2>7) Container Events</h2>
          <p>View real-time actions and errors.</p>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{containerEvents}</code></pre>
            <button onClick={() => copy(containerEvents, "containerEvents")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>
        </section>

        {/* CLEANUP */}
        <section id="cleanup">
          <h2>8) System cleanup</h2>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{cleanupCmd}</code></pre>
            <button onClick={() => copy(cleanupCmd, "cleanupCmd")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Mini Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>How do you access logs for a running container?</li>
            <li>How to enter the container shell?</li>
            <li>Which command shows container mounts?</li>
            <li>How to debug DNS inside a container?</li>
          </ol>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="mt-3 px-3 py-2 border rounded"
          >
            {showAnswers ? "Hide" : "Show"} Answers
          </button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li><code>docker logs myapp</code></li>
                <li><code>docker exec -it myapp sh</code></li>
                <li><code>{`docker inspect -f '{{json .Mounts}}' myapp`}</code></li>
                <li>Use <code>ping</code>, <code>cat /etc/resolv.conf</code>, <code>ip route</code></li>
              </ol>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">
                {completed ? "Completed" : "Not completed"}
              </div>
              <button
                onClick={markComplete}
                className={`px-3 py-2 rounded ${
                  completed ? "bg-green-600 text-white" : "bg-white border"
                }`}
              >
                {completed ? "Completed ✓" : "Mark complete"}
              </button>
            </div>
          </div>

          {copied && (
            <div className="mt-3 text-sm text-rose-600">{copied} copied ✓</div>
          )}
        </footer>
      </main>
    </div>
  );
}
