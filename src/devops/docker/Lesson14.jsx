import React, { useEffect, useState, useRef } from "react";

// Lesson14.jsx — Optimizing Images (multi-stage, slimming, cache, tools)
// Copy-paste ready React component (Tailwind assumed)

export default function Lesson14({ lessonId = "lesson-14", onComplete, onNext, onPrev }) {
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
      setProgress(total <= 0 ? 100 : Math.round((scrolled / total) * 100));
    };
    if (el) el.addEventListener("scroll", handler);
    handler();
    return () => el && el.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "N" || e.key === "n") onNext && onNext();
      if (e.key === "P" || e.key === "p") onPrev && onPrev();
      if (e.key === "C" || e.key === "c") markComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  useEffect(() => { let t; if (copied) t = setTimeout(() => setCopied(""), 2000); return () => clearTimeout(t); }, [copied]);

  const handleCopy = async (text, label) => {
    try { await navigator.clipboard.writeText(text); setCopied(label || 'copied'); }
    catch { setCopied('copy failed'); }
  };

  const markComplete = () => { setCompleted(true); onComplete && onComplete(lessonId); };
  const autoNext = () => onNext && onNext();

  // Code examples
  const multiStageExample = `# Multi-stage for Go\nFROM golang:1.20-alpine AS build\nWORKDIR /src\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /out/app ./...\n\nFROM scratch\nCOPY --from=build /out/app /app\nEXPOSE 8080\nENTRYPOINT ["/app"]`;

  const slimNode = `# Slim Node example\nFROM node:18-alpine AS deps\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci --production\n\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\nCMD ["node","server.js"]`;

  const removeCaches = `# apt cleanup pattern (Debian/Ubuntu)\nRUN apt-get update && apt-get install -y build-essential \
  && rm -rf /var/lib/apt/lists/*`;

  const analyzeCmds = `# layered size analysis\ndocker build -t myapp:opt .\ndocker image history --no-trunc myapp:opt\ndive myapp:opt  # using dive tool`;

  const builderCache = `# Buildkit cache examples\nDOCKER_BUILDKIT=1 docker build --secret id=npm,src=/root/.npmrc --cache-to type=local,dest=/tmp/.buildcache --cache-from type=local,src=/tmp/.buildcache -t myapp:bk .`;

  const trivyScan = `# Scan images with Trivy\ntrivy image --severity HIGH,CRITICAL myapp:opt`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 14 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#goals" className="hover:text-blue-600">Goals</a></li>
              <li><a href="#multi-stage" className="hover:text-blue-600">Multi-stage builds</a></li>
              <li><a href="#small-base" className="hover:text-blue-600">Small base images</a></li>
              <li><a href="#cache" className="hover:text-blue-600">Caching strategies</a></li>
              <li><a href="#analyze" className="hover:text-blue-600">Analyze image size</a></li>
              <li><a href="#security" className="hover:text-blue-600">Security & scanning</a></li>
              <li><a href="#quiz" className="hover:text-blue-600">Quiz & exercises</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? 'bg-green-500 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark complete'}</button>
            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-blue-600 text-white">Next</button>
              <button onClick={() => onPrev && onPrev()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      <main id="lesson-content" className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto" style={{ maxHeight: '75vh' }} ref={contentRef}>
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 14 — Optimizing Docker Images</h1>
          <p className="text-sm text-slate-600">Techniques to reduce image size, speed builds, and keep images production-ready.</p>
        </header>

        <section id="goals">
          <h2>Learning goals</h2>
          <ul>
            <li>Understand multi-stage builds and why they shrink images.</li>
            <li>Pick small base images and trade-offs (alpine vs debian).</li>
            <li>Use build cache & BuildKit effectively.</li>
            <li>Analyze and trim large layers.</li>
            <li>Scan images and keep supply-chain hygiene.</li>
          </ul>
        </section>

        <section id="multi-stage">
          <h2>1) Multi-stage builds</h2>
          <p>Use a builder stage to compile artifacts and then copy only outputs to a slim runtime image.</p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{multiStageExample}</code></pre>
            <button onClick={() => handleCopy(multiStageExample, 'multiStageExample')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Multi-stage lets you install heavy build deps only in the build stage; final image contains only runtime binary.</div>
        </section>

        <section id="small-base">
          <h2>2) Small base images</h2>
          <p>
            Alpine, scratch, and distroless images are popular for smaller sizes. Alpine includes musl and BusyBox which may have compatibility differences; distroless has minimal userland and requires static binaries or specific runtime dependencies.
          </p>

          <div className="mt-3 bg-slate-50 p-3 rounded border text-sm">
            <strong>Tip:</strong> Measure before switching — some language ecosystems perform worse on musl (Alpine) and the final size gains may be small if you need many runtime dependencies.
          </div>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{slimNode}</code></pre>
            <button onClick={() => handleCopy(slimNode, 'slimNode')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="cache">
          <h2>3) Caching strategies & BuildKit</h2>
          <p>
            Order Dockerfile instructions to make the most of cache (copy package manifest first). Enable BuildKit for parallelism, better cache control, and secret handling.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{builderCache}</code></pre>
            <button onClick={() => handleCopy(builderCache, 'builderCache')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Use remote cache (registry or cache-to) in CI to speed repeated builds.</div>
        </section>

        <section id="analyze">
          <h2>4) Analyze image size</h2>
          <p>Tools: <code>dive</code> to inspect layers, <code>docker history</code> to view layer sizes, and <code>docker image inspect</code> for metadata.</p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{analyzeCmds}</code></pre>
            <button onClick={() => handleCopy(analyzeCmds, 'analyzeCmds')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 bg-slate-50 p-3 rounded border text-sm">Look for large layers (node_modules, apt caches, build artifacts) and move or cleanup their creation to earlier RUN steps or remove caches within same RUN.</div>
        </section>

        <section id="security">
          <h2>5) Security & scanning</h2>
          <p>Scan images with tools like Trivy and fail CI when critical vulnerabilities are found. Keep base images updated and use minimal runtimes.</p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{trivyScan}</code></pre>
            <button onClick={() => handleCopy(trivyScan, 'trivyScan')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Combine scanning with SBOM generation for improved supply chain traceability.</div>
        </section>

        <section id="quiz">
          <h2>Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>Why use multi-stage builds?</li>
            <li>What are trade-offs of Alpine vs Debian base images?</li>
            <li>How does BuildKit improve builds?</li>
            <li>Which files commonly bloat images?</li>
          </ol>

          <button onClick={() => setShowAnswers(!showAnswers)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? 'Hide' : 'Show'} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>To separate build dependencies from runtime artifacts — final image contains only what is needed to run the app.</li>
                <li>Alpine is smaller but uses musl — possible compatibility issues; Debian is larger but more compatible and predictable.</li>
                <li>BuildKit provides parallelism, better cache control, secret management and advanced caching options like cache-to/cache-from.</li>
                <li>node_modules, package manager caches, build toolchains, large binaries, and logs.</li>
              </ol>
            </div>
          )}
        </section>

        <section id="exercises">
          <h2>Exercises</h2>
          <ol>
            <li>Convert a simple Node app into a multi-stage Dockerfile and compare image sizes before/after.</li>
            <li>Use dive to inspect a large image and identify top 3 largest layers.</li>
            <li>Enable BuildKit in CI and use cache-to to speed subsequent builds.</li>
            <li>Scan your optimized image with Trivy and iterate to remove critical vulnerabilities.</li>
          </ol>
        </section>

        <section id="next">
          <h2>Next lesson</h2>
          <p>Lesson 15 — Docker Networking Advanced: custom drivers, overlay networks deeper, DNS controls and advanced troubleshooting.</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? 'Completed' : 'Not completed'}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark as complete'}</button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-blue-600">{copied} copied to clipboard ✓</div>}
        </footer>
      </main>
    </div>
  );
}
