import React, { useEffect, useState, useRef } from "react";

// Lesson4.jsx
// Copy-paste ready React component (Tailwind CSS assumed).
// Props expected (optional):
// - lessonId (string)
// - onComplete(lessonId)
// - onNext()
// - onPrev()

export default function Lesson4({ lessonId = "lesson-4", onComplete, onNext, onPrev }) {
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

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'N' || e.key === 'n') { if (onNext) onNext(); }
      if (e.key === 'P' || e.key === 'p') { if (onPrev) onPrev(); }
      if (e.key === 'C' || e.key === 'c') { markComplete(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onNext, onPrev]);

  useEffect(() => { let t; if (copied) t = setTimeout(() => setCopied(""), 2000); return () => clearTimeout(t); }, [copied]);

  const handleCopy = async (text, label) => {
    try { await navigator.clipboard.writeText(text); setCopied(label || 'copied'); }
    catch (e) { console.warn('copy failed', e); setCopied('copy failed'); }
  };

  const markComplete = () => { setCompleted(true); if (onComplete) onComplete(lessonId); };
  const autoNext = () => { if (onNext) onNext(); };

  const cmds = `# docker info
# docker version
# check daemon logs (systemd)
sudo journalctl -fu docker.service

# inspect low-level runtimes
docker info --format '{{json .}}'`;

  const registryFlow = `# pull example
docker pull busybox:latest

# tag and push
docker tag busybox:latest youruser/busybox:demo
docker push youruser/busybox:demo`;

  const dockerdConf = `# daemon.json example
{
  "experimental": false,
  "insecure-registries": ["my-registry.local:5000"],
  "storage-driver": "overlay2"
}`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 4 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-rose-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav aria-label="Table of contents" className="bg-white/80 p-3 rounded shadow-sm">
            <ul className="space-y-2 text-sm">
              <li><a className="block hover:text-indigo-600" href="#overview">Overview</a></li>
              <li><a className="block hover:text-indigo-600" href="#components">Key components</a></li>
              <li><a className="block hover:text-indigo-600" href="#daemon">Docker daemon & containerd</a></li>
              <li><a className="block hover:text-indigo-600" href="#runtimes">Runtimes: runc & shims</a></li>
              <li><a className="block hover:text-indigo-600" href="#registry">Registry & image distribution</a></li>
              <li><a className="block hover:text-indigo-600" href="#storage">Storage drivers & overlay</a></li>
              <li><a className="block hover:text-indigo-600" href="#commands">Useful commands</a></li>
              <li><a className="block hover:text-indigo-600" href="#quiz">Quiz & exercises</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? 'bg-green-500 text-white' : 'bg-white border'}`}>
              {completed ? 'Completed ✓' : 'Mark as complete'}
            </button>
            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-indigo-600 text-white">Next</button>
              <button onClick={() => onPrev && onPrev()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Quick: Docker client & daemon, containerd, runtimes, registries — understand how these pieces fit together.</div>
        </div>
      </aside>

      <main id="lesson-content" className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto" style={{ maxHeight: '75vh' }} ref={contentRef}>
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 4 — Docker Architecture</h1>
          <p className="text-sm text-slate-600">Deep dive into Docker's internals: the client, daemon, containerd, runtimes, registries, and storage drivers.</p>
        </header>

        <section id="overview">
          <h2>Overview</h2>
          <p>
            Docker is a layered system. The visible CLI talks to a daemon which orchestrates image & container lifecycle. Under the hood there are components like <strong>containerd</strong> (manages images & containers) and low-level runtimes like <strong>runc</strong> that create the actual container process using OCI specs.
          </p>

          <h3 className="mt-3">High-level flow</h3>
          <svg viewBox="0 0 860 220" className="w-full h-48 border rounded">
            <g>
              <rect x="24" y="20" width="270" height="48" rx="8" fill="#f8fafc" stroke="#cfe3ff" />
              <text x="54" y="50" fontSize="12" fontWeight="600">Docker CLI (client)</text>

              <path d="M294 44 H356" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

              <rect x="356" y="8" width="220" height="84" rx="8" fill="#fff7ed" stroke="#ffd6a5" />
              <text x="386" y="34" fontSize="12" fontWeight="600">Docker Daemon (dockerd)</text>
              <text x="386" y="52" fontSize="11">exposes REST API / socket</text>

              <path d="M576 52 H640" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

              <rect x="640" y="20" width="200" height="48" rx="8" fill="#eef2ff" stroke="#c7d2fe" />
              <text x="670" y="50" fontSize="12" fontWeight="600">containerd → runc</text>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#94a3b8" /></marker>
              </defs>

              {/* Registry */}
              <rect x="48" y="140" width="200" height="56" rx="8" fill="#ecfdf5" stroke="#bbf7d0" />
              <text x="78" y="168" fontSize="12" fontWeight="600">Registry (Docker Hub / Private)</text>

              <path d="M150 112 V140" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
              <path d="M760 112 V140" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

              <text x="320" y="170" fontSize="11" fill="#374151">Images are pulled/pushed via the daemon to registries</text>
            </g>
          </svg>
        </section>

        <section id="components">
          <h2>Key components</h2>
          <ul>
            <li><strong>Docker CLI:</strong> User-facing command line that sends requests to the daemon.</li>
            <li><strong>Docker Daemon (dockerd):</strong> Long-running service managing images, containers, networks, and storage.</li>
            <li><strong>containerd:</strong> A daemon originally inside Docker, now a CNCF project; handles image transfer & storage, container lifecycle.</li>
            <li><strong>runc:</strong> Low-level runtime that creates containers according to the OCI runtime spec.</li>
            <li><strong>Registries:</strong> Store and distribute images (Docker Hub, private registries, registry v2 API).</li>
            <li><strong>Storage drivers:</strong> overlay2, aufs, btrfs — implement layered filesystems.</li>
          </ul>
        </section>

        <section id="daemon">
          <h2>Docker daemon & containerd</h2>
          <p>
            `dockerd` is the main control plane. It exposes an API (unix socket / TCP) the CLI talks to. Modern Docker uses <code>containerd</code> for the heavy lifting of storing images, pulling blobs, and managing containers. containerd in turn uses runtimes (like runc) to spawn container processes.
          </p>

          <div className="mt-3 bg-slate-50 p-3 rounded border">
            <strong>Why this split?</strong>
            <p className="text-sm text-slate-600">Splitting responsibilities makes components smaller and reusable (containerd is used by other platforms too). Docker focuses on developer UX and higher-level features.</p>
          </div>

          <h3 className="mt-3">Daemon configuration</h3>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{dockerdConf}</code></pre>
            <div className="absolute right-2 top-2"><button onClick={() => handleCopy(dockerdConf, 'daemon.json')} className="text-xs px-2 py-1 bg-white border rounded">Copy</button></div>
          </div>
        </section>

        <section id="runtimes">
          <h2>Runtimes: runc & shims</h2>
          <p>
            Runtimes implement the OCI runtime spec: they create namespaces, set up cgroups, and exec the container process. `runc` is the default low-level runtime. The shim (containerd-shim) keeps container stdio open and manages lifecycle independent of containerd or dockerd restarts.
          </p>

          <div className="mt-3 bg-slate-50 p-3 rounded border">
            <strong>Container lifecycle internals (simplified):</strong>
            <ol className="list-decimal pl-6 mt-2">
              <li>User runs <code>docker run</code> → CLI sends request to dockerd.</li>
              <li>dockerd asks containerd to create the container and pull image layers if required.</li>
              <li>containerd uses runc (via shim) to create the process with namespaces & cgroups.</li>
              <li>shim keeps process alive and reports status back.</li>
            </ol>
          </div>
        </section>

        <section id="registry">
          <h2>Registry & image distribution</h2>
          <p>
            Registries store images as content-addressable blobs. An image manifest lists layers (blobs) and metadata. When pulling, clients download blobs and reconstruct the image locally. Pushing uploads blobs and manifests to the registry.
          </p>

          <div className="mt-3">
            <h3 className="font-semibold">Commands: pull, tag, push</h3>
            <pre className="p-2 bg-slate-100 rounded"><code className="font-mono">{registryFlow}</code></pre>
            <div className="mt-2">
              <button onClick={() => handleCopy(registryFlow, 'registryFlow')} className="px-3 py-2 bg-white border rounded">Copy</button>
            </div>
          </div>

          <div className="mt-3 bg-slate-50 p-3 rounded border text-sm">
            <strong>Note:</strong> Use digests (sha256:...) for immutable references in production. Tag names are mutable.
          </div>
        </section>

        <section id="storage">
          <h2>Storage drivers & overlay</h2>
          <p>
            Storage drivers implement union filesystems for layers. <code>overlay2</code> is the modern default on many Linux distros. Drivers impact performance and disk usage. You can check your driver with <code>docker info</code>.
          </p>

          <div className="mt-3 bg-slate-50 p-3 rounded border">
            <strong>Inspect storage</strong>
            <pre className="p-2"><code className="font-mono">docker info --format '{{Driver}}'  # shows storage driver

df -h  # check disk usage on the host</code></pre>
          </div>

          <p className="mt-2 text-sm text-slate-500">Tip: If overlay2 isn't available, Docker may fall back to other drivers — check compatibility with your kernel and distro.</p>
        </section>

        <section id="commands">
          <h2>Useful commands & diagnostics</h2>
          <div className="mt-2 bg-white border rounded p-3">
            <pre className="p-2 bg-slate-900 text-white rounded overflow-auto"><code className="font-mono">{cmds}</code></pre>
          </div>

          <div className="mt-3">
            <button onClick={() => handleCopy(cmds, 'diagnostics')} className="px-3 py-2 bg-white border rounded">Copy diagnostics commands</button>
          </div>
        </section>

        <section id="security-arch">
          <h2>Security & isolation considerations</h2>
          <ul>
            <li>Since containers share the kernel, kernel vulnerabilities can affect all containers; keep the host and kernel patched.</li>
            <li>Use user namespaces to map container root to an unprivileged host user where possible.</li>
            <li>Limit capabilities and use seccomp/AppArmor profiles for tighter sandboxing.</li>
          </ul>
        </section>

        <section id="quiz">
          <h2>Mini Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>What component is responsible for pulling blobs and storing images locally?</li>
            <li>Why is containerd used instead of dockerd doing everything?</li>
            <li>What is runc's role?</li>
            <li>Why use digests instead of tags in production?</li>
          </ol>

          <button onClick={() => setShowAnswers(s => !s)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? 'Hide' : 'Show'} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li><strong>containerd</strong> manages pulling & storing image blobs and orchestrating container lifecycle at a lower level.</li>
                <li>Separation of concerns: containerd is a focused runtime & image manager used by many systems; dockerd provides higher-level features and UX.</li>
                <li>runc creates the container process using OCI runtime spec — sets namespaces & cgroups and executes the container process.</li>
                <li>Digests are immutable content-addressable references; tags are mutable and can be moved to point to different images.</li>
              </ol>
            </div>
          )}
        </section>

        <section id="exercises">
          <h2>Exercises</h2>
          <ol>
            <li>Run <code>docker info</code> and identify your storage driver and cgroup version.</li>
            <li>Inspect <code>containerd</code> processes on your system (<code>ps aux | grep containerd</code>) and observe shims for running containers.</li>
            <li>Push an image to Docker Hub (or a private registry) and inspect the manifest via the registry HTTP API (curl).</li>
            <li>Experiment with <code>daemon.json</code> to add an insecure registry (local dev environment) and restart the daemon.</li>
          </ol>
        </section>

        <section id="next">
          <h2>Next lesson</h2>
          <p>Lesson 5: Dockerfile Basics — practical Dockerfile instructions & building images step-by-step.</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Mark complete when you're ready. Keyboard: N/P/C.</div>
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
