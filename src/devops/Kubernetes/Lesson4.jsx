export default function Lesson4() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 4 – ReplicaSets & Deployments (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        This lesson explains how ReplicaSets and Deployments provide self-healing, scaling, rollouts, and
        rollbacks. These are the backbone of Kubernetes workload management.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">ReplicaSet (2D Diagram)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`         +---------------- ReplicaSet ----------------+
         |       replicas: 3                          |
         |                                            |
         |   +----------+   +----------+   +----------+
         |   |  Pod-1   |   |  Pod-2   |   |  Pod-3   |
         |   +----------+   +----------+   +----------+
         +------------------------------------------------`}
      </pre>

      <p className="mt-3 mb-3">ReplicaSet ensures the correct number of Pods are always running.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">ReplicaSet YAML</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: rs-sample
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: nginx
          image: nginx:latest`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Deployment (2D Diagram)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`             +---------------- Deployment ----------------+
             |   manages rollout + rollback + RS          |
             |                                                  
             |   +---------------+         +----------------+
             |   | ReplicaSet-v1 |  --->   | ReplicaSet-v2  |
             |   | (old)         |         | (new)          |
             |   +---------------+         +----------------+
             |        |    |   |                |    |   |
             |       Pods Pods Pods            Pods Pods Pods
             +-------------------------------------------------`}
      </pre>

      <p className="mb-4">Deployments automatically manage ReplicaSets and enable rolling updates.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Deployment YAML (Basic)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deploy
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: nginx
          image: nginx:1.23`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Rolling Updates</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl set image deployment/web-deploy nginx=nginx:1.25
kubectl rollout status deployment/web-deploy`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Rollback</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl rollout undo deployment/web-deploy`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Deployment Strategies</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>RollingUpdate</strong> – Default smooth upgrade</li>
        <li><strong>Recreate</strong> – Stops all Pods first, then creates new ones</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Advanced Rolling Update Config</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
    maxSurge: 1`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real-world Scenario</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`1. Your app has 1M users.
2. You update image from v1 → v2.
3. Deployment creates RS-v2 while scaling down RS-v1.
4. Users experience ZERO downtime.
5. If issue → rollback instantly.`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Always deploy using Deployments, not raw ReplicaSets</li>
        <li>Use RollingUpdate for production</li>
        <li>Never hard-delete old ReplicaSets, let Deployment manage them</li>
        <li>Use probes + resource limits for healthy rollouts</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 5 – Services (ClusterIP, NodePort, LoadBalancer, 3D Networking Flow)</p>
    </div>
  );
}
