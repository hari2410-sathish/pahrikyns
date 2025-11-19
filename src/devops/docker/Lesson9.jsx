import React, { useEffect, useState, useRef } from "react";

// Lesson9.jsx — Docker Networking (Full, Copy-Paste Ready)
export default function Lesson9({ lessonId = "lesson-9", onComplete, onNext, onPrev }) {
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

  // Network command snippets
  const bridgeExample = `# create a user-defined bridge network
docker network create mynet

# run containers on the network
docker run -d --name redis --net mynet redis
docker run -d --name web --net mynet mywebapp`;

  const hostMode = `# run container in host network mode (linux only)
docker run --network host -d myapp`;

  const portMap = `# publish container port to host
# hostPort:containerPort
docker run -d -p 8080:80 nginx`;

  const inspectNetwork = `# list networks
docker network ls

# inspect a network
docker network inspect mynet`;

  const dnsExample = `# use --add-host to add /etc/hosts entry
docker run --add-host "db.local:192.168.1.10" myapp`;

  const connectCmd = `# connect existing container to network
docker network connect mynet existing-container

# disconnect
docker network disconnect mynet container`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 9 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-sky-500 to-indigo-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#goals" className="hover:text-sky-600">Learning goals</a></li>
              <li><a href="#modes" className="hover:text-sky-600">Network modes</a></li>
              <li><a href="#bridge" className="hover:text-sky-600">User-defined bridge</a></li>
              <li><a href="#host" className="hover:text-sky-600">Host mode</a></li>
              <li><a href="#overlay" className="hover:text-sky-600">Overlay & swarm</a></li>
              <li><a href="#dns" className="hover:text-sky-600">DNS & service discovery</a></li>
              <li><a href="#inspect" className="hover:text-sky-600">Inspect & debug</a></li>
              <li><a href="#quiz" className="hover:text-sky-600">Quiz</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? 'bg-green-500 text-white' : 'bg-white border'}`}>
              {completed ? 'Completed ✓' : 'Mark complete'}
            </button>
            <div className="flex flex-col gap-2">
              <button onClick={autoNext} className="px-3 py-2 rounded bg-sky-600 text-white">Next</button>
              <button onClick={() => onPrev && onPrev()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      <main id="lesson-content" className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto" style={{ maxHeight: '75vh' }} ref={contentRef}>
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 9 — Docker Networking</h1>
          <p className="text-sm text-slate-600">Understand network modes, service discovery, user-defined networks, and debugging techniques.</p>
        </header>

        <section id="goals">
          <h2>Learning goals</h2>
          <ul>
            <li>Know the default Docker network modes and when to use them.</li>
            <li>Create user-defined bridge networks for service discovery.</li>
            <li>Use port mapping, host mode, and overlay networks for distributed apps.</li>
            <li>Inspect and debug container networking issues.</li>
          </ul>
        </section>

        <section id="modes">
          <h2>Network modes</h2>
          <ul>
            <li><strong>bridge</strong> — default for standalone containers; isolated bridge network on the host.</li>
            <li><strong>host</strong> — container shares host network namespace (no NAT).</li>
            <li><strong>none</strong> — no network interfaces.</li>
            <li><strong>overlay</strong> — distributed network for Swarm or Kubernetes (multi-host).</li>
          </ul>

          <div className="mt-3 bg-slate-50 p-3 rounded border text-sm">
            Note: bridge mode provides NAT and port mapping; use user-defined bridge networks for automatic DNS name resolution between containers.
          </div>
        </section>

        <section id="bridge">
          <h2>User-defined bridge networks</h2>
          <p>
            User-defined bridge networks provide built-in DNS so containers can reach each other by name. Prefer them over the default bridge for multi-container apps.
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{bridgeExample}</code></pre>
            <button onClick={() => handleCopy(bridgeExample, 'bridgeExample')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <h3 className="mt-3">Example: connect & inspect</h3>
          <pre className="rounded bg-slate-100 p-3"><code className="font-mono">docker network inspect mynet</code></pre>
          <div className="text-sm text-slate-500 mt-2">Look for the "Containers" section to see attached containers and IPs.</div>
        </section>

        <section id="host">
          <h2>Host mode</h2>
          <p>In host mode, containers share the host network namespace — useful for performance-sensitive workloads but removes network isolation.</p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{hostMode}</code></pre>
            <button onClick={() => handleCopy(hostMode, 'hostMode')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-2 text-sm text-slate-500">Host mode is not supported on Docker Desktop for macOS/Windows in the same way as Linux.</div>
        </section>

        <section id="overlay">
          <h2>Overlay networks (Swarm)</h2>
          <p>
            Overlay networks span multiple Docker hosts (Swarm mode) and provide service discovery, load balancing, and encrypted overlay options.
          </p>

          <div className="mt-3 bg-slate-50 p-3 rounded border text-sm">
            Quick: initialize a swarm with <code>docker swarm init</code>, create an overlay with <code>docker network create -d overlay myoverlay</code>, and deploy a stack that uses that network.
          </div>
        </section>

        <section id="dns">
          <h2>DNS & service discovery</h2>
          <p>
            Docker's user-defined networks provide built-in DNS. Containers can resolve each other by container name or service name (Compose/Swarm).
          </p>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{dnsExample}</code></pre>
            <button onClick={() => handleCopy(dnsExample, 'dnsExample')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-2 text-sm text-slate-500">For advanced DNS configuration, consider custom DNS servers or the --dns flag.</div>
        </section>

        <section id="inspect">
          <h2>Inspecting & debugging networks</h2>
          <ul>
            <li>Use <code>docker network inspect &lt;network&gt;</code> to view attachments and subnets.</li>
            <li>Use <code>docker exec -it &lt;container&gt; /bin/sh</code> then <code>ping</code> or <code>nslookup</code> inside the container.</li>
            <li>Check iptables or nftables on host for NAT rules (<code>sudo iptables -t nat -L -n</code>).</li>
          </ul>

          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{inspectNetwork}</code></pre>
            <button onClick={() => handleCopy(inspectNetwork, 'inspectNetwork')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="connect">
          <h2>Connect & disconnect containers</h2>
          <div className="relative mt-3">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{connectCmd}</code></pre>
            <button onClick={() => handleCopy(connectCmd, 'connectCmd')} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="quiz">
          <h2>Mini Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>What is the advantage of a user-defined bridge network vs the default bridge?</li>
            <li>When should you use host network mode?</li>
            <li>How can containers resolve each other by name?</li>
            <li>How do you inspect a network's connected containers?</li>
          </ol>

          <button onClick={() => setShowAnswers(!showAnswers)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? 'Hide' : 'Show'} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>User-defined bridges offer automatic DNS and better isolation vs the default bridge.</li>
                <li>Host mode is used for performance-sensitive workloads or when you need the container to use host networking directly.</li>
                <li>Docker's embedded DNS resolves container names on user-defined networks (or service names in Compose/Swarm).</li>
                <li>Use <code>docker network inspect &lt;network&gt;</code> and check the Containers section.</li>
              </ol>
            </div>
          )}
        </section>

        <section id="exercises">
          <h2>Exercises</h2>
          <ol>
            <li>Create a user-defined bridge network and run two containers; ping one from the other using container name.</li>
            <li>Start a container with host mode and compare network performance using iperf between host and container.</li>
            <li>Initialize a swarm, create an overlay network, and deploy a simple stack that uses the overlay network.</li>
            <li>Use <code>docker network inspect</code> and identify subnet ranges and container IP addresses.</li>
          </ol>
        </section>

        <section id="next">
          <h2>Next lesson</h2>
          <p>Lesson 10 — Docker Compose Intro: define multi-container apps with YAML.</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? 'Completed' : 'Not completed'}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-white border'}`}>{completed ? 'Completed ✓' : 'Mark complete'}</button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-sky-600">{copied} copied to clipboard ✓</div>}
        </footer>
      </main>
    </div>
  );
}
