export default function Lesson11() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 11 – Jobs & CronJobs (45-min Full Guide)</h1>

      <p className="text-base mb-4">
        Jobs and CronJobs are used for batch processing, scheduled tasks, data processing pipelines,
        backups, cron-like tasks, and retryable workloads. You will learn how Jobs run to completion,
        how retries work, how CronJobs trigger Jobs, and how to manage schedules safely in production.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Where Jobs & CronJobs Are Used</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Database backups</li>
        <li>Report generation</li>
        <li>ML model training</li>
        <li>Data cleanup tasks</li>
        <li>ETL pipelines</li>
        <li>Batch email sending</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Diagram – Job Lifecycle</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`        +----------- Job Controller ------------+
        |                                       |
        |  Creates Pods → Pods complete → Done |
        +--------------------+------------------+
                             |
                     +-------v-------+
                     |     Pod       |
                     | (one-time run)|
                     +---------------+`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Concept – CronJob Scheduling</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`              [ CronJob Scheduler ]
                        |
        -----------------------------------
        |     |      |      |       |     |
      [01:00][02:00][03:00] ... [23:00]  ← Triggers Jobs
        |                                   
      [ Job ] → [ Pod Execution ] → [ Completion ]`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Job YAML (Basic)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: batch/v1
kind: Job
metadata:
  name: demo-job
spec:
  template:
    spec:
      containers:
        - name: work
          image: busybox
          command: ['sh', '-c', 'echo Job Completed!']
      restartPolicy: Never`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Jobs with Retries</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  backoffLimit: 4  # retry 4 times`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Parallel Jobs</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  parallelism: 3
  completions: 6`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">CronJob YAML (Scheduled Job)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup-job
spec:
  schedule: "0 */6 * * *"  # Every 6 hours
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: backup
              image: alpine
              command: ['sh', '-c', 'echo Running backup...']
          restartPolicy: OnFailure`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Cron Expression Guide</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`* * * * *
| | | | |
| | | | +-- Day of Week (0-6)
| | | +---- Month (1-12)
| | +------ Day of Month (1-31)
| +-------- Hour (0-23)
+---------- Minute (0-59)`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Suspend CronJobs (Pause schedule)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`spec:
  suspend: true`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kubectl Commands</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm">
{`kubectl get jobs
kubectl describe job demo-job
kubectl get cronjob
kubectl logs job/<job-name>`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real-World Use Case</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-auto text-sm leading-relaxed">
{`Bank Backup System:
 - Daily backup at midnight
 - CronJob triggers job
 - Job takes DB dump → uploads to S3 Bucket
 - Retry = 3 times if backup fails`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Use restartPolicy: Never for Jobs</li>
        <li>Use OnFailure for CronJobs</li>
        <li>Avoid overlapping CronJobs using concurrencyPolicy</li>
        <li>Use successfulJobsHistoryLimit for cleanup</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 12 – RBAC (Roles, RoleBindings, ServiceAccounts, 3D Security Architecture)</p>
    </div>
  );
}
