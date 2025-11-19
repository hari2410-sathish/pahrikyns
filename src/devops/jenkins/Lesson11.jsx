export default function Lesson11() {
  return (
    <div style={{ fontSize: "17px", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "28px", fontWeight: 800 }}>
        Jenkins Lesson 11 — Artifacts, JUnit Reports & HTML Reports
      </h1>

      <p>
        In CI/CD, you will always need to store build outputs, test reports,
        logs, coverage data, and share files between stages.
      </p>

      <ul>
        <li>📦 Artifacts & Archiving</li>
        <li>🧪 JUnit Tests</li>
        <li>📊 HTML Reports</li>
        <li>🎒 Stash & Unstash</li>
        <li>📁 Sharing workspace between stages</li>
        <li>🚀 Publishing reports in Jenkins UI</li>
      </ul>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>1) 📦 What Are Artifacts?</h2>

      <p>
        Artifacts are **files produced by your build** that Jenkins keeps for
        later.  
        Examples:
      </p>

      <ul>
        <li>build.zip</li>
        <li>docker-image.tar</li>
        <li>test-results.xml</li>
        <li>coverage reports</li>
        <li>logs</li>
      </ul>

      <h3>Basic syntax:</h3>
      <pre className="code-block">
{`archiveArtifacts artifacts: 'dist/**', fingerprint: true`}
      </pre>

      <ul>
        <li><b>artifacts:</b> path or pattern</li>
        <li><b>fingerprint:</b> tracks artifacts across pipelines</li>
      </ul>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>2) 📁 Example: Archiving build output</h2>

      <pre className="code-block">
{`pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage('Archive') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }
  }
}`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>3) 🧪 JUnit Test Reports</h2>

      <p>
        Jenkins automatically reads **JUnit XML files** and displays test
        results under:
      </p>

      <b>Job → Last build → Test Results</b>

      <h3>JUnit Plugin Syntax</h3>
      <pre className="code-block">
{`junit '**/test-results/*.xml'`}
      </pre>

      <h3>Example Pipeline</h3>

      <pre className="code-block">
{`pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        sh 'pytest --junitxml=results.xml'
      }
    }

    stage('Publish Test Result') {
      steps {
        junit 'results.xml'
      }
    }
  }
}`}
      </pre>

      <p>
        If tests fail → build will be marked **UNSTABLE**, not FAILED.  
        (You can change this.)
      </p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>4) 📊 HTML Reports in Jenkins</h2>

      <p>
        To show a fully formatted HTML report in Jenkins, use:
      </p>

      <pre className="code-block">
{`publishHTML(target: [
  reportDir: 'coverage',
  reportFiles: 'index.html',
  reportName: 'Coverage Report'
])`}
      </pre>

      <h3>Example:</h3>
      <pre className="code-block">
{`pipeline {
  agent any

  stages {
    stage('Coverage') {
      steps {
        sh 'npm test -- --coverage'
      }
    }

    stage('Publish HTML') {
      steps {
        publishHTML(target: [
          reportDir: 'coverage',
          reportFiles: 'index.html',
          reportName: 'Coverage Report'
        ])
      }
    }
  }
}`}
      </pre>

      <p>
        After build, the report appears in left side panel:  
        <b>Coverage Report ➜ Open Report</b>
      </p>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>5) 🎒 Stash & Unstash (sharing workspace between stages)</h2>

      <p>
        When you run pipelines in multiple agents (e.g., build on Linux,
        test on Windows), Jenkins uses <b>stash</b> & <b>unstash</b>.
      </p>

      <h3>Example:</h3>

      <pre className="code-block">
{`stage('Build') {
  agent { label 'linux' }
  steps {
    sh 'npm run build'
    stash name: 'build-output', includes: 'dist/**'
  }
}

stage('Deploy') {
  agent { label 'deploy-node' }
  steps {
    unstash 'build-output'
    sh 'cp -r dist /var/www/'
  }
}`}
      </pre>

      <h3>Key notes:</h3>
      <ul>
        <li><b>stash</b> bundles selected files</li>
        <li><b>unstash</b> extracts them into new workspace</li>
        <li>very useful for distributed pipelines</li>
      </ul>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>6) 📁 Differences: Archive vs Stash</h2>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "15px" }}>
        <thead>
          <tr>
            <th>Feature</th>
            <th>ArchiveArtifacts</th>
            <th>Stash/Unstash</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Purpose</td>
            <td>Keep for days/months</td>
            <td>Share quickly between stages</td>
          </tr>
          <tr>
            <td>Stored in</td>
            <td>Jenkins master long-term</td>
            <td>Temporary stash storage</td>
          </tr>
          <tr>
            <td>Cross-agent?</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Best for</td>
            <td>Build outputs, logs</td>
            <td>Build → test → deploy flow</td>
          </tr>
        </tbody>
      </table>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>7) 🧹 Clean Workspace</h2>

      <p>Always clean workspace after build:</p>

      <pre className="code-block">
{`cleanWs()`}
      </pre>

      <h3>Inside pipeline</h3>

      <pre className="code-block">
{`post {
  always {
    cleanWs()
  }
}`}
      </pre>

      <p>This prevents:</p>
      <ul>
        <li>workspace full</li>
        <li>old build conflicts</li>
        <li>corrupt artifacts</li>
      </ul>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>8) 📝 Full Real-World Jenkinsfile Example</h2>

      <pre className="code-block">
{`pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test -- --junitxml=test-results/results.xml'
      }
    }

    stage('Publish Test Results') {
      steps {
        junit '**/results.xml'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
        stash name: 'build', includes: 'dist/**'
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }

    stage('Deploy') {
      steps {
        unstash 'build'
        sh 'echo Deploying...'
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}`}
      </pre>

      <hr />

      {/* ------------------------------------------------- */}
      <h2>🎬 Summary</h2>

      <ul>
        <li>Store build outputs using archiveArtifacts</li>
        <li>Store/visualize test results using JUnit</li>
        <li>Display HTML reports using publishHTML</li>
        <li>Use stash/unstash for distributed pipelines</li>
        <li>Use cleanWs() to avoid workspace problems</li>
      </ul>

      <p style={{ marginTop: "25px", fontWeight: 700 }}>
        Next: Lesson 12 — Jenkins Agents, Labels, Static & Dynamic Nodes (Deep DevOps Level) 🚀
      </p>
    </div>
  );
}
