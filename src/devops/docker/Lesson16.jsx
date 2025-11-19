import React, { useEffect, useState, useRef } from "react";

// Lesson16.jsx — Docker Compose Advanced
// Topics: healthchecks, depends_on vs health, profiles, secrets, configs, deployment patterns

export default function Lesson16({ lessonId = "lesson-16", onComplete, onNext, onPrev }) {
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

  // Code snippets
  const healthcheckYml = `# service with HEALTHCHECK (compose v3+)
services:
  api:
    build: ./api
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:4000/health || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s`;

  const waitForIt = `# example wait-for-it pattern (bash)
#!/bin/sh
# wait-for-db.sh
until nc -z $DB_HOST $DB_PORT; do
  echo 'Waiting for DB...'
  sleep 1
done
exec \"$@\"`;

  const profilesYml = `version: '3.9'
services:
  worker:
    image: myworker:latest
    profiles: ["batch"]

# start only default services
docker compose up
# start with profile
docker compose --profile batch up`;

  const secretsYml = `services:
  api:
    image: api:latest
    secrets:
      - db_password
secrets:
  db_password:
    file: ./secrets/db_password.txt`;

  const configsYml = `services:
  nginx:
    image: nginx:stable
    configs:
      - nginx_conf
configs:
  nginx_conf:
    file: ./nginx/nginx.conf`;

  const deployExample = `# Note: deploy is ignored by docker compose on non-Swarm
services:
  web:
    image: web:latest
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
      resources:
        limits:
          cpus: '0.50'
          memory: 512M`;

  const tips = `# Best practice tips (summary)
- Use HEALTHCHECK + wait-for scripts for readiness
- Use profiles to split optional/production services
- Store secrets securely (use secret managers in prod)
- Use configs for non-sensitive configuration
- Test compose files locally, but deploy with orchestration (Swarm/K8s) for production`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 16 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-500 to-teal-400" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#goals" className="hover:text-green-600">Goals</a></li>
              <li><a href="#health" className="hover:text-green-600">Healthchecks & readiness</a></li>
              <li><a href="#wait" className="hover:text-green-600">Wait-for patterns</a></li>
              <li><a href="#profiles" className="hover:text-green-600">Profiles</a></li>
              <li><a href="#secrets" className="hover:text-green-600">Secrets & configs</a></li>
              <li><a href="#deploy" className="hover:text-green-600">Deploy patterns</a></li>
              <li><a href="#best" className="hover:text-green-600">Best practices</a></li>
              <li><a href="#quiz" className="hover:text-green-600">Quiz</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? 'bg-green-500 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark complete'}</button>
            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-green-600 text-white">Next</button>
              <button onClick={() => onPrev && onPrev()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      <main id="lesson-content" className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto" style={{ maxHeight: '75vh' }} ref={contentRef}>
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 16 — Docker Compose Advanced</h1>
          <p className="text-sm text-slate-600">Deepen Compose usage: healthchecks, readiness, profiles, secrets, configs, and deploy patterns for production-ready stacks.</p>
        </header>

        <section id="goals">
          <h2>Learning goals</h2>
          <ul>
            <li>Make Compose stacks resilient with healthchecks and readiness.</li>
            <li>Use profiles to organize optional services (dev vs prod).</li>
            <li>Manage secrets and configs properly for different environments.</li>
            <li>Understand limitations of compose for production and when to use orchestration.</li>
          </ul>
        </section>

        <section id="health">
          <h2>Healthchecks & readiness</h2>
          <p>
            HEALTHCHECK instructions let Docker report a container's health state. Compose can use health status for orchestration (depends_on with condition: service_healthy requires Compose v2/Swarm).
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{healthcheckYml}</code></pre>
            <button onClick={() => handleCopy(healthcheckYml, 'healthcheckYml')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Tip: healthcheck ≠ readiness probe in K8s. Use scripts (wait-for) to block startup until dependencies accept connections.</div>
        </section>

        <section id="wait">
          <h2>Wait-for patterns</h2>
          <p>
            Use small entrypoint scripts to wait for dependencies like DB to be ready before starting the service. This avoids race conditions where the app crashes and restarts repeatedly.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{waitForIt}</code></pre>
            <button onClick={() => handleCopy(waitForIt, 'waitForIt')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Alternative tools: wait-for, dockerize, or custom scripts. Combine with HEALTHCHECK for better orchestration.</div>
        </section>

        <section id="profiles">
          <h2>Profiles</h2>
          <p>Profiles let you include optional services (e.g., debug tools, batch workers) and start them only when requested.</p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{profilesYml}</code></pre>
            <button onClick={() => handleCopy(profilesYml, 'profilesYml')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Start Compose with <code>docker compose --profile &lt;name&gt; up</code> to enable those services.</div>
        </section>

        <section id="secrets">
          <h2>Secrets & configs</h2>
          <p>
            Compose v3+ supports secrets and configs which are mounted into containers in a secure way (secrets are file-based in the container). In production prefer orchestrator secret stores.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{secretsYml}</code></pre>
            <button onClick={() => handleCopy(secretsYml, 'secretsYml')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{configsYml}</code></pre>
            <button onClick={() => handleCopy(configsYml, 'configsYml')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Note: Secrets in Docker Desktop are stored differently than in Swarm/K8s. Treat them as ephemeral and use cloud secret managers in prod.</div>
        </section>

        <section id="deploy">
          <h2>Deploy patterns</h2>
          <p>
            Compose supports a limited <code>deploy</code> section that is only honored by Swarm/Kubernetes. For production use orchestrators which provide scaling, health rollouts, and service discovery guarantees.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{deployExample}</code></pre>
            <button onClick={() => handleCopy(deployExample, 'deployExample')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Use CI to generate production compose/stacks and deploy via orchestrator APIs rather than local Compose for reliability.</div>
        </section>

        <section id="best">
          <h2>Best practices & summary</h2>
          <pre className="rounded border p-3 bg-slate-900 text-white overflow-auto"><code className="font-mono">{tips}</code></pre>
        </section>

        <section id="quiz">
          <h2>Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>Why combine HEALTHCHECK with wait-for scripts?</li>
            <li>How do profiles help local development?</li>
            <li>Where should secrets be stored in production?</li>
            <li>Why is deploy ignored by local docker compose?</li>
          </ol>

          <button onClick={() => setShowAnswers(!showAnswers)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? 'Hide' : 'Show'} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>Healthchecks report running status; wait-for scripts ensure dependencies accept connections — together they prevent restarts and race conditions.</li>
                <li>Profiles allow optional services (e.g., dev tools) to be excluded from default startups and included when needed.</li>
                <li>Secrets should be stored in secret managers (cloud IAM, Vault) or orchestrator secret stores, not in plaintext in repo/compose files.</li>
                <li>Because local compose is a CLI tool; the <code>deploy</code> stanza is intended for orchestrators (Swarm/K8s) which implement those deployment features.</li>
              </ol>
            </div>
          )}

        </section>

        <section id="exercises">
          <h2>Exercises</h2>
          <ol>
            <li>Add HEALTHCHECK to a service and verify <code>docker compose ps</code> shows the health column.</li>
            <li>Create a wait-for script for an app that depends on Postgres and include it in the entrypoint.</li>
            <li>Define a profile for a debug service (e.g., adminer) and run it only when needed.</li>
            <li>Replace a local secret file with a cloud secret and update CI to inject it at runtime.</li>
          </ol>
        </section>

        <section id="next">
          <h2>Next lesson</h2>
          <p>Lesson 17 — Swarm Introduction: simple orchestration with Docker Swarm, services, stacks, and rolling updates.</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? 'Completed' : 'Not completed'}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark complete'}</button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-green-600">{copied} copied to clipboard ✓</div>}
        </footer>
      </main>
    </div>
  );
}
