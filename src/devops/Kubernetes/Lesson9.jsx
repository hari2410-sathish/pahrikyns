export default function Lesson9() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 9 – StatefulSets (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        StatefulSets are designed for stateful applications like databases, queues, and distributed systems.
        They provide stable identity, predictable naming, ordered creation, and persistent storage.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Where StatefulSets Are Used</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Databases: MySQL, PostgreSQL, MongoDB</li>
        <li>Distributed systems: Kafka, Zookeeper, RabbitMQ</li>
        <li>Systems needing stable network identity</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D StatefulSet Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`     +---------------- StatefulSet ----------------+
     |   replica = 3                                |
     |                                             |
     |  +------------+  +------------+  +------------+
     |  | pod-0      |  | pod-1      |  | pod-2      |
     |  | PV-0       |  | PV-1       |  | PV-2       |
     |  +------------+  +------------+  +------------+
     +------------------------------------------------`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Stateful Architecture Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`              [ Stateful App Layer ]
                     /   |   \
      --------------------------------------
      |       Pod-0     Pod-1     Pod-2     |
      --------------------------------------
          |           |           |
       [Disk-0]    [Disk-1]    [Disk-2]

Each pod attaches to its own dedicated disk.
Pods keep their identity even after restart:`}
      </pre>

      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`pod-0 → retains PV-0
pod-1 → retains PV-1
pod-2 → retains PV-2`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">StatefulSet YAML</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web-db
spec:
  serviceName: "web-db"
  replicas: 3
  selector:
    matchLabels:
      app: web-db
  template:
    metadata:
      labels:
        app: web-db
    spec:
      containers:
        - name: db
          image: mysql:8
          volumeMounts:
            - name: data
              mountPath: /var/lib/mysql
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Headless Service</h2>
      <p className="mb-3">StatefulSets require a headless service for stable DNS.</p>

      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: v1
kind: Service
metadata:
  name: web-db
spec:
  clusterIP: None
  selector:
    app: web-db
  ports:
    - port: 3306`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Stable DNS Naming</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`pod-0 → web-db-0.web-db.default.svc.cluster.local
pod-1 → web-db-1.web-db.default.svc.cluster.local
pod-2 → web-db-2.web-db.default.svc.cluster.local`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Ordered Deployment & Termination</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`Creation Order:
   pod-0 → pod-1 → pod-2

Deletion Order:
   pod-2 → pod-1 → pod-0`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kubectl Commands</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl get sts
kubectl describe sts web-db
kubectl get pods -l app=web-db`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real-World Use Case</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`Banking Database Cluster:
 - PostgreSQL master + replicas
 - PV binding ensures durability
 - Headless service supports direct pod-to-pod traffic
 - Ordered startup ensures consistency`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Always use StatefulSets for databases</li>
        <li>Never use hostPath for stateful workloads</li>
        <li>Use volumeClaimTemplates for dynamic storage</li>
        <li>Scale up/down carefully — affects ordering</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 10 – DaemonSets (Node-level workloads, logging agents, CNI, monitoring)</p>
    </div>
  );
}
