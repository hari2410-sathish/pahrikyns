export default function Lesson19() {
  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 19 — Masterclass: GitOps, Service Mesh, Autoscaling, Security, Troubleshooting, Deploy Strategies, Multi‑Cluster, Ingress, Cost Optimization (Full, inch-by-inch)</h1>

      <p className="mb-4">This single mega‑lesson covers nine advanced topics in depth. Each section is written for a 45–60 minute teaching slice; combined this is a full multi-hour masterclass. Diagrams, YAML, commands, architecture patterns, best practices, troubleshooting, quizzes and interview questions included.</p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">Table of contents</h2>
      <ol className="pl-6 mb-6 list-decimal">
        <li>GitOps with ArgoCD</li>
        <li>Service Mesh — Istio Deep Dive</li>
        <li>Autoscaling — HPA, VPA, Cluster Autoscaler</li>
        <li>Security v2 — Pod Security, NetworkPolicy, Vault/KMS</li>
        <li>Production Troubleshooting (CoreDNS, kubelet, Node, CNI)</li>
        <li>Blue‑Green & Canary Deployments (Argo Rollouts + Helm)</li>
        <li>Multi‑Cluster Kubernetes — Federation, Failover, Global DNS</li>
        <li>Ingress Advanced — API Gateway, Layer‑7 routing, WAF</li>
        <li>Cost Optimization — Rightsizing, Spot, Scheduling, Storage</li>
      </ol>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">1) GitOps with ArgoCD — full flow</h2>
      <p className="mb-3">GitOps is a deployment paradigm where Git is the single source of truth for declarative infrastructure and apps. ArgoCD continuously reconciles cluster state to Git.</p>

      <h3 className="font-semibold mt-3">Architecture (2D)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`Git repo (manifests/helm)  --->  ArgoCD (in-cluster)  --->  Kubernetes API
            ^                                   |
            |                                   v
      PR / Merge / CI  ------------------  Reconciliation Loop`}</pre>

      <h3 className="font-semibold mt-3">Key Concepts</h3>
      <ul className="list-disc pl-6 mb-3">
        <li><strong>Application</strong> — ArgoCD unit that points to a Git path/Helm chart + target cluster/namespace.</li>
        <li><strong>Sync</strong> — Reconcile Git → Cluster (manual or automatic).</li>
        <li><strong>Health checks</strong> — App-specific probes ArgoCD uses to mark healthy states.</li>
        <li><strong>Self-healing</strong> — ArgoCD reverts drift automatically.</li>
      </ul>

      <h3 className="font-semibold mt-3">Install ArgoCD (quick)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`}</pre>

      <h3 className="font-semibold mt-3">Create an Application (example)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myshop
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/yourorg/myshop'
    path: 'deploy/helm'
    targetRevision: HEAD
    helm:
      valueFiles: [values-prod.yaml]
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: myshop
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`}</pre>

      <h3 className="font-semibold mt-3">Best Practices & Patterns</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>Use one repo per environment or a monorepo with clear path-per-app.</li>
        <li>Protect branches; use PR + review + CI gates before merging to main.</li>
        <li>Limit ArgoCD write access via RBAC and restrict auto-sync for critical apps.</li>
        <li>Use Kustomize or Helm for overlays; keep secrets out of Git (see SealedSecrets / Vault).</li>
      </ul>

      <h3 className="font-semibold mt-3">Common Commands</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# get apps
kubectl get applications -n argocd
# sync an app
argocd app sync myshop
# view diff
argocd app diff myshop`}</pre>

      <h3 className="font-semibold mt-3">Pitfalls & Troubleshooting</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>Embedding secrets in Git → use External Secrets, SealedSecrets, or Vault integration.</li>
        <li>Large repo causing slow refresh → use app-of-apps pattern.</li>
        <li>Network/permission errors → ensure ArgoCD has kube RBAC to target namespaces.</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">2) Service Mesh — Istio Deep Dive</h2>
      <p className="mb-3">Istio (or alternative like Linkerd/Cilium Service Mesh) provides L7 routing, secure mTLS, telemetry, and traffic control.</p>

      <h3 className="font-semibold mt-3">High-level components</h3>
      <ul className="list-disc pl-6 mb-3">
        <li><strong>Envoy sidecar</strong> — Data plane proxy injected into each Pod.</li>
        <li><strong>Istiod</strong> — Control plane for config and certificate distribution.</li>
        <li><strong>Gateway</strong> — Ingress/Egress entrypoints (Gateway + VirtualService).</li>
      </ul>

      <h3 className="font-semibold mt-3">2D Traffic Flow</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`Client -> Ingress Gateway -> Envoy (sidecar) -> App Container
   |                                       |
   +-------------- mTLS / Policies -------+`}</pre>

      <h3 className="font-semibold mt-3">Install Istio (quick)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# download istioctl and install default profile
istioctl install --set profile=default -y
# label namespace for injection
kubectl label namespace myns istio-injection=enabled`}</pre>

      <h3 className="font-semibold mt-3">Example VirtualService + Gateway</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: web-gw
spec:
  selector:
    istio: ingressgateway
  servers:
    - port:
        number: 80
        name: http
        protocol: HTTP
      hosts: ["myshop.example.com"]
---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: frontend
spec:
  hosts: ["myshop.example.com"]
  gateways: ["web-gw"]
  http:
    - match:
        - uri:
            prefix: "/"
      route:
        - destination:
            host: frontend
            port:
              number: 80`}</pre>

      <h3 className="font-semibold mt-3">mTLS & Authorization</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# enable strict mTLS (PeerAuthentication)
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
spec:
  mtls:
    mode: STRICT`}</pre>

      <h3 className="font-semibold mt-3">Traffic Control Patterns</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>Weighted routing for canary</li>
        <li>Fault injection for resilience testing</li>
        <li>Traffic mirroring for verification</li>
        <li>Retries, timeouts, circuit breaking</li>
      </ul>

      <h3 className="font-semibold mt-3">Observability</h3>
      <p className="mb-3">Envoy provides rich metrics, distributed traces via Zipkin/Jaeger, and access logs. Istio integrates with Prometheus/Grafana.</p>

      <h3 className="font-semibold mt-3">Best Practices</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>Start with a limited subset of namespaces for injection.</li>
        <li>Prefer strict mTLS for production internal traffic.</li>
        <li>Monitor Envoy sidecar resource usage — add limits to sidecars if needed.</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">3) Autoscaling — HPA, VPA, Cluster Autoscaler (inch-by-inch)</h2>
      <p className="mb-3">Autoscaling operates at pod-level (HPA), node-level (Cluster Autoscaler), and recommendation-level (VPA). Combine for elastic, cost-efficient clusters.</p>

      <h3 className="font-semibold mt-3">Horizontal Pod Autoscaler (HPA)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# sample HPA based on CPU
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 60`}</pre>

      <h3 className="font-semibold mt-3">Vertical Pod Autoscaler (VPA)</h3>
      <p className="mb-2">VPA adjusts container requests/limits. Use for non-burst workloads; avoid auto‑restarting critical services in high churn environments unless in 'off' mode used for recommendations.</p>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# VPA example (recommendation mode)
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: web-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind:       Deployment
    name:       web
  updatePolicy:
    updateMode: "Off"`}</pre>

      <h3 className="font-semibold mt-3">Cluster Autoscaler</h3>
      <p className="mb-2">Cluster Autoscaler (CA) scales node groups based on pending Pods and utilization. Configure with cloud autoscaling groups: AWS ASG, GCP instance groups.</p>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# sample CA annotation on nodegroup (EKS)
# configure via helm or cloud provider settings. CA watches for unschedulable pods.`}</pre>

      <h3 className="font-semibold mt-3">Combined Strategy</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>HPA responds to traffic spikes quickly by adding pods.</li>
        <li>Cluster Autoscaler adds nodes when pods remain Pending due to lack of capacity.</li>
        <li>VPA gives recommended request/limits to prevent constant scaling due to under/over-provisioning.</li>
      </ul>

      <h3 className="font-semibold mt-3">Anti-patterns & Pitfalls</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>Don't use VPA in "Auto" mode with HPA on same deployment without careful tuning (can cause thrashing).</li>
        <li>Use proper Pod disruption budgets (PDB) to avoid mass scaling down and availability loss.</li>
        <li>Cluster Autoscaler cooldowns and scale-down delays cause transient cost spikes or delays.</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">4) Security v2 — PodSecurity, NetworkPolicy, Vault/KMS</h2>
      <p className="mb-3">This section covers modern runtime enforcement, network segmentation, and secret management.</p>

      <h3 className="font-semibold mt-3">Pod Security Standards (PSP replacement)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# Use Pod Security Admission (PSA) in Kubernetes 1.25+
# Enforce policies via namespace labels
kubectl label ns dev pod-security.kubernetes.io/enforce=restricted`}</pre>

      <h3 className="font-semibold mt-3">NetworkPolicy (inch-by-inch)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-by-default
  namespace: prod
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress`}</pre>

      <h3 className="font-semibold mt-3">HashiCorp Vault & KMS</h3>
      <p className="mb-2">Vault (or cloud KMS + External Secrets) provides secure secret rotation, dynamic credentials, and audit logging.</p>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# High-level pattern
Vault (server) -> Kubernetes auth method -> Vault issues dynamic DB creds -> App retrieves via sidecar or CSI driver`}</pre>

      <h3 className="font-semibold mt-3">Secrets in GitOps</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>Never store plaintext secrets in Git.</li>
        <li>Use SealedSecrets (Bitnami) or ExternalSecrets operator backed by Vault/Secrets Manager.</li>
      </ul>

      <h3 className="font-semibold mt-3">Best Practices</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>Least privilege for service accounts; use IRSA on EKS.</li>
        <li>Enable audit logging and rotate credentials automatically.</li>
        <li>Use image scanning and admission controls (OPA/Gatekeeper) to block bad images.</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">5) Production Troubleshooting (CoreDNS, kubelet, Node, CNI)</h2>
      <p className="mb-3">Common production failures and how to drill into them fast.</p>

      <h3 className="font-semibold mt-3">CoreDNS Issues</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# common symptoms: DNS lookups slow or failing
kubectl -n kube-system get pods -l k8s-app=kube-dns
kubectl logs -n kube-system <coredns-pod>
# check configmap
kubectl -n kube-system describe configmap coredns`}</pre>

      <h3 className="font-semibold mt-3">kubelet / Node Problems</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# check node status
kubectl get nodes -o wide
# ssh to node and inspect kubelet logs
journalctl -u kubelet -f
# common causes: disk pressure, out-of-memory, kernel limits`}</pre>

      <h3 className="font-semibold mt-3">CNI & Networking</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# verify CNI pods
kubectl get pods -n kube-system -l k8s-app=calico
# verify pod network
kubectl exec -it <pod> -- ping <other-pod-ip>
# check node routes and iptables/ipvs rules`}</pre>

      <h3 className="font-semibold mt-3">Debug Workflow (step-by-step)</h3>
      <ol className="pl-6 mb-6 list-decimal">
        <li>Reproduce: Identify failing request and capture timestamps.</li>
        <li>Observability: Check Grafana dashboards and Prometheus metrics for anomalies.</li>
        <li>Logs: Search app & kube-system logs (Fluent/EFK or Splunk).</li>
        <li>Node health: Check node conditions, disk, CPU, memory.</li>
        <li>Networking: DNS, service endpoints, iptables/ipvs, CNI pod logs.</li>
        <li>Mitigation: Scale replicas, cordon/drain, restart problematic pods, roll back if necessary.</li>
      </ol>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">6) Blue‑Green & Canary Deployments (Argo Rollouts + Helm)</h2>
      <p className="mb-3">Strategies for zero‑downtime and safe progressive delivery.</p>

      <h3 className="font-semibold mt-3">Blue‑Green (concept)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# Blue-Green: maintain two parallel environments (blue / green)
# switch traffic via Ingress/Service to new environment once ready`}</pre>

      <h3 className="font-semibold mt-3">Canary with Argo Rollouts – example</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: web-rollout
spec:
  replicas: 5
  strategy:
    canary:
      steps:
        - setWeight: 20
        - pause: {duration: 60}
        - setWeight: 50
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: myapp:{{ .Values.image.tag }}`}</pre>

      <h3 className="font-semibold mt-3">Automatic Analysis</h3>
      <p className="mb-3">Argo Rollouts can integrate with Prometheus to automatically promote or rollback based on SLOs/metrics.</p>

      <h3 className="font-semibold mt-3">Best Practices</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>Define success metrics (error rate, latency) and use automated analysis.</li>
        <li>Start with small traffic percentages and increase gradually with pauses.</li>
        <li>Use feature flags to decouple deployment from feature rollout.</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">7) Multi‑Cluster Kubernetes — Federation & Failover</h2>
      <p className="mb-3">Multi‑cluster patterns support isolation, geo‑distribution, DR, and capacity bursting.</p>

      <h3 className="font-semibold mt-3">Patterns</h3>
      <ul className="list-disc pl-6 mb-3">
        <li><strong>Active‑Passive</strong> — Primary cluster handles production, secondary standby for DR.</li>
        <li><strong>Active‑Active</strong> — Traffic split across clusters (need global load balancing & data replication).</li>
        <li><strong>Failover</strong> — DNS TTL + health checks to move traffic on failure.</li>
      </ul>

      <h3 className="font-semibold mt-3">Tools</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>KubeFed (Kubernetes Federation) for resource distribution.</li>
        <li>Cluster API for lifecycle management.</li>
        <li>Global DNS (Route53 / Cloud DNS) + external load balancer.</li>
      </ul>

      <h3 className="font-semibold mt-3">Data Considerations</h3>
      <p className="mb-3">Database replication strategies (master‑slave, multi‑master) and eventual consistency tradeoffs are critical.</p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">8) Ingress Advanced — API Gateway, Layer‑7 Routing, WAF</h2>
      <p className="mb-3">Advanced routing, authentication, rate limiting and WAF add-ons for production ingress.</p>

      <h3 className="font-semibold mt-3">API Gateway vs Ingress</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>Ingress is simple L7 routing. API Gateways (Kong, Ambassador, Gloo, AWS API GW) add auth, rate‑limit, transformations.</li>
      </ul>

      <h3 className="font-semibold mt-3">Rate limiting & Auth (example)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`# Example: Kong plugin for rate-limiting
# configure via KongIngress / KongPlugin CRDs`}</pre>

      <h3 className="font-semibold mt-3">WAF & Security</h3>
      <p className="mb-3">Use cloud WAF or Ingress controller integrated WAF (ModSecurity) to block common attacks. Terminate TLS at edge and use mTLS internally.</p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">9) Cost Optimization — Rightsizing, Spot Instances, Scheduling, Storage</h2>
      <p className="mb-3">Reduce cloud cost while maintaining reliability through smart sizing and scheduling.</p>

      <h3 className="font-semibold mt-3">Rightsizing</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>Use VPA recommendations for requests/limits.</li>
        <li>Analyze Prometheus metrics to identify underutilized nodes/pods.</li>
      </ul>

      <h3 className="font-semibold mt-3">Spot/Preemptible Instances</h3>
      <p className="mb-3">Use spot instances for batch/worker nodes and configure mixed node groups. Ensure pods are fault-tolerant and use pod disruption budgets.</p>

      <h3 className="font-semibold mt-3">Storage & Data Tiering</h3>
      <ul className="list-disc pl-6 mb-3">
        <li>Use cheaper object storage (S3) for backups and cold data.</li>
        <li>Choose appropriate StorageClass (gp3 / cold) and lifecycle rules.</li>
      </ul>

      <h3 className="font-semibold mt-3">Scheduling & Preemption</h3>
      <p className="mb-3">Use nodeSelectors / taints to schedule non-critical workloads onto cheaper nodes. Use priorityClasses to protect critical pods.</p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mt-4">Masterclass Wrap-up: Checklist & Next Steps</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Implement GitOps with ArgoCD for reliable, auditable deployments.</li>
        <li>Adopt a service mesh gradually and measure sidecar impact.</li>
        <li>Design autoscaling carefully — HPA + CA + VPA combined strategy.</li>
        <li>Enforce PodSecurity + NetworkPolicy + Secrets best practices.</li>
        <li>Build runbooks for common production failures (DNS, kubelet, CNI).</li>
        <li>Use progressive delivery tools (Argo Rollouts) for safe releases.</li>
        <li>Plan multi‑cluster topology based on DR and latency requirements.</li>
        <li>Secure ingress layer with API gateway and WAF; centralize auth and rate limits.</li>
        <li>Continuously monitor cost and apply rightsizing + spot strategies.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">45–120 minute Teaching Plan (suggested)</h2>
      <ol className="pl-6 mb-6 list-decimal">
        <li>0–10m: Overview & objectives</li>
        <li>10–30m: GitOps + Demo of ArgoCD (sync + drift + rollback)</li>
        <li>30–60m: Istio intro + demo (traffic shaping + mTLS)</li>
        <li>60–90m: Autoscaling + Live HPA demo + Cluster Autoscaler</li>
        <li>90–110m: Security + Vault pattern + NetworkPolicy</li>
        <li>110–130m: Troubleshooting walkthrough (live logs + fix)</li>
        <li>130–150m: Rollouts (canary) demo + Multi-cluster discussion</li>
        <li>150–170m: Ingress advanced + Cost optimization tips</li>
        <li>170–180m: Quiz + Interview prep + Q&A</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-4">Quiz (10 short questions)</h2>
      <ol className="pl-6 mb-6 list-decimal">
        <li>What is GitOps and why is it useful?</li>
        <li>How does Istio implement mTLS between services?</li>
        <li>When would you use VPA vs HPA?</li>
        <li>Name three causes of CoreDNS failures.</li>
        <li>What’s the difference between Blue‑Green and Canary?</li>
        <li>How do you failover traffic in a multi‑cluster setup?</li>
        <li>What is a Gateway in Istio?</li>
        <li>List two ways to reduce Kubernetes cost in cloud environments.</li>
        <li>How does Argo Rollouts automate promotion/rollback?</li>
        <li>Why should secrets not be stored in Git and what are alternatives?</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-4">Interview Prep Questions (Advanced)</h2>
      <ol className="pl-6 mb-6 list-decimal">
        <li>Explain how you’d design GitOps across multiple clusters and environments while keeping secrets secure.</li>
        <li>Describe how Istio sidecars affect pod resource usage and how you mitigate it.</li>
        <li>How do you ensure autoscaling does not lead to thrashing?</li>
        <li>Walk me through debugging a cross‑region DNS failover for production traffic.</li>
        <li>How would you secure CI/CD credentials and rotate them automatically?</li>
      </ol>

      <p className="mt-6 font-semibold">Lesson 19 masterclass is created and added to canvas. Say <strong>"Export Lesson 19"</strong> to download as files, or say <strong>"Give Lesson 20"</strong> to continue the course.</p>
    </div>
  );
}
