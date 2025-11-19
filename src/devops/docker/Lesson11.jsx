import React, { useEffect, useState, useRef } from "react";

// Lesson11.jsx — Multi-Container Apps (web + api + redis + db)
// Copy-paste ready React component (Tailwind CSS assumed)

export default function Lesson11({ lessonId = "lesson-11", onComplete, onNext, onPrev }) {
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

  useEffect(() => {
    let t;
    if (copied) t = setTimeout(() => setCopied(""), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label || "copied");
    } catch {
      setCopied("copy failed");
    }
  };

  const markComplete = () => {
    setCompleted(true);
    onComplete && onComplete(lessonId);
  };

  const autoNext = () => onNext && onNext();

  // Example project compose file for multi-container app
  const multiCompose = `version: '3.8'
services:
  web:
    build: ./web
    ports:
      - "8080:80"
    depends_on:
      - api
    environment:
      - API_URL=http://api:4000
    networks:
      - appnet
  api:
    build: ./api
    ports:
      - "4000:4000"
    environment:
      - REDIS_URL=redis:6379
      - DATABASE_URL=postgres://user:pass@db:5432/appdb
    depends_on:
      - db
      - redis
    networks:
      - appnet
  redis:
    image: redis:7-alpine
    networks:
      - appnet
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - dbdata:/var/lib/postgresql/data
    networks:
      - appnet
volumes:
  dbdata:
networks:
  appnet:
`;

  const webDockerfile = `# web/Dockerfile (simple nginx serving built static files)
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
`;

  const apiDockerfile = `# api/Dockerfile (simple Node/Express)
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
`;

  const runCommands = `# Start everything (build images)
docker compose up -d --build

# Check services
docker compose ps

# View logs (api)
docker compose logs -f api

# Stop & remove
docker compose down -v`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 11 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-pink-600">Overview</a></li>
              <li><a href="#structure" className="hover:text-pink-600">Project structure</a></li>
              <li><a href="#compose" className="hover:text-pink-600">Compose file</a></li>
              <li><a href="#dockerfiles" className="hover:text-pink-600">Dockerfiles</a></li>
              <li><a href="#run" className="hover:text-pink-600">Run & debug</a></li>
              <li><a href="#scaling" className="hover:text-pink-600">Scaling</a></li>
              <li><a href="#quiz" className="hover:text-pink-600">Quiz</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? 'bg-green-500 text-white' : 'bg-white border'}`}>
              {completed ? 'Completed ✓' : 'Mark complete'}
            </button>
            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-pink-600 text-white">Next</button>
              <button onClick={() => onPrev && onPrev()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      <main id="lesson-content" className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto" style={{ maxHeight: '75vh' }} ref={contentRef}>
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 11 — Multi-Container Apps (Compose practical)</h1>
          <p className="text-sm text-slate-600">Build a small multi-container app (web + api + redis + db) using Docker Compose and practice debugging and scaling.</p>
        </header>

        <section id="overview">
          <h2>Overview</h2>
          <p>This lesson shows a practical Compose app wiring a frontend (static), API server, Redis cache, and Postgres database.</p>
        </section>

        <section id="structure">
          <h2>Project structure</h2>
          <pre className="rounded bg-slate-100 p-3"><code className="font-mono">project/
  ├─ web/
  │   ├─ Dockerfile
  │   └─ src/
  ├─ api/
  │   ├─ Dockerfile
  │   └─ index.js
  ├─ docker-compose.yml
  └─ .env</code></pre>
          <p className="mt-2 text-sm text-slate-500">Each service has its own Dockerfile—keep responsibilities small and single-purpose.</p>
        </section>

        <section id="compose">
          <h2>Compose file</h2>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{multiCompose}</code></pre>
            <button onClick={() => handleCopy(multiCompose, 'multiCompose')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Note: depends_on waits for container start but not for service health. Use HEALTHCHECK + wait-for-it or scripts for robust readiness.</div>
        </section>

        <section id="dockerfiles">
          <h2>Dockerfiles (web & api examples)</h2>

          <h3 className="mt-2">web/Dockerfile</h3>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{webDockerfile}</code></pre>
            <button onClick={() => handleCopy(webDockerfile, 'webDockerfile')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <h3 className="mt-4">api/Dockerfile</h3>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{apiDockerfile}</code></pre>
            <button onClick={() => handleCopy(apiDockerfile, 'apiDockerfile')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="run">
          <h2>Run & debug</h2>
          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{runCommands}</code></pre>
            <button onClick={() => handleCopy(runCommands, 'runCommands')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <ul className="mt-3">
            <li>Use <code>docker compose logs -f api</code> to tail API logs.</li>
            <li>Exec into containers with <code>docker compose exec api /bin/sh</code>.</li>
            <li>Use <code>docker compose ps</code> to check status and ports.</li>
          </ul>
        </section>

        <section id="scaling">
          <h2>Scaling services</h2>
          <p>
            For local testing you can scale stateless services with Compose: <code>docker compose up -d --scale web=3</code>.
            Load balancing is handled by the host ports mapping (you'll need a reverse proxy or a random port mapping strategy to reach multiple instances).
          </p>

          <div className="mt-3 text-sm text-slate-500">In production, use orchestrators (Swarm/Kubernetes) for proper service discovery, load balancing, and rolling updates.</div>
        </section>

        <section id="quiz">
          <h2>Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>What does depends_on guarantee in Compose?</li>
            <li>How to persist Postgres data across restarts?</li>
            <li>How do you view logs for a single service?</li>
            <li>Why might you add HEALTHCHECK to services?</li>
          </ol>

          <button onClick={() => setShowAnswers(!showAnswers)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? 'Hide' : 'Show'} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>depends_on ensures start order but not readiness (use healthchecks for readiness).</li>
                <li>Use volumes: named volume mapped to /var/lib/postgresql/data (as in compose file).</li>
                <li>Use <code>docker compose logs -f &lt;service&gt;</code>.</li>
                <li>Healthchecks help orchestrators and dependents know when a service is ready and healthy; they make restarts and rolling updates safer.</li>
              </ol>
            </div>
          )}
        </section>

        <section id="exercises">
          <h2>Exercises</h2>
          <ol>
            <li>Implement the web & api Dockerfiles and run the compose stack locally.</li>
            <li>Add a HEALTHCHECK to the API and improve start-up script to wait for DB readiness.</li>
            <li>Scale the web service & test session affinity behavior (sticky sessions vs stateless design).</li>
            <li>Introduce a reverse proxy (nginx) service to route traffic to web instances and test configuration.</li>
          </ol>
        </section>

        <section id="next">
          <h2>Next lesson</h2>
          <p>Lesson 12 — Docker Registries (push, pull, private registries, tagging).</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? 'Completed' : 'Not completed'}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark complete'}</button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-pink-600">{copied} copied to clipboard ✓</div>}
        </footer>
      </main>
    </div>
  );
}
