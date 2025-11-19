export default function RealProject1() {
  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Real Project 1 — Microservices App on Kubernetes with Helm (45–60 min class)</h1>

      <h2 className="text-xl font-semibold mt-4">Project Summary</h2>
      <p className="mb-3">Deploy a simple three-tier microservices application (frontend, backend API, PostgreSQL) to Kubernetes using Helm. The project includes environment separated values (dev / prod), Ingress routing, persistent storage for the database, health checks, resource requests/limits, and a sample CI/CD pipeline (GitHub Actions) which runs Helm upgrades automatically.</p>

      <h2 className="text-xl font-semibold mt-4">Learning Objectives</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Understand Helm chart structure and templating</li>
        <li>Deploy multi-service app with persistent storage</li>
        <li>Configure Ingress with TLS and path-based routing</li>
        <li>Implement readiness/liveness probes and resource limits</li>
        <li>Automate deployments with a basic GitHub Actions CI/CD</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">2D Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`                            Internet
                               |
                          +----v----+
                          |  Ingress |
                          +----+----+
                               |
            ---------------------------------------------
            |                    |                       |
         Frontend             Backend                 Postgres
        (Deployment)         (Deployment)             (StatefulSet)
            |                    |                       |
         Service(frontend)   Service(api)           PVC → PV (StorageClass)
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">3D Conceptual View</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`    [ Helm Release Layer ]
           |   
    -------------------------
    |  Rendered YAML (k8s)  |
    -------------------------
           |      |      |
        Nodes   Nodes   Nodes
         |        |       |
       Pods    Pods     Pods
    (frontend)(backend)(postgres)
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Helm Chart Layout (myshop)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`myshop/
  Chart.yaml
  values.yaml
  values-dev.yaml
  values-prod.yaml
  charts/      # optional subcharts
  templates/
    frontend-deployment.yaml
    frontend-service.yaml
    backend-deployment.yaml
    backend-service.yaml
    postgres-statefulset.yaml
    postgres-svc.yaml
    postgres-pvc.yaml
    ingress.yaml
    _helpers.tpl
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Example Chart.yaml</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`apiVersion: v2
name: myshop
description: A simple microservices demo
type: application
version: 0.1.0
appVersion: "1.0.0"
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">values.yaml (common)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`replicaCount:
  frontend: 2
  backend: 2
image:
  frontend:
    repository: ghcr.io/yourorg/myshop-frontend
    tag: "1.0.0"
  backend:
    repository: ghcr.io/yourorg/myshop-backend
    tag: "1.0.0"
postgres:
  storage: 10Gi
  image:
    repository: postgres
    tag: "15"
service:
  frontend:
    type: ClusterIP
    port: 80
  backend:
    type: ClusterIP
    port: 8080
ingress:
  enabled: true
  host: myshop.example.com
  tls:
    enabled: false
resources:
  frontend:
    requests:
      cpu: "100m"
      memory: "128Mi"
    limits:
      cpu: "300m"
      memory: "256Mi"
  backend:
    requests:
      cpu: "200m"
      memory: "256Mi"
    limits:
      cpu: "500m"
      memory: "512Mi"
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">values-dev.yaml (overrides)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`replicaCount:
  frontend: 1
  backend: 1
ingress:
  host: myshop.dev.local
  tls:
    enabled: false
postgres:
  storage: 2Gi
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">templates/frontend-deployment.yaml (snippet)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myshop.fullname" . }}-frontend
spec:
  replicas: {{ .Values.replicaCount.frontend }}
  selector:
    matchLabels:
      app: {{ include "myshop.name" . }}-frontend
  template:
    metadata:
      labels:
        app: {{ include "myshop.name" . }}-frontend
    spec:
      containers:
        - name: frontend
          image: "{{ .Values.image.frontend.repository }}:{{ .Values.image.frontend.tag }}"
          ports:
            - containerPort: 80
          readinessProbe:
            httpGet:
              path: /healthz
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /live
              port: 80
            initialDelaySeconds: 15
            periodSeconds: 20
          resources: {{ toYaml .Values.resources.frontend | indent 12 }}
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">templates/backend-deployment.yaml (snippet)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myshop.fullname" . }}-backend
spec:
  replicas: {{ .Values.replicaCount.backend }}
  selector:
    matchLabels:
      app: {{ include "myshop.name" . }}-backend
  template:
    metadata:
      labels:
        app: {{ include "myshop.name" . }}-backend
    spec:
      containers:
        - name: backend
          image: "{{ .Values.image.backend.repository }}:{{ .Values.image.backend.tag }}"
          env:
            - name: DATABASE_URL
              value: "postgresql://postgres:{{ .Values.postgres.password | default "postgres" }}@{{ include "myshop.fullname" . }}-postgres:5432/postgres"
          ports:
            - containerPort: 8080
          readinessProbe:
            tcpSocket:
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          resources: {{ toYaml .Values.resources.backend | indent 12 }}
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">templates/postgres-statefulset.yaml (snippet)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: {{ include "myshop.fullname" . }}-postgres
spec:
  serviceName: {{ include "myshop.fullname" . }}-postgres
  replicas: 1
  selector:
    matchLabels:
      app: {{ include "myshop.name" . }}-postgres
  template:
    metadata:
      labels:
        app: {{ include "myshop.name" . }}-postgres
    spec:
      containers:
        - name: postgres
          image: "{{ .Values.postgres.image.repository }}:{{ .Values.postgres.image.tag }}"
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: postgres-data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: postgres-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: {{ .Values.postgres.storage }}
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">templates/ingress.yaml (snippet)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`{{- if .Values.ingress.enabled }}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ include "myshop.fullname" . }}
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
    - host: {{ .Values.ingress.host }}
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: {{ include "myshop.fullname" . }}-frontend
                port:
                  number: 80
  {{- if .Values.ingress.tls.enabled }}
  tls:
    - hosts:
        - {{ .Values.ingress.host }}
      secretName: {{ include "myshop.fullname" . }}-tls
  {{- end }}
{{- end }}
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">CI/CD — GitHub Actions (simple)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`name: CI-CD
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Helm
        uses: azure/setup-helm@v3
      - name: Helm Upgrade/Install
        env:
          KUBECONFIG: ${{ secrets.KUBECONFIG }}
        run: |
          helm upgrade --install myshop ./mychart -f ./mychart/values.yaml -f ./mychart/values-prod.yaml --wait
`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Deployment Commands (local)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`# render templates
helm template myshop ./mychart -f ./mychart/values-dev.yaml

# install to cluster
helm install myshop ./mychart -f ./mychart/values-dev.yaml

# upgrade
helm upgrade myshop ./mychart -f ./mychart/values-prod.yaml

# uninstall
helm uninstall myshop`}
      </pre>

      <h2 className="text-xl font-semibold mt-4">Verification / Debugging Steps</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><code>kubectl get pods</code> — check Pod statuses</li>
        <li><code>kubectl describe pod &lt;pod&gt;</code> — events and errors</li>
        <li><code>kubectl logs &lt;pod&gt; -c &lt;container&gt;</code> — container logs</li>
        <li><code>kubectl get pvc</code> — ensure PVC is bound</li>
        <li><code>kubectl get svc,ingress</code> — verify endpoints and host</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Security & Production Notes</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Use Secrets or external KMS for DB passwords (don't hardcode in values)</li>
        <li>Enable resource quotas and limit ranges in namespaces</li>
        <li>Setup NetworkPolicies to restrict access between frontend and backend if needed</li>
        <li>Use readiness probes to ensure only healthy pods receive traffic</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">2 Lesson Quiz Questions (short)</h2>
      <ol className="pl-6 mb-4 list-decimal">
        <li>Why use a StatefulSet for PostgreSQL instead of a Deployment? (Answer: stable identity, persistent volumes per pod, ordered startup/termination.)</li>
        <li>What does <code>helm upgrade --install</code> do? (Answer: installs if release doesn't exist, otherwise upgrades; useful for idempotent deploys.)</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">Interview Preparation Questions (project-focused)</h2>
      <ol className="pl-6 mb-6 list-decimal">
        <li>Explain how Helm templates are rendered. What is the role of values.yaml and _helpers.tpl?</li>
        <li>How would you rotate database credentials in this deployment with zero downtime?</li>
        <li>Describe how Ingress + Service + Deployment work together to expose the frontend externally.</li>
        <li>How do you ensure backups for PostgreSQL running as a StatefulSet?</li>
        <li>What readiness/liveness probe strategies would you use for the backend API?</li>
        <li>How would you scale the backend safely under heavy load?</li>
        <li>How would you troubleshoot a failing Postgres pod that is stuck in Pending state?</li>
        <li>Explain how you would secure the CI/CD pipeline and secrets used by GitHub Actions.</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">45-minute Lesson Plan (timed)</h2>
      <ol className="pl-6 mb-6 list-decimal">
        <li>0–5m: Project overview & architecture</li>
        <li>5–15m: Helm chart structure & values walk-through</li>
        <li>15–25m: Deploy dev values, check pods & PVCs (live demo)</li>
        <li>25–35m: Show ingress routing, probes, and resource tuning (demo)</li>
        <li>35–42m: CI/CD pipeline & best practices</li>
        <li>42–45m: Quiz (2 questions) + interview prep quick tips</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">Extra: Common Errors & Fixes</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>CrashLoopBackOff — check logs and liveness probes; increasing initialDelaySeconds can help</li>
        <li>PVC Pending — check StorageClass availability and volume binding mode</li>
        <li>Ingress 404 — check Ingress host and service names; verify controller is installed</li>
        <li>Helm chart template errors — run <code>helm lint</code> and <code>helm template</code> to debug</li>
      </ul>

      <p className="mt-6 font-semibold">Next: Say <strong>“Give Real Project 2”</strong> to generate the next full real project (Kubernetes + CI/CD + Monitoring integration).</p>
    </div>
  );
}
