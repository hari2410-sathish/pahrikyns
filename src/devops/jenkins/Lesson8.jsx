export default function Lesson8() {
  return (
    <div style={{ fontSize: "17px", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
        Jenkins Lesson 8 — Parallel, Matrix & Multi-Branch Pipelines
      </h1>

      <p>
        In modern CI/CD, pipelines must run <b>fast and scalable</b>.  
        Jenkins supports three powerful systems:
      </p>

      <ul>
        <li>⚡ <b>Parallel Stages</b> – run multiple jobs at the same time</li>
        <li>🔢 <b>Matrix Builds</b> – test multiple environments/configs</li>
        <li>🌿 <b>Multibranch Pipelines</b> – pipeline for every Git branch</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>1) ⚡ Parallel Stages (Speed Up Builds)</h2>
      <p>
        Parallel execution is the #1 trick to reduce build time by 60–80%.
      </p>

      <h3>Example — run tests on Linux + Windows in parallel:</h3>

      <pre className="code-block">
{`pipeline {
  agent any

  stages {
    stage('Parallel Testing') {
      parallel {
        stage('Unit Tests') {
          steps { sh 'npm test' }
        }
        stage('Lint') {
          steps { sh 'npm run lint' }
        }
        stage('Security Scan') {
          steps { sh 'npm audit --audit-level=high' }
        }
      }
    }
  }
}`}
      </pre>

      <p>All 3 stages run simultaneously.</p>

      <h3>Example — Build + Test + Docker push in parallel</h3>
      <pre className="code-block">
{`parallel {
  stage('Build') { steps { sh './build.sh' } }
  stage('Test') { steps { sh './run-tests.sh' } }
  stage('Docker Push') { steps { sh 'docker push image:tag' } }
}`}
      </pre>

      <p>Use parallel when you want FAST CI.</p>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>2) 🔢 Matrix Builds (Test multiple environments)</h2>
      <p>
        Matrix pipeline runs the same stages across multiple combinations of:
      </p>

      <ul>
        <li>OS (linux, windows, mac)</li>
        <li>Versions (node 14, 16, 18)</li>
        <li>Browsers (chrome, firefox)</li>
      </ul>

      <h3>Real Example — Test Node.js on 3 versions</h3>
      <pre className="code-block">
{`pipeline {
  agent none

  stages {
    stage('Matrix Testing') {
      matrix {
        axes {
          axis {
            name 'NODE_VERSION'
            values '14', '16', '18'
          }
        }
        agent { label 'linux' }

        stages {
          stage('Install') {
            steps {
              sh 'nvm install $NODE_VERSION'
            }
          }
          stage('Test') {
            steps {
              sh 'npm test'
            }
          }
        }
      }
    }
  }
}`}
      </pre>

      <h3>Example — OS + Python version</h3>
      <pre className="code-block">
{`matrix {
  axes {
    axis { name 'OS'; values 'ubuntu', 'windows' }
    axis { name 'PY'; values '3.8', '3.9', '3.10' }
  }
  agent { label OS }

  stages {
    stage('Run') {
      steps { sh 'python$PY script.py' }
    }
  }
}`}
      </pre>

      <p>
        Matrix pipelines are heavily used in test automation, cross-platform
        builds, and enterprise QA.
      </p>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>3) 🌿 Multibranch Pipelines</h2>
      <p>
        A Multi-Branch Pipeline automatically creates one pipeline per branch
        inside a Git repo.
      </p>

      <h3>What it does:</h3>
      <ul>
        <li>✔ Auto-detects branches</li>
        <li>✔ Creates pipeline for each branch</li>
        <li>✔ Runs builds only on changed branches</li>
        <li>✔ Auto-deletes old branches</li>
      </ul>

      <h3>Use-case Examples</h3>
      <ul>
        <li>Feature branches → auto build</li>
        <li>Release branches → auto deploy</li>
        <li>PR validation</li>
      </ul>

      <h3>Job Setup Steps</h3>
      <ol>
        <li>Create job → <b>Multibranch Pipeline</b></li>
        <li>Add GitHub repo URL</li>
        <li>Add credentials</li>
        <li>Select: <b>Discover branches</b></li>
        <li>Save</li>
      </ol>

      <p>
        Jenkins now scans repo automatically and runs pipelines for each
        branch.
      </p>

      <h3>Jenkinsfile Example</h3>

      <pre className="code-block">
{`pipeline {
  agent any

  stages {
    stage('Build') {
      steps { sh 'npm install' }
    }

    stage('Test') {
      steps { sh 'npm test' }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        sh './deploy.sh'
      }
    }
  }
}`}
      </pre>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>4) 🔥 Parallel + Matrix + Multibranch Combined</h2>

      <p>Advanced example used in real DevOps companies:</p>

      <pre className="code-block">
{`pipeline {
  agent none

  stages {
    stage('Matrix Build') {
      matrix {
        axes {
          axis { name 'OS'; values 'ubuntu', 'windows' }
          axis { name 'NODE_VERSION'; values '16', '18' }
        }
        agent { label OS }

        stages {
          stage('Install') { steps { sh 'nvm install $NODE_VERSION' } }

          stage('Parallel Tests') {
            parallel {
              stage('Unit') { steps { sh 'npm run unit' } }
              stage('Integration') { steps { sh 'npm run int' } }
              stage('Security') { steps { sh 'npm audit' } }
            }
          }
        }
      }
    }
  }
}`}
      </pre>

      <p>💥 This runs 2×2×3 builds = 12 pipelines all together!</p>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>5) 🎯 Best Practices</h2>

      <ul>
        <li>Use parallel for fast testing & scanning</li>
        <li>Use matrix for cross-platform testing</li>
        <li>Use multibranch for GitOps workflows</li>
        <li>Limit parallel to avoid agent starvation</li>
        <li>Use <b>failFast: true</b> to stop all branches if one fails</li>
        <li>Use <b>agent none</b> for matrix to reduce resource usage</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>6) ⚠️ Common Errors & Fixes</h2>

      <ul>
        <li>
          ❌ <b>No agent available</b>  
          ➜ Assign agents in Jenkins labels correctly.
        </li>
        <li>
          ❌ <b>Parallel stage continues after failure</b>  
          ➜ Add <code>failFast: true</code>.
        </li>
        <li>
          ❌ <b>Matrix too slow</b>  
          ➜ Reduce number of axes.
        </li>
        <li>
          ❌ <b>Multibranch not detecting branches</b>  
          ➜ Enable "Discover branches" in job config.
        </li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>🎬 Summary</h2>

      <ul>
        <li>Parallel stages = speed</li>
        <li>Matrix builds = test combos</li>
        <li>Multibranch = auto CI/CD for all branches</li>
      </ul>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>
        Next: Lesson 9 — Jenkins Plugins, Nodes, Agents & Distributed Builds
      </p>
    </div>
  );
}
