import React, { useEffect, useState, useRef } from "react";

// Lesson12.jsx — Docker Registries (push, pull, private registries, tagging, digests)
// Copy-paste ready React component (Tailwind CSS assumed)

export default function Lesson12({ lessonId = "lesson-12", onComplete, onNext, onPrev }) {
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

  // Code snippets
  const loginCmd = `# Docker Hub login (interactive)
docker login

# Login with username/password from CI (example)
echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USER" --password-stdin`;

  const tagPush = `# Tag image for Docker Hub
docker tag myapp:1.0 youruser/myapp:1.0

# Push to registry
docker push youruser/myapp:1.0`;

  const pullCmd = `# Pull an image from registry
docker pull nginx:latest`;

  const registryRun = `# Run a local registry (registry:2)
docker run -d -p 5000:5000 --name registry registry:2

# Tag and push to local registry
docker tag myapp:1.0 localhost:5000/myapp:1.0
docker push localhost:5000/myapp:1.0`;

  const digestCmd = `# Get digest after push
docker image inspect --format='{{index .RepoDigests 0}}' youruser/myapp:1.0

# Pull by digest
docker pull youruser/myapp@sha256:<digest>`;

  const ecrExample = `# AWS ECR (brief)
# get login (aws cli v2)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com

# tag and push
docker tag myapp:1.0 <aws_id>.dkr.ecr.us-east-1.amazonaws.com/myapp:1.0
docker push <aws_id>.dkr.ecr.us-east-1.amazonaws.com/myapp:1.0`;

  const securityTips = `# Security tips (not commands)
- Use least-privilege accounts for CI registry pushes
- Prefer short-lived tokens or ephemeral credentials
- Scan images for vulnerabilities before pushing (Trivy, docker scan)
- Use content trust or notary for signed images`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 12 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-teal-500 to-green-400" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#goals" className="hover:text-teal-600">Learning goals</a></li>
              <li><a href="#hub" className="hover:text-teal-600">Docker Hub & public registries</a></li>
              <li><a href="#private" className="hover:text-teal-600">Private registries</a></li>
              <li><a href="#digests" className="hover:text-teal-600">Digests & immutability</a></li>
              <li><a href="#ci" className="hover:text-teal-600">CI/CD & pushing</a></li>
              <li><a href="#security" className="hover:text-teal-600">Security tips</a></li>
              <li><a href="#quiz" className="hover:text-teal-600">Quiz</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? 'bg-green-500 text-white' : 'bg-white border'}`}>
              {completed ? 'Completed ✓' : 'Mark complete'}
            </button>
            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-teal-600 text-white">Next</button>
              <button onClick={() => onPrev && onPrev()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      <main id="lesson-content" className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto" style={{ maxHeight: '75vh' }} ref={contentRef}>
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 12 — Docker Registries</h1>
          <p className="text-sm text-slate-600">Push, pull, and manage images with Docker Hub, private registries, and registry best practices.</p>
        </header>

        <section id="goals">
          <h2>Learning goals</h2>
          <ul>
            <li>Understand public vs private registries.</li>
            <li>Push and pull images; tag and use digests.</li>
            <li>Run a local registry for testing.</li>
            <li>Integrate registry operations into CI/CD safely.</li>
          </ul>
        </section>

        <section id="hub">
          <h2>Docker Hub & public registries</h2>
          <p>
            Docker Hub is the default public registry. You can pull official images or host your own repositories under your username or organizations.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{loginCmd}</code></pre>
            <button onClick={() => handleCopy(loginCmd, 'loginCmd')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3">
            <div className="relative">
              <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{tagPush}</code></pre>
              <button onClick={() => handleCopy(tagPush, 'tagPush')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
            </div>
          </div>
        </section>

        <section id="private">
          <h2>Private registries</h2>
          <p>
            For private images you can use hosted registries (GitHub Container Registry, GitLab, AWS ECR) or run your own registry using
            the official registry image.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{registryRun}</code></pre>
            <button onClick={() => handleCopy(registryRun, 'registryRun')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-3 text-sm text-slate-500">Tip: When running a local registry in production, secure it behind TLS and use authentication.</div>
        </section>

        <section id="digests">
          <h2>Digests & immutability</h2>
          <p>
            Tags are mutable: the same tag may point to different images over time. Digests (sha256:...) are content-addressable and immutable – prefer them for production deployments to ensure you run the exact image you tested.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{digestCmd}</code></pre>
            <button onClick={() => handleCopy(digestCmd, 'digestCmd')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="cicd">
          <h2>CI/CD & pushing images</h2>
          <p>
            In CI pipelines, authenticate to your registry using short-lived tokens or secrets provided by the CI provider. Build, tag, scan, and push images as part of the pipeline.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{ecrExample}</code></pre>
            <button onClick={() => handleCopy(ecrExample, 'ecrExample')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="security">
          <h2>Registry security tips</h2>
          <pre className="rounded border p-3 bg-slate-900 text-white overflow-auto"><code className="font-mono">{securityTips}</code></pre>
          <div className="mt-3 text-sm text-slate-500">Other ideas: enable image signing (Docker Content Trust), enforce vulnerability scanning gates in CI, and use RBAC on registries.</div>
        </section>

        <section id="quiz">
          <h2>Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>Why prefer digests over tags in production?</li>
            <li>How can you run a private registry locally?</li>
            <li>What are short-lived credentials and why are they recommended for CI?</li>
            <li>How do you ensure images are scanned before leaving CI?</li>
          </ol>

          <button onClick={() => setShowAnswers(!showAnswers)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? 'Hide' : 'Show'} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>Digests are immutable and refer to exact content — tags can move and cause unexpected changes.</li>
                <li>Run registry:2 image and push to localhost:5000, or use hosted registry services.
                </li>
                <li>Short-lived credentials expire quickly (minutes/hours) reducing risk if leaked, and are rotated by CI providers or cloud IAM.
                </li>
                <li>Integrate scanning tools (Trivy, Snyk) into CI and fail the pipeline on critical vulnerabilities before pushing.</li>
              </ol>
            </div>
          )}
        </section>

        <section id="exercises">
          <h2>Exercises</h2>
          <ol>
            <li>Run a local registry, tag an image for localhost:5000, push it, and pull it back.</li>
            <li>Configure GitHub Actions / GitLab CI to build and push an image to your registry using secure secrets.</li>
            <li>Retrieve an image digest after push and try pulling by digest.</li>
            <li>Set up a simple vulnerability scan step in your CI and block pushes if high severity findings are present.</li>
          </ol>
        </section>

        <section id="next">
          <h2>Next lesson</h2>
          <p>Lesson 13 — Docker Security Basics: run containers securely and minimize attack surface.</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? 'Completed' : 'Not completed'}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark complete'}</button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-teal-600">{copied} copied to clipboard ✓</div>}
        </footer>
      </main>
    </div>
  );
}
