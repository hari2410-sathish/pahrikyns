export default function Lesson5() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 5 – Services & Networking (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        Services expose Pods reliably. This lesson explains ClusterIP, NodePort, LoadBalancer, and 3D network flow.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Why Services?</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Stable IP for changing Pods</li>
        <li>Load balancing across replicas</li>
        <li>Internal & external communication</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Networking Flow Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`                   +----------------------+
                   |     Service          |
                   |   (ClusterIP)        |
                   +----------+-----------+
                              |
                    +---------+---------+
                    |         |         |
               +----v----+ +--v----+ +--v----+
               |  Pod1   | | Pod2  | | Pod3  |
               +---------+ +--------+ +-------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Cluster Networking Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`      [ Client ]
           |
    ------------------
    |  Node Layer    |
    ------------------
         /    |    \
   [Service ClusterIP]
        /   |    \
   [Pods floating in 3D mesh network]
        |         |
    [Containers] [Containers]`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">ClusterIP (Default)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: v1
kind: Service
metadata:
  name: web-svc
spec:
  type: ClusterIP
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 8080`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">NodePort</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">LoadBalancer</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 8080`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kubectl Commands</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl get svc
kubectl describe svc web-svc
kubectl port-forward svc/web-svc 8080:80`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Use ClusterIP for internal workloads</li>
        <li>Use LoadBalancer for public access</li>
        <li>Avoid NodePort unless required</li>
        <li>Use Ingress for advanced routing</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 6 – Ingress + NGINX Controller (Full 3D Routing Path)</p>
    </div>
  );
}
