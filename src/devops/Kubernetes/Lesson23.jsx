export default function Lesson21() {
  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 21 – Cloud-Native CI/CD (GitHub Actions + ArgoCD + Helm + ECR) – Full Modern Pipeline (45–60 min)</h1>

      <p className="mb-4">This lesson teaches you how to build a complete modern CI/CD pipeline using GitHub Actions for CI and ArgoCD for GitOps-based CD, including container builds, security scanning, helm packaging, environment promotion, and automated sync to Kubernetes clusters. Every step explained inch-by-inch.</p>

      <h2 className="text-2xl font-semibold mt-4">Why Modern CI/CD?</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Fast and cloud-native build pipelines</li>
        <li>Git as Single Source of Truth (SSOT)</li>
        <li>Declarative deployments (no manual kubectl)</li>
        <li>Instant rollbacks, auto-sync & drift detection</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">2D Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`GitHub Repo
    |
    |---(CI: GitHub Actions)--- Build → Scan → Push Image → Update Helm values
    |
    +--- Commit to GitOps Repo (deploy/helm)
                     |
                 ArgoCD Auto Sync
                     |
                  Kubernetes
`}</pre>

      <h2 className="text-2xl font-semibold mt-4">3D Pipeline Flow</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`         [Application Source Repo]
                 | (Push)
                 v
     -----------------------------
     | GitHub Actions (CI Layer) |
     -----------------------------
       | build | scan | push
                 |
                 v
     [ GitOps Repo (manifest/helm) ]
                 |
          ArgoCD watches repo
                 v
     -----------------------------
     | Kubernetes Cluster (CD)   |
     -----------------------------`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Step 1 – GitHub Repo Structure</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`repo/
  app/
    Dockerfile
    src/...
  helm/
    myapp/
      Chart.yaml
      values.yaml
      templates/
  .github/workflows/
    ci.yaml
`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Step 2 – Dockerfile (simple example)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm","start"]
`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Step 3 – GitHub Actions CI Pipeline</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`name: CI
on:
  push:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Login to ECR
      uses: aws-actions/amazon-ecr-login@v2

    - name: Build image
      run: |
        docker build -t myapp:${{ github.sha }} ./app

    - name: Push image
      run: |
        docker tag myapp:${{ github.sha }} ${{ env.ECR_URL }}/myapp:${{ github.sha }}
        docker push ${{ env.ECR_URL }}/myapp:${{ github.sha }}

    - name: Update Helm values
      run: |
        sed -i "s/tag:.*/tag: ${{ github.sha }}/" helm/myapp/values.yaml

    - name: Commit updated helm chart
      uses: stefanzweifel/git-auto-commit-action@v4
      with:
        commit_message: "Update image tag to ${{ github.sha }}"`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Step 4 – ArgoCD Application (GitOps)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/yourorg/gitops-myrepos
    path: helm/myapp
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
    namespace: prod
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Step 5 – Deployment Verification</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>ArgoCD UI should show new version automatically syncing</li>
        <li>`kubectl get pods -n prod` — verify new pods are created</li>
        <li>`kubectl describe pod` — check updated image sha</li>
        <li>Check rollback capability using ArgoCD UI or CLI</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Step 6 – Add Security Scan (Optional)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`- name: Scan image with Trivy
  uses: aquasecurity/trivy-action@v0.11.2
  with:
    image-ref: myapp:${{ github.sha }}`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Real Production Flow</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`Dev pushes code → GitHub Actions builds image
→ pushes to ECR → updates helm chart
→ ArgoCD auto-syncs changes → Kubernetes deploys
→ Grafana + Prometheus monitor live health`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Best Practices</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Use short-lived IAM tokens for ECR operations</li>
        <li>Use environment-based GitOps folders (dev/staging/prod)</li>
        <li>Enable ArgoCD RBAC and SSO for security</li>
        <li>Pin GitHub Action versions to avoid pipeline drift</li>
        <li>Store secrets in AWS Secrets Manager or External Secrets Operator</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Troubleshooting</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>ImagePullBackOff → check ECR permissions + correct SHA</li>
        <li>ArgoCD Sync Errors → check Helm chart indentation + missing values</li>
        <li>GitHub Actions failure → check AWS creds + repo secrets</li>
        <li>Pods crash → check logs via `kubectl logs`</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Quiz (2 questions)</h2>
      <ol className="list-decimal pl-6 mb-4">
        <li>Why does GitOps reduce deployment drift?</li>
        <li>What does ArgoCD do when the cluster state does not match Git?</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-4">Interview Questions</h2>
      <ol className="list-decimal pl-6 mb-8">
        <li>Explain the full CI/CD flow using GitHub Actions + ArgoCD.</li>
        <li>What is the difference between CI and GitOps-based CD?</li>
        <li>How do you secure container builds in CI?</li>
        <li>How would you debug ArgoCD sync failures?</li>
      </ol>

      <p className="font-semibold mt-6">Lesson 21 is complete. Say "Give Lesson 22" to continue.</p>
    </div>
  );
}