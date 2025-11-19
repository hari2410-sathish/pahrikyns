export default function Lesson10() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 10 – DaemonSets (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        DaemonSets ensure that one Pod runs on every node in the cluster. They are used for node-level
        workloads such as logging, monitoring, networking, and security agents. This lesson covers concepts,
        architecture, YAML examples, rolling updates, and real cloud usage.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Use Cases of DaemonSets</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Log collectors (Fluentd, Filebeat, Datadog)</li>
        <li>Monitoring agents (Prometheus Node Exporter)</li>
        <li>CNI network plugins (Calico, Weave, Flannel)</li>
        <li>Security agents (Falco, Sysdig)</li>
        <li>kube-proxy on each node</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`              +---------------- DaemonSet ----------------+
              |  runs pod on ALL nodes                    |
              |                                            |
   +-----------+-----------+   +-----------+-----------+   +-----------+-----------+
   |  Node 1               |   |  Node 2               |   |  Node 3               |
   |  +------------------+ |   | +------------------+  |   | +------------------+  |
   |  |  DS Pod          | |   | |  DS Pod          |  |   | |  DS Pod          |  |
   |  +------------------+ |   | +------------------+  |   | +------------------+  |
   +-----------------------+   +------------------------+   +------------------------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Cluster Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`           [ DaemonSet Controller ]
                     |
        ---------------------------------
        |       |        |        |     |
     [Node1] [Node2] [Node3] [Node4] ...
        |        |      |        |
     [Pod]    [Pod]   [Pod]    [Pod]

One Pod per node → automatic sync when nodes join/leave cluster.`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">DaemonSet YAML (Basic)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: log-agent
spec:
  selector:
    matchLabels:
      app: log-agent
  template:
    metadata:
      labels:
        app: log-agent
    spec:
      containers:
        - name: filebeat
          image: elastic/filebeat:8.0`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">DaemonSet with Node Selector</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  template:
    spec:
      nodeSelector:
        node-type: storage`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Tolerations (Run on Tainted Nodes)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`tolerations:
  - key: "node-role.kubernetes.io/master"
    operator: "Exists"
    effect: "NoSchedule"`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Rolling Update Strategy</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`updateStrategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kubectl Commands</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl get ds
kubectl describe ds log-agent
kubectl get pods -o wide`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real-World Example</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`Cloud Logging System:
 - Filebeat runs on every node
 - Collects logs from /var/log
 - Sends logs to ElasticSearch
 - Auto-runs if new node is added`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Use DaemonSets for node-level agents only</li>
        <li>Use tolerations for master/control-plane logging</li>
        <li>Enable RollingUpdate for smooth upgrades</li>
        <li>Avoid heavy containers; DaemonSets run everywhere</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 11 – Jobs & CronJobs (Batch processing, schedules, retries)</p>
    </div>
  );
}
