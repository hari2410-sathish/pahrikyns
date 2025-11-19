export default function Lesson20() {
  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 20 – Advanced Storage & CSI Drivers (45–60 min Full Lesson)</h1>

      <p className="mb-4">This lesson covers advanced Kubernetes storage concepts including CSI drivers, dynamic provisioning, snapshots, cloning, topology-aware scheduling, multi-writer volumes, and real production patterns. Includes 2D/3D diagrams, YAML, best practices, and troubleshooting.</p>

      <h2 className="text-2xl font-semibold mt-4">Why CSI (Container Storage Interface)?</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Decouples storage vendors from Kubernetes core</li>
        <li>Allows custom storage plugins without rebuilding Kubernetes</li>
        <li>Supports snapshots, cloning, resize, encryption</li>
        <li>Works with cloud + on-prem storage systems</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">2D CSI Architecture Diagram</h2>
      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`Kubernetes API
   |
   |----> External Provisioner (controller)
   |----> External Attacher
   |----> External Snapshotter
            |
            v
        CSI Driver Plugin
            |
            v
     Storage Backend (EBS / Ceph / SAN)`}</pre>

      <h2 className="text-2xl font-semibold mt-4">3D Storage Flow Concept</h2>
      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`          [ Pod ]
             |
   ------------------------
   |   Kubelet + CSI Node |   <-- Mount volume to node
   ------------------------
             |
   ------------------------
   | CSI Controller Plane |   <-- Provision / attach / snapshot
   ------------------------
             |
   -------- Storage System --------
   |   EBS / Ceph / NFS / SAN    |`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Dynamic Volume Provisioning</h2>
      <p className="mb-2">StorageClass triggers the CSI controller to create volumes automatically.</p>

      <h3 className="text-lg font-semibold mt-2">StorageClass Example (EBS CSI)</h3>
      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-gp3
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  encrypted: "true"
volumeBindingMode: WaitForFirstConsumer`}</pre>

      <h3 className="text-lg font-semibold mt-2">PVC Example</h3>
      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: ebs-gp3
  resources:
    requests:
      storage: 20Gi`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Volume Snapshotting (Backup)</h2>
      <p className="mb-2">CSI snapshot API allows point-in-time backups of volumes.</p>

      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: ebs-snap
driver: ebs.csi.aws.com
deletionPolicy: Delete`}</pre>

      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: db-snapshot
spec:
  volumeSnapshotClassName: ebs-snap
  source:
    persistentVolumeClaimName: db-data`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Cloning Volumes</h2>
      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`# PVC cloning
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: cloned-data
spec:
  dataSource:
    name: app-data
    kind: PersistentVolumeClaim
  accessModes: ["ReadWriteOnce"]
  storageClassName: ebs-gp3
  resources:
    requests:
      storage: 20Gi`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Multi-Writer Volumes (RWX)</h2>
      <p className="mb-2">Useful for shared storage (NFS, EFS, CephFS).</p>

      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared-pvc
spec:
  accessModes: ["ReadWriteMany"]
  storageClassName: efs-sc
  resources:
    requests:
      storage: 5Gi`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Topology-Aware Scheduling</h2>
      <p className="mb-3">Ensures pods schedule only on nodes in the same AZ as the volume.</p>

      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`volumeBindingMode: WaitForFirstConsumer
# Ensures PVC binds only after scheduler selects appropriate node`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Real Production Architecture (2D)</h2>
      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`App Deployment
     |
   PVC ---> StorageClass ---> CSI Driver ---> Cloud Storage
                                        |--> Snapshots
                                        |--> Expansion
                                        |--> Replication`}</pre>

      <h2 className="text-2xl font-semibold mt-4">3D Storage Layout</h2>
      <pre className="bg-gray-900 text-sm p-4 rounded-xl overflow-auto">{`     [ Application Layer ]
             |
     [ PVC / PV Binding ]
             |
     [ CSI Controller Plane ]
        |   |     |
   Create  Attach  Snapshot
        |   |     |
     [ Storage Backend Layer ]`}</pre>

      <h2 className="text-2xl font-semibold mt-4">Monitoring Storage</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Monitor IOPS, throughput on cloud volumes</li>
        <li>Track PVC usage with kubelet_volume_stats metrics</li>
        <li>Alert on volume expansion failures</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Troubleshooting Guide</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>PVC Pending → StorageClass not found or no compatible AZ</li>
        <li>Mount errors → CSI node plugin missing / podPermissions issue</li>
        <li>Snapshot failures → SnapshotController not installed</li>
        <li>Resize errors → Filesystem type not supporting online expansion</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Best Practices</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Use gp3 / premium SSD for production DB workloads</li>
        <li>Enable encryption by default using KMS keys</li>
        <li>Avoid RWO for multi-replica deployments (use RWX)</li>
        <li>Take automated snapshots via Kubernetes CronJob</li>
        <li>Keep StorageClass immutable; use new SC for upgrades</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Quiz (2 Questions)</h2>
      <ol className="pl-6 mb-3 list-decimal">
        <li>What is the purpose of volumeBindingMode: WaitForFirstConsumer?</li>
        <li>When should you use RWX instead of RWO volumes?</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-4">Interview Prep (Short)</h2>
      <ol className="pl-6 mb-6 list-decimal">
        <li>Explain dynamic provisioning with CSI and how it works end-to-end.</li>
        <li>Difference between snapshots, cloning, and volume expansion.</li>
        <li>How would you optimize storage cost for production workloads?</li>
        <li>What happens when PVC is stuck in Pending?</li>
      </ol>

      <p className="font-semibold mt-4">Lesson 20 completed. Say "Give Lesson 21" to continue.</p>
    </div>
  );
}