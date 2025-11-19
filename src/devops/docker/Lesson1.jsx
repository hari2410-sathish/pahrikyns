import React, { useEffect, useState, useRef } from "react";

// Lesson1.jsx
// Copy-paste ready React component (Tailwind CSS assumed).
// Exports a default React component that fits into the LessonPage.jsx system.
// Props expected (optional):
// - lessonId (string) // used by completion system
// - onComplete(lessonId) // callback when marked complete
// - onNext() // callback to auto-next

export default function Lesson1({ lessonId = "lesson-1", onComplete, onNext }) {
  const [completed, setCompleted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const tocRef = useRef(null);

  useEffect(() => {
    // Simulate progress based on scroll inside the lesson content
    const handler = () => {
      const el = document.getElementById("lesson-content");
      if (!el) return;
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = Math.min(Math.max(el.scrollTop, 0), total);
      const pct = total <= 0 ? 100 : Math.round((scrolled / total) * 100);
      setProgress(pct);
    };
    const el = document.getElementById("lesson-content");
    if (el) el.addEventListener("scroll", handler);
    handler();
    return () => { if (el) el.removeEventListener("scroll", handler); };
  }, []);

  useEffect(() => {
    let t;
    if (copied) {
      t = setTimeout(() => setCopied(""), 2000);
    }
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label || "copied");
    } catch (e) {
      console.warn("copy failed", e);
      setCopied("copy failed");
    }
  };

  const markComplete = () => {
    setCompleted(true);
    if (onComplete) onComplete(lessonId);
  };

  const autoNext = () => {
    if (onNext) onNext();
  };

  // Sample Node app + Dockerfile strings
  const nodeApp = `// app.js\nconst http = require('http');\nconst port = process.env.PORT || 3000;\nconst server = http.createServer((req, res) => {\n  res.end('Hello from Dockerized Node!');\n});\nserver.listen(port);\n`;
  const packageJson = `{\n  "name": "myapp",\n  "version": "1.0.0",\n  "main": "app.js",\n  "scripts": { "start": "node app.js" }\n}`;
  const dockerfile = `# 1. base image\nFROM node:18-alpine\n\n# 2. set working dir\nWORKDIR /usr/src/app\n\n# 3. copy package files & install deps\nCOPY package.json ./\nRUN npm install --production\n\n# 4. copy app source\nCOPY . .\n\n# 5. expose port\nEXPOSE 3000\n\n# 6. default command\nCMD ["node", "app.js"]\n`;

  // Short cheat sheet as array for rendering
  const cheat = [
    ["List images", "docker images"],
    ["List running containers", "docker ps"],
    ["Build image", "docker build -t myapp:1.0 ."],
    ["Run container detached", "docker run -d --name myapp -p 3000:3000 myapp:1.0"],
    ["Remove container", "docker rm <container>"],
    ["Inspect container", "docker inspect <container>"],
    ["Logs", "docker logs -f <container>"],
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      {/* Sidebar / TOC */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 1 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-pink-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav ref={tocRef} aria-label="Table of contents" className="bg-white/80 p-3 rounded shadow-sm">
            <ul className="space-y-2 text-sm">
              <li><a className="block hover:text-indigo-600" href="#goals">Learning goals</a></li>
              <li><a className="block hover:text-indigo-600" href="#what-is-docker">What is Docker</a></li>
              <li><a className="block hover:text-indigo-600" href="#vm-vs-container">Containers vs VMs</a></li>
              <li><a className="block hover:text-indigo-600" href="#architecture">Architecture</a></li>
              <li><a className="block hover:text-indigo-600" href="#quick-commands">Quick commands</a></li>
              <li><a className="block hover:text-indigo-600" href="#practical">First practical</a></li>
              <li><a className="block hover:text-indigo-600" href="#dockerfile">Dockerfile walkthrough</a></li>
              <li><a className="block hover:text-indigo-600" href="#quiz">Mini quiz</a></li>
              <li><a className="block hover:text-indigo-600" href="#exercises">Exercises</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? 'bg-green-500 text-white' : 'bg-white border'}`}>
              {completed ? 'Completed ✓' : 'Mark as complete'}
            </button>
            <button onClick={autoNext} className="px-3 py-2 rounded bg-indigo-600 text-white">Next</button>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            Tip: Use the copy buttons next to code blocks to paste commands quickly into your terminal.
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main id="lesson-content" className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto" style={{ maxHeight: '75vh' }}>
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 1 — Introduction to Docker</h1>
          <p className="text-sm text-slate-600">What Docker is, why use it, containers vs VMs, architecture, first docker commands, and a first practical example.</p>
        </header>

        <section id="goals">
          <h2>Learning goals</h2>
          <ul>
            <li>Understand what Docker does and why it's useful.</li>
            <li>Explain the difference between containers and VMs.</li>
            <li>Run your first container and build a simple Docker image.</li>
            <li>Be comfortable with core Docker commands.</li>
          </ul>
        </section>

        <section id="what-is-docker">
          <h2>1) What is Docker?</h2>
          <p>
            Docker is a platform to <strong>build, ship, and run</strong> applications inside <em>containers</em> — lightweight,
            portable runtime environments that bundle the app and its dependencies. Containers share the host kernel but are
            isolated at the process and filesystem level.
          </p>
          <p className="bg-slate-50 p-3 rounded border text-sm">One-line: Docker packages applications and their dependencies into images that run the same anywhere.</p>
        </section>

        <section id="vm-vs-container">
          <h2>2) Containers vs Virtual Machines (VMs)</h2>
          <p>Key differences — containers are lighter and share the host OS kernel; VMs carry a full guest OS.</p>

          {/* 2D ASCII-style diagram as SVG for crisp rendering */}
          <div className="mt-4">
            <h3 className="text-base font-semibold">2D Diagram (host, hypervisor, containers)</h3>
            <svg viewBox="0 0 800 220" className="w-full h-56 border rounded">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="780" height="200" rx="8" fill="#f8fafc" stroke="#e6eef8" />

              {/* Host OS */}
              <g>
                <text x="30" y="40" fontSize="14" fontWeight="600">Host OS</text>
                <rect x="30" y="45" width="720" height="60" rx="6" fill="#ffffff" stroke="#cfe3ff" />
              </g>

              {/* Hypervisor / VMs */}
              <g>
                <text x="50" y="95" fontSize="12">Hypervisor → VMs</text>
                <rect x="60" y="100" width="200" height="80" rx="6" fill="#fff7ed" stroke="#ffd6a5" />
                <text x="85" y="130" fontSize="11">VM: Guest OS + apps</text>

                <rect x="280" y="100" width="200" height="80" rx="6" fill="#fff7ed" stroke="#ffd6a5" />
                <text x="315" y="130" fontSize="11">VM: Guest OS + apps</text>
              </g>

              {/* Docker Engine / Containers */}
              <g>
                <text x="520" y="95" fontSize="12">Docker Engine → Containers</text>
                <rect x="520" y="100" width="220" height="80" rx="6" fill="#eef2ff" stroke="#c7d2fe" />
                <rect x="540" y="110" width="80" height="25" rx="4" fill="url(#g1)" />
                <text x="550" y="127" fontSize="11" fill="#fff">Container: app + libs</text>

                <rect x="640" y="110" width="80" height="25" rx="4" fill="url(#g1)" />
                <text x="650" y="127" fontSize="11" fill="#fff">Container: app + libs</text>
              </g>

            </svg>
          </div>

          {/* 3D diagram using CSS transforms */}
          <div className="mt-6">
            <h3 className="text-base font-semibold">3D Conceptual Diagram (interactive)</h3>
            <div className="w-full h-48 perspective-800 mt-2 flex items-center justify-center">
              <div className="relative w-48 h-32" style={{ transformStyle: 'preserve-3d' }}>
                {/* We'll create a simple rotating 3D cube made of divs */}
                <div className="cube mx-auto" style={{ transformStyle: 'preserve-3d' }}>
                  {/* faces */}
                  <div className="cube-face front p-2 text-xs">Docker Engine</div>
                  <div className="cube-face back p-2 text-xs">Images (layers)</div>
                  <div className="cube-face right p-2 text-xs">Containers</div>
                  <div className="cube-face left p-2 text-xs">Registry</div>
                  <div className="cube-face top p-2 text-xs">Host Kernel</div>
                  <div className="cube-face bottom p-2 text-xs">Storage</div>
                </div>
              </div>
            </div>
            <style>{`
              .perspective-800 { perspective: 800px; }
              .cube { width: 120px; height: 80px; position: relative; transform: rotateX(-20deg) rotateY(25deg); animation: cube-rotate 8s linear infinite; }
              .cube-face { position: absolute; width: 120px; height: 80px; display:flex; align-items:center; justify-content:center; background: rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.25); border-radius:6px; }
              .cube-face.front  { transform: translateZ(60px); }
              .cube-face.back   { transform: rotateY(180deg) translateZ(60px); }
              .cube-face.right  { transform: rotateY(90deg) translateZ(60px); }
              .cube-face.left   { transform: rotateY(-90deg) translateZ(60px); }
              .cube-face.top    { transform: rotateX(90deg) translateZ(40px); }
              .cube-face.bottom { transform: rotateX(-90deg) translateZ(40px); }
              @keyframes cube-rotate { from { transform: rotateX(-20deg) rotateY(0deg); } to { transform: rotateX(-20deg) rotateY(360deg); } }
            `}</style>
          </div>

        </section>

        <section id="architecture">
          <h2>3) Docker architecture (short)</h2>
          <p>
            Docker consists of the Docker client (CLI), Docker daemon (dockerd - the engine), images (read-only layered
            templates), containers (runtime instances), and registries (push/pull images). The client talks to the daemon
            using a REST API or socket.
          </p>

          <div className="mt-3 bg-slate-50 p-3 rounded border">
            <strong>Flow:</strong>
            <div className="mt-2 font-mono text-sm">Dockerfile --&gt; <span className="text-indigo-600">docker build</span> --&gt; Image --&gt; <span className="text-indigo-600">docker run</span> --&gt; Container</div>
          </div>
        </section>

        <section id="quick-commands">
          <h2>4) Install & verify (quick)</h2>
          <p>If Docker is installed, run:</p>
          <pre className="rounded bg-slate-900 text-white p-3"><code>docker version
docker info
docker run --rm hello-world</code></pre>

          <h3 className="mt-4">Quick cheat sheet</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {cheat.map(([label, cmd], i) => (
              <div key={i} className="flex items-center justify-between bg-white border rounded p-2">
                <div className="text-sm font-medium">{label}</div>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono">{cmd}</code>
                  <button onClick={() => handleCopy(cmd, label)} className="text-xs px-2 py-1 border rounded">Copy</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-slate-500 mt-2">Tip: Use <code>docker ps -a</code> to see stopped containers too.</div>
        </section>

        <section id="practical">
          <h2>5) First practical — run nginx quickly</h2>
          <ol>
            <li><code>docker pull nginx</code></li>
            <li><code>docker run -d --name web -p 8080:80 nginx</code></li>
            <li>Open <code>http://localhost:8080</code> — you should see the Nginx welcome page.</li>
            <li>Cleanup: <code>docker stop web && docker rm web</code></li>
          </ol>
        </section>

        <section id="dockerfile">
          <h2>6) Build your first image using Dockerfile (simple Node app)</h2>
          <p>Project structure:</p>
          <pre className="rounded bg-slate-50 p-3 overflow-auto"><code className="font-mono">myapp/
  ├─ app.js
  ├─ package.json
  └─ Dockerfile</code></pre>

          <div className="mt-3">
            <h3 className="text-sm font-semibold">app.js</h3>
            <div className="relative">
              <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{nodeApp}</code></pre>
              <div className="absolute right-2 top-2">
                <button onClick={() => handleCopy(nodeApp, 'nodeApp')} className="text-xs px-2 py-1 bg-white border rounded">Copy</button>
              </div>
            </div>

            <h3 className="text-sm font-semibold mt-3">package.json</h3>
            <div className="relative">
              <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{packageJson}</code></pre>
              <div className="absolute right-2 top-2">
                <button onClick={() => handleCopy(packageJson, 'packageJson')} className="text-xs px-2 py-1 bg-white border rounded">Copy</button>
              </div>
            </div>

            <h3 className="text-sm font-semibold mt-3">Dockerfile</h3>
            <div className="relative">
              <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{dockerfile}</code></pre>
              <div className="absolute right-2 top-2">
                <button onClick={() => handleCopy(dockerfile, 'dockerfile')} className="text-xs px-2 py-1 bg-white border rounded">Copy</button>
              </div>
            </div>

            <div className="mt-3 bg-slate-50 p-3 rounded border">
              <h4 className="font-semibold">Build & run</h4>
              <pre className="p-2"><code className="font-mono">docker build -t myapp:1.0 .
docker run -d --name myapp -p 3000:3000 myapp:1.0
curl http://localhost:3000</code></pre>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            <strong>Anatomy:</strong> FROM, WORKDIR, COPY, RUN, EXPOSE, CMD. Each RUN creates a layer; cache is used between builds.
          </div>
        </section>

        <section id="best-practices">
          <h2>7) Best practices (short)</h2>
          <ul>
            <li>Use small base images (alpine) when possible.</li>
            <li>Pin image versions (e.g., node:18-alpine).</li>
            <li>Use <code>.dockerignore</code> to reduce build context size.</li>
            <li>Combine RUN statements to reduce image layers where it makes sense.</li>
            <li>Run as non-root user inside the image for production containers.</li>
          </ul>
        </section>

        <section id="quiz">
          <h2>8) Mini Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>What's the difference between <code>CMD</code> and <code>ENTRYPOINT</code>?</li>
            <li>How do you persist data across container restarts?</li>
            <li>Which command lists running containers?</li>
            <li>Why is build order important in a Dockerfile?</li>
          </ol>

          <button onClick={() => setShowAnswers(s => !s)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? 'Hide' : 'Show'} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li><strong>CMD</strong> provides default args; <strong>ENTRYPOINT</strong> sets the executable. When both are used, CMD becomes the default args for ENTRYPOINT.</li>
                <li>Use volumes (named volumes or bind mounts) to persist data beyond container lifecycle.</li>
                <li><code>docker ps</code></li>
                <li>Each instruction creates an image layer; proper ordering maximizes cache reuse and speeds up incremental builds.</li>
              </ol>
            </div>
          )}
        </section>

        <section id="exercises">
          <h2>9) Practice Exercises</h2>
          <ol>
            <li>Run <code>docker run --rm hello-world</code> and verify output.</li>
            <li>Pull <code>python:3.11-slim</code> and open an interactive shell: <code>docker run -it --rm python:3.11-slim bash</code>.</li>
            <li>Create the Node app above, build and run it locally.</li>
            <li>Create a named volume and mount it. Write a file in the container, remove the container, then re-run and verify the file persists.</li>
            <li>Create a user-defined network and run two containers that can communicate by container name.</li>
          </ol>
        </section>

        <section id="cheatsheet">
          <h2>10) Cheatsheet</h2>
          <pre className="p-3 bg-slate-900 text-white rounded overflow-auto"><code className="font-mono">{`# list images
docker images

# list running containers
docker ps

# build image
docker build -t myapp:1.0 .

# run container
docker run -d --name myapp -p 3000:3000 myapp:1.0

# stop & remove container
docker stop myapp && docker rm myapp

# remove image
docker rmi myapp:1.0

# inspect container
docker inspect myapp

# logs
docker logs -f myapp`}</code></pre>
        </section>

        <section id="next">
          <h2>11) Next lesson teaser</h2>
          <p>Lesson 2: Dockerfile Deep Dive & Image Layering — we'll analyze cache behavior, multi-stage builds, and techniques to make smaller images.</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Ready? Mark complete when you're done.</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? 'Completed' : 'Not completed'}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark as complete'}</button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-indigo-600">{copied} copied to clipboard ✓</div>}
        </footer>

      </main>
    </div>
  );
}
