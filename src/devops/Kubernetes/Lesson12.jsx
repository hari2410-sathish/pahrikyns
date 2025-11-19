export default function Lesson12() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 12 – RBAC & Service Accounts (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        RBAC (Role-Based Access Control) is the security backbone of Kubernetes. It controls who can
        access what resources and with which actions. This lesson covers Roles, ClusterRoles,
        RoleBindings, ClusterRoleBindings, ServiceAccounts, and the complete 3D security architecture.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Why RBAC?</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Restrict access to Kubernetes resources</li>
        <li>Follow principle of least privilege</li>
        <li>Control user & service permissions</li>
        <li>Prevent security breaches in production</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D RBAC Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`        +--------------+          +----------------+
        |   User/SA   | ----->   |  RoleBinding   |
        +--------------+          +----------------+
                   |                        |
                   v                        v
              +----------+          +----------------+
              |  Role    |          | Kubernetes API |
              +----------+          +----------------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Security Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`       [ Identity Layer ]
        /       |       \
  [Users]   [ServiceAccounts]   [Groups]
        |               |
  ----------------------------------------------
        |        RBAC Bindings Layer            |
  ----------------------------------------------
        \             |             /
             [ Permission Layer ]
                     |
                 [ K8s API ]`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Role (Namespace Scoped)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: dev
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">RoleBinding (Bind User to Role)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: dev
subjects:
  - kind: User
    name: hari
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">ClusterRole (Cluster-wide Permissions)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: node-reader
rules:
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["get", "list", "watch"]`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">ClusterRoleBinding</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: node-access
subjects:
  - kind: User
    name: hari
roleRef:
  kind: ClusterRole
  name: node-reader
  apiGroup: rbac.authorization.k8s.io`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">ServiceAccounts (SA)</h2>
      <p className="mb-3">Service Accounts are used by applications (Pods), not humans.</p>

      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-sa
  namespace: dev`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Assign Role to ServiceAccount</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`subjects:
  - kind: ServiceAccount
    name: app-sa
    namespace: dev`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Using SA in Pods</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  serviceAccountName: app-sa
  containers:
    - name: app
      image: myapp`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kubectl Commands</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl get sa
kubectl describe sa app-sa
kubectl get roles -A
kubectl get clusterroles`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real-World Use Case</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`Banking Application:
 - API service uses ServiceAccount
 - Only allowed to list pods in dev namespace
 - Admin users get cluster-wide node access
 - RBAC prevents accidental deletion or leaks`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Never use admin privileges for apps</li>
        <li>Bind users to least permissions required</li>
        <li>Use ServiceAccounts for all workloads</li>
        <li>Rotate secrets/tokens regularly</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 13 – Monitoring & Logging (Prometheus, Grafana, EFK, 3D Observability Architecture)</p>
    </div>
  );
}
