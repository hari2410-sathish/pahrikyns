export default function Lesson7() {
  return (
    <div style={{ fontSize: "17px", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
        Jenkins Lesson 7 — Credentials, Secrets & Secure Token Management
      </h1>

      <p>
        Jenkins provides a strong <b>Credentials Management System</b> to store
        sensitive values securely (passwords, API keys, SSH keys, tokens).
      </p>

      <p>In this lesson you’ll learn:</p>

      <ul>
        <li>Types of Jenkins credentials</li>
        <li>How to store & use secrets safely</li>
        <li>Using credentials inside pipelines</li>
        <li>Credential Binding</li>
        <li>SSH Agent setup</li>
        <li>API tokens & secret text</li>
        <li>HashiCorp Vault + Jenkins integration</li>
        <li>Best security practices</li>
      </ul>

      {/* ----------------------------------------------------- */}
      <h2>1) 🔐 What are Jenkins Credentials?</h2>
      <p>
        Jenkins stores secrets in an encrypted XML file under the folder:
      </p>

      <pre className="code-block">
{`/var/lib/jenkins/credentials.xml`}
      </pre>

      <p>All credentials are encrypted using Jenkins master key.</p>

      <h3>Credential Types:</h3>
      <ul>
        <li><b>Username + Password</b></li>
        <li><b>SSH private key</b></li>
        <li><b>Secret text</b> (API keys, tokens)</li>
        <li><b>Secret file</b> (JSON, config files)</li>
        <li><b>Certificate</b></li>
        <li><b>Vault Secrets</b> (with plugin)</li>
      </ul>

      <p>All stored under:</p>
      <pre className="code-block">
{`Jenkins → Manage Jenkins → Credentials`}
      </pre>

      {/* ----------------------------------------------------- */}
      <h2>2) 🔑 Adding Credentials</h2>

      <ol>
        <li>Go to <b>Manage Jenkins</b></li>
        <li>Open <b>Credentials</b></li>
        <li>Select Global → Add Credentials</li>
      </ol>

      <h3>Common examples:</h3>

      <p><b>For GitHub</b> → Personal access token</p>
      <p><b>For DockerHub</b> → Username + Password</p>
      <p><b>For AWS</b> → Access key + Secret key</p>
      <p><b>For SSH deployment</b> → Private key</p>

      {/* ----------------------------------------------------- */}
      <h2>3) 🧩 Using Credentials in Pipelines</h2>
      <p>You must use the block:</p>

      <pre className="code-block">
{`withCredentials([xxx(credentialsId: 'id')]) { ... }`}
      </pre>

      {/* ----------------------------------------------------- */}
      <h3>a) Username & Password</h3>

      <pre className="code-block">
{`withCredentials([usernamePassword(credentialsId: 'git-cred', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
    sh 'git clone https://$USER:$PASS@github.com/repo/project.git'
}`}
      </pre>

      {/* ----------------------------------------------------- */}
      <h3>b) Secret Text (API Tokens)</h3>

      <pre className="code-block">
{`withCredentials([string(credentialsId: 'api-token', variable: 'TOKEN')]) {
    sh 'curl -H "Authorization: Bearer $TOKEN" https://api.example.com'
}`}
      </pre>

      {/* ----------------------------------------------------- */}
      <h3>c) SSH Private Key</h3>

      <pre className="code-block">
{`sshagent(['ssh-key-id']) {
    sh 'git clone git@github.com:project/repo.git'
}`}
      </pre>

      {/* ----------------------------------------------------- */}
      <h3>d) Secret File</h3>

      <pre className="code-block">
{`withCredentials([file(credentialsId: 'config-json', variable: 'FILE')]) {
    sh 'cat $FILE'
}`}
      </pre>

      {/* ----------------------------------------------------- */}
      <h2>4) 🔒 Masking Secrets</h2>
      <p>Jenkins always hides secrets in logs:</p>

      <pre className="code-block">
{`***  masked ***`}
      </pre>

      <p>This prevents accidental leaks in console output.</p>

      {/* ----------------------------------------------------- */}
      <h2>5) 📦 Using Credentials from Environment Variables</h2>

      <pre className="code-block">
{`environment {
  MY_API_KEY = credentials('api-key')
}`}
      </pre>

      <p>This automatically binds the secret.</p>

      {/* ----------------------------------------------------- */}
      <h2>6) 🧰 Example — Git clone with SSH key</h2>

      <pre className="code-block">
{`pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                sshagent(['ssh-git-key']) {
                    sh 'git clone git@github.com:org/app.git'
                }
            }
        }
    }
}`}
      </pre>

      {/* ----------------------------------------------------- */}
      <h2>7) 🔐 Jenkins + HashiCorp Vault Integration</h2>
      <p>
        For enterprise security, secrets must NOT be stored in Jenkins.  
        Use <b>Vault Plugin</b>.
      </p>

      <h3>Install:</h3>
      <ul>
        <li>Vault Plugin</li>
        <li>Vault Credentials Provider</li>
      </ul>

      <h3>Vault pipeline example:</h3>
      <pre className="code-block">
{`pipeline {
  agent any

  environment {
    SECRET = vault path: 'secret/data/dev', key: 'password'
  }

  stages {
    stage('show') {
      steps {
        sh 'echo "Password is $SECRET"'
      }
    }
  }
}`}
      </pre>

      <p><b>Note:</b> Vault injects secret at runtime, not stored in Jenkins.</p>

      {/* ----------------------------------------------------- */}
      <h2>8) ⚠️ Best Practices</h2>

      <ul>
        <li>Never print secrets in logs</li>
        <li>Use secret text for API tokens</li>
        <li>Use SSH keys instead of passwords</li>
        <li>Use Vault for production-level secrets</li>
        <li>Restrict credentials to folders/jobs</li>
        <li>Rotate credentials regularly</li>
        <li>Use Jenkins RBAC to limit access</li>
      </ul>

      {/* ----------------------------------------------------- */}
      <h2>9) 🧩 Troubleshooting</h2>

      <ul>
        <li>❌ *Invalid SSH key* → Wrong key format</li>
        <li>❌ *Permission denied* → Agent lacks access</li>
        <li>❌ *Unable to find credentialsId* → Check scope (folder/global)</li>
        <li>❌ *Secret not masked* → Missing `withCredentials` block</li>
      </ul>

      {/* ----------------------------------------------------- */}
      <h2>🎯 Summary</h2>

      <ul>
        <li>Jenkins stores secrets securely</li>
        <li>Use Credential Binding for pipelines</li>
        <li>SSH, tokens, user/pass, files supported</li>
        <li>Vault for enterprise secret management</li>
        <li>Never expose secrets in logs</li>
      </ul>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>
        Next: Lesson 8 — Jenkins Builds: Parallel, Matrix, and Multi-Branch Pipelines
      </p>
    </div>
  );
}
