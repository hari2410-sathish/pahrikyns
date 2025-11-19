import React from "react";

export default function Lesson17() {
  const basicLibrary = `// vars/helloWorld.groovy
def call(String name = "Student") {
    echo "Hello, ${name}! Welcome to Jenkins Shared Libraries"
}

// Jenkinsfile
@Library('my-shared-lib') _
helloWorld("Hari")
`;

  const structuredLib = `// src/org/pahrikyns/build/NodeBuild.groovy
package org.pahrikyns.build

class NodeBuild implements Serializable {
    def steps
    NodeBuild(steps) { this.steps = steps }

    def install() { steps.sh "npm ci" }
    def test() { steps.sh "npm test" }
    def build() { steps.sh "npm run build" }
}

// vars/nodePipeline.groovy
def call(body) {
    def config = [:]
    body.resolveStrategy = Closure.DELEGATE_FIRST
    body.delegate = config
    body()

    def utils = new org.pahrikyns.build.NodeBuild(this)

    stage("Install") { utils.install() }
    stage("Test") { utils.test() }
    stage("Build") { utils.build() }
}

// Jenkinsfile
@Library('my-shared-lib') _
nodePipeline {
    service = "frontend-app"
}
`;

  const stepsExample = `// vars/dockerBuild.groovy
def call(Map args = [:]) {
    def repo = args.repo ?: error("repo missing")
    def tag = args.tag ?: "latest"

    sh "docker build -t ${repo}:${tag} ."
    sh "docker push ${repo}:${tag}"
}

// Jenkinsfile
@Library("my-shared-lib") _
pipeline {
  agent any
  stages {
    stage("Docker Build") {
      steps {
        dockerBuild repo: "hari/frontend", tag: "1.0.0"
      }
    }
  }
}
`;

  const sharedLibStructure = `shared-library/
├── vars/
│   ├── helloWorld.groovy
│   ├── dockerBuild.groovy
│   └── nodePipeline.groovy
├── src/
│   └── org/pahrikyns/build/NodeBuild.groovy
├── resources/
│   └── templates/email.html
├── test/
│   └── nodePipelineTest.groovy
└── README.md
`;

  const globalConfig = `Manage Jenkins → Configure System → Global Pipeline Libraries:

Name: my-shared-lib
Default Version: main
Retrieval Method: Modern SCM
SCM: Git
Repo URL: https://github.com/hari/my-shared-library.git
`;

  const varsExample = `// vars/slackNotify.groovy
def call(String message) {
    slackSend(channel: "#ci-cd", message: message)
}

// pipeline
@Library('my-shared-lib') _
pipeline {
  agent any
  stages {
    stage('Notify') {
      steps {
        slackNotify("Build started")
      }
    }
  }
}
`;

  const templateExample = `// resources/templates/email.html
<html>
  <body>
    <h1>Build Report</h1>
    <p>Application: ${app}</p>
    <p>Status: ${status}</p>
  </body>
</html>

// vars/reportEmail.groovy
def call(Map data) {
    def template = libraryResource('templates/email.html')
    def content = template
        .replace("\${app}", data.app)
        .replace("\${status}", data.status)

    emailext(
        subject: "Build Report: ${data.app}",
        to: data.email,
        body: content,
        mimeType: 'text/html'
    )
}
`;

  return (
    <div style={{ fontSize: 16, lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>
        Lesson 17 — Jenkins Shared Libraries (Enterprise Pipelines)
      </h1>

      <p>
        Shared Libraries allow teams to centralize pipeline logic, reduce
        duplication, enforce standards, and ship DevOps best practices across
        multiple repositories.
      </p>

      <hr />

      <h2>1) Why Shared Libraries?</h2>
      <ul>
        <li>Write once, use everywhere</li>
        <li>Standard CI/CD stages for all services</li>
        <li>Version-controlled pipelines</li>
        <li>Remove duplicate Jenkinsfile logic</li>
        <li>Enterprise-grade DevOps governance</li>
      </ul>

      <hr />

      <h2>2) Library Structure</h2>
      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {sharedLibStructure}
      </pre>

      <hr />

      <h2>3) Simple HelloWorld Library</h2>
      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {basicLibrary}
      </pre>

      <hr />

      <h2>4) Advanced Pipeline Library (Real Microservice Setup)</h2>
      <p>Using classes under <code>src/</code> + orchestration in <code>vars/</code>:</p>

      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {structuredLib}
      </pre>

      <hr />

      <h2>5) Real-World Reusable Steps (dockerBuild example)</h2>
      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {stepsExample}
      </pre>

      <hr />

      <h2>6) Configure Shared Library Globally</h2>
      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {globalConfig}
      </pre>

      <hr />

      <h2>7) Using vars/ folder for utility functions</h2>
      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {varsExample}
      </pre>

      <hr />

      <h2>8) Using resources/ for templates</h2>
      <p>Templates allow emails, YAML, HTML, JSON, etc.</p>

      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {templateExample}
      </pre>

      <hr />

      <h2>9) Testing Shared Libraries</h2>
      <ul>
        <li>Use Jenkins Pipeline Unit (Groovy JUnit)</li>
        <li>Mock steps and validate behavior</li>
        <li>Enforce quality before library changes</li>
      </ul>

      <hr />

      <h2>10) Best Practices</h2>
      <ol>
        <li>Never hardcode environment values</li>
        <li>Use <code>config maps</code> inside shared libraries</li>
        <li>Ensure all functions are documented in README.md</li>
        <li>Keep libraries versioned: use Git tags → "v1", "v2"</li>
        <li>Autoload libraries using <code>@Library('lib-name') _</code></li>
      </ol>

      <hr />

      <h2>11) Conclusion</h2>
      <p>
        Shared Libraries are the backbone of reusable, enterprise-level Jenkins
        automation. They transform CI/CD from ad-hoc scripts to a professional,
        centralized, governed DevOps pipeline ecosystem.
      </p>

      <p style={{ fontWeight: 700 }}>
        Next: Lesson 18 — Jenkins Global Config, Credentials, Secrets Best
        Practices
      </p>
    </div>
  );
}
