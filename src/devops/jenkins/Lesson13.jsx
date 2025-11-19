export default function Lesson13() {
  return (
    <div style={{ fontSize: "17px", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "28px", fontWeight: 800 }}>
        Jenkins Lesson 13 — Shared Libraries, Global Functions & Reusable Pipelines
      </h1>

      <p>
        Large companies NEVER copy-paste Jenkinsfiles.  
        They use a **Shared Library** to centralize:
      </p>

      <ul>
        <li>Reusable functions</li>
        <li>Pipeline templates</li>
        <li>Environment standards</li>
        <li>Approval flows</li>
        <li>Slack notifications</li>
        <li>Kubernetes pod templates</li>
      </ul>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>1) 🔥 What is a Shared Library?</h2>

      <p>
        A Shared Library is a **Git repository** that contains reusable Jenkins
        pipeline code.
      </p>

      <p>Folder structure:</p>

      <pre className="code-block">
{`(Git Repo)
├── vars/
│   ├── deploy.groovy
│   ├── dockerBuild.groovy
│   └── notifySlack.groovy
└── src/
    └── org/company/ci/MyHelpers.groovy`}
      </pre>

      <p>Every `.groovy` file becomes a **global function** callable inside any Jenkinsfile.</p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>2) 🗂 vars/ — Global Functions</h2>

      <p>The simplest reusable function:</p>

      <h3><code>vars/hello.groovy</code></h3>

      <pre className="code-block">
{`def call(String name) {
  echo "Hello, ${name}! From Shared Library."
}`}
      </pre>

      <h3>Use inside Jenkinsfile:</h3>

      <pre className="code-block">
{`@Library('my-shared-lib') _
pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        hello("Hari")
      }
    }
  }
}`}
      </pre>

      <p>💡 Any file inside <code>vars/</code> automatically becomes a global function.</p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>3) 🧱 Reusable Build Function</h2>

      <h3><code>vars/dockerBuild.groovy</code></h3>

      <pre className="code-block">
{`def call(String image) {
  sh """
    docker build -t ${image}:${env.BUILD_NUMBER} .
    docker push ${image}:${env.BUILD_NUMBER}
  """
}`}
      </pre>

      <h3>Use in Jenkinsfile:</h3>

      <pre className="code-block">
{`dockerBuild("pahrikyns/myapp")`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>4) 🚀 Reusable Deployment Function</h2>

      <h3><code>vars/deploy.groovy</code></h3>

      <pre className="code-block">
{`def call(String server, String app) {
  sh """
    ssh ubuntu@${server} "
      docker pull ${app}:${env.BUILD_NUMBER}
      docker compose down && docker compose up -d
    "
  """
}`}
      </pre>

      <h3>Usage:</h3>

      <pre className="code-block">
{`deploy("10.0.0.5", "pahrikyns/myapp")`}
      </pre>

      <p>🔥 Production companies use exactly this pattern.</p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>5) 🛠 Reusable Pipeline (Pipeline Template)</h2>

      <p>
        You can define a **full pipeline** in Shared Library and reuse it for
        many repos.
      </p>

      <h3><code>vars/nodeCi.groovy</code></h3>

      <pre className="code-block">
{`def call() {
  pipeline {
    agent any

    stages {
      stage('Install') {
        steps { sh 'npm install' }
      }
      stage('Test') {
        steps { sh 'npm test' }
      }
      stage('Build') {
        steps { sh 'npm run build' }
      }
    }

    post {
      always { cleanWs() }
    }
  }
}`}
      </pre>

      <h3>Use it like this:</h3>

      <pre className="code-block">
{`@Library('my-shared-lib') _
nodeCi()`}
      </pre>

      <p>
        🧠 No Jenkinsfile needed per project — everything is standardized.
      </p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>6) ☸ Kubernetes Pod Template as Shared Library</h2>

      <h3><code>vars/k8sNode.groovy</code></h3>

      <pre className="code-block">
{`def call() {
  podTemplate(
    containers: [
      containerTemplate(name: 'maven', image: 'maven:3.9.6', ttyEnabled: true),
      containerTemplate(name: 'node', image: 'node:18', ttyEnabled: true)
    ]
  ) {
    node(POD_LABEL) {
      checkout scm
      container('maven') { sh 'mvn -version' }
      container('node') { sh 'node -v' }
    }
  }
}`}
      </pre>

      <h3>Use it:</h3>

      <pre className="code-block">
{`k8sNode()`}
      </pre>

      <p>
        This is how **Netflix, Spotify, Uber** scale Jenkins.
      </p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>7) 🔔 Slack Notification Library Function</h2>

      <h3><code>vars/notifySlack.groovy</code></h3>

      <pre className="code-block">
{`def call(String msg) {
  slackSend channel: '#ci-alerts', message: msg
}`}
      </pre>

      <h3>Usage:</h3>

      <pre className="code-block">
{`notifySlack("Build Completed Successfully!")`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>8) 🔒 Credentials Access in Shared Library</h2>

      <h3><code>vars/awsLogin.groovy</code></h3>

      <pre className="code-block">
{`def call() {
  withCredentials([aws(accessKeyVariable: 'AWS_ACCESS', secretKeyVariable: 'AWS_SECRET', credentialsId: 'aws-creds')]) {
    sh 'aws sts get-caller-identity'
  }
}`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>9) 📁 src/org/company/ci/ — Class-based Helpers</h2>

      <p>You can create classes:</p>

      <pre className="code-block">
{`package org.company.ci

class MyHelpers {
  static void printEnv(env) {
    env.each { k, v -> println "${k} = ${v}" }
  }
}`}
      </pre>

      <h3>Use in Jenkinsfile:</h3>

      <pre className="code-block">
{`import org.company.ci.MyHelpers

MyHelpers.printEnv(env)`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>10) 💼 Using @Library with Versioning</h2>

      <pre className="code-block">
{`@Library('my-shared-lib@v2.1') _`}
      </pre>

      <p>
        Each repo can lock to a version — safe & stable for enterprise use.
      </p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>🎬 Summary</h2>

      <ul>
        <li>Shared Libraries = enterprise-level Jenkins pipelines</li>
        <li>Functions inside <code>vars/</code> become global helpers</li>
        <li>You can create full reusable pipelines</li>
        <li>Ideal for microservices</li>
        <li>Kubernetes + Shared Library = auto-scaling CI/CD</li>
        <li>Helps avoid duplicate Jenkinsfile code</li>
      </ul>

      <p style={{ marginTop: "25px", fontWeight: 700 }}>
        Next: Lesson 14 — Jenkins Security, Credentials, Tokens, RBAC 🔐  
        (Very important for DevOps interviews)
      </p>
    </div>
  );
}
