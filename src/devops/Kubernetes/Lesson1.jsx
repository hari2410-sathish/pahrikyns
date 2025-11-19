export default function Lesson1() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 1 – Introduction (45‑min Full Guide)</h1>
      <p className="text-base mb-4">
        Kubernetes (K8s) is an open‑source container orchestration platform designed to automate the
        deployment, scaling, and management of containerized applications.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Why Kubernetes?</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Manages containers at scale</li>
        <li>Provides automatic healing</li>
        <li>Offers built‑in load balancing</li>
        <li>Supports rolling updates & rollbacks</li>
        <li>Ensures resource efficiency</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`         +------------------- Kubernetes Cluster -------------------+
         |                                                         |
         |   +-----------+          +-----------+                 |
         |   | Master    |          | Worker    |                 |
         |   | Node      |          | Node      |                 |
         |   +-----------+          +-----------+                 |
         |       |                       |                        |
         |  +----v----+           +------v-------+                |
         |  | API     |           |  Kubelet     |                |
         |  | Server  |           |  Container   |                |
         |  +----+----+           |  Runtime     |                |
         |       |                +------+-------+                |
         |  +----v----+                  |                        |
         |  | Scheduler|           +-----v----+                   |
         |  +---------+           |   Pods    |                   |
         +---------------------------------------------------------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Concept Diagram (Simplified)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`          [ K8s Cluster ]
                | 
         ------------------
         |   |   |   |   |
       [Pod][Pod][Pod][Pod]
         |           |
       [Ctr]       [Ctr]

  Pods are floating units inside a 3D cluster space.
  Containers live inside Pods.
  Nodes host Pods in layered 3D structure.`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Core Components Overview</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Master Node</strong> – Decision making (brain)</li>
        <li><strong>Worker Node</strong> – Runs applications</li>
        <li><strong>Pod</strong> – Smallest deployable unit</li>
        <li><strong>Deployment</strong> – Manages replicas</li>
        <li><strong>Service</strong> – Provides networking</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Sample Pod YAML (Beginner Friendly)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: v1
kind: Pod
metadata:
  name: sample-pod
spec:
  containers:
    - name: nginx
      image: nginx:latest`}
      </pre>

      <p className="mt-8 font-semibold">Next: Lesson 2 – Kubernetes Architecture Deep Dive →</p>
    </div>
  );
}
