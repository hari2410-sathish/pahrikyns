export default function Lesson3() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 3 – Pods Deep Dive (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        Pods are the smallest deployable units in Kubernetes. This lesson covers Pod anatomy, multi-container
        patterns, init containers, lifecycle hooks, probes (liveness/readiness), resource requests/limits,
        scheduling hints (nodeSelector, affinity, tolerations) and practical kubectl examples.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Pod Anatomy (2D Diagram)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`+---------------------------------------+
|                Node                   |
|  +-------------------------------+    |
|  |            Pod                |    |
|  |  +--------+   +----------+    |    |
|  |  |Ctr-1   |   | Sidecar  |    |    |
|  |  |(App)   |   | (Logs)   |    |    |
|  |  +--------+   +----------+    |    |
|  |  IP: 10.244.0.12              |    |
|  +-------------------------------+    |
+---------------------------------------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Single-container Pod YAML</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: v1
kind: Pod
metadata:
  name: sample-pod
  labels:
    app: sample
spec:
  containers:
    - name: web
      image: nginx:stable
      ports:
        - containerPort: 80`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Multi-container Pod (Sidecar pattern)</h2>
      <p className="mb-3">Use sidecars for logging, proxy, or helper tasks. They share the same network namespace.</p>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: v1
kind: Pod
metadata:
  name: sidecar-pod
spec:
  containers:
    - name: app
      image: myapp:latest
      ports:
        - containerPort: 8080
    - name: fluentd
      image: fluentd:latest
      volumeMounts:
        - name: varlog
          mountPath: /var/log`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Init Containers</h2>
      <p className="mb-3">Init containers run before app containers. Useful for migrations or prechecks.</p>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  initContainers:
    - name: init-migrate
      image: alpine
      command: ['sh','-c','/scripts/migrate.sh']
  containers:
    - name: app
      image: myapp:latest`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Probes: Liveness & Readiness</h2>
      <p className="mb-2">Probes help Kube know when to restart or route traffic to your Pod.</p>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 20
readinessProbe:
  tcpSocket:
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Resources: Requests & Limits</h2>
      <p className="mb-3">Always set requests & limits to allow scheduler to place Pods and avoid noisy neighbours.</p>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`resources:
  requests:
    cpu: "250m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "256Mi"`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Scheduling: nodeSelector, affinity, tolerations</h2>
      <p className="mb-2">Control where Pods land using labels and taints/tolerations.</p>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`nodeSelector:
  disktype: ssd

affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
            - key: app
              operator: In
              values:
                - web
        topologyKey: "kubernetes.io/hostname"

tolerations:
  - key: "special"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Pod Lifecycle & Debugging</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Phases: Pending → Running → Succeeded/Failed → Unknown</li>
        <li>Use <code>kubectl describe pod/NAME</code> to inspect events</li>
        <li>Logs: <code>kubectl logs pod/NAME -c container</code></li>
        <li>Ephemeral Containers for attaching debuggers at runtime</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Practical Examples</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`# create pod
kubectl apply -f pod.yaml

# stream logs
kubectl logs -f pod/sample-pod -c web

# exec into container
kubectl exec -it pod/sample-pod -c web -- /bin/sh

# get pod with wide output
kubectl get pods -o wide`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices (Short)</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Keep containers single-responsibility inside pods</li>
        <li>Use readiness probes to avoid sending traffic to unready pods</li>
        <li>Set resources to prevent CPU/Memory starvation</li>
        <li>Prefer Deployments/ReplicaSets over raw Pods for production</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 4 – ReplicaSets & Deployments (Rolling updates, Strategies, & Real Scenarios)</p>
    </div>
  );
}
