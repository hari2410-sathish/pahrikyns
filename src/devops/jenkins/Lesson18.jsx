import React from "react";

export default function Lesson18() {
  const jdkConfig = `Manage Jenkins → Global Tool Configuration:
- Add JDK
- Add Git
- Add Docker
- Add NodeJS
`;

  const credentialTypes = `# Jenkins Credential Types:
1) Username / Password      (git push, docker login)
2) Secret Text              (API tokens)
3) SSH Username w/ Key      (GitHub SSH deploy keys)
4) Secret File              (JSON, kubeconfig)
5) Certificate              (p12, keystore)
6) AWS Credentials          (Access Key + Secret)
`;

  const injectExample = `pipeline {
  agent any
  environment {
    API_TOKEN = credentials('api-token-id')
  }
  stages {
    stage('Use Secret') {
      steps {
        sh 'curl -H "Authorization: Bearer $API_TOKEN" https://api.example.com'
      }
    }
  }
}`;

  const withCredentialsExample = `withCredentials([string(credentialsId: 'my-api', variable: 'TOKEN')]) {
  sh 'curl -H "Authorization: Bearer ' + TOKEN + '" https://api.com'
}`;

  const sshExample = `withCredentials([sshUserPrivateKey(
  credentialsId: 'github-ssh',
  keyFileVariable: 'SSH_KEY',
  usernameVariable: 'USER'
)]) {
  sh 'GIT_SSH_COMMAND="ssh -i $SSH_KEY" git clone git@github.com:repo/app.git'
}`;

  const secretFileExample = `withCredentials([file(credentialsId: 'gcloud-json', variable: 'GCLOUD_FILE')]) {
  sh 'gcloud auth activate-service-account --key-file=$GCLOUD_FILE'
}`;

  const vaultExample = `pipeline {
  agent any
  stages {
    stage('Vault') {
      steps {
        withVault(configuration: [vaultUrl: 'http://vault:8200', credentialsId: 'vault-token']) {
          sh 'echo "Secret: $SECRET_VALUE"'
        }
      }
    }
  }
}`;

  const bestPractices = `✔ NEVER hardcode secrets  
✔ NEVER print secrets in logs  
✔ Use "withCredentials {...}" for all sensitive values  
✔ Use folders to isolate credential access  
✔ Rotate credentials frequently  
✔ Enable RBAC + Matrix Auth  
✔ Use HashiCorp Vault / AWS Secrets Manager  
✔ Remove unused credentials monthly  
✔ Restrict who can add/modify credentials`;

  return (
    <div style={{ fontSize: 16, lineHeight: 1.7, paddingBottom: 60 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>
        Lesson 18 — Global Configuration, Credentials & Secrets Management
      </h1>

      <p>
        Every enterprise Jenkins setup depends on proper global configuration and secure
        secrets handling. In this lesson we cover tools, credentials, secret injection,
        Vault integration, and best practices for high-security DevOps pipelines.
      </p>

      <hr />

      <h2>1) Global Tool Configuration</h2>
      <p>Jenkins allows centralized configuration of tools for ALL pipelines.</p>

      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {jdkConfig}
      </pre>

      <p>
        These tools are globally available to any pipeline via:
        <br />
        <code>tool 'JDK-17'</code>, <code>tool 'NodeJS-18'</code>, <code>docker.label</code>, etc.
      </p>

      <hr />

      <h2>2) Credentials Management (MOST IMPORTANT)</h2>
      <p>
        Jenkins credentials are encrypted and stored securely under: <br />
        <b>Manage Jenkins → Credentials</b>.
      </p>

      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {credentialTypes}
      </pre>

      <hr />

      <h2>3) Injecting Secrets Using "environment { credentials() }"</h2>

      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {injectExample}
      </pre>

      <p>
        <b>Important:</b> Jenkins masks secrets so even if printed accidentally, logs show
        <i>******</i>.
      </p>

      <hr />

      <h2>4) Using withCredentials() Block</h2>
      <p>Industry standard for handling secrets safely inside pipelines.</p>

      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {withCredentialsExample}
      </pre>

      <hr />

      <h2>5) SSH Keys for Git Operations</h2>
      <p>
        Use <code>SSH Username with private key</code> to access private Git repos, deploy
        keys, or remote servers.
      </p>

      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {sshExample}
      </pre>

      <hr />

      <h2>6) Secret File Example (JSON, Kubeconfig, Certificates)</h2>
      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {secretFileExample}
      </pre>

      <hr />

      <h2>7) Vault Integration (Enterprise Secrets Rotation)</h2>

      <pre
        style={{
          background: "#0b1220",
          color: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        {vaultExample}
      </pre>

      <p>
        Vault allows dynamic secrets: Jenkins fetches credentials only when needed and
        discards after use.
      </p>

      <hr />

      <h2>8) Best Practices — MUST FOLLOW</h2>

      <pre
        style={{
          background: "#111827",
          color: "#10b981",
          padding: 16,
          borderRadius: 6,
        }}
      >
        {bestPractices}
      </pre>

      <hr />

      <h2>9) Summary</h2>
      <p>
        With proper credential handling, Jenkins becomes secure, auditable, and compliant
        with enterprise DevOps standards. Every pipeline should use secret injection and
        <code>withCredentials</code> blocks.
      </p>

      <p style={{ fontWeight: 700, marginTop: 20 }}>
        Next: Lesson 19 — Jenkins Notifications: Slack, Email, Webhooks, MS Teams, SMS
      </p>
    </div>
  );
}
