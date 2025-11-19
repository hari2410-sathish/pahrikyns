import React, { useEffect, useState, useRef } from "react";

// Lesson20.jsx — Jenkins Backup, Monitoring, Logs & HA
// Clean, self-contained React component ready to paste into your project.

export default function Lesson20({
  lessonId = "lesson-20",
  onComplete,
  onNext,
  onPrev,
}) {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(0);
  const contentRef = useRef(null);

  // Scroll progress (for sidebar progress indicator)
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

  // copy toast
  useEffect(() => {
    let t;
    if (copied) t = setTimeout(() => setCopied(""), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  // keyboard shortcuts (N = next, P = prev, C = complete)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "N" || e.key === "n") onNext?.();
      if (e.key === "P" || e.key === "p") onPrev?.();
      if (e.key === "C" || e.key === "c") markComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

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

  // snippets / examples
  const backupConfig = `# Backup Jenkins home (cron example)
/usr/bin/rsync -a --delete /var/jenkins_home/ /backups/jenkins/jenkins_home-$(date +%F)/
# Keep last 7 backups
find /backups/jenkins -maxdepth 1 -type d -mtime +7 -exec rm -rf {} \\;`;

  const dockerBackup = `# If Jenkins runs in Docker (backup volumes)
docker run --rm --volumes-from jenkins_container -v $(pwd):/backup busybox \
  tar czf /backup/jenkins_home-$(date +%F).tgz /var/jenkins_home`;

  const backupRestore = `# Restore (example)
tar xzf jenkins_home-2025-11-18.tgz -C /var/jenkins_home
chown -R jenkins:jenkins /var/jenkins_home`;

  const backupNotes = `Backup checklist:
- backup JENKINS_HOME (jobs, config, plugins, secrets)
- backup credentials.xml and secrets/
- backup plugin list (for reproducible installs)
- test restore on staging regularly`;

  const monitoringProm = `# Prometheus + Jenkins Exporter (high level)
- Install jenkins-prometheus plugin
- Scrape metrics at /prometheus
- Alert on job_failure_rate, queue_size, executor_idle_count
`;

  const grafanaDash = `# Example alerts:
- Alert: high_job_failure_rate (>= 3 failures in last 5m)
- Alert: build_queue_growth (queue_size > X)
- Alert: low_executor_count when queued jobs > executors
`;

  const logsBest = `# Logs best practices
- Centralize: forward Jenkins logs to ELK / Loki / Papertrail
- Use JSON structured logs for agents where possible
- Retain logs based on compliance needs
- Protect logs from deletion (immutable store for audit)`;

  const haOverview = `# High Availability approaches
1) Master + standby VM (backup & failover)
2) Use external storage for JENKINS_HOME (NFS with caution)
3) Run Jenkins in Kubernetes with PersistentVolume + leader election (recommended)
4) Use clustering plugins carefully; prefer immutability + replaceable masters
`;

  const haK8s = `# Kubernetes pattern (simplified)
- Run Jenkins controller with PVC for JENKINS_HOME
- Use leader election for controller components
- Scale agents with K8s plugin
- Use ReadWriteOnce PVC + snapshot backups for durability`;

  const disasterPlan = `Disaster recovery:
- documented restore runbook
- test restores quarterly
- automated backup verification
- ensure credential vault available during restore`;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8" id="lesson-root">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lesson 20 TOC</h3>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="bg-white/80 p-3 rounded shadow-sm text-sm">
            <ul className="space-y-2">
              <li><a href="#backup" className="hover:text-green-600">Backups</a></li>
              <li><a href="#restore" className="hover:text-green-600">Restore</a></li>
              <li><a href="#monitoring" className="hover:text-green-600">Monitoring</a></li>
              <li><a href="#logs" className="hover:text-green-600">Logs</a></li>
              <li><a href="#ha" className="hover:text-green-600">High Availability</a></li>
              <li><a href="#dr" className="hover:text-green-600">Disaster Recovery</a></li>
              <li><a href="#quiz" className="hover:text-green-600">Quiz</a></li>
            </ul>
          </nav>

          <div className="mt-4 flex gap-2">
            <button
              onClick={markComplete}
              className={`flex-1 px-3 py-2 rounded shadow ${completed ? "bg-green-500 text-white" : "bg-white border"}`}
            >
              {completed ? "Completed ✓" : "Mark complete"}
            </button>

            <div className="flex flex-col gap-2">
              <button onClick={() => onNext?.()} className="px-3 py-2 rounded bg-emerald-600 text-white">Next</button>
              <button onClick={() => onPrev?.()} className="px-3 py-2 rounded bg-white border">Prev</button>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500">Shortcuts: N / P / C</div>
        </div>
      </aside>

      {/* Main */}
      <main
        id="lesson-content"
        ref={contentRef}
        className="prose prose-slate max-w-none flex-1 bg-white p-6 rounded shadow-md overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <header>
          <h1 className="text-2xl font-extrabold">Lesson 20 — Jenkins Backup, Monitoring, Logs & HA</h1>
          <p className="text-sm text-slate-600">Design durable Jenkins installations: take reliable backups, monitor health, centralize logs, and plan for high availability and disaster recovery.</p>
        </header>

        <section id="backup">
          <h2>1) Backups — what to save</h2>
          <p>Minimum items to back up from <code>JENKINS_HOME</code>:</p>
          <ul>
            <li><code>jobs/</code> (job configs)</li>
            <li><code>config.xml</code>, <code>credentials.xml</code>, <code>secrets/</code></li>
            <li><code>plugins/</code> and plugin list</li>
            <li>user content, nodes, build history (adjust retention)</li>
          </ul>

          <h3 className="mt-3">Example: rsync backup (cron)</h3>
          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{backupConfig}</code></pre>
            <button onClick={() => handleCopy(backupConfig, "rsync backup")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <h3 className="mt-3">If Jenkins runs in Docker</h3>
          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{dockerBackup}</code></pre>
            <button onClick={() => handleCopy(dockerBackup, "docker backup")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <div className="mt-2 bg-slate-50 p-3 rounded text-sm">{backupNotes}</div>
        </section>

        <section id="restore" className="mt-6">
          <h2>2) Restore procedure</h2>
          <p>Test restores on staging. Keep credentials for vault accessible during restore.</p>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{backupRestore}</code></pre>
            <button onClick={() => handleCopy(backupRestore, "restore example")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <p className="text-sm text-slate-500 mt-2">After restore: verify plugins, rebuild node configuration, run smoke jobs.</p>
        </section>

        <section id="monitoring" className="mt-6">
          <h2>3) Monitoring Jenkins</h2>
          <p>Export metrics and alert on job failure rates, queue length, executor utilization and disk usage.</p>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{monitoringProm}</code></pre>
            <button onClick={() => handleCopy(monitoringProm, "prometheus")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <h3 className="mt-3">Grafana alerts & dashboards</h3>
          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{grafanaDash}</code></pre>
            <button onClick={() => handleCopy(grafanaDash, "grafana alerts")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="logs" className="mt-6">
          <h2>4) Logs — centralization & retention</h2>
          <p>Ship controller & agent logs to a centralized system (ELK, Loki, Splunk, Papertrail).</p>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{logsBest}</code></pre>
            <button onClick={() => handleCopy(logsBest, "logs best practices")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <p className="text-sm text-slate-500 mt-2">Avoid storing secrets in logs. Mask credentials at build time; redact sensitive outputs.</p>
        </section>

        <section id="ha" className="mt-6">
          <h2>5) High Availability (HA) strategies</h2>
          <p>There is no magical "Jenkins cluster" — the recommended approach is reproducible masters and replaceable controller(s).</p>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{haOverview}</code></pre>
            <button onClick={() => handleCopy(haOverview, "ha overview")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <h3 className="mt-3">Kubernetes deployment pattern</h3>
          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{haK8s}</code></pre>
            <button onClick={() => handleCopy(haK8s, "k8s pattern")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>
        </section>

        <section id="dr" className="mt-6">
          <h2>6) Disaster Recovery & Runbooks</h2>
          <p>Document a runbook: exactly how to restore Jenkins, recover credentials, and rehydrate pipelines.</p>

          <div className="relative mt-2">
            <pre className="rounded border p-3 bg-black text-white overflow-auto"><code>{disasterPlan}</code></pre>
            <button onClick={() => handleCopy(disasterPlan, "dr plan")} className="absolute right-2 top-2 text-xs px-2 py-1 bg-white border rounded">Copy</button>
          </div>

          <p className="text-sm text-slate-500 mt-2">Practice the runbook in a scheduled drill and track time-to-restore (TTR).</p>
        </section>

        <section id="quiz" className="mt-6">
          <h2>Mini Quiz</h2>
          <ol className="list-decimal pl-6">
            <li>Which files/folders are essential to back up from JENKINS_HOME?</li>
            <li>Name two monitoring metrics you should alert on.</li>
            <li>Why centralize logs — what are two benefits?</li>
            <li>What's a safe approach to HA for Jenkins controllers?</li>
          </ol>

          <div className="mt-3">
            <button onClick={() => setCopied("answers shown")} className="px-3 py-2 border rounded">Show Sample Answers</button>
            {copied === "answers shown" && (
              <div className="mt-3 bg-slate-50 p-3 rounded">
                <ol className="list-decimal pl-6">
                  <li><strong>jobs/, config.xml, credentials.xml, plugins/</strong></li>
                  <li><strong>job_failure_rate, queue_size, executor_utilization, disk_free</strong></li>
                  <li><strong>Centralized search & retention, correlate logs with metrics, easier auditing</strong></li>
                  <li><strong>Make master replaceable, use PVC snapshots and tested restore runbook; prefer K8s controllers + PVC</strong></li>
                </ol>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Shortcuts: N / P / C</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-green-600">{completed ? "Completed" : "Not completed"}</div>
              <button onClick={markComplete} className={`px-3 py-2 rounded ${completed ? "bg-green-600 text-white" : "bg-white border"}`}>
                {completed ? "Completed ✓" : "Mark complete"}
              </button>
            </div>
          </div>

          {copied && <div className="mt-3 text-sm text-slate-600">{copied} ✓</div>}
        </footer>
      </main>
    </div>
  );
}
