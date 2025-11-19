export default function Lesson10() {
  return (
    <div style={{ fontSize: "17px", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
        Jenkins Lesson 10 — Credentials, Secrets & Secure Pipelines
      </h1>

      <p>
        This lesson covers everything about storing and using secret data in
        Jenkins securely.
      </p>

      <ul>
        <li>🔑 Jenkins Credentials Store</li>
        <li>🧪 Usernames, Passwords, Secret Text, SSH keys</li>
        <li>🔐 Masked variables</li>
        <li>🛠 Using credentials inside Jenkinsfile</li>
        <li>☸️ Integrating with Vault, AWS Secrets Manager, K8s Secrets</li>
        <li>🚫 What *NOT* to do (common mistakes)</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>1) 🔑 What Are Jenkins Credentials?</h2>

      <p>
        Jenkins <b>never stores passwords in plain text</b>.  
        All sensitive data goes into:
      </p>

      <ul>
        <li>Dashboard → Manage Jenkins → Credentials</li>
      </ul>

      <h3>Types of credentials:</h3>
      <ul>
        <li><b>Username & Password</b> — GitHub, Docker Hub, Nexus</li>
        <li><b>Secret Text</b> — API tokens</li>
        <li><b>SSH Private Key</b> — Git SSH access</li>
        <li><b>Secret File</b> — JSON files, kubeconfig</li>
        <li><b>Certificate</b> — .p12/.crt</li>
      </ul>

      <h3>Scopes:</h3>
      <ul>
        <li><b>Global</b> – available to all jobs</li>
        <li><b>Folder</b> – available only within a folder</li>
        <li><b>Agent</b> – available only on specific node</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>2) 🧪 Adding credentials</h2>

      <h3>Step-by-step:</h3>
      <ol>
        <li>Dashboard → Manage Jenkins → Credentials</li>
        <li>Select "Global credentials"</li>
        <li>Click <b>"Add Credentials"</b></li>
        <li>Select type (e.g., Secret text)</li>
        <li>Give an <b>ID</b> (example: <code>docker-token</code>)</li>
        <li>Save</li>
      </ol>

      <p>
        You ALWAYS reference credentials by <b>ID</b> in the Jenkinsfile.
      </p>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>3) 🛠 Using Credentials in Jenkinsfile</h2>

      <h3>1) Using username + password</h3>

      <pre className="code-block">
{`pipeline {
  agent any

  stages {
    stage('Login Docker') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'USER',
          passwordVariable: 'PASS'
        )]) {
          sh 'echo "$PASS" | docker login -u "$USER" --password-stdin'
        }
      }
    }
  }
}`}
      </pre>

      <h3>2) Secret Text (API token)</h3>

      <pre className="code-block">
{`withCredentials([string(credentialsId: 'github-token', variable: 'TOKEN')]) {
  sh 'curl -H "Authorization: token $TOKEN" https://api.github.com/user'
}`}
      </pre>

      <h3>3) SSH Private Key</h3>

      <pre className="code-block">
{`withCredentials([sshUserPrivateKey(
  credentialsId: 'git-ssh',
  keyFileVariable: 'SSH_KEY',
  usernameVariable: 'USER'
)]) {
  sh 'ssh -i $SSH_KEY $USER@server ls -la'
}`}
      </pre>

      <h3>4) Secret File</h3>

      <pre className="code-block">
{`withCredentials([file(credentialsId: 'gcp-key', variable: 'KEYFILE')]) {
  sh 'gcloud auth activate-service-account --key-file=$KEYFILE'
}`}
      </pre>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>4) 🔐 Masking & Environment Injection</h2>

      <p>
        Jenkins automatically hides sensitive values in logs.
      </p>

      <pre className="code-block">
{`withCredentials([string(credentialsId: 'api-key', variable: 'KEY')]) {
  sh 'echo $KEY'   # masked in console
}`}
      </pre>

      <p>Even if someone tries to print it, Jenkins replaces it with **"****"**.</p>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>5) 🤝 Using Credentials in Declarative vs Scripted</h2>

      <h3>Declarative:</h3>
      <pre className="code-block">
{`environment {
  DOCKER_PASSWORD = credentials('docker-pass')
}

steps {
  sh 'docker login -u user -p $DOCKER_PASSWORD'
}`}
      </pre>

      <h3>Scripted:</h3>
      <pre className="code-block">
{`node {
  withCredentials([string(credentialsId: 'slack-token', variable: 'SLACK')]) {
    sh "echo Token: $SLACK"
  }
}`}
      </pre>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>6) ☸️ Vault, AWS Secrets Manager & K8s Secrets</h2>

      <h3>🔹 1) HashiCorp Vault Plugin</h3>
      <ul>
        <li>Uses Vault to fetch secrets dynamically</li>
        <li>Secrets are NEVER stored in Jenkins</li>
      </ul>

      <pre className="code-block">
{`pipeline {
  agent any

  environment {
    DB_PASS = vault path: 'secret/db', key: 'password'
  }

  stages {
    stage('Test') {
      steps { sh 'echo $DB_PASS' }
    }
  }
}`}
      </pre>

      <h3>🔹 2) AWS Secrets Manager Plugin</h3>

      <pre className="code-block">
{`environment {
  MY_SECRET = awsSecretsManager(
    secretId: 'prod/db',
    jmesPath: 'password'
  )
}`}
      </pre>

      <h3>🔹 3) Kubernetes Secrets (with Pod templates)</h3>

      <pre className="code-block">
{`container('node') {
  sh 'echo $MY_SECRET'
}`}
      </pre>

      <p>Great for multi-cluster CI/CD flows.</p>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>7) 🚫 Common Mistakes (NEVER DO THIS)</h2>

      <ul>
        <li>❌ Hardcoding passwords inside Jenkinsfile</li>
        <li>❌ Storing tokens in GitHub repo</li>
        <li>❌ Echoing credentials in console logs</li>
        <li>❌ Using same credentials for all jobs</li>
        <li>❌ Using Global scope unnecessarily</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>8) ✔ Best Practices</h2>

      <ul>
        <li>Use separate credentials per environment (dev/stage/prod)</li>
        <li>Rotate passwords/tokens every 60–90 days</li>
        <li>Use Vault/AWS Secrets Manager for critical workloads</li>
        <li>Use least-privilege IAM roles</li>
        <li>Use SSH keys instead of passwords</li>
      </ul>

      <hr />

      {/* ----------------------------------------------------- */}
      <h2>🎬 Summary</h2>

      <p>In this lesson, you learned:</p>
      <ul>
        <li>How Jenkins stores and protects credentials</li>
        <li>How to safely use secrets in pipelines</li>
        <li>Dynamic secrets with Vault & cloud providers</li>
        <li>Security best practices</li>
      </ul>

      <p style={{ marginTop: "25px", fontWeight: "bold" }}>
        Next: Lesson 11 — Artifacts, Archiving, JUnit Reports, and Test Pipelines 🚀
      </p>
    </div>
  );
}
