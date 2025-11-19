export default function Lesson6() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 6 – Ingress & NGINX Ingress Controller (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        Ingress provides advanced HTTP/HTTPS routing into Kubernetes workloads. In this lesson, you will
        learn path‑based routing, host‑based routing, TLS termination, NGINX controller architecture,
        and full 3D traffic flow diagrams.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Why Ingress?</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Single external IP for multiple apps</li>
        <li>Advanced routing rules</li>
        <li>SSL/TLS termination</li>
        <li>Load balancing at Layer 7 (HTTP/HTTPS)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Routing Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`                          +----------------------+
                          |   Ingress Controller  |
                          +-----------+-----------+
                                      |
          -------------------------------------------------------
          |                       |                             |
   +------v------+        +-------v-------+             +-------v-------+
   |  /app1      |        |   /app2       |             |   /admin      |
   |  (Service1) |        |   (Service2)  |             |   (Service3)  |
   +-------------+        +---------------+             +---------------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Traffic Flow Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`[ Client Browser ]
        |
   (Internet Layer)
        |
   [ LoadBalancer ]
        |
   ----------------------  <-- 3D Cluster Edge
   |   Ingress Gateway   |
   ----------------------
     /        |        \
[Service1] [Service2] [Service3]
     |           |           |
   [Pods]      [Pods]      [Pods]`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Ingress Basic YAML</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: demo-ingress
spec:
  rules:
    - host: demo.local
      http:
        paths:
          - path: /app1
            pathType: Prefix
            backend:
              service:
                name: app1-svc
                port:
                  number: 80`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Host-Based Routing</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`rules:
  - host: api.example.com
    http:
      paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: api-svc
              port:
                number: 80`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">TLS (HTTPS) Example</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  tls:
    - hosts:
        - demo.local
      secretName: tls-secret
  rules:
    - host: demo.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-svc
                port:
                  number: 80`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Installing NGINX Ingress Controller</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Validate Controller</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real‑World Example: Multi‑App Routing</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`Host: shop.example.com
   /api → api-svc
   /img → image-svc
   /auth → auth-svc

Ingress controller intelligently routes traffic based on paths.`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Use Ingress for HTTP/HTTPS, not for TCP/UDP</li>
        <li>Use TLS everywhere for security</li>
        <li>Prefix pathType recommended for web apps</li>
        <li>Use Cert‑Manager for auto SSL</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 7 – ConfigMaps & Secrets (Environment, Volumes, Encryption)</p>
    </div>
  );
}
