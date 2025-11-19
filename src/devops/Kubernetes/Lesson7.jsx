export default function Lesson7() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 7 – ConfigMaps & Secrets (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        This lesson covers ConfigMaps and Secrets deeply — how to store configuration, inject environment
        variables, mount volumes, encrypt secrets, and use them in real-world microservices.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Why ConfigMaps?</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Store configuration outside containers</li>
        <li>Avoid rebuilding images for config changes</li>
        <li>Inject environment variables & config files into Pods</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Why Secrets?</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Store sensitive keys: passwords, tokens, certificates</li>
        <li>Base64 encoded (not encrypted by default)</li>
        <li>Supports encryption-at-rest using KMS</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Diagram: ConfigMap + Pod</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`         +---------------------------+
         |        ConfigMap          |
         |   app-config: value1     |
         +------------+--------------+
                      |
            +---------v----------+
            |        Pod         |
            | ENV -> value1      |
            +--------------------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Diagram Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`   [ Config Objects Layer ]
            |
   --------------------------
   |   K8s Pod Runtime Layer |
   --------------------------
       |          |
    [ENV]      [Volumes]
       \        /
        [ Containers ]`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">ConfigMap YAML</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "debug"
  APP_MODE: "production"`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Using ConfigMap as Environment Variables</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`envFrom:
  - configMapRef:
      name: app-config`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Mount ConfigMap as File</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`volumeMounts:
  - name: config-vol
    mountPath: /etc/config
volumes:
  - name: config-vol
    configMap:
      name: app-config`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Secret YAML</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`echo -n "admin123" | base64
YWRtaW4xMjM=  <-- encoded value

apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=
  password: YWRtaW4xMjM=`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Using Secret as Environment Variables</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`env:
  - name: DB_USER
    valueFrom:
      secretKeyRef:
        name: db-secret
        key: username`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Mount Secret as File</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`volumeMounts:
  - name: secret-vol
    mountPath: /etc/secretolumes:
  - name: secret-vol
    secret:
      secretName: db-secret`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Encrypting Secrets with KMS (Production)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`Enable Encryption-at-Rest:

apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources: ["secrets"]
    providers:
      - kms:
          name: awsKms
          endpoint: unix:///var/run/kmsplugin/socket
      - identity: {}`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kubectl Commands</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl get cm
kubectl describe cm app-config
kubectl get secret
kubectl describe secret db-secret`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real-World Example</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`Microservice:
  - API keys from Secret
  - LOG_LEVEL from ConfigMap
  - SSL certs mounted as volumes
  - Config reload via Deployment rollout`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Never store real secrets in Git</li>
        <li>Use KMS encryption for production clusters</li>
        <li>Use ConfigMaps for non-sensitive config only</li>
        <li>Use <code>immutable: true</code> for high-performance ConfigMaps</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 8 – Volumes & Storage (Persistent Volumes, PVC, StorageClasses, 3D Disk Flow)</p>
    </div>
  );
}
