import React, { useEffect, useState, useRef } from "react";

// Lesson10.jsx — Docker Compose Intro
// Copy-paste ready React component (Tailwind CSS assumed)

export default function Lesson10({ lessonId = "lesson-10", onComplete, onNext, onPrev }) {
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

  // Examples and snippets
  const composeYml = `version: '3.8'
services:
  web:
    build: ./web
    ports:
      - "8080:80"
    depends_on:
      - api
    networks:
      - appnet
  api:
    build: ./api
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/appdb
    networks:
      - appnet
  db:
    image: postgres:15
    volumes:
      - dbdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret
volumes:
  dbdata:
networks:
  appnet:
`;

  const composeCommands = `# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop and remove
docker compose down

# Recreate a single service
docker compose up -d --no-deps --build web`;

  const overrideExample = `# docker-compose.override.yml example
services:
  web:
    environment:
      - DEBUG=1
    volumes:
      - ./web:/usr/share/nginx/html
`;

  const envFileExample = `# .env
DATABASE_URL=postgres://user:pass@db:5432/appdb
POSTGRES_PASSWORD=secret
`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 10 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-sky-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#goals" className="hover:text-indigo-600">Learning goals</a></li>
              <li><a href="#why" className="hover:text-indigo-600">Why Compose?</a></li>
              <li><a href="#file" className="hover:text-indigo-600">compose.yml structure</a></li>
              <li><a href="#commands" className="hover:text-indigo-600">Commands</a></li>
              <li><a href="#env" className="hover:text-indigo-600">.env & override</a></li>
              <li><a href="#examples" className="hover:text-indigo-600">Example project</a></li>
              <li><a href="#quiz" className="hover:text-indigo-600">Quiz & exercises</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? 'bg-green-500 text-white' : 'bg-white border'}`}>
              {completed ? 'Completed ✓' : 'Mark complete'}
            </button>
            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-indigo-600 text-white">Next</button>
              <button onClick={() => onPrev && onPrev()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      <main id="lesson-content" className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto" style={{ maxHeight: '75vh' }} ref={contentRef}>
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 10 — Docker Compose Intro</h1>
          <p className="text-sm text-slate-600">Define multi-container applications with YAML, orchestrate with Docker Compose, and speed up local development.</p>
        </header>

        <section id="goals">
          <h2>Learning goals</h2>
          <ul>
            <li>Understand why Compose is useful for multi-container apps.</li>
            <li>Write a compose YAML and start services locally.</li>
            <li>Use env files, overrides, and common commands.</li>
            <li>Debug and scale services locally.</li>
          </ul>
        </section>

        <section id="why">
          <h2>Why Docker Compose?</h2>
          <p>
            Compose lets you declare multiple services, networks, and volumes in a single YAML file. It makes local development
            and testing of multi-container apps easy: one command brings the whole app up, logs are centralized, and settings can be overridden per environment.
          </p>
        </section>

        <section id="file">
          <h2>Compose file structure (docker-compose.yml)</h2>
          <p>
            Top-level keys: <code>version</code> (optional for newer Compose), <code>services</code>, <code>volumes</code>, <code>networks</code>.
            Each service can have <code>build</code> or <code>image</code>, <code>ports</code>, <code>volumes</code>, <code>environment</code>, and <code>depends_on</code>.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{composeYml}</code></pre>
            <button onClick={() => handleCopy(composeYml, 'composeYml')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="commands">
          <h2>Compose commands</h2>
          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{composeCommands}</code></pre>
            <button onClick={() => handleCopy(composeCommands, 'composeCommands')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">
            Note: Compose V2 uses the `docker compose` (space) command and integrates with Docker CLI. Older versions used `docker-compose` (hyphen).
          </div>
        </section>

        <section id="env">
          <h2>.env files & override</h2>
          <p>
            Compose automatically loads a `.env` file for variable substitution. Use `docker-compose.override.yml` (or a file with -override) to
            change settings for local development (e.g., mount volumes for live code).
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{envFileExample}</code></pre>
            <button onClick={() => handleCopy(envFileExample, 'envFile')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{overrideExample}</code></pre>
            <button onClick={() => handleCopy(overrideExample, 'overrideExample')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="examples">
          <h2>Example project</h2>
          <p>
            Typical structure:
          </p>
          <pre className="rounded bg-slate-100 p-3"><code className="font-mono">project/
  ├─ web/
  │   └─ Dockerfile
  ├─ api/
  │   └─ Dockerfile
  └─ docker-compose.yml</code></pre>

          <p className="mt-2">Run <code>docker compose up --build</code> to build and start everything. Use <code>docker compose ps</code> to see service status.</p>
        </section>

        <section id="quiz">
          <h2>Mini Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>What's the difference between `docker compose up` and `docker compose up --build`?</li>
            <li>How do you override a service configuration for local dev?</li>
            <li>Where should secrets be stored instead of in compose files?</li>
            <li>How do you scale a service locally with Compose?</li>
          </ol>

          <button onClick={() => setShowAnswers(!showAnswers)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? 'Hide' : 'Show'} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>`--build` forces rebuilding images before starting; without it, Compose will use existing images if available.</li>
                <li>Use docker-compose.override.yml or an env-specific override file (or set environment variables / .env).</li>
                <li>Secrets should be stored in secret managers (Docker secrets, HashiCorp Vault, or CI secrets), not in git or compose files.</li>
                <li>`docker compose up --scale web=3` (or use deploy.replicas in Swarm/Kubernetes for production orchestration).</li>
              </ol>
            </div>
          )}
        </section>

        <section id="exercises">
          <h2>Exercises</h2>
          <ol>
            <li>Create the example project above, write simple Dockerfiles for web and api, and bring them up with Compose.</li>
            <li>Add a volume mount in override to sync web source for live reload during development.</li>
            <li>Try scaling the web service to 3 instances and observe ports and logs.</li>
            <li>Use an `.env` file to store DB credentials and reference them in compose using `${VARIABLE}`.
            </li>
          </ol>
        </section>

        <section id="next">
          <h2>Next lesson</h2>
          <p>Lesson 11 — Multi-Container Apps: practical Compose project (web + api + redis + db).</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? 'Completed' : 'Not completed'}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark complete'}</button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-indigo-600">{copied} copied to clipboard ✓</div>}
        </footer>
      </main>
    </div>
  );
}
