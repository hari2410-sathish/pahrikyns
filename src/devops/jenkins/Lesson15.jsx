export default function Lesson15() {
  return (
    <div style={{ fontSize: "17px", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: "28px", fontWeight: 800 }}>
        Jenkins Lesson 15 — Docker Build, Tag, Push & Deployment CI/CD
      </h1>

      <p>
        Jenkins + Docker is the MOST common DevOps pipeline.  
        In this lesson, you learn:
      </p>

      <ul>
        <li>Docker installation on Jenkins node</li>
        <li>Docker-in-Docker vs Host Docker socket</li>
        <li>Build Docker images in Jenkins</li>
        <li>Tagging strategy</li>
        <li>Push images to Docker Hub / ECR / GitHub Registry</li>
        <li>Run containers after build</li>
        <li>Full Jenkinsfile with CI/CD</li>
      </ul>

      <hr />

      {/* -------------------------------------------- */}
      <h2>1) Install Docker on Jenkins Server</h2>

      <p>On Ubuntu server:</p>

      <pre className="code-block">
{`sudo apt update
sudo apt install docker.io -y

sudo usermod -aG docker jenkins
sudo systemctl restart jenkins`}
      </pre>

      <p>
        This allows Jenkins to run docker commands **without sudo**.
      </p>

      <hr />

      {/* -------------------------------------------- */}
      <h2>2) Docker Build from Jenkins</h2>

      <p>Create a sample Dockerfile:</p>

      <pre className="code-block">
{`FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]`}
      </pre>

      <p>Place this inside your Git repo.</p>

      <hr />

      {/* -------------------------------------------- */}
      <h2>3) Jenkins Credentials for Docker Registry</h2>

      <p>Create a secret credential:</p>

      <pre className="code-block">
Manage Jenkins →
Credentials →
Global →
Add Credentials →
Type: Username & Password
ID: docker-hub
      </pre>

      <p>Use this in Jenkinsfile.</p>

      <hr />

      {/* -------------------------------------------- */}
      <h2>4) Basic Docker Build Jenkinsfile</h2>

      <pre className="code-block">
{`pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t myapp:latest .'
      }
    }
  }
}`}
      </pre>

      <p>This builds your image inside Jenkins.</p>

      <hr />

      {/* -------------------------------------------- */}
      <h2>5) Build + Tag + Push to Docker Hub</h2>

      <p>Recommended tagging strategy:</p>
      <ul>
        <li>latest</li>
        <li>build number</li>
        <li>git commit sha</li>
      </ul>

      <pre className="code-block">
{`pipeline {
  agent any

  environment {
    DOCKERHUB = 'docker-hub'
    IMAGE = "hari/myapp"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: DOCKERHUB,
          usernameVariable: 'USER',
          passwordVariable: 'PASS'
        )]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
        }
      }
    }

    stage('Build Image') {
      steps {
        sh 'docker build -t $IMAGE:latest .'
        sh 'docker tag $IMAGE:latest $IMAGE:${BUILD_NUMBER}'
      }
    }

    stage('Push Image') {
      steps {
        sh 'docker push $IMAGE:latest'
        sh 'docker push $IMAGE:${BUILD_NUMBER}'
      }
    }
  }
}
`}
      </pre>

      <hr />

      {/* -------------------------------------------- */}
      <h2>6) Push to AWS ECR (Optional)</h2>

      <pre className="code-block">
{`aws ecr get-login-password |
docker login --username AWS --password-stdin <account>.dkr.ecr.region.amazonaws.com`}
      </pre>

      <p>Then push as normal.</p>

      <hr />

      {/* -------------------------------------------- */}
      <h2>7) Run Docker Container After Build</h2>

      <p>Deployment example (basic):</p>

      <pre className="code-block">
{`stage('Deploy') {
  steps {
    sh '''
      docker rm -f myapp || true
      docker run -d --name myapp -p 3000:3000 hari/myapp:latest
    '''
  }
}`}
      </pre>

      <p>
        This stops the previous container and starts a new updated one.
      </p>

      <hr />

      {/* -------------------------------------------- */}
      <h2>8) Full CI/CD Jenkinsfile (Production Example)</h2>

      <pre className="code-block">
{`pipeline {
  agent any
  environment {
    REG = "hari/myapp"
  }

  stages {

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install Dependencies') {
      steps { sh 'npm install' }
    }

    stage('Test') {
      steps { sh 'npm test --if-present' }
    }

    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-hub',
          usernameVariable: 'USER',
          passwordVariable: 'PASS'
        )]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
        }
      }
    }

    stage('Build & Tag') {
      steps {
        sh 'docker build -t $REG:latest .'
        sh 'docker tag $REG:latest $REG:${BUILD_NUMBER}'
      }
    }

    stage('Push') {
      steps {
        sh 'docker push $REG:latest'
        sh 'docker push $REG:${BUILD_NUMBER}'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          docker rm -f myapp || true
          docker run -d --name myapp -p 3000:3000 $REG:latest
        '''
      }
    }
  }
}
`}
      </pre>

      <hr />

      {/* -------------------------------------------- */}
      <h2>9) Best Practices for Jenkins + Docker</h2>

      <ul>
        <li>Use lightweight base images (alpine)</li>
        <li>Never store passwords in Jenkinsfile</li>
        <li>Use credentialsId with withCredentials()</li>
        <li>Tag each build with BUILD_NUMBER</li>
        <li>Use cleanup automation: <code>docker system prune</code></li>
        <li>Use Multi-stage Docker builds for faster CI</li>
      </ul>

      <hr />

      <h2>10) CI/CD Pipeline Flow Summary</h2>

      <ol>
        <li>Checkout source from GitHub</li>
        <li>Run tests</li>
        <li>Build Docker image</li>
        <li>Tag image</li>
        <li>Push image to registry</li>
        <li>Deploy container</li>
        <li>Send notification (Slack / Email)</li>
      </ol>

      <p style={{ marginTop: "25px", fontWeight: 700 }}>
        Next: Lesson 16 — Docker Agents on Jenkins + Master-Agent Architecture 🧵
      </p>
    </div>
  );
}
