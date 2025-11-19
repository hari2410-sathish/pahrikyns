import React, { useEffect, useState, useRef } from "react";

// Lesson15.jsx — Docker Networking Advanced
// Custom drivers, MACVLAN, advanced overlay, DNS, troubleshooting

export default function Lesson15({ lessonId = "lesson-15", onComplete, onNext, onPrev }) {
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

  const copy = async (text, label) => {
    try { await navigator.clipboard.writeText(text); setCopied(label || "copied"); }
    catch { setCopied("copy failed"); }
  };

  const markComplete = () => { setCompleted(true); onComplete?.(lessonId); };
  const next = () => onNext?.();

  // Code blocks
  const macvlanCmd = `docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 pubnet`;

  const macvlanRun = `# Container gets real LAN IP
docker run --net=pubnet --ip=192.168.1.50 nginx`;

  const overlayAdvanced = `docker network create -d overlay \
  --subnet=10.10.0.0/16 \
  --attachable \
  myoverlay`;

  const dnsCustom = `docker run --dns=8.8.8.8 --dns=1.1.1.1 myapp`;

  const debugCmds = `docker exec -it c1 /bin/sh
ping c2
nslookup c2
ip addr
ip route

# host
iptables -t nat -L -n`; 

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">

      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 15 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-fuchsia-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#goals" className="hover:text-purple-600">Goals</a></li>
              <li><a href="#macvlan" className="hover:text-purple-600">MACVLAN</a></li>
              <li><a href="#overlay" className="hover:text-purple-600">Advanced Overlay</a></li>
              <li><a href="#dns" className="hover:text-purple-600">DNS Control</a></li>
              <li><a href="#debug" className="hover:text-purple-600">Troubleshooting</a></li>
              <li><a href="#quiz" className="hover:text-purple-600">Quiz</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button onClick={markComplete} className={`flex-1 px-3 py-2 rounded shadow ${completed ? "bg-green-500 text-white" : "bg-white border"}`}>{completed ? "Completed ✓" : "Mark complete"}</button>
            <div className="flex flex-col gap-2">
              <button onClick={next} className="px-3 py-2 rounded bg-purple-600 text-white">Next</button>
              <button onClick={() => onPrev?.()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      <main
        id="lesson-content"
        ref={contentRef}
        className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 15 — Docker Networking Advanced</h1>
          <p className="text-sm text-slate-600">Deep dive: custom drivers, MACVLAN, advanced overlay networking, DNS, and troubleshooting.</p>
        </header>

        <section id="goals">
          <h2>Learning goals</h2>
          <ul>
            <li>Understand MACVLAN + real LAN IP usage.</li>
            <li>Create advanced overlay networks for multi-host clusters.</li>
            <li>Control DNS, host entries, and name resolution.</li>
            <li>Perform deep troubleshooting inside container networks.</li>
          </ul>
        </section>

        <section id="macvlan">
          <h2>1) MACVLAN — Give containers real LAN IP</h2>
          <p>MACVLAN allows containers to appear as physical devices on the LAN.</p>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{macvlanCmd}</code></pre>
            <button onClick={() => copy(macvlanCmd, "macvlanCmd")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>

          <h3 className="mt-4">Assign real LAN IP</h3>
          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{macvlanRun}</code></pre>
            <button onClick={() => copy(macvlanRun, "macvlanRun")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>

          <p className="mt-3 text-sm text-slate-500">Note: MACVLAN cannot talk to the host by default—use a bridge workaround if required.</p>
        </section>

        <section id="overlay">
          <h2>2) Advanced Overlay Networks</h2>
          <p>Overlay networks enable multi-host networking in Swarm/Kubernetes.</p>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{overlayAdvanced}</code></pre>
            <button onClick={() => copy(overlayAdvanced, "overlayAdvanced")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>

          <div className="mt-3 bg-slate-50 p-3 rounded border text-sm">Use attachable overlays for both Swarm services and standalone containers.</div>
        </section>

        <section id="dns">
          <h2>3) Advanced DNS control</h2>
          <p>Override DNS servers or add custom hosts.</p>

          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{dnsCustom}</code></pre>
            <button onClick={() => copy(dnsCustom, "dnsCustom")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>

          <p className="mt-3 text-sm text-slate-500">For Compose, use <code>dns:</code> or <code>extra_hosts:</code> fields.</p>
        </section>

        <section id="debug">
          <h2>4) Network Troubleshooting</h2>

          <div className="relative">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{debugCmds}</code></pre>
            <button onClick={() => copy(debugCmds, "debugCmds")} className="absolute right-2 top-2 px-2 py-1 bg-white border rounded text-xs">Copy</button>
          </div>

          <ul className="mt-3">
            <li>Check container routing with <code>ip route</code>.</li>
            <li>Check iptables/nftables rules on host.</li>
            <li>Inspect bridge interfaces on host: <code>ip link</code>.</li>
            <li>Verify DNS: <code>cat /etc/resolv.conf</code>.</li>
          </ul>
        </section>

        <section id="quiz">
          <h2>Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>Why use MACVLAN?</li>
            <li>What is an attachable overlay?</li>
            <li>How to override DNS for a container?</li>
            <li>Which command checks container routing?</li>
          </ol>

          <button onClick={() => setShowAnswers(!showAnswers)} className="mt-3 px-3 py-2 border rounded">{showAnswers ? "Hide" : "Show"} Answers</button>

          {showAnswers && (
            <div className="mt-3 bg-slate-50 p-3 rounded">
              <ol className="list-decimal pl-6">
                <li>To give containers real LAN IPs and appear as physical devices.</li>
                <li>An overlay network that allows standalone containers + Swarm services to join.</li>
                <li>Use <code>--dns</code> flag or Compose <code>dns:</code> field.</li>
                <li><code>ip route</code> inside container.</li>
              </ol>
            </div>
          )}
        </section>

        <section id="next">
          <h2>Next lesson</h2>
          <p>Lesson 16 — Docker Compose Advanced: healthchecks, dependencies, profiles, and production patterns.</p>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? "Completed" : "Not completed"}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? "bg-green-600 text-white" : "bg-white border"}`}>{completed ? "Completed ✓" : "Mark complete"}</button>
            </div>
          </div>
          {copied && <div className="mt-3 text-sm text-purple-600">{copied} copied to clipboard ✓</div>}
        </footer>
      </main>
    </div>
  );
}
