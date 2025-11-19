export default function Lesson14() {
  return (
    <div style={{ fontSize: "17px", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "28px", fontWeight: 800 }}>
        Jenkins Lesson 14 — Security, RBAC, Credentials & Hardening
      </h1>

      <p>
        Jenkins security is a MAJOR interview topic and crucial in production.
        In this lesson, we cover:
      </p>

      <ul>
        <li>RBAC (Role Based Access Control)</li>
        <li>Credentials management</li>
        <li>User permissions & Matrix authorization</li>
        <li>API tokens & access control</li>
        <li>Secrets protection</li>
        <li>Hardening Jenkins master</li>
        <li>Best practices for DevOps teams</li>
      </ul>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>1) 🔐 Jenkins Security Model</h2>

      <p>Jenkins has several layers of security:</p>

      <ul>
        <li>Authentication → Who are you?</li>
        <li>Authorization → What can you do?</li>
        <li>Credentials → Secure storage of secrets</li>
        <li>Agents security → Sandbox, permissions</li>
        <li>Pipeline security → Script approval</li>
      </ul>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>2) 👥 Authentication Options</h2>

      <p>Common ways to authenticate users:</p>

      <ul>
        <li>Jenkins internal user database</li>
        <li>LDAP (Active Directory)</li>
        <li>GitHub OAuth (very common)</li>
        <li>Keycloak SSO</li>
        <li>SAML / OIDC</li>
      </ul>

      <p>For enterprise use — always prefer SSO / LDAP.</p>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>3) 🧩 Authorization (RBAC)</h2>

      <p>Jenkins supports multiple authorization strategies:</p>

      <h3>1. Matrix-based security (MOST COMMON)</h3>

      <ul>
        <li>Assign granular permissions</li>
        <li>Per user or per group</li>
        <li>Best for large teams</li>
      </ul>

      <pre className="code-block">
{`Manage Jenkins → Configure Global Security → Authorization: Matrix` }
      </pre>

      <h3>2. Project-based Matrix</h3>

      <p>Different permissions per job.</p>

      <h3>3. Role-Based Strategy Plugin (Enterprise)</h3>

      <p>You can define:</p>

      <ul>
        <li>Global roles (admin, dev, viewer)</li>
        <li>Project roles (specific folders)</li>
        <li>Slave roles (agent permissions)</li>
      </ul>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>4) 🔑 Jenkins Credentials (MOST IMPORTANT)</h2>

      <p>Jenkins stores secrets securely in:</p>

      <pre className="code-block">Manage Jenkins → Credentials</pre>

      <h3>Types of credentials:</h3>

      <ul>
        <li>Username + Password</li>
        <li>SSH Private Key</li>
        <li>Secret Text (Tokens)</li>
        <li>AWS Credentials</li>
        <li>Certificate</li>
      </ul>

      <h3>Example: Using Credentials in Pipeline</h3>

      <pre className="code-block">
{`withCredentials([usernamePassword(credentialsId: 'docker-hub',
                                    usernameVariable: 'USER',
                                    passwordVariable: 'PASS')]) {
  sh 'echo $USER'
  sh 'docker login -u $USER -p $PASS'
}`}
      </pre>

      <h3>Secret text example (GitHub Token):</h3>

      <pre className="code-block">
{`withCredentials([string(credentialsId: 'github-token', variable: 'TOKEN')]) {
  sh 'curl -H "Authorization: token $TOKEN" https://api.github.com/user'
}`}
      </pre>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>5) 🔒 API Tokens (Instead of password!)</h2>

      <p>Users should NEVER use Jenkins password in scripts.</p>

      <p>Create API token:</p>

      <pre className="code-block">User → Configure → API Token → Generate</pre>

      <h3>Use token for API:</h3>

      <pre className="code-block">
{`curl -u "hari:TOKEN_VALUE" https://jenkins/job/build/api/json`}
      </pre>

      <p>In production, use:</p>

      <ul>
        <li>Secret text credential</li>
        <li>WithCredentials wrapper</li>
      </ul>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>6) 🛡 Script Approval (Groovy Sandbox)</h2>

      <p>
        Jenkins protects you from running unsafe Groovy inside pipelines.
        When a pipeline uses non-standard methods:
      </p>

      <pre className="code-block">Manage Jenkins → In-process Script Approval</pre>

      <p>Pipeline using unsafe code:</p>

      <pre className="code-block">
{`def home = System.getenv("HOME")  // requires approval`}
      </pre>

      <p>Sandbox protects Jenkins master.</p>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>7) 🔥 Hardening Jenkins (Must-do for Production)</h2>

      <h3>1) Disable CLI</h3>

      <pre className="code-block">
{`java -jar jenkins.war --argumentsRealm.passwd.admin=...`}
      </pre>

      <p>Disable if not used.</p>

      <h3>2) Limit anonymous access</h3>

      <p>Anonymous should have ZERO permissions.</p>

      <h3>3) Don’t run Jenkins as root</h3>

      <pre className="code-block">useradd --system jenkins</pre>

      <h3>4) HTTPS Only</h3>

      <p>Use NGINX reverse proxy to enable SSL.</p>

      <h3>5) Backup strategies</h3>

      <ul>
        <li>ThinBackup plugin</li>
        <li>Backup JENKINS HOME</li>
        <li>Backup Job configs</li>
        <li>Backup credentials.xml securely</li>
      </ul>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>8) 🔐 Secrets in Jenkinsfile (Never Hardcode!)</h2>

      <pre className="code-block">
{`def password = "12345"   // ❌ WRONG`}
      </pre>

      <h3>Use credentialsId instead:</h3>

      <pre className="code-block">
{`withCredentials([string(credentialsId: 'db-pass', variable: 'PASS')]) {
  sh "mysql -u root -p$PASS -e 'SELECT 1'"
}`}
      </pre>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>9) 🕵️ Security for Agents</h2>

      <ul>
        <li>Use JNLP agents with restricted permissions</li>
        <li>Do not allow root user inside agent container</li>
        <li>Disable “Execute shell as root”</li>
        <li>Restrict inbound agents from internet</li>
      </ul>

      <h3>Docker agent best practice:</h3>

      <pre className="code-block">
{`FROM jenkins/inbound-agent
USER jenkins   // non-root`}
      </pre>

      <hr />

      {/* ----------------------------------------------- */}
      <h2>🔚 Summary</h2>

      <ul>
        <li>Use Matrix or RBAC plugin for permissions</li>
        <li>Never expose passwords/token in pipelines</li>
        <li>Always use credentialsId + withCredentials</li>
        <li>Use Script Approval when needed</li>
        <li>Harden Jenkins master + secure HTTPS</li>
        <li>Use API tokens instead of passwords</li>
      </ul>

      <p style={{ marginTop: "25px", fontWeight: 700 }}>
        Next: Lesson 15 — Jenkins + Docker: Build, Push, CI/CD Pipeline 🚀
      </p>
    </div>
  );
}
