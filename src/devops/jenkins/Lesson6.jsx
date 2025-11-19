export default function Lesson6() {
  return (
    <div style={{ fontSize: "17px", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
        Jenkins Lesson 6 — Agents, Nodes & Distributed Builds
      </h1>

      <p>
        Jenkins can run builds on multiple machines called{" "}
        <b>Agents / Nodes</b>.  
        This enables distributed building, parallel workloads, and scaling.
      </p>

      {/* ---------------------------------------- */}
      <h2>🎯 What You Will Learn</h2>
      <ul>
        <li>What is a Jenkins master & agent?</li>
        <li>Types of Jenkins agents</li>
        <li>Static nodes vs dynamic nodes</li>
        <li>SSH, JNLP, Docker-based agents</li>
        <li>What are labels and why we need them?</li>
        <li>How pipeline selects an agent</li>
        <li>Agent troubleshooting</li>
      </ul>

      {/* ---------------------------------------- */}
      <h2>1) 🖥 What Is Jenkins Master?</h2>
      <p>
        In older versions called <b>Master</b>, now replaced with the term{" "}
        <b>Controller</b>.
      </p>

      <p>The Controller is responsible for:</p>
      <ul>
        <li>Managing jobs</li>
        <li>Scheduling builds</li>
        <li>Sending build tasks to agents</li>
        <li>Storing build history & plugins</li>
      </ul>

      {/* ---------------------------------------- */}
      <h2>2) 🤖 What Are Jenkins Agents?</h2>
      <p>
        Agents are machines that <b>run the build steps</b> (e.g., build, test,
        deploy).
      </p>

      <p>Agents can be:</p>
      <ul>
        <li>Linux VMs</li>
        <li>Windows VMs</li>
        <li>Docker containers</li>
        <li>AWS EC2 instances</li>
        <li>Kubernetes Pods</li>
      </ul>

      {/* ---------------------------------------- */}
      <h2>3) 🏗 Agent Types</h2>

      <h3>a) Static Agents</h3>
      <p>Manually configured, always available.</p>
      <pre className="code-block">
{`Jenkins -> Manage Jenkins -> Manage Nodes -> New Node`}
      </pre>

      <h3>b) Dynamic Agents</h3>
      <p>Created on demand using:</p>
      <ul>
        <li>Docker cloud</li>
        <li>Kubernetes cloud</li>
        <li>AWS EC2 plugin</li>
      </ul>

      <p>
        They are automatically <b>created → used → destroyed</b>.
      </p>

      {/* ---------------------------------------- */}
      <h2>4) 🔐 How Agents Connect</h2>

      <h3>1) SSH Agent</h3>
      <p>Most commonly used for Linux nodes.</p>
      <ul>
        <li>Controller connects to agent via SSH</li>
        <li>Requires Java installed on agent</li>
      </ul>

      <pre className="code-block">
{`sudo apt install default-jdk -y`}
      </pre>

      <h3>2) JNLP Agent</h3>
      <p>Agent connects back TO Jenkins.</p>
      <ul>
        <li>Used for Windows agents</li>
        <li>Works behind firewalls</li>
      </ul>

      <h3>3) Docker Agents</h3>
      <p>Jenkins launches an agent inside a Docker container.</p>

      <pre className="code-block">
{`agent {
    docker {
        image 'node:20'
    }
}`}
      </pre>

      <h3>4) Kubernetes Agents</h3>
      <p>Each build runs in a fresh Kubernetes Pod.</p>

      <pre className="code-block">
{`agent {
    kubernetes {
        yaml """
        apiVersion: v1
        kind: Pod
        ...
        """
    }
}`}
      </pre>

      {/* ---------------------------------------- */}
      <h2>5) 🏷 What Are Labels?</h2>
      <p>
        Labels are tags given to nodes.  
        Pipelines use these labels to select which agent should run the job.
      </p>

      <h3>Example Label Setup</h3>
      <ul>
        <li>linux</li>
        <li>windows</li>
        <li>docker</li>
        <li>java8</li>
        <li>nodejs</li>
      </ul>

      <h3>Choosing Node Using Label</h3>
      <pre className="code-block">
{`pipeline {
    agent { label 'linux' }
}`}
      </pre>

      <h3>Multiple Label Matching</h3>
      <pre className="code-block">
{`agent { label 'docker && linux' }`}
      </pre>

      {/* ---------------------------------------- */}
      <h2>6) 🧪 Multi-Agent Pipeline Example</h2>
      <p>Different stages on different nodes.</p>

      <pre className="code-block">
{`pipeline {
    agent none

    stages {
        stage('Build') {
            agent { label 'maven-node' }
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Test') {
            agent { label 'test-node' }
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            agent { label 'prod-node' }
            steps {
                sh './deploy.sh'
            }
        }
    }
}`}
      </pre>

      <p>This is powerful for microservices + parallel teams.</p>

      {/* ---------------------------------------- */}
      <h2>7) ⚠️ Agent Troubleshooting</h2>
      <h3>Common issues & fixes:</h3>

      <ul>
        <li>
          <b>Offline node</b> → Check SSH keys, network, Java version.
        </li>
        <li>
          <b>Disk full</b> → Clear workspace or /var/lib/jenkins.
        </li>
        <li>
          <b>Permission denied</b> → Fix sudo rights or chmod.
        </li>
        <li>
          <b>Java not installed</b> → Required for agents.
        </li>
      </ul>

      <h3>Check agent logs:</h3>
      <pre className="code-block">
{`Jenkins -> Node -> Log`}
      </pre>

      {/* ---------------------------------------- */}
      <h2>🎯 Summary</h2>
      <ul>
        <li>Controller manages jobs</li>
        <li>Agents execute builds</li>
        <li>Use labels to route pipelines</li>
        <li>SSH, JNLP, Docker agents supported</li>
        <li>Distributed builds scale Jenkins</li>
      </ul>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>
        Next: Lesson 7 — Jenkins Credentials, Secrets & Vault Integration
      </p>
    </div>
  );
}
