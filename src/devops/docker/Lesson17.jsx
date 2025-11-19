import React, { useEffect, useState, useRef } from "react";

// Lesson17 — Docker Swarm Introduction
// Topics: swarm init, nodes, services, scaling, rolling updates, stacks

export default function Lesson17({
  lessonId = "lesson-17",
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
      setProgress(total === 0 ? 100 : Math.round((scrolled / total) * 100));
    };
    el?.addEventListener("scroll", handler);
    handler();
    return () => el?.removeEventListener("scroll", handler);
  }, []);

  /* ───────────────────────── Shortcuts ───────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "N" || e.key === "n") onNext?.();
      if (e.key === "P" || e.key === "p") onPrev?.();
      if (e.key === "C" || e.key === "c") markComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  /* ───────────────────────── Copy Feedback ───────────────────────── */
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

  /* ───────────────────────── Commands ───────────────────────── */
  const initSwarm = `docker swarm init --advertise-addr 192.168.1.10`;

  const joinNode = `docker swarm join \\
  --token <worker-token> \\
  192.168.1.10:2377`;

  const serviceCreate = `docker service create \\
  --name web \\
  --replicas 3 \\
  -p 8080:80 \\
  nginx`;

  const scaleService = `docker service scale web=5`;

  const updateService = `docker service update \\
  --image nginx:1.25 \\
  --update-order start-first \\
  web`;

  const deployStack = `docker stack deploy -c stack.yml mystack`;

  const stackYaml = `version: '3.9'
services:
  web:
    image: nginx
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        order: start-first
      restart_policy:
        condition: on-failure
    ports:
      - "8080:80"`;

  const debug = `docker service ps web
docker node ls
docker node inspect self --pretty`;

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <div id="lesson-root" className="flex flex-col md:flex-row gap-6 p-4 md:p-8">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 17 TOC</h3>
              <span className="text-sm text-slate-600">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* TOC */}
          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#goals" className="hover:text-yellow-600">Goals</a></li>
              <li><a href="#swarm-init" className="hover:text-yellow-600">Init Swarm</a></li>
              <li><a href="#nodes" className="hover:text-yellow-600">Nodes</a></li>
              <li><a href="#services" className="hover:text-yellow-600">Services</a></li>
              <li><a href="#update" className="hover:text-yellow-600">Rolling updates</a></li>
              <li><a href="#stacks" className="hover:text-yellow-600">Stacks</a></li>
              <li><a href="#debug" className="hover:text-yellow-600">Debug</a></li>
              <li><a href="#quiz" className="hover:text-yellow-600">Quiz</a></li>
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
              <button
                onClick={next}
                className="px-3 py-2 rounded bg-yellow-600 text-white"
              >
                Next
              </button>

              <button
                onClick={() => onPrev?.()}
                className="px-3 py-2 rounded bg-white border"
              >
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
          <h1 className="text-2xl font-extrabold">Lesson 17 — Docker Swarm Introduction</h1>
          <p className="text-sm text-slate-600">
            Learn Swarm orchestration: nodes, services, stacks, scaling, rolling updates.
          </p>
        </header>

        {/* GOALS */}
        <section id="goals">
          <h2>Learning Goals</h2>
          <ul>
            <li>Initialize a Swarm cluster.</li>
            <li>Join worker/manager nodes.</li>
            <li>Deploy scalable services.</li>
            <li>Perform rolling updates.</li>
            <li>Deploy stacks using Compose files.</li>
          </ul>
        </section>

        {/* INIT SWARM */}
        <section id="swarm-init">
          <h2>1) Initialize Swarm</h2>
          <p>Start a swarm cluster on manager node:</p>

          <div className="relative mt-2">
            <pre className="bg-black text-white p-3 rounded"><code>{initSwarm}</code></pre>
            <button
              onClick={() => copy(initSwarm, "initSwarm")}
              className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* NODES */}
        <section id="nodes">
          <h2>2) Add Worker/Manager Nodes</h2>

          <div className="relative mt-2">
            <pre className="bg-black text-white p-3 rounded"><code>{joinNode}</code></pre>
            <button
              onClick={() => copy(joinNode, "joinNode")}
              className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded"
            >
              Copy
            </button>
          </div>

          <p className="text-sm text-slate-600 mt-2">
            Use <code>docker swarm join-token worker</code> to see token.
          </p>
        </section>

        {/* SERVICES */}
        <section id="services">
          <h2>3) Create and Scale Services</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded"><code>{serviceCreate}</code></pre>
            <button
              onClick={() => copy(serviceCreate, "serviceCreate")}
              className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded"
            >
              Copy
            </button>
          </div>

          <h3 className="mt-4">Scale service</h3>
          <div className="relative">
            <pre className="bg-black text-white p-3 rounded"><code>{scaleService}</code></pre>
            <button
              onClick={() => copy(scaleService, "scaleService")}
              className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* ROLLING UPDATES */}
        <section id="update">
          <h2>4) Rolling Updates</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded"><code>{updateService}</code></pre>
            <button
              onClick={() => copy(updateService, "updateService")}
              className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded"
            >
              Copy
            </button>
          </div>

          <p className="text-sm text-slate-600 mt-2">
            <strong>start-first</strong> ensures zero-downtime deployments.
          </p>
        </section>

        {/* STACKS */}
        <section id="stacks">
          <h2>5) Deploy Stacks (Compose v3+)</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded"><code>{stackYaml}</code></pre>
            <button
              onClick={() => copy(stackYaml, "stackYaml")}
              className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded"
            >
              Copy
            </button>
          </div>

          <div className="relative mt-4">
            <pre className="bg-black text-white p-3 rounded"><code>{deployStack}</code></pre>
            <button
              onClick={() => copy(deployStack, "deployStack")}
              className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* DEBUG */}
        <section id="debug">
          <h2>6) Debug Swarm</h2>

          <div className="relative">
            <pre className="bg-black text-white p-3 rounded"><code>{debug}</code></pre>
            <button
              onClick={() => copy(debug, "debug")}
              className="absolute right-2 top-2 px-2 py-1 bg-white border text-xs rounded"
            >
              Copy
            </button>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Quiz</h2>

          <ol className="list-decimal pl-6">
            <li>What is the purpose of Docker Swarm?</li>
            <li>How do you scale a service?</li>
            <li>What is a rolling update?</li>
            <li>What command deploys a stack?</li>
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
                <li>Swarm orchestrates multi-node clusters.</li>
                <li>Using <code>docker service scale</code>.</li>
                <li>Updating tasks one-by-one with zero downtime.</li>
                <li>Using <code>docker stack deploy</code>.</li>
              </ol>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mt-6 flex justify-between items-center">
          <button
            onClick={() => onPrev?.()}
            className="px-3 py-2 border rounded"
          >
            ← Prev
          </button>

          <button
            onClick={next}
            className="px-3 py-2 bg-yellow-600 text-white rounded"
          >
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
