export default function RealProject3() {
  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Real Project 3 — Advanced Multi‑Cloud Automation: Terraform, Ansible, Jenkins, Git, Prometheus, Grafana, Splunk (75–90 min)</h1>

      <p className="mb-4 text-base">This capstone project ties together infrastructure-as-code, configuration management, CI/CD, and observability across multi-cloud environments. We'll provision infrastructure with Terraform, configure servers with Ansible, build pipelines with Jenkins (triggered by Git), deploy apps to Kubernetes using Helm, and add monitoring (Prometheus + Grafana) and centralized logging (Splunk). The project demonstrates end‑to‑end automation and production-grade practices.</p>

      <h2 className="text-xl font-semibold mt-4">High-Level Flow</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`Git (repo) → Jenkins (CI) → Build & Push Images → Helm Deploy → Kubernetes Cluster
       ↑
   Terraform provisions infra (multi-cloud)
       ↓
   Ansible configures VMs & installs agents (Prometheus node-exporter, Splunk Forwarder)

Observability:
 - Prometheus scrapes metrics → Grafana dashboards
 - Splunk Forwarder sends logs to Splunk Cloud/Enterprise`}</pre>

      <h2 className="text-xl font-semibold mt-4">2D Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`   +------------+    Terraform    +-----------------+   Ansible   +------------+
   |   GitHub   |  ----------->   |  AWS / GCP infra |  --------->  |  Ubuntu VMs |
   +-----+------+                 +--------+--------+              +------+------+
         |                                      |                          |
         |                                      |                          |
         v                                      v                          v
     Jenkins (on VM)                       Kubernetes Cluster         Prometheus + Splunk Agents
         |                                      |                          |
         v                                      v                          v
   Build → Push → Helm Upgrade           Application Pods           Metrics / Logs → Splunk
                                               |
                                            Grafana`}</pre>

      <h2 className="text-xl font-semibold mt-4">Clouds & Resources</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>AWS: VPC, EKS (optional), EC2 nodes, RDS (optional)</li>
        <li>GCP or another region for DR testing (optional)</li>
        <li>S3/EFS for artifacts/backups</li>
        <li>IAM roles & policies for automation</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Step 1 — Terraform (example snippet)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`provider "aws" {
  region = "ap-south-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# EC2 for Jenkins
resource "aws_instance" "jenkins" {
  ami           = "ami-..."
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.main.id
}

# EKS cluster (optional)
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"
  cluster_name = "prod-eks"
  subnets = [aws_subnet.main.id]
  # ... more config
}`}</pre>

      <h2 className="text-xl font-semibold mt-4">Step 2 — Ansible (server config & agents)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# ansible inventory (hosts)
[jenkins]
jenkins.example.com

[monitoring]
node1.example.com
node2.example.com

# playbook: install node-exporter & splunk forwarder
- hosts: monitoring
  become: yes
  tasks:
    - name: install node exporter
      apt: name=prometheus-node-exporter state=present update_cache=yes

    - name: install splunk forwarder
      # copy installer and run
      ...`}</pre>

      <h2 className="text-xl font-semibold mt-4">Step 3 — Jenkins Pipelines</h2>
      <p className="mb-2">Use a multibranch pipeline or Declarative Jenkinsfile in your Git repo. Jenkins performs:</p>
      <ol className="pl-6 mb-4 list-decimal">
        <li>Checkout code</li>
        <li>Run tests & lint</li>
        <li>Build Docker images</li>
        <li>Push images to registry (ECR / GCR / Artifactory)</li>
        <li>Run Ansible tasks (optional) to configure infra</li>
        <li>Run Helm upgrade to deploy to Kubernetes</li>
        <li>Notify via Slack / Email & trigger monitoring checks</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">Jenkinsfile (condensed)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`pipeline {
  agent any
  stages {
    stage('Checkout') { steps { git 'https://github.com/your/repo' } }
    stage('Test') { steps { sh 'npm test' } }
    stage('Build & Push') {
      steps {
        sh 'docker build -t myapp:${BUILD_NUMBER} .'
        sh 'docker push registry/myapp:${BUILD_NUMBER}'
      }
    }
    stage('Ansible') { steps { sh 'ansible-playbook -i inventory/hosts playbooks/config.yml' } }
    stage('Deploy') { steps { sh 'helm upgrade --install myapp ./helm -f values-prod.yaml --wait' } }
  }
}
`}</pre>

      <h2 className="text-xl font-semibold mt-4">Step 4 — Helm & Kubernetes</h2>
      <p className="mb-2">Use Helm charts (as in Real Project 1) to parametrize images, resources, ingress, probes, and secrets. Jenkins triggers Helm with proper kubeconfig and service account credentials.</p>

      <h2 className="text-xl font-semibold mt-4">Step 5 — Observability</h2>
      <h3 className="text-lg font-semibold mt-2">Prometheus + Grafana</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>Install Prometheus via Helm (kube-prometheus-stack)</li>
        <li>Enable node-exporter, kube-state-metrics</li>
        <li>Create Grafana dashboards and alerts (CPU, memory, pod restarts, latency)</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack`}</pre>

      <h3 className="text-lg font-semibold mt-2">Splunk (Centralized Logging)</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>Install Splunk Forwarder on nodes (via Ansible) or use a Fluentd/Fluent Bit DaemonSet to forward to Splunk HTTP Event Collector (HEC)</li>
        <li>Create Splunk dashboards for application logs, audit trails, and alerting</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# Fluent Bit example (values for helm chart)
[OUTPUT]
    Name  splunk
    Match *
    Host  splunk.example.com
    Port 8088
    TLS  On
    Splunk_Token <YOUR_HEC_TOKEN>`}</pre>

      <h2 className="text-xl font-semibold mt-4">Step 6 — Security & IAM</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Use IAM roles for service accounts (IRSA) on EKS</li>
        <li>Least privilege for Jenkins IAM user (ECR push, S3, EKS deploy)</li>
        <li>Store secrets in AWS Secrets Manager or Kubernetes secrets encrypted via KMS</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Step 7 — Alerts & Runbooks</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Define alerts in Prometheus (firing conditions, severity)</li>
        <li>Create Grafana alert channels (Slack / PagerDuty)</li>
        <li>Build runbooks for common incidents (CrashLoopBackOff, OOMKill, PVC Pending)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">2 Lesson Quiz Questions</h2>
      <ol className="pl-6 list-decimal mb-4">
        <li>Why use Terraform + Ansible together instead of only one? (Answer: Terraform for provisioning infra; Ansible for configuration and software setup.)</li>
        <li>How does Prometheus discover targets in Kubernetes? (Answer: via ServiceMonitors / kube-state-metrics; through kube API discovery.)</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">Interview Prep Questions (Project-Focused)</h2>
      <ol className="pl-6 list-decimal mb-6">
        <li>Explain the role of Terraform vs Ansible in this project.</li>
        <li>How do you secure Jenkins credentials used to access AWS and Kubernetes?</li>
        <li>Describe how you would implement zero-downtime deployments when multiple services change at once.</li>
        <li>How would you instrument the application for proper observability (metrics + tracing + logs)?</li>
        <li>How would you handle disaster recovery across multiple clouds or regions?</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">75–90 minute Lesson Plan (timed)</h2>
      <ol className="pl-6 list-decimal mb-6">
        <li>0–10m: Overview of multi-tool architecture (Terraform, Ansible, Jenkins)</li>
        <li>10–30m: Terraform example and apply (demo) — provision VPC + EC2</li>
        <li>30–45m: Ansible configuration demo (install Jenkins, node-exporter, Splunk forwarder)</li>
        <li>45–60m: Jenkins pipeline demo → build & push image → Helm deploy</li>
        <li>60–75m: Observability setup — Prometheus + Grafana + Splunk demo (dashboards/alerts)</li>
        <li>75–90m: Quiz + interview prep + Q&A</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">Common Troubleshooting Tips</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Terraform state issues — lock state and use remote state backend (S3 + DynamoDB for locking)</li>
        <li>Ansible connectivity failures — check SSH keys and security groups</li>
        <li>Jenkins Docker permission errors — add jenkins user to docker group and restart</li>
        <li>Prometheus missing metrics — verify ServiceMonitors and relabeling rules
        </li>
        <li>Splunk HEC errors — confirm token, TLS, and network access from nodes</li>
      </ul>

      <p className="font-semibold">Project 3 is ready. Say <strong>"Generate Slide Deck"</strong> if you want a downloadable presentation for this project, or say <strong>"Export all lessons"</strong> to bundle the whole course files.</p>
    </div>
  );
}