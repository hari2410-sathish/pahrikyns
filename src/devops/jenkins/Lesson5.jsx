export default function Lesson5() {
  return (
    <div style={{ fontSize: "17px", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
        Jenkins Lesson 5 — Pipeline Concepts (Declarative & Scripted)
      </h1>

      <p>
        Jenkins Pipelines are the heart of CI/CD automation.  
        They allow full build logic in a single file called:
        <b> Jenkinsfile </b>.
      </p>

      {/* ------------------------------ */}
      <h2>🎯 What You Will Learn</h2>
      <ul>
        <li>What is a Jenkins Pipeline?</li>
        <li>Declarative Pipeline structure</li>
        <li>Scripted Pipeline structure</li>
        <li>Stages, steps, agents</li>
        <li>Pipeline syntax tools</li>
        <li>Running pipelines from GitHub</li>
      </ul>

      {/* ------------------------------ */}
      <h2>1) 📦 What is Jenkins Pipeline?</h2>
      <p>
        A pipeline is a set of automated steps defined in a Jenkinsfile.  
        It allows you to build, test, deploy applications with complete automation.
      </p>

      <h3>Types of Pipelines</h3>
      <ul>
        <li><b>Declarative Pipeline</b> (recommended, modern)</li>
        <li><b>Scripted Pipeline</b> (Groovy-based, older style)</li>
      </ul>

      {/* ------------------------------ */}
      <h2>2) 🧱 Declarative Pipeline Structure</h2>

      <pre className="code-block">
{`pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "Building..."
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying..."
            }
        }
    }
}`}
      </pre>

      <h3>Important parts:</h3>
      <ul>
        <li><b>pipeline</b> → Start of a declarative pipeline</li>
        <li><b>agent any</b> → Which machine the build runs on</li>
        <li><b>stages</b> → Group of multiple stages</li>
        <li><b>steps</b> → Actual commands executed</li>
      </ul>

      {/* ------------------------------ */}
      <h2>3) 🧩 Scripted Pipeline Structure (Groovy)</h2>

      <p>Older, very flexible but harder to understand.</p>

      <pre className="code-block">
{`node {
    stage('Build') {
        echo "Building..."
    }
    stage('Test') {
        echo "Testing..."
    }
    stage('Deploy') {
        echo "Deploying..."
    }
}`}
      </pre>

      <h3>Differences:</h3>
      <ul>
        <li>Scripted → uses <b>node</b></li>
        <li>Declarative → uses <b>pipeline</b></li>
        <li>Scripted → full Groovy scripting</li>
        <li>Declarative → simpler, more readable, recommended</li>
      </ul>

      {/* ------------------------------ */}
      <h2>4) ⚙️ Jenkinsfile Example (Real CI/CD)</h2>

      <h3>Node.js CI Pipeline</h3>

      <pre className="code-block">
{`pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}`}
      </pre>

      <h3>Simple Java Maven Pipeline</h3>

      <pre className="code-block">
{`pipeline {
    agent any

    tools {
        maven 'Maven-3.9'
    }

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
    }
}`}
      </pre>

      {/* ------------------------------ */}
      <h2>5) 🚀 How Jenkins Uses Jenkinsfile</h2>
      <ol>
        <li>Create a Jenkins Pipeline job</li>
        <li>Select "Pipeline script from SCM"</li>
        <li>Choose <b>Git</b></li>
        <li>Paste your repo URL</li>
        <li>Set script path: <b>Jenkinsfile</b></li>
      </ol>

      <p>Every push triggers Jenkins to pull latest Jenkinsfile and run the pipeline.</p>

      <h3>GitHub Repo Structure:</h3>

      <pre className="code-block">
{`my-app/
  ├── src/
  ├── package.json
  ├── Jenkinsfile`}
      </pre>

      {/* ------------------------------ */}
      <h2>6) 🔍 Using Jenkins Pipeline Syntax Generator</h2>

      <p>Jenkins has a built-in tool to generate pipeline code.</p>

      <h3>Steps:</h3>
      <ol>
        <li>Open Jenkins</li>
        <li>Click: <b>Pipeline Syntax</b></li>
        <li>Select a step (sh, echo, git, etc.)</li>
        <li>Generate Groovy code</li>
        <li>Copy into Jenkinsfile</li>
      </ol>

      <p>This helps you write pipelines faster.</p>

      {/* ------------------------------ */}
      <h2>7) 🔐 Environment Variables in Pipelines</h2>

      <pre className="code-block">
{`pipeline {
    environment {
        APP_ENV = 'production'
        SECRET_KEY = credentials('my-secret-id')
    }
}`}
      </pre>

      <h3>Usage inside steps:</h3>

      <pre className="code-block">
{`sh 'echo $APP_ENV'
sh 'printenv'`}
      </pre>

      {/* ------------------------------ */}
      <h2>8) 🧪 Testing a Pipeline</h2>

      <ul>
        <li>Click "Build Now"</li>
        <li>Check Console Output</li>
        <li>Fix syntax errors (Jenkinsfile breaks easily)</li>
        <li>Commit Jenkinsfile to GitHub</li>
      </ul>

      {/* ------------------------------ */}
      <h2>🎯 Summary</h2>
      <ul>
        <li>Declarative Pipeline is recommended</li>
        <li>Scripted Pipeline is flexible but complex</li>
        <li>Stages → logical sections of CI/CD</li>
        <li>Steps → actual commands</li>
        <li>Jenkinsfile controls entire build</li>
      </ul>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>
        Next: Lesson 6 — Jenkins Agents, Nodes, and Distributed Builds
      </p>
    </div>
  );
}
