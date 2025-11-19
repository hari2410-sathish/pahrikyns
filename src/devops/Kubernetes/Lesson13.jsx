export default function Lesson13() {
  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Lesson 13 – Monitoring & Logging (Prometheus, Grafana, EFK) – 45‑min Full Guide</h1>

      <p className="mb-4 text-base">
        Monitoring and logging are essential for running production Kubernetes clusters. In this lesson,
        you will learn how Prometheus scrapes metrics, how Grafana visualizes dashboards, how EFK (Elasticsearch,
        Fluentd, Kibana) collects logs, and how observability works in a 3D architecture model.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Observability Pillars</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Metrics (Prometheus)</li>
        <li>Logs (EFK, Loki)</li>
        <li>Tracing (Jaeger, Zipkin)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Observability Architecture Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto leading-relaxed">
{`                         +-----------------------+
                         |      Grafana          |
                         |   (Visualization)     |
                         +-----------+-----------+
                                     |
                           +---------v----------+
                           |    Prometheus      |
                           |   (Metrics DB)     |
                           +---------+----------+
                                     |
     -------------------------------------------------------------------------
     |              |                |                |                     |
 [Node Exporter] [Kubelet]      [cAdvisor]       [App Metrics]         [API Server]
     |              |                |                |                     |`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">3D Observability Concept</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto leading-relaxed">
{`            [ Visualization Layer ]
                     |
              [ Grafana Dashboards ]
                     |
   ------------------------------------------------------
   |         Prometheus Metrics Storage Layer           |
   ------------------------------------------------------
                     |
   ------------------------------------------------------
   |        Metric Producers (Nodes, Pods, Apps)        |
   ------------------------------------------------------`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Prometheus – How it Works</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Pull-based model (scraping endpoints)</li>
        <li>Stores metrics in time-series DB</li>
        <li>Uses exporters (node-exporter, kube-state-metrics)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-5">Prometheus Sample ConfigMap</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'kubernetes-nodes'
    static_configs:
      - targets: ['node1:9100', 'node2:9100']`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Grafana – Visualization Layer</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Connects to Prometheus as datasource</li>
        <li>Provides dashboards for cluster health</li>
        <li>Supports alerting & notifications</li>
      </ul>

      <h2 className="text-xl font-semibold mt-5">Common Dashboards</h2>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>Kubernetes cluster monitoring</li>
        <li>Node CPU / Memory / Disk</li>
        <li>Pod restarts & failures</li>
        <li>Network throughput</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">EFK Stack – Logging</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Elasticsearch</strong> – stores logs</li>
        <li><strong>Fluentd / Fluentbit</strong> – collects & forwards logs</li>
        <li><strong>Kibana</strong> – visualization</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">2D Logging Flow Diagram</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto leading-relaxed">
{`           +------------+         +------------------+
           |   Pods     | ----->  |   Fluentd/bit    |
           +------------+         +--------+---------+
                                          |
                                   +------v-------+
                                   | Elasticsearch |
                                   +------+--------+
                                          |
                                   +------v------+ 
                                   |   Kibana    |
                                   +-------------+`}
      </pre>

      <h2 className="text-xl font-semibold mt-5">Fluentd DaemonSet (Log Collector)</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
spec:
  template:
    spec:
      containers:
        - name: fluentd
          image: fluent/fluentd:latest`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">kubectl Commands</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto">
{`kubectl get pods -n monitoring
kubectl describe svc prometheus
kubectl get pods -n logging`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Real-World Use Case</h2>
      <pre className="bg-gray-900 p-4 rounded-xl text-sm overflow-auto leading-relaxed">
{`E-commerce Platform:
 - Prometheus scrapes app latency
 - Grafana alerts when latency > 500ms
 - Fluentbit collects container logs
 - Elasticsearch stores logs for 30 days
 - Kibana used for debugging failures`}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Best Practices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Always install kube-state-metrics + node-exporter</li>
        <li>Store logs in separate storage class</li>
        <li>Use retention policies for Elasticsearch</li>
        <li>Enable alerting for CPU/Memory/Pod crashes</li>
      </ul>

      <p className="mt-8 font-semibold">Next: Lesson 14 – Networking Deep Dive (CNI, Pod-to-Pod, Node-to-Node, 3D Network Fabric)</p>
    </div>
  );
}
