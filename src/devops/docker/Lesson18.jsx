import React, { useEffect, useState, useRef } from "react";

export default function Lesson18({ lessonId = "lesson-18", onComplete, onNext, onPrev }) {
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
    el?.addEventListener("scroll", handler);
    handler();
    return () => el?.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "N" || e.key === "n") onNext?.();
      if (e.key === "P" || e.key === "p") onPrev?.();
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
    onComplete?.(lessonId);
  };

  const autoNext = () => onNext?.();

  /* FIXED YAML STRINGS — All escaped properly */
  const githubActions = `name: CI
on:
  push:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build image
        run: docker build -t ghcr.io/\${{ github.repository_owner }}/myapp:\${{ github.sha }} .
      - name: Log in to registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - name: Push image
        run: docker push ghcr.io/\${{ github.repository_owner }}/myapp:\${{ github.sha }}`;

  const blueGreen = `# Blue/Green deployment
# 1. Deploy green version
# 2. Shift traffic blue -> green
# 3. Validate → rollback if needed`;

  const canary = `# Canary rollout
# 1. Deploy to 5%
# 2. Monitor logs/metrics
# 3. Increase gradually`;

  const k8sDeploy = `kubectl apply -f k8s/deployment.yaml
kubectl rollout status deployment/myapp
kubectl rollout undo deployment/myapp`;

  const ecsExample = `# ECS deploy steps
# 1. Push to ECR
# 2. Update Task Definition
# 3. Deploy new version`;

  const smokeTests = `curl -s -o /dev/null -w "%{http_code}" https://myapp.demo/health`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64">
        <div className="sticky top-6">
          <h3 className="text-lg font-semibold">Lesson 18 TOC</h3>
          <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-sky-500 to-indigo-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <nav className="bg-white/80 p-3 rounded mt-4 shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#goals">Goals</a></li>
              <li><a href="#strategies">Deployment strategies</a></li>
              <li><a href="#cicd">CI/CD example</a></li>
              <li><a href="#k8s">Kubernetes quick</a></li>
              <li><a href="#aws">Cloud deploy notes</a></li>
              <li><a href="#testing">Smoke tests</a></li>
              <li><a href="#quiz">Quiz</a></li>
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
              <button className="px-3 py-2 rounded bg-sky-600 text-white" onClick={autoNext}>Next</button>
              <button className="px-3 py-2 rounded bg-white border" onClick={() => onPrev?.()}>Prev</button>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main
        id="lesson-content"
        ref={contentRef}
        style={{ maxHeight: "75vh" }}
        className="prose prose-slate flex-1 bg-white p-6 rounded shadow-md overflow-auto"
      >
        <h1 className="text-2xl font-extrabold">Lesson 18 — Deploying Apps</h1>

        {/* GOALS */}
        <section id="goals">
          <h2>Learning goals</h2>
          <ul>
            <li>Understand blue/green, canary, rolling updates</li>
            <li>Create CI/CD pipelines</li>
            <li>Deploy to Kubernetes/ECS</li>
            <li>Use smoke tests & health checks</li>
          </ul>
        </section>

        {/* STRATEGIES */}
        <section id="strategies">
          <h2>Deployment strategies</h2>

          <h3>Blue/Green</h3>
          <pre><code>{blueGreen}</code></pre>

          <h3>Canary</h3>
          <pre><code>{canary}</code></pre>

          <h3>Rolling updates</h3>
          <p>Use readiness probes to avoid downtime.</p>
        </section>

        {/* CICD */}
        <section id="cicd">
          <h2>CI/CD Example</h2>
          <pre><code>{githubActions}</code></pre>
        </section>

        {/* K8S */}
        <section id="k8s">
          <h2>Kubernetes quick deploy</h2>
          <pre><code>{k8sDeploy}</code></pre>
        </section>

        {/* AWS */}
        <section id="aws">
          <h2>Cloud (ECS/EKS/GKE)</h2>
          <pre><code>{ecsExample}</code></pre>
        </section>

        {/* SMOKE TESTS */}
        <section id="testing">
          <h2>Smoke tests</h2>
          <pre><code>{smokeTests}</code></pre>
        </section>

        {/* QUIZ */}
        <section id="quiz">
          <h2>Quiz</h2>
          <button onClick={() => setShowAnswers(!showAnswers)}>
            {showAnswers ? "Hide" : "Show"} answers
          </button>

          {showAnswers && (
            <div className="bg-slate-100 p-3 rounded">
              <ol>
                <li>Blue/green allows instant rollback.</li>
                <li>Health of green environment.</li>
                <li>Readiness controls rolling update traffic.</li>
                <li>Scan prevents vulnerable images.</li>
              </ol>
            </div>
          )}
        </section>

        <footer className="mt-6">
          {copied && <div className="text-sky-600">{copied} ✓</div>}
        </footer>
      </main>
    </div>
  );
}
