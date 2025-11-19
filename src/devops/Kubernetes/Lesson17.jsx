export default function RealProject2() {
  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Real Project 2 — AWS + Ubuntu Server + Git + Jenkins CI/CD → Kubernetes Deployment (60–75 min)</h1>

      <p className="mb-4 text-base">This real‑world project shows how to build a full CI/CD pipeline using Jenkins on an Ubuntu EC2 server, pulling source code from GitHub, building a Docker image, pushing to Amazon ECR, and auto-deploying to a Kubernetes cluster using Helm.</p>

      <h2 className="text-xl font-semibold mt-4">Project Overview</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`Developer → GitHub → Jenkins (EC2 Ubuntu) → Build Docker Image → Push to ECR → Helm Upgrade → Kubernetes Cluster → Running App`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">2D Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`   +-----------+       +--------------+      +----------+      +---------------+
   | Developer |  -->  | GitHub Repo  | ---> | Jenkins  | ---> | Amazon ECR    |
   +-----------+       +--------------+      +----------+      +-------+-------+
                                                                |
                                                                v
                                                         +-------------+
                                                         | Kubernetes  |
                                                         |   Cluster   |
                                                         +-------------+`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">3D CI/CD Flow</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`                 [ CI/CD Pipeline Layer ]
Developer ─────► GitHub ─────► Jenkins ─────► ECR
                                           |
                                           ▼
                            [ Helm Deploy Layer ]
                                  |
                                  ▼
                            Kubernetes Cluster
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">AWS Resources Needed</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>EC2 Ubuntu 22.04 instance (Jenkins server)</li>
        <li>ECR repository (stores Docker images)</li>
        <li>EKS cluster OR Kubeadm Kubernetes cluster</li>
        <li>IAM user with ECR + EKS permissions</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Step 1 — Setup Jenkins on Ubuntu EC2</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`sudo apt update
sudo apt install openjdk-17-jdk -y
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
sudo sh -c 'echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins -y
sudo systemctl enable --now jenkins
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Install Docker on Jenkins Server</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`sudo apt install docker.io -y
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Step 2 — Jenkins Pipeline Structure</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`Jenkinsfile stages:
1. Checkout code
2. Build Docker image
3. Login to ECR
4. Push image to ECR
5. Deploy to Kubernetes using Helm`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Step 3 — Jenkinsfile (Complete CI/CD)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_REPO = "123456789012.dkr.ecr.ap-south-1.amazonaws.com/myapp"
    IMAGE_TAG = "${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/your/repo.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t myapp:$IMAGE_TAG .'
      }
    }

    stage('AWS ECR Login') {
      steps {
        sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO'
      }
    }

    stage('Push Image to ECR') {
      steps {
        sh 'docker tag myapp:$IMAGE_TAG $ECR_REPO:$IMAGE_TAG'
        sh 'docker push $ECR_REPO:$IMAGE_TAG'
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'helm upgrade --install myapp helm/myapp --set image.tag=$IMAGE_TAG --wait'
      }
    }
  }
}`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Step 4 — Helm Chart (myapp)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`myapp/
  Chart.yaml
  values.yaml
  templates/
    deployment.yaml
    service.yaml
    ingress.yaml
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">deployment.yaml (snippet)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`containers:
  - name: myapp
    image: "123456789012.dkr.ecr.ap-south-1.amazonaws.com/myapp:{{ .Values.image.tag }}"
    ports:
      - containerPort: 8080
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Step 5 — GitHub Repo Structure</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`repo/
  Jenkinsfile
  Dockerfile
  helm/
    myapp/
      Chart.yaml
      values.yaml
      templates/
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Dockerfile Example</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Step 6 — Verify CI/CD</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Push code → Jenkins starts automatically</li>
        <li>Image built + pushed to ECR</li>
        <li>Helm deploys latest image to Kubernetes</li>
        <li>New version rolls out with zero downtime</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Quiz (2 Questions)</h2>
      <ol className="list-decimal pl-6 mb-4">
        <li>Why use ECR instead of DockerHub for AWS CI/CD?</li>
        <li>What does Helm upgrade do during a Jenkins pipeline?</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">Interview Questions (Project Focus)</h2>
      <ol className="list-decimal pl-6 mb-6">
        <li>Explain the full CI/CD pipeline from GitHub → Jenkins → Kubernetes.</li>
        <li>How does Jenkins authenticate to Amazon ECR?</li>
        <li>How do you ensure zero‑downtime deployments with Helm?</li>
        <li>Why store Docker images in ECR for Kubernetes clusters?</li>
        <li>How do you troubleshoot image pull errors in Kubernetes?</li>
      </ol>

      <p className="font-semibold mt-6">Next: Say “Give Real Project 3” to build the final advanced multi‑cloud Kubernetes automation project.</p>
    </div>
  );
}
