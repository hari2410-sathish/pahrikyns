export default function Lesson4() {
  return (
    <div style={{ fontSize: "17px", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
        Jenkins Lesson 4 — Build Triggers (GitHub Webhooks, Poll SCM, Cron)
      </h1>

      <p>
        Build triggers control <b>when</b> a Jenkins job should run.  
        Triggers help automate CI/CD without manually clicking “Build Now”.
      </p>

      {/* ------------------------------------------- */}
      <h2>🎯 What You Will Learn</h2>
      <ul>
        <li>How Poll SCM works (auto-build on Git changes)</li>
        <li>How to configure GitHub Webhooks</li>
        <li>How to schedule jobs using Cron</li>
        <li>How to use parameterized scheduled builds</li>
      </ul>

      {/* ------------------------------------------- */}
      <h2>1) 🔄 Poll SCM — Jenkins checks Git for changes</h2>

      <p>
        Poll SCM makes Jenkins pull the Git repo periodically.  
        If any commit changed → Jenkins runs the job automatically.
      </p>

      <h3>➤ Enable Poll SCM</h3>
      <ol>
        <li>Open your Freestyle or Pipeline job</li>
        <li>Go to <b>Build Triggers</b></li>
        <li>Enable <b>Poll SCM</b></li>
        <li>Enter schedule</li>
      </ol>

      <h3>📌 Example Cron Schedules for Poll SCM</h3>

      <p>Check Git repo every minute:</p>
      <pre className="code-block">* * * * *</pre>

      <p>Check every 5 minutes:</p>
      <pre className="code-block">H/5 * * * *</pre>

      <p>Check every day at 2 AM:</p>
      <pre className="code-block">0 2 * * *</pre>

      <h3>📝 Important Note</h3>
      <p>
        Poll SCM <b>does not pull code always</b>.  
        It only builds if <b>the repo changed</b>.
      </p>

      {/* ------------------------------------------- */}
      <h2>2) 🌐 GitHub Webhooks — Instant Trigger (Best Method)</h2>

      <p>
        Webhooks send events from GitHub → Jenkins instantly.  
        This removes the need for polling every minute.
      </p>

      <h3>Prerequisites:</h3>
      <ul>
        <li>Jenkins server accessible from internet</li>
        <li>GitHub repo</li>
        <li>GitHub → Jenkins plugin installed</li>
      </ul>

      <h3>➤ Step 1 — Enable GitHub Hook Trigger</h3>
      <ol>
        <li>Open Jenkins job</li>
        <li>Go to <b>Build Triggers</b></li>
        <li>Enable:  
          <b>“GitHub hook trigger for GITScm polling”</b>
        </li>
      </ol>

      <h3>➤ Step 2 — Add Webhook in GitHub</h3>

      <ol>
        <li>Open your GitHub repo</li>
        <li>Go to <b>Settings → Webhooks → Add Webhook</b></li>
        <li>Payload URL:</li>
      </ol>

      <pre className="code-block">http://YOUR-JENKINS-IP:8080/github-webhook/</pre>

      <ol start={4}>
        <li>Content type: <b>application/json</b></li>
        <li>Events: <b>Just the push event</b></li>
        <li>Click <b>Add Webhook</b></li>
      </ol>

      <p>
        Now every <b>push</b> to GitHub triggers Jenkins job instantly.
      </p>

      <h3>💡 Tip:</h3>
      <p>If GitHub webhook fails → open Jenkins logs:</p>
      <pre className="code-block">Manage Jenkins → System Log</pre>

      {/* ------------------------------------------- */}
      <h2>3) 🕒 Cron Builds — Scheduled Jobs</h2>

      <p>Use Cron to run jobs automatically at fixed times.</p>

      <h3>➤ Enable Scheduled Build</h3>
      <ol>
        <li>Open job</li>
        <li>Go to <b>Build Triggers</b></li>
        <li>Enable: <b>Build periodically</b></li>
      </ol>

      <h3>📌 Useful Cron Examples</h3>

      <p>Run every day at midnight:</p>
      <pre className="code-block">0 0 * * *</pre>

      <p>Run every 15 minutes:</p>
      <pre className="code-block">H/15 * * * *</pre>

      <p>Run every Monday:</p>
      <pre className="code-block">0 10 * * 1</pre>

      <p>Run every hour:</p>
      <pre className="code-block">H * * * *</pre>

      <h3>💡 Cron + Parameters (Advanced)</h3>
      <p>You can run scheduled tasks with custom variables.</p>

      <pre className="code-block">
{`#!/bin/bash
echo "Running batch job..."
echo "Datetime: $(date)"`}
      </pre>

      {/* ------------------------------------------- */}
      <h2>4) 🧪 Testing All Triggers</h2>

      <h3>Test Poll SCM</h3>
      <ul>
        <li>Commit to GitHub</li>
        <li>Wait for 1 minute</li>
        <li>Job should auto-build</li>
      </ul>

      <h3>Test Webhook</h3>
      <ul>
        <li>Push to GitHub</li>
        <li>Webhook → Jenkins instantly</li>
        <li>Build should start in seconds</li>
      </ul>

      <h3>Test Cron</h3>
      <ul>
        <li>Check job’s scheduled time</li>
        <li>Wait for the time to trigger</li>
      </ul>

      {/* ------------------------------------------- */}
      <h2>⚠️ Common Webhook Errors</h2>

      <h3>❌ “Payload URL not reachable”</h3>
      <p>Open firewall:</p>
      <pre className="code-block">sudo ufw allow 8080</pre>

      <h3>❌ 403 Invalid Token</h3>
      <p>
        Install the plugin:  
        <b>GitHub Integration Plugin</b>
      </p>

      <h3>❌ Webhook says “Delivered but Jenkins didn’t build”</h3>
      <ul>
        <li>Check if job has GitHub hook trigger enabled</li>
        <li>Repo URL must match exactly</li>
        <li>Check Jenkins logs</li>
      </ul>

      {/* ------------------------------------------- */}
      <h2>🎯 Summary</h2>
      <ul>
        <li>Poll SCM checks Git every interval</li>
        <li>Webhooks instantly trigger builds</li>
        <li>Cron schedules periodic tasks</li>
        <li>All 3 can be used in a single job</li>
      </ul>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>
        Next: Lesson 5 — Jenkins Build Pipeline Concepts (Deep version)
      </p>
    </div>
  );
}
