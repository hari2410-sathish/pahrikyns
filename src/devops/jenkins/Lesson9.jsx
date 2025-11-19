export default function Lesson9() {
  return (
    <div style={{ fontSize: "17px", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
        Jenkins Lesson 9 — Plugins, Nodes, Agents & Distributed Builds
      </h1>

      <p>
        Jenkins becomes powerful ONLY when you use plugins and distributed
        build agents.  
        In this lesson you learn:
      </p>

      <ul>
        <li>⚙️ Jenkins Plugin system</li>
        <li>🖥️ Master vs Agent architecture</li>
        <li>🚀 Static & Dynamic agents</li>
        <li>☸️ Kubernetes-based agents</li>
        <li>🌐 Distributed builds (Linux + Windows + Docker)</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>1) ⚙️ Jenkins Plugin System</h2>
      <p>
        Jenkins is basically a <b>framework of plugins</b>.  
        Even Git, Pipeline, Docker… everything is a plugin.
      </p>

      <h3>Where to manage plugins?</h3>
      <ul>
        <li><b>Dashboard → Manage Jenkins → Plugin Manager</b></li>
      </ul>

      <p>There are 4 tabs:</p>
      <ul>
        <li><b>Available</b> – install new plugins</li>
        <li><b>Installed</b> – view/update existing</li>
        <li><b>Updates</b> – update list</li>
        <li><b>Advanced</b> – manual .hpi install</li>
      </ul>

      <h3>Must-Have Plugins</h3>
      <ul>
        <li>🟦 Pipeline Plugin</li>
        <li>🐳 Docker Pipeline</li>
        <li>☸️ Kubernetes Plugin</li>
        <li>👤 Git + GitHub Branch Source</li>
        <li>🔒 Credentials Plugin</li>
        <li>🧪 JUnit Plugin</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>2) 🖥️ Jenkins Architecture: Controller & Agents</h2>

      <p>Jenkins has a distributed architecture:</p>

      <ul>
        <li><b>Controller</b> → UI, job management, scheduling</li>
        <li><b>Agent</b> → runs builds</li>
      </ul>

      <h3>Why use agents?</h3>
      <ul>
        <li>Horizontal scalability</li>
        <li>Run parallel builds</li>
        <li>Run on different OS (Linux, Windows, Mac)</li>
        <li>Isolate builds (security)</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>3) 🔌 Types of Jenkins Agents</h2>

      <h3>1) Static Agents</h3>
      <ul>
        <li>Permanent machines</li>
        <li>Always online</li>
        <li>Good for heavy workloads</li>
      </ul>

      <h3>2) Dynamic Agents</h3>
      <ul>
        <li>Start when needed → shutdown after job</li>
        <li>Used with cloud providers</li>
        <li>Cost efficient</li>
      </ul>

      <h3>3) Docker Agents</h3>
      <ul>
        <li>Each build runs in a container</li>
        <li>Fully isolated environment</li>
      </ul>

      <h3>4) Kubernetes Agents</h3>
      <ul>
        <li>Jenkins spawns pods dynamically</li>
        <li>Massive scalability</li>
        <li>Best for large CI/CD infrastructure</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>4) 🐳 Docker-Based Agents</h2>

      <p>Example Jenkinsfile running inside Docker agent:</p>

      <pre className="code-block">
{`pipeline {
  agent {
    docker {
      image 'node:18-alpine'
      args '-p 3000:3000'
    }
  }

  stages {
    stage('Install') { steps { sh 'npm install' } }
    stage('Test') { steps { sh 'npm test' } }
  }
}`}
      </pre>

      <p>Jenkins dynamically pulls the Docker image and uses it as the build environment.</p>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>5) ☸️ Kubernetes Dynamic Agents</h2>

      <p>Enable via plugin: <b>Kubernetes Plugin</b></p>

      <h3>How it works:</h3>
      <ol>
        <li>Jenkins connects to Kubernetes API</li>
        <li>A build starts → Jenkins creates POD with required container</li>
        <li>Build runs inside pod</li>
        <li>Pod auto-deletes after job</li>
      </ol>

      <h3>Example Jenkinsfile</h3>

      <pre className="code-block">
{`pipeline {
  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: node:18
      command:
        - cat
      tty: true
'''
    }
  }

  stages {
    stage('Run Tests') {
      steps {
        container('node') {
          sh 'npm test'
        }
      }
    }
  }
}`}
      </pre>

      <p>💡 Kubernetes agents = infinite scalability + auto cleanup.</p>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>6) 🌐 Distributed Builds (Linux + Windows + Mac)</h2>

      <p>Jenkins can run different stages on different agents.</p>

      <pre className="code-block">
{`pipeline {
  stages {
    stage('Linux Build') {
      agent { label 'linux' }
      steps { sh './build.sh' }
    }

    stage('Windows Tests') {
      agent { label 'windows' }
      steps { bat 'run-tests.bat' }
    }

    stage('Mac Packaging') {
      agent { label 'mac' }
      steps { sh './package.sh' }
    }
  }
}`}
      </pre>

      <p>Useful for cross-platform software and binaries.</p>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>7) 🔑 Adding a New Node (Agent)</h2>

      <h3>Steps to add an SSH agent:</h3>
      <ol>
        <li>Dashboard → Manage Jenkins → Nodes</li>
        <li>New Node → Permanent Agent</li>
        <li>Set name + Remote root directory</li>
        <li>Choose "Launch via SSH"</li>
        <li>Add credentials (SSH key)</li>
        <li>Save → Launch</li>
      </ol>

      <h3>Recommended User Settings:</h3>
      <ul>
        <li>Use separate <b>jenkins</b> user</li>
        <li>Provide passwordless sudo if needed</li>
        <li>Provide SSH key only (not password)</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>8) 🌩️ Agent Best Practices</h2>

      <ul>
        <li>Use *labels* to target agents correctly</li>
        <li>Keep minimal tools on controllers</li>
        <li>Use Docker/K8s agents for isolation</li>
        <li>Autoscale agents using Kubernetes or AWS EC2</li>
        <li>Do NOT run builds on controller machine</li>
        <li>Use JNLP or SSH based agents</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>9) ⚠️ Common Errors & Fixes</h2>

      <ul>
        <li>
          ❌ <b>“No agents available”</b>  
          ➜ Add labels properly, ensure agents online.
        </li>

        <li>
          ❌ <b>“Timeout waiting for agent to connect”</b>  
          ➜ Check firewall, SSH port, Java version.
        </li>

        <li>
          ❌ <b>Kubernetes agent never starts</b>  
          ➜ Fix kubeconfig, RBAC permissions, plugin settings.
        </li>

        <li>
          ❌ <b>Docker agent cannot run</b>  
          ➜ Ensure Jenkins user is in <code>docker</code> group.
        </li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>🎬 Summary</h2>

      <ul>
        <li>Plugins extend Jenkins functionality</li>
        <li>Agents run your builds (distributed CI)</li>
        <li>Use Docker/K8s agents for clean, scalable jobs</li>
        <li>Labels → help route builds to correct nodes</li>
      </ul>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>
        Next: Lesson 10 — Jenkins Credentials, Secrets & Secure DevOps Pipelines
      </p>
    </div>
  );
}
