export default function Lesson3() {
  return (
    <div style={{ fontSize: "17px", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
        Jenkins Lesson 3 — Freestyle Project (Your First CI Job)
      </h1>

      <p>
        In this lesson, you will create your first CI job using a{" "}
        <b>Freestyle Project</b>. This is the foundation for learning pipelines,
        triggers, automation, and CI/CD.
      </p>

      {/* --------------------------------------- */}
      <h2>🎯 What is a Freestyle Project?</h2>
      <p>
        A Freestyle Project is the simplest job type in Jenkins. You can use it
        to:
      </p>

      <ul>
        <li>Run shell scripts</li>
        <li>Pull code from GitHub</li>
        <li>Build applications</li>
        <li>Run tests</li>
        <li>Deploy artifacts</li>
      </ul>

      <p>
        Freestyle jobs are the best for beginners because no coding (Jenkinsfile)
        is needed.
      </p>

      {/* --------------------------------------- */}
      <h2>🧰 Step 1 — Open Jenkins Dashboard</h2>
      <p>Open:</p>
      <pre className="code-block">http://your-server-ip:8080</pre>

      <p>Login using the admin account you created in Lesson 2.</p>

      {/* --------------------------------------- */}
      <h2>🆕 Step 2 — Create New Job</h2>
      <ol>
        <li>Click <b>“New Item”</b> from Jenkins left sidebar.</li>
        <li>Enter job name: <b>first-freestyle-job</b></li>
        <li>Select <b>Freestyle project</b></li>
        <li>Click <b>OK</b></li>
      </ol>

      <p>You are now inside the job configuration page.</p>

      {/* --------------------------------------- */}
      <h2>🌐 Step 3 — Link a GitHub Repository (Optional but Recommended)</h2>
      <p>If you want the job to pull code from GitHub:</p>

      <h3>Enable Git Plugin:</h3>
      <pre className="code-block">sudo apt install git -y</pre>

      <h3>Then in Jenkins:</h3>
      <ol>
        <li>Go to <b>Source Code Management</b></li>
        <li>Select <b>Git</b></li>
        <li>Enter GitHub Repo URL:</li>
      </ol>

      <pre className="code-block">https://github.com/your-username/your-repo.git</pre>

      <p>If repo is private → Add credentials.</p>

      {/* --------------------------------------- */}
      <h2>📜 Step 4 — Add a Build Step</h2>

      <h3>1️⃣ Add Shell Script</h3>
      <p>Scroll to <b>Build</b> → Click <b>Add build step</b> → Choose <b>Execute shell</b>.</p>

      <p>Paste this script:</p>

      <pre className="code-block">
{`echo "===== Jenkins Freestyle Job Running ====="
echo "Current date: $(date)"
echo "Your workspace path:"
pwd

# Example build command
echo "Simulating build..."
sleep 2

echo "Build complete!"`}
      </pre>

      <h3>2️⃣ Build Real Application (Optional)</h3>
      <p>Node.js Example:</p>
      <pre className="code-block">
{`npm install
npm run build`}
      </pre>

      <p>Python Example:</p>
      <pre className="code-block">
{`pip install -r requirements.txt
python app.py`}
      </pre>

      {/* --------------------------------------- */}
      <h2>⏱ Step 5 — Add Build Triggers</h2>

      <p>You can automate job execution using:</p>

      <ul>
        <li><b>Manual build</b> → Build Now button</li>
        <li><b>Periodic builds</b> → Cron schedule</li>
        <li><b>Poll SCM</b> → Auto-run when Git changes</li>
        {/* FIX: Removed the extra closing </b> tag */}
        <li><b>Webhook triggers</b> → GitHub → Jenkins</li> 
      </ul>

      <h3>Examples:</h3>

      <p><b>Poll SCM every 1 minute:</b></p>
      <pre className="code-block">* * * * *</pre>

      <p><b>Run job at 5 AM daily:</b></p>
      {/* FIX: The lines causing the "li" error were likely here due to misplaced/duplicated tags. */}
      {/* I have ensured only the necessary tags are present here. */}
      <pre className="code-block">0 5 * * *</pre>

      {/* --------------------------------------- */}
      <h2>🚀 Step 6 — Build the Job</h2>

      <ol>
        <li>Click <b>Save</b></li>
        <li>Click <b>Build Now</b></li>
      </ol>

      <p>You will see a build # appear under <b>Build History</b>.</p>

      <h3>View Console Output:</h3>
      <ol>
        <li>Click the build number</li>
        <li>Click <b>Console Output</b></li>
      </ol>

      <p>Your script output should appear like this:</p>
      <pre className="code-block">
{`===== Jenkins Freestyle Job Running =====
Current date: Tue Oct 23 11:58:21 UTC 2024
Your workspace path:
/var/lib/jenkins/workspace/first-freestyle-job
Simulating build...
Build complete!`}
      </pre>

      {/* --------------------------------------- */}
      <h2>🧹 Step 7 — Workspace Location</h2>

      <p>Jenkins stores job files here:</p>
      <pre className="code-block">
/var/lib/jenkins/workspace/first-freestyle-job
      </pre>

      <p>You can SSH into the server and check:</p>
      <pre className="code-block">
{`cd /var/lib/jenkins/workspace
ls -l`}
      </pre>

      {/* --------------------------------------- */}
      <h2>❗ Common Errors & Fixes</h2>

      <h3>❌ Error: “Git not found”</h3>
      <pre className="code-block">sudo apt install git -y</pre>

      <h3>❌ Permission denied in workspace</h3>
      <pre className="code-block">
{`sudo chown -R jenkins:jenkins /var/lib/jenkins`}
      </pre>

      <h3>❌ Build fails with exit code 127</h3>
      <p>Means the command is missing or wrong.</p>

      {/* --------------------------------------- */}
      <h2>🎯 Summary</h2>
      <ul>
        <li>You created your first Freestyle job</li>
        <li>You added Git repo (optional)</li>
        <li>You added shell build steps</li>
        <li>You configured triggers</li>
        <li>You ran the build & checked logs</li>
      </ul>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>
        Next: Jenkins Lesson 4 — Build Triggers in Depth (GitHub Webhooks + Cron)
      </p>
    </div>
  );
}