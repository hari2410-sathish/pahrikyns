export default function Lesson2() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 2 – Deep Architecture (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        In this lesson, we break down the internal working model of Kubernetes. You will understand how
        Master and Worker nodes communicate, how components coordinate workloads, and how a cluster
        maintains stability.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Kubernetes Architecture Overview</h2>
      <p className="mb-4">A Kubernetes cluster has two main parts:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Control Plane (Master)</strong> – Handles cluster decisions</li>
        <li><strong>Worker Nodes</strong> – Run applications inside Pods</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Full Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`                      +----------------- Control Plane ------------------+
                      |                                                   |
                      |  +---------------+     +-----------------------+  |
                      |  | API Server    |<--->|    etcd (Database)    |  |
                      |  +-------+-------+     +-----------+-----------+  |
                      |          |                         |              |
                      |  +-------v-------+     +-----------v-----------+  |
                      |  | Scheduler     |     | Controller Manager    |  |
                      |  +---------------+     +------------------------+  |
                      +-----------------------------------------------------+
                                      |
                                      |
                                      v
                  +------------------------- Worker Nodes -------------------------+
                  |                                                                 |
                  |  +----------+       +----------+       +----------+             |
                  |  | Kubelet |       | Kubelet |       | Kubelet |             |
                  |  +----+-----+       +----+-----+       +----+-----+             |
                  |       |                  |                  |                   |
                  |  +----v----+        +----v----+        +----v----+             |
                  |  |  Pods   |        |  Pods   |        |  Pods   |             |
                  |  +----+----+        +----+----+        +----+----+             |
                  |       |                  |                  |                   |
                  |  +----v----+        +----v----+        +----v----+             |
                  |  |Container|        |Container|        |Container|             |
                  |  +---------+        +---------+        +---------+             |
                  +-----------------------------------------------------------------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Architecture Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`     [Control Plane]
           |
   ------------------
   |   |   |   |   |
 [API][Scheduler][CM][etcd]
           |
     ------------------
     |   |   |   |   |
   Nodes floating in a 3D space
        |        |
      [Pods]   [Pods]
        |        |
    [Containers][Containers]

In a 3D perspective:
- Control Plane sits at the top layer
- Worker Nodes are the middle layer
- Pods are inside nodes
- Containers are inside pods`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Control Plane Components</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>API Server</strong> – The gateway for all cluster communication.</li>
        <li><strong>etcd</strong> – Distributed key-value store (cluster brain memory).</li>
        <li><strong>Scheduler</strong> – Decides which node runs the Pod.</li>
        <li><strong>Controller Manager</strong> – Maintains cluster state.</li>
        <li><strong>Cloud Controller Manager</strong> – Integrates cloud features (AWS/GCP/Azure).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Worker Node Components</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Kubelet</strong> – Primary node agent that ensures Pods run correctly.</li>
        <li><strong>Kube-proxy</strong> – Manages networking rules and service routing.</li>
        <li><strong>Container Runtime</strong> – Docker, containerd, CRI-O.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real Cluster Flow Example</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`1. User applies deployment.yaml → sent to API server
2. API server stores desired state in etcd
3. Scheduler picks a suitable worker node
4. Kubelet pulls container images
5. Pods start running
6. kube-proxy sets networking routes
7. Controllers ensure Pod count always matches desired state`}
      </pre>

      <p className="mt-8 font-semibold">Next: Lesson 3 – Pods Deep Dive (2D/3D Diagrams + YAML + Real World Use)</p>
    </div>
  );
}
