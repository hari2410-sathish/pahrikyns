export default function Lesson22() {
  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 22 – Advanced Kubernetes Security: OPA Gatekeeper + Kyverno + Image Scanning + Runtime Protection (45–60 min Deep Lesson)</h1>

      <p className="mb-4">This lesson covers the most advanced Kubernetes security frameworks: OPA Gatekeeper, Kyverno policies, container image scanning, runtime security (Falco), admission control, and enforcing enterprise-grade cluster governance. Fully explained with diagrams, examples, and best practices.</p>

      <h2 className="text-2xl font-semibold mt-4">What You Will Learn</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>OPA Gatekeeper & Rego policies</li>
        <li>Kyverno validation, mutation & generation policies</li>
        <li>Admission controllers & policy enforcement</li>
        <li>Image scanning pipelines (Trivy/Clair)</li>
        <li>Runtime protection using Falco</li>
        <li>Enterprise-grade security patterns</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">2D Architecture – Security Layers</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">{`User → kubectl apply
        |
Admission Controller Layer (Gatekeeper / Kyverno)
        |
 Image Scanning + Policy Checks
        |
 Runtime Security (Falco)
        |
      Kubernetes API → Pods`}</pre>

      <h2 className="text-2xl font-semibold mt-4">3D Concept – Multi-Layer Protection</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm text-sm overflow-auto">{`       [ Policy-as-Code Layer ]
       | OPA Gatekeeper / Kyverno |
                 |
        --------------------------------
        | Admission Control Firewall   |
        --------------------------------
                 |
   [ Cluster Runtime Layer (Falco) ]
                 |
   [ Secure Pod Execution Environment ]`}</pre>

      <h2 className="text-2xl font-semibold mt-4">OPA Gatekeeper (Policy-as-Code)</h2>
      <p className="mb-2">Gatekeeper uses Rego language to enforce Kubernetes governance policies.</p>

      <h3 className="text-lg font-semibold mt-2">Install Gatekeeper</h3>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/master/deploy/gatekeeper.yaml`}</pre>

      <h3 className="text-lg font-semibold mt-2">Example: Block containers running as root</h3>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSPAllowPrivilegeEscalationContainer
metadata:
  name: disallow-priv
spec:
  allowPrivilegeEscalation: false`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Kyverno – Kubernetes Native Policy Engine</h2>
      <p className="mb-3">Kyverno is easier than Gatekeeper; policies use YAML, no Rego required.</p>

      <h3 className="text-lg font-semibold mt-2">Kyverno Policy Example (Require Labels)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-app-label
spec:
  validationFailureAction: enforce
  rules:
    - name: check-label
      match:
        resources:
          kinds: ["Pod"]
      validate:
        message: "app label is required"
        pattern:
          metadata:
            labels:
              app: "?*"`}</pre>

      <h3 className="text-lg font-semibold mt-2">Mutation Policy (Inject Defaults)</h3>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`# Automatically inject CPU/memory limits
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: inject-limits
spec:
  rules:
    - name: add-resources
      match:
        resources:
          kinds: ["Deployment"]
      mutate:
        patchStrategicMerge:
          spec:
            template:
              spec:
                containers:
                  - name: "*"
                    resources:
                      limits:
                        cpu: 500m
                        memory: 512Mi`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Image Scanning (CI Integration)</h2>
      <p className="mb-3">Images should be scanned before deployment using Trivy or Clair.</p>

      <h3 className="text-lg font-semibold mt-2">Example GitHub Action step</h3>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`- name: Trivy Scan
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: myapp:${{ github.sha }}`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Runtime Security (Falco)</h2>
      <p className="mb-3">Falco detects suspicious behavior like exec into pods, file modifications, privilege escalation, etc.</p>

      <h3 className="text-lg font-semibold mt-2">Falco Rule Example</h3>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`# Detect interactive shell inside container
- rule: Container Shell
  desc: Detect shell inside running container
  condition: container.id != host and process.name in (bash,sh,zsh)
  output: shell in container (user=%user.name)
  priority: WARNING`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Kubernetes Admission Control Flow</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">{`kubectl apply → API Server → Admission Controllers → Gatekeeper/Kyverno Policies → Valid/Rejected → Pod Creation`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Best Practices</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Fail-closed security (block when unsure)</li>
        <li>Scan images in CI, not inside cluster</li>
        <li>Enable mTLS & enforce RBAC policies</li>
        <li>Use Kyverno for auto-mutation and defaults</li>
        <li>Use Gatekeeper for strict governance</li>
        <li>Monitor runtime with Falco + alerts</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Troubleshooting</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Policies blocking deployments → run `kubectl describe` on failed resources</li>
        <li>Gatekeeper slow → large number of constraints; use audit mode first</li>
        <li>Kyverno mutation not working → incorrect patch format</li>
        <li>Falco noisy alerts → tune ruleset and ignore safe syscalls</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Quiz (2 Questions)</h2>
      <ol className="list-decimal pl-6 mb-4">
        <li>What is the difference between Gatekeeper and Kyverno?</li>
        <li>Why is runtime security (Falco) needed even after policy enforcement?</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-4">Interview Questions</h2>
      <ol className="list-decimal pl-6 mb-8">
        <li>Explain Kubernetes admission pipeline and where OPA/Kyverno fit.</li>
        <li>How would you design end-to-end security for a production EKS cluster?</li>
        <li>How do you prevent privilege escalation inside containers?</li>
        <li>How to enforce organization-wide standards automatically?</li>
      </ol>

      <p className="font-semibold mt-6">Lesson 22 completed. Say "Give Lesson 23" to continue.</p>
    </div>
  );
}