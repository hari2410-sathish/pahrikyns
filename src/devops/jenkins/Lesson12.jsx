export default function Lesson12() {
  return (
    <div style={{ fontSize: "17px", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "28px", fontWeight: 800 }}>
        Jenkins Lesson 12 — Agents, Nodes, Labels & Distributed Builds
      </h1>

      <p>
        Jenkins is not “just one machine.”  
        It scales using **Master (Controller)** + **Agents (Nodes)**.
        Big DevOps companies use tens or hundreds of Jenkins agents.
      </p>

      <ul>
        <li>🖥 Controller vs Worker Nodes</li>
        <li>🏷 Labels & Node Selection</li>
        <li>🔌 Static Agents (SSH, JNLP, Windows, Linux)</li>
        <li>🐳 Docker Agents</li>
        <li>☁ Kubernetes & Cloud Agents (Dynamic Agents)</li>
        <li>🔒 Workspaces & Isolation</li>
        <li>🔁 Running parallel builds on multiple nodes</li>
      </ul>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>1) 🧠 Jenkins Architecture</h2>

      <p>
        Jenkins uses a **Controller → Agent** architecture.  
        The controller manages:
      </p>

      <ul>
        <li>UI</li>
        <li>Schedules jobs</li>
        <li>Stores configuration</li>
        <li>Triggers agents</li>
      </ul>

      <p>Agents actually **execute**:</p>
      <ul>
        <li>Build scripts</li>
        <li>Docker builds</li>
        <li>Tests</li>
        <li>Deployments</li>
      </ul>

      <p>
        This keeps the controller clean and free from heavy CPU workloads.
      </p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>2) Types of Jenkins Agents</h2>

      <h3>1) Static Agents</h3>
      <ul>
        <li>SSH Agents (manual servers)</li>
        <li>JNLP Agents</li>
        <li>Windows Nodes</li>
        <li>Linux Nodes</li>
      </ul>

      <h3>2) Dynamic Agents</h3>
      <ul>
        <li>Docker agent (creates temporary containers)</li>
        <li>Kubernetes agent (pods-per-build)</li>
        <li>Cloud agents (AWS, Azure, GCP auto-scale)</li>
      </ul>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>3) 🏷 What are Node Labels?</h2>

      <p>
        Labels are tags given to nodes — so Jenkins knows *where* to run a
        pipeline.
      </p>

      <p>Example labels:</p>
      <ul>
        <li><code>linux</code></li>
        <li><code>windows</code></li>
        <li><code>docker</code></li>
        <li><code>k8s</code></li>
        <li><code>maven</code></li>
      </ul>

      <h3>Using a label inside Jenkinsfile:</h3>
      <pre className="code-block">
{`pipeline {
  agent { label 'linux' }

  stages {
    stage('Build') {
      steps {
        sh 'echo Building on Linux agent'
      }
    }
  }
}`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>4) 🧲 Running on ANY available agent</h2>

      <p>Use:</p>

      <pre className="code-block">
{`agent any`}
      </pre>

      <p>This lets Jenkins pick the best available agent automatically.</p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>5) 🚀 Static SSH Agent Setup</h2>

      <p>You add a Linux server as a Jenkins agent using SSH:</p>

      <ol>
        <li>Install Java on the agent</li>
        <li>Configure SSH keys</li>
        <li>Go to: Manage Jenkins → Nodes → New Node</li>
        <li>Enter IP, SSH user, SSH key</li>
        <li>Assign labels</li>
      </ol>

      <h3>Pipeline using a static SSH node:</h3>
      <pre className="code-block">
{`pipeline {
  agent { label 'ssh-agent' }

  stages {
    stage('Run') {
      steps {
        sh 'hostname'
      }
    }
  }
}`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>6) 🪟 Running builds on Windows Nodes</h2>

      <p>Use <code>bat</code> instead of <code>sh</code>:</p>

      <pre className="code-block">
{`pipeline {
  agent { label 'windows' }

  stages {
    stage('Build') {
      steps {
        bat 'dir'
      }
    }
  }
}`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>7) 🐳 Docker Agents (per-build containers)</h2>

      <h3>Example 1 — Simple Docker Agent</h3>
      <pre className="code-block">
{`pipeline {
  agent {
    docker { image 'node:18-alpine' }
  }

  stages {
    stage('Check') {
      steps {
        sh 'node -v'
      }
    }
  }
}`}
      </pre>

      <h3>Example 2 — Using multiple tools inside container</h3>
      <pre className="code-block">
{`agent {
  docker {
    image 'maven:3.9.6-eclipse-temurin-17'
    args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
  }
}`}
      </pre>

      <p>This enables:</p>
      <ul>
        <li>Docker-in-Docker</li>
        <li>Running maven builds</li>
        <li>Clean environment for every build</li>
      </ul>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>8) ☸ Kubernetes Agents (Scales Automatically)</h2>

      <p>
        In high-scale DevOps, Jenkins runs every build in a Kubernetes Pod.
        This gives:
      </p>

      <ul>
        <li>Unlimited agents</li>
        <li>Auto-scaling</li>
        <li>Zero idle cost</li>
      </ul>

      <h3>Simple Kubernetes agent pipeline:</h3>
      <pre className="code-block">
{`pipeline {
  agent {
    kubernetes {
      label 'k8s-agent'
      defaultContainer 'node'
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:18
    command:
    - cat
    tty: true
"""
    }
  }

  stages {
    stage('Run') {
      steps {
        sh 'node -v'
      }
    }
  }
}`}
      </pre>

      <p>Each build creates a new Pod → runs → deletes → saves money.</p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>9) 🧪 Parallel builds on multiple agents</h2>

      <h3>Example: Run Linux + Windows tests at same time</h3>

      <pre className="code-block">
{`pipeline {
  agent none

  stages {
    stage('Cross-Platform Test') {
      parallel {
        stage('Linux Test') {
          agent { label 'linux' }
          steps { sh 'npm test' }
        }
        stage('Windows Test') {
          agent { label 'windows' }
          steps { bat 'npm test' }
        }
      }
    }
  }
}`}
      </pre>

      <p>
        This reduces test time from 20 min → **5 min**.  
        (Real DevOps teams always use parallel stages.)
      </p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>10) 🧽 Cleanup: Why Workspaces Must Reset</h2>

      <ul>
        <li>Each node has its own workspace</li>
        <li>Old builds can cause conflicts</li>
        <li>Disk can get full</li>
      </ul>

      <h3>Fix using:</h3>
      <pre className="code-block">
{`post {
  always {
    cleanWs()
  }
}`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>🎬 Summary</h2>

      <ul>
        <li>Controller manages UI, Agents do the work</li>
        <li>Use labels to control which node executes a stage</li>
        <li>SSH, Windows, Docker, Kubernetes — all support Jenkins agents</li>
        <li>Docker agents = clean environment per build</li>
        <li>Kubernetes agents = infinite scalable CI/CD</li>
        <li>Use parallel builds to reduce total runtime</li>
      </ul>

      <p style={{ marginTop: "25px", fontWeight: 700 }}>
        Next: Lesson 13 — Jenkinsfile Functions, Shared Libraries, Global Vars (Enterprise Level) 🚀
      </p>
    </div>
  );
}
