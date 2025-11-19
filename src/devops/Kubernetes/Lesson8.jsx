export default function Lesson8() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 8 – Storage: PV, PVC, StorageClasses (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        This lesson covers Kubernetes storage deeply: PersistentVolumes, PersistentVolumeClaims, AccessModes,
        StorageClasses, dynamic provisioning, and full 3D disk architecture flow.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Why Persistent Storage?</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Pods are temporary; storage must be persistent</li>
        <li>Needed for databases: MySQL, MongoDB, Redis, PostgreSQL</li>
        <li>PersistentVolumes provide independent lifecycle</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`          +-------------------+
          | PersistentVolume  |
          | (PV) - physical   |
          +---------+---------+
                    |
          +---------v---------+
          | PersistentVolume  |
          | Claim (PVC)       |
          +---------+---------+
                    |
              +-----v-----+
              |   Pod     |
              |  mounts   |
              +-----------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Disk Flow Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`[ Storage Backend: EBS / NFS / Ceph / Local SSD ]
           |
   -----------------------------  <-- StorageClasses
   |   Gold    |   Silver   |   Bronze   |
   -----------------------------
            |
        [ PV Layer ]  <-- physical volumes
            |
        [ PVC Layer ] <-- claims from pods
            |
        [ Pods ]      <-- attach storage`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">PersistentVolume (PV) YAML</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-demo
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/demo`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">PersistentVolumeClaim (PVC)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-demo
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Using PVC in Pods</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`volumes:
  - name: data-vol
    persistentVolumeClaim:
      claimName: pvc-demo

volumeMounts:
  - name: data-vol
    mountPath: /var/lib/data`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">StorageClass (Dynamic Provisioning)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
type: gp3
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">PVC using StorageClass</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  storageClassName: fast-ssd
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Access Modes</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>ReadWriteOnce (RWO) – Most common, single-node access</li>
        <li>ReadWriteMany (RWX) – Shared storage (NFS, EFS)</li>
        <li>ReadOnlyMany (ROX)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Reclaim Policies</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Retain</strong> – Data kept after PVC deletion</li>
        <li><strong>Delete</strong> – Deletes cloud volume</li>
        <li><strong>Recycle</strong> – Legacy option</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kubectl Commands</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl get pv
kubectl get pvc
kubectl describe pvc pvc-demo`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real-World Use Case</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`E-commerce Platform:
 - MySQL uses 100Gi PV
 - Media files stored on RWX NFS
 - Logs saved on SSD StorageClass
 - Backups retained via Retain policy`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Always use StorageClasses in cloud environments</li>
        <li>Use RWX only when truly needed</li>
        <li>Avoid hostPath in production</li>
        <li>Set retention strategy based on workload type</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 9 – StatefulSets (Databases, Stable Identity, Headless Services, 3D Stateful Architecture)</p>
    </div>
  );
}
