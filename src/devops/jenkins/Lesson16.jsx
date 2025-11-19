import React from "react";

export default function Lesson16() {
  const dockerAgentDeclarative = `pipeline {
  agent {
    docker {
      image 'node:18-alpine'
      args '--network host'
      label 'docker-agent'
    }
  }
  stages {
    stage('Build') {
      steps { sh 'node -v; npm ci; npm run build' }
    }
  }
}`;

  const dockerAgentScripted = `node('docker-agent') {
  stage('Checkout') { checkout scm }
  stage('Build') {
    docker.image('node:18-alpine').inside('--network host') {
      sh 'npm ci; npm run build'
    }
  }
}`;

  const jnlpAgent = `pipeline {
  agent {
    label 'jnlp-agent'
  }
  stages {
    stage('Test') {
      steps { sh 'echo running on agent'; sh 'uname -a' }
    }
  }
}`;

  const kubernetesAgent = `pipeline {
  agent {
    kubernetes {
      label 'k8s-agent'
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: jnlp
    image: jenkins/inbound-agent:4.11-2
  - name: docker
    image: docker:24-dind
    securityContext:
      privileged: true
"""
    }
  }
  stages { stage('CI') { steps { sh 'docker --version' } } }
}`;

  const sshLaunch = `# In Jenkins node configuration:
# - Add node
# - Launch method: Launch agents via SSH
# - Provide Host, Credentials (SSH), Remote FS root
# - Ensure Java & required tools installed on agent server
`;

  const provisioningNotes = `# Provisioning options
- Static nodes (manually added)
- SSH agents (provision via cloud-init / provisioner)
- Docker agents (Docker plugin) - ephemeral containers as agents
- Kubernetes plugin - ephemeral pods as agents (recommended for k8s)
- Cloud plugins (EC2, GCE) - ephemeral VMs
`;

  return (
    <div style={{ fontSize: 16, lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>
        Lesson 16 — Jenkins Master & Agent Architecture (Docker / Kubernetes / SSH)
      </h1>

      <p style={{ marginTop: 8 }}>
        Jenkins uses a Master (controller) + Agents (workers) model. The Controller
        coordinates jobs, stores state, and manages agents which do the actual builds.
        Production setups prefer ephemeral, autoscaled agents to keep the controller
        lightweight and secure.
      </p>

      <hr />

      <h2>1) Roles & responsibilities</h2>
      <ul>
        <li><strong>Controller (Master)</strong>: Orchestrates builds, stores job configs, UI, credentials.</li>
        <li><strong>Agents</strong>: Execute builds and stages. Should be ephemeral and focused on execution.</li>
      </ul>

      <h3>Why separate?</h3>
      <ul>
        <li>Security — don't run arbitrary build code on controller.</li>
        <li>Scalability — scale workers independently.</li>
        <li>Isolation — different agents have different toolchains (docker, kubectl, etc.).</li>
      </ul>

      <hr />

      <h2>2) Agent launch methods</h2>
      <ul>
        <li><strong>SSH</strong> — traditional, stable. Requires Java on agent.</li>
        <li><strong>JNLP (Inbound)</strong> — agent connects back to controller (works behind NAT).</li>
        <li><strong>Docker plugin</strong> — spawn ephemeral container agents on a Docker host.</li>
        <li><strong>Kubernetes plugin</strong> — spawn ephemeral pods as agents (recommended for K8s).</li>
        <li><strong>Cloud plugins</strong> — EC2, GCE, etc. provision VMs per job.</li>
      </ul>

      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>{provisioningNotes}</pre>

      <hr />

      <h2>3) Docker agents — patterns</h2>
      <p>
        Two common approaches to run Docker inside Jenkins builds:
      </p>
      <ol>
        <li><strong>Docker-in-Docker (dind)</strong> — run a privileged Docker daemon inside the agent container. Works but requires privileged containers and careful security controls.</li>
        <li><strong>Docker socket bind-mount</strong> — mount host <code>/var/run/docker.sock</code> into the agent container so it uses the host daemon. Simpler, faster, but exposes host Docker to container — security risk.</li>
      </ol>

      <h3>Declarative Docker agent example</h3>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>{dockerAgentDeclarative}</pre>

      <p>
        Or in scripted pipeline use <code>docker.image(...).inside()</code> shown below:
      </p>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>{dockerAgentScripted}</pre>

      <hr />

      <h2>4) Kubernetes agents (recommended for k8s infra)</h2>
      <p>
        Kubernetes plugin provisions pods per build using a pod template that includes an inbound JNLP container and any sidecar containers (docker, kaniko, buildah, etc.). Use Kubernetes for cloud-native ephemeral agents.
      </p>

      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>{kubernetesAgent}</pre>

      <hr />

      <h2>5) JNLP vs SSH</h2>
      <ul>
        <li><strong>SSH</strong> — controller connects to agent; agent must be reachable from controller. Good for stable VMs.</li>
        <li><strong>JNLP</strong> — agent initiates connection to controller (useful if controller cannot reach agent). Works well inside cloud/k8s.</li>
      </ul>

      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>{sshLaunch}</pre>

      <hr />

      <h2>6) Workspace persistence & caching</h2>
      <ul>
        <li>Ephemeral agents lose workspace — use artifact archive or remote cache (NFS, S3) if you need persistence.</li>
        <li>For Docker layer cache across builds, use a shared build cache or a remote registry (or bind host docker cache).</li>
        <li>In Kubernetes, use persistent volumes if workspace persistence is required.</li>
      </ul>

      <hr />

      <h2>7) Security & resource limits</h2>
      <ul>
        <li>Run agents with least privilege.</li>
        <li>Avoid mounting host <code>/var/run/docker.sock</code> in untrusted job contexts.</li>
        <li>Apply CPU/memory limits to agent containers/pods to avoid noisy neighbors.</li>
        <li>Use separate agent pools (labels) for trusted vs untrusted jobs.</li>
      </ul>

      <hr />

      <h2>8) Labels & job targeting</h2>
      <p>
        Assign labels to agent templates (e.g., <code>docker-agent</code>, <code>k8s-agent</code>, <code>windows-agent</code>) and reference them in pipelines:
      </p>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>{jnlpAgent}</pre>

      <hr />

      <h2>9) Troubleshooting tips</h2>
      <ul>
        <li>Check agent logs on controller (Manage Jenkins → Nodes → Agent → Log)</li>
        <li>For Docker agents, check container logs on the Docker host</li>
        <li>JNLP connection issues often come from firewalls or mismatched Jenkins URL config</li>
        <li>Kubernetes agent failures: inspect pod events (<code>kubectl describe pod &lt;podname&gt;</code>) and container logs</li>
      </ul>

      <hr />

      <h2>10) Practical Jenkinsfile patterns</h2>

      <h3>Run steps on specific labeled agent</h3>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>
{`pipeline {
  agent { label 'docker-agent' }
  stages {
    stage('Build') { steps { sh 'npm ci; npm run build' } }
    stage('Test') { steps { sh 'npm test' } }
  }
}`}
      </pre>

      <h3>Use Docker agent for ephemeral environment (Declarative)</h3>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>{dockerAgentDeclarative}</pre>

      <h3>Use Kubernetes pod templates for complex builds</h3>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>{kubernetesAgent}</pre>

      <hr />

      <h2>11) Best practices</h2>
      <ol>
        <li>Keep controller minimal — no builds on controller.</li>
        <li>Prefer ephemeral agents (Docker / Kubernetes) to avoid drift.</li>
        <li>Use labels to organize agent capability (nodejs, docker, android, windows).</li>
        <li>Secure credentials in Jenkins credential store; use <code>withCredentials</code>.</li>
        <li>Limit privileges: avoid host socket mounts unless trusted.</li>
        <li>Monitor agent health and autoscaling metrics (queue length, CPU, memory).</li>
      </ol>

      <hr />

      <h2>12) Next steps</h2>
      <p>
        Next lesson (17) covered Docker Swarm — deploying and scaling services. For Jenkins,
        consider Lesson 17: <em>Jenkins Pipeline Libraries & Shared Libraries</em> to centralize pipeline logic.
      </p>

      <hr />

      <div style={{ marginTop: 18 }}>
        <strong>Snippets included:</strong>
        <ul>
          <li>Declarative Docker agent</li>
          <li>Scripted Docker container usage</li>
          <li>JNLP agent example</li>
          <li>Kubernetes agent pod YAML snippet</li>
        </ul>
      </div>

      <p style={{ marginTop: 12, fontWeight: 700 }}>
        Tip: When you add a new agent type, give it a clear label and document its capabilities so pipeline authors know which agent to request.
      </p>
    </div>
  );
}
