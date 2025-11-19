export default function Lesson14() {
  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 14 – Networking Deep Dive (CNI, Pod Routing, kube-proxy, 3D Network Fabric)</h1>

      <p className="mb-4 text-base">
        Kubernetes networking is one of the most important (and confusing) topics. This lesson breaks down:
        Pod-to-Pod networking, Node-to-Node routing, Service networking, kube-proxy, CNI plugins (Calico,
        Flannel, Weave), and a full 3D cluster network fabric model.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Core Networking Rules in Kubernetes</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Every Pod gets its own unique IP</li>
        <li>All Pods can communicate with each other without NAT</li>
        <li>Services provide stable virtual IPs</li>
        <li>Network is provided by CNI plugins</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D: Pod-to-Pod Network Flow</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm leading-relaxed overflow-auto">
{`        +-------------+           +-------------+
        |   Pod A     |  ----->   |   Pod B     |
        | 10.244.1.3  |           | 10.244.2.7  |
        +-------------+           +-------------+
                 |                        |
              [CNI]                    [CNI]
                 |                        |
           +------------ Node 1 ------------+
           +------------ Node 2 ------------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Network Fabric Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm leading-relaxed overflow-auto">
{`             [ Overlay Network Mesh ]
     --------------------------------------------------
     |        |          |          |                 |
   [Node1]  [Node2]   [Node3]   [Node4] ...        3D
     |         |          |          |            Fabric
   [Pods]    [Pods]     [Pods]     [Pods]
     \__________ All interconnected via CNI __________/`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">CNI Plugins (Container Network Interface)</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Calico</strong> – L3 routing, best for production</li>
        <li><strong>Flannel</strong> – Simple VXLAN overlay</li>
        <li><strong>Weave</strong> – Mesh network</li>
        <li><strong>Cilium</strong> – eBPF-based networking & security</li>
      </ul>

      <h2 className="text-xl font-semibold mt-5">Calico Installation Example</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kube-proxy (Service Routing)</h2>
      <p className="mb-3">kube-proxy maintains iptables / IPVS rules for Service traffic.</p>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto leading-relaxed">
{`         Client Pod
              |
        +-----v------+
        |  Service   |  (ClusterIP)
        +-----+------+
              |
       -----------------
       | kube-proxy    |
       -----------------
          |       |
        Pod 1   Pod 2`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">IPVS Mode (Recommended for Production)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`kube-proxy --proxy-mode=ipvs`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Pod-to-Service Networking</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto leading-relaxed">
{`Pod → DNS Query → ClusterDNS → ClusterIP → kube-proxy → Selected Pod`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">CoreDNS – Service Discovery</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`kubectl -n kube-system get pods -l k8s-app=kube-dns`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Network Policies (Firewall for Pods)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend
spec:
  podSelector:
    matchLabels:
      role: backend
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: frontend`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kubectl Commands</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`kubectl get nodes -o wide
kubectl get pods -o wide
kubectl get svc
kubectl get networkpolicy`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real-World Example</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto leading-relaxed">
{`FinTech App:
 - Calico provides L3 routing
 - NetworkPolicies isolate services
 - IPVS mode gives fast load balancing
 - DNS provides service discovery
 - All pods connected in a 3D overlay network`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Use Cilium or Calico for production</li>
        <li>Enable IPVS mode on kube-proxy</li>
        <li>Implement NetworkPolicies for zero-trust networking</li>
        <li>Use DNS for service discovery, avoid hard-coded IPs</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 15 – Helm (Templates, Releases, Charts, 3D Deployment Architecture)</p>
    </div>
  );
}
