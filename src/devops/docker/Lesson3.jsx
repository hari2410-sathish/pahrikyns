import React, { useEffect, useState, useRef } from "react";

// Lesson3.jsx
// Copy-paste ready React component (Tailwind CSS assumed).
// Props expected (optional):
// - lessonId (string)
// - onComplete(lessonId)
// - onNext()
// - onPrev()

export default function Lesson3({ lessonId = "lesson-3", onComplete, onNext, onPrev }) {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const contentRef = useRef(null);

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

  // Keyboard shortcuts: N (next), P (prev), C (complete)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'N' || e.key === 'n') {
        if (onNext) onNext();
      }
      if (e.key === 'P' || e.key === 'p') {
        if (onPrev) onPrev();
      }
      if (e.key === 'C' || e.key === 'c') {
        markComplete();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onNext, onPrev]);

  useEffect(() => {
    let t;
    if (copied) t = setTimeout(() => setCopied(""), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label || 'copied');
    } catch (e) {
      console.warn('copy failed', e);
      setCopied('copy failed');
    }
  };

  const markComplete = () => {
    setCompleted(true);
    if (onComplete) onComplete(lessonId);
  };

  const autoNext = () => { if (onNext) onNext(); };

  // snippets
  const runExamples = `# Run a detached container (nginx)
docker run -d --name web -p 8080:80 nginx:latest

# Run interactive shell in container
docker run --rm -it ubuntu:22.04 /bin/bash

# Run with a named volume
docker run -d --name postgres -e POSTGRES_PASSWORD=pass -v pgdata:/var/lib/postgresql/data postgres:15`;

  const lifecycle = `# create (implicit with run)
docker create --name myapp alpine:3.18
# start
docker start myapp
# stop
docker stop myapp
# restart
docker restart myapp
# pause
docker pause myapp
# unpause
docker unpause myapp
# remove
docker rm myapp`;

  const inspectCommands = `docker ps -a

# inspect container details
docker inspect myapp

# get running process inside container
docker top myapp

# view logs
docker logs -f myapp

# resource usage
docker stats myapp`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 3 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav aria-label="Table of contents" className="bg-white/80 p-3 rounded shadow-sm">
            <ul className="space-y-2 text-sm">
              <li><a className="block hover:text-purple-600" href="#goals">Learning goals</a></li>
              <li><a className="block hover:text-purple-600" href="#what">What is a container?</a></li>
              <li><a className="block hover:text-purple-600" href="#namespaces">Linux namespaces & cgroups</a></li>
              <li><a className="block hover:text-purple-600" href="#unionfs">Union FS & writable layer</a></li>
              <li><a className="block hover:text-purple-600" href="#lifecycle">Container lifecycle</a></li>
              <li><a className="block hover:text-purple-600" href="#commands">Common commands</a></li>
              <li><a className="block hover:text-purple-600" href="#debug">Debugging & inspection</a></li>
              <li><a className="block hover:text-purple-600" href="#quiz">Quiz & exercises</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? 'bg-green-500 text-white' : 'bg-white border'}`}>
              {completed ? 'Completed ✓' : 'Mark as complete'}
            </button>
            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-purple-600 text-white">Next</button>
              <button onClick={() => onPrev && onPrev()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: <span className="font-mono">N</span>=Next <span className="font-mono">P</span>=Prev <span className="font-mono">C</span>=Complete</div>
        </div>
      </aside>

      <main id="lesson-content" className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto" style={{ maxHeight: '75vh' }} ref={contentRef}>
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 3 — Containers Explained</h1>
          <p className="text-sm text-slate-600">Deep dive into what containers are, how the OS provides isolation, container writable layers, lifecycle, and useful commands.</p>
        </header>

        <section id="goals">
          <h2>Learning goals</h2>
          <ul>
            <li>Explain what a container is at the OS level.</li>
            <li>Understand Linux namespaces and cgroups used for isolation.</li>
            <li>Know container lifecycle commands and practical use-cases.</li>
            <li>Inspect and debug containers using core Docker tooling.</li>
          </ul>
        </section>

        <section id="what">
          <h2>1) What is a container?</h2>
          <p>
            A container is a lightweight, portable execution environment that isolates processes from the host system using Linux
            kernel features (namespaces and cgroups) and packages application code + dependencies via an image (read-only) with a
            writable container layer on top.
          </p>

          <div className="mt-3 bg-slate-50 p-3 rounded border">
            <strong>Quick analogy:</strong> Think of an image as a tarball of a filesystem (read-only). A container is like a running VM, but instead of a full guest OS it has a thin writable layer and shares the kernel with the host.
          </div>

          <h3 className="mt-4">2D diagram: container vs host</h3>
          <svg viewBox="0 0 780 200" className="w-full h-44 border rounded">
            <rect x="8" y="8" width="764" height="184" rx="8" fill="#fbfdff" stroke="#e6eef8" />

            <text x="30" y="36" fontSize="13" fontWeight="700">Host Kernel (shared)</text>

            <g>
              <rect x="34" y="52" width="220" height="120" rx="6" fill="#fff7ed" stroke="#ffd6a5" />
              <text x="64" y="78" fontSize="12">Container A</text>
              <text x="60" y="96" fontSize="11">Namespaces (pid,net,mnt,user)</text>
              <text x="60" y="112" fontSize="11">Writable layer (overlay)</text>
            </g>

            <g>
              <rect x="278" y="52" width="220" height="120" rx="6" fill="#eef2ff" stroke="#c7d2fe" />
              <text x="308" y="78" fontSize="12">Container B</text>
              <text x="304" y="96" fontSize="11">Isolated processes</text>
              <text x="304" y="112" fontSize="11">Network namespace</text>
            </g>

            <g>
              <rect x="522" y="52" width="220" height="120" rx="6" fill="#ecfdf5" stroke="#bbf7d0" />
              <text x="552" y="78" fontSize="12">Host (other processes)</text>
              <text x="548" y="96" fontSize="11">System services</text>
            </g>
          </svg>

        </section>

        <section id="namespaces">
          <h2>2) Linux namespaces & cgroups</h2>
          <p>
            Namespaces provide isolation of kernel resources. Common namespaces used by containers:
          </p>
          <ul>
            <li><strong>PID</strong> — process ID space.</li>
            <li><strong>NET</strong> — network stack (interfaces, routing, ports).</li>
            <li><strong>MNT</strong> — filesystem mounts.</li>
            <li><strong>IPC</strong> — System V IPC and POSIX message queues.</li>
            <li><strong>UTS</strong> — hostname and domain name.</li>
            <li><strong>User</strong> — user & group ID mappings (user namespaces).</li>
          </ul>

          <p className="mt-2">Cgroups (control groups) limit and account for resource usage — CPU, memory, IO. Docker uses cgroups to enforce resource limits for containers.</p>

          <div className="mt-3 bg-slate-50 p-3 rounded border text-sm">
            <strong>Example:</strong> A container can be limited to 512MB RAM and 0.5 CPU share using <code>--memory</code> and <code>--cpus</code> flags when running.
          </div>

          <h3 className="mt-4">Interactive-ish 3D concept cube</h3>
          <div className="perspective-700 mt-2 flex items-center justify-center">
            <div className="relative w-44 h-36" style={{ transformStyle: 'preserve-3d' }}>
              <div className="cube" style={{ transformStyle: 'preserve-3d' }}>
                <div className="cube-face p-2">PID</div>
                <div className="cube-face p-2">NET</div>
                <div className="cube-face p-2">MNT</div>
                <div className="cube-face p-2">IPC</div>
                <div className="cube-face p-2">USER</div>
                <div className="cube-face p-2">CGROUPS</div>
              </div>
            </div>
          </div>
          <style>{`
            .perspective-700 { perspective: 700px; }
            .cube { width: 140px; height: 96px; position: relative; transform: rotateX(-15deg) rotateY(10deg); animation: cr 7s linear infinite; }
            .cube-face { position: absolute; width: 140px; height: 96px; display:flex; align-items:center; justify-content:center; background: rgba(139,92,246,0.08); border:1px solid rgba(139,92,246,0.12); border-radius:6px; font-size:12px; }
            .cube-face.front  { transform: translateZ(60px); }
            .cube-face.back   { transform: rotateY(180deg) translateZ(60px); }
            .cube-face.right  { transform: rotateY(90deg) translateZ(60px); }
            .cube-face.left   { transform: rotateY(-90deg) translateZ(60px); }
            .cube-face.top    { transform: rotateX(90deg) translateZ(48px); }
            .cube-face.bottom { transform: rotateX(-90deg) translateZ(48px); }
            @keyframes cr { from { transform: rotateX(-15deg) rotateY(0deg); } to { transform: rotateX(-15deg) rotateY(360deg); } }
          `}</style>
        </section>

        <section id="unionfs">
          <h2>3) Union filesystems & the writable layer</h2>
          <p>
            Docker images use a union filesystem (overlay2 on most modern systems) that composes multiple read-only layers into one view. When a container starts, Docker provides a thin writable layer on top of these read-only layers — this is where runtime changes (written files, logs) go.
          </p>

          <div className="mt-3 bg-slate-50 p-3 rounded border">
            <strong>Key points:</strong>
            <ul className="mt-2">
              <li>Image layers are immutable; container changes are stored in the writable layer.</li>
              <li>Commits (docker commit) create a new image from a container's writable layer.</li>
              <li>Backing filesystem (overlay2) affects performance and layer storage.</li>
            </ul>
          </div>

          <h3 className="mt-4">Visual: union of layers</h3>
          <svg viewBox="0 0 700 130" className="w-full h-36 border rounded">
            <g>
              <rect x="40" y="16" width="620" height="18" rx="4" fill="#efefef" />
              <text x="60" y="28" fontSize="11">Layer 1: base OS</text>

              <rect x="80" y="44" width="540" height="16" rx="4" fill="#f8f7ff" />
              <text x="100" y="56" fontSize="11">Layer 2: runtime</text>

              <rect x="120" y="68" width="460" height="14" rx="4" fill="#fffaf0" />
              <text x="140" y="78" fontSize="11">Layer 3: app files</text>

              <rect x="160" y="88" width="380" height="12" rx="4" fill="#ecfffb" />
              <text x="180" y="98" fontSize="11">Writable container layer</text>
            </g>
          </svg>
        </section>

        <section id="lifecycle">
          <h2>4) Container lifecycle</h2>
          <p>
            Typical lifecycle actions: create (optional), start, stop, restart, pause/unpause, kill, remove. `docker run` typically combines create+start.
          </p>

          <div className="mt-3 bg-slate-100 p-3 rounded">
            <pre className="font-mono text-sm whitespace-pre-wrap">{lifecycle}</pre>
          </div>

          <div className="mt-2 text-sm text-slate-500">Note: `docker run --rm` removes the container automatically after it exits (useful for one-off tasks).</div>
        </section>

        <section id="commands">
          <h2>5) Useful container commands (practical)</h2>
          <div className="mt-2 bg-white border rounded p-3">
            <h3 className="text-sm font-semibold">Run / attach / exec</h3>
            <pre className="p-2 bg-slate-900 text-white rounded overflow-auto"><code className="font-mono">{runExamples}</code></pre>
            <div className="mt-2 text-xs text-slate-500">Use <code>docker exec -it &lt;container&gt; /bin/sh</code> to open a shell inside a running container.</div>
          </div>

          <div className="mt-3 bg-white border rounded p-3">
            <h3 className="text-sm font-semibold">Inspect & debug</h3>
            <pre className="p-2 bg-slate-100 rounded"><code className="font-mono">{inspectCommands}</code></pre>
          </div>

          <div className="mt-3">
            <button onClick={() => handleCopy(runExamples, 'runExamples')} className="px-3 py-2 bg-white border rounded">Copy run examples</button>
            <button onClick={() => handleCopy(inspectCommands, 'inspectCommands')} className="ml-2 px-3 py-2 bg-white border rounded">Copy inspect commands</button>
          </div>
        </section>

        <section id="debug">
          <h2>6) Debugging tips</h2>
          <ul>
            <li>If a container fails to start, check <code>docker logs &lt;container&gt;</code>.</li>
            <li>Use <code>docker inspect &lt;container&gt;</code> to view mount points, env vars, and network settings.</li>
            <li>Copy files out of a container with <code>docker cp &lt;container&gt;:/path /local/path</code>.</li>
            <li>Use <code>docker commit</code> to capture container state into an image for further analysis (not recommended for production workflows, but useful for debugging).</li>
          </ul>

          <div className="mt-3 bg-slate-50 p-3 rounded border">
            <strong>Example: copy file from container</strong>
            <pre className="p-2"><code className="font-mono">docker cp myapp:/var/log/app.log ./app.log</code></pre>
          </div>
        </section>

        <section id="quiz">
          <h2>7) Mini Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>Where are runtime changes stored for a container?</li>
            <li>Name three namespaces used by containers and what they isolate.</li>
            <li>Which command would you use to get a shell inside a running container?</li>
            <li>How do cgroups help with resource management?</li>
          </ol>

          <button onClick={() => setShowAnswers(s => !s)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? 'Hide' : 'Show'} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>In the writable container layer on top of the image layers (overlay filesystem).</li>
                <li>PID (process IDs), NET (network stack), MNT (filesystem mounts) — they isolate processes, network interfaces, and mounts respectively.</li>
                <li><code>docker exec -it &lt;container&gt; /bin/sh</code> or <code>/bin/bash</code>.</li>
                <li>Cgroups limit and account for CPU, memory, and IO per container so one container cannot exhaust host resources.</li>
              </ol>
            </div>
          )}
        </section>

        <section id="exercises">
          <h2>8) Exercises</h2>
          <ol>
            <li>Run an alpine container, create a file in the writable layer, stop and start the container, and verify the file still exists.</li>
            <li>Use <code>docker commit</code> to save the container state as a new image and start a new container from that image.</li>
            <li>Limit a container's memory to 256MB and try to allocate more memory inside the container—observe behavior.</li>
            <li>List namespaces of a running container from the host (hint: look under <code>/proc/&lt;pid&gt;/ns</code> of the container process).</li>
          </ol>
        </section>

        <section id="cheatsheet">
          <h2>9) Cheatsheet</h2>
          <pre className="p-3 bg-slate-900 text-white rounded overflow-auto"><code className="font-mono"># list containers
docker ps -a

# get logs
docker logs -f myapp

# exec into running container
docker exec -it myapp /bin/sh

# copy files out of container
docker cp myapp:/etc/hosts ./hosts

# inspect container
docker inspect myapp

# monitor resource usage
docker stats myapp</code></pre>
        </section>

        <section id="next">
          <h2>10) Next lesson</h2>
          <p>Lesson 4: Docker Architecture — we'll explore the daemon, client, registries and how they interact in more detail.</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Mark complete when you're done. Use keyboard shortcuts: <span className="font-mono">N</span>/<span className="font-mono">P</span>/<span className="font-mono">C</span>.</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? 'Completed' : 'Not completed'}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark as complete'}</button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-purple-600">{copied} copied to clipboard ✓</div>}
        </footer>
      </main>
    </div>
  );
}
