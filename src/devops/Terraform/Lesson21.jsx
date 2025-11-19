import React from "react";

export default function Lesson21() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>

      <h1 style={{ fontSize: "32px", fontWeight: 700 }}>
        Lesson 21 – DevOps & Cloud Scenario Questions (Architecture + Whiteboard)
      </h1>

      <p>
        This lesson covers real-world DevOps interview scenarios. 
        These questions test your architecture thinking, problem solving, 
        cloud knowledge, and Terraform experience.
      </p>

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Section 1 — CI/CD Pipeline Scenarios
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        1. Scenario: A team wants zero-downtime deployment for their app. How do you design it?
      </h3>
      <ul>
        <li>Use Blue/Green or Rolling Deployments</li>
        <li>Use ALB/NLB with multiple target groups</li>
        <li>EKS / AKS / GKE → rolling updates with maxSurge & maxUnavailable</li>
        <li>Cloud Run → automatic revision traffic splitting</li>
        <li>Use Terraform to manage versions & traffic shifting</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        2. Scenario: You need to deploy Terraform via GitHub Actions securely.
      </h3>
      <ul>
        <li>Store credentials in GitHub Secrets</li>
        <li>Plan on pull request → apply on main</li>
        <li>Use OIDC (OpenID Connect) to avoid long-lived AWS keys</li>
        <li>Enable approval workflow for apply</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        3. Scenario: How will you design multi-environment infra using Terraform?
      </h3>
      <ul>
        <li>Use workspaces (dev/stage/prod)</li>
        <li>Or separate folders per env</li>
        <li>Use different remote states</li>
        <li>Use Terragrunt for large-scale hierarchy</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Section 2 — AWS Architecture Scenarios
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        4. Scenario: Design a highly available 3-tier architecture in AWS.
      </h3>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
{`Internet -> ALB
          -> App ASG (Private subnets)
          -> RDS Multi-AZ (DB Subnets)
Shared:
  - S3 for static assets
  - ElastiCache Redis
  - CloudWatch Logs + Metrics
`}
      </pre>

      <ul>
        <li>Deploy using modules (vpc, alb, asg, rds)</li>
        <li>Enable autoscaling policies</li>
        <li>Create Multi-AZ RDS for HA</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        5. Scenario: API latency increased suddenly. What might be wrong?
      </h3>
      <ul>
        <li>ASG at max capacity</li>
        <li>Database CPU spike</li>
        <li>Network throttling</li>
        <li>Unhealthy targets behind ALB</li>
        <li>New code deployed affecting performance</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        6. Scenario: You want cross-region failover for an application.
      </h3>
      <ul>
        <li>Deploy app in two AWS regions</li>
        <li>Use Route53 health checks + failover records</li>
        <li>Replicate S3 using CRR</li>
        <li>Use Aurora Global Database or DynamoDB Global tables</li>
        <li>Terraform to manage both regions</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Section 3 — Kubernetes Scenarios (EKS/AKS/GKE)
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        7. Scenario: Pods are restarting frequently. How do you troubleshoot?
      </h3>
      <ul>
        <li>Check container logs → CrashLoopBackOff?</li>
        <li>Check readiness & liveness probes</li>
        <li>Check resource limits (CPU/Memory)</li>
        <li>Check service → DNS issues?</li>
        <li>Use kubectl describe pod</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        8. Scenario: Kubernetes deployment should auto-scale. How?
      </h3>
      <ul>
        <li>Use HPA → based on CPU, memory, or custom metrics</li>
        <li>Cluster Autoscaler → scales nodes up/down</li>
        <li>Terraform Helm provider to install autoscaler</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        9. Scenario: You need to store secrets in Kubernetes securely.
      </h3>
      <ul>
        <li>Use external secret stores (AWS Secrets Manager, Key Vault, Secret Manager)</li>
        <li>Use sealed-secrets</li>
        <li>Enable encryption at rest (KMS)</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Section 4 — Azure Architecture Scenarios
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        10. Scenario: Design a secure AKS setup.
      </h3>
      <ul>
        <li>Use Azure CNI</li>
        <li>Enable managed identities</li>
        <li>Use Key Vault for secrets</li>
        <li>Enable network policy</li>
        <li>Use Azure Firewall</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        11. Scenario: Azure VM scaling is slow. What can be done?
      </h3>
      <ul>
        <li>Use VMSS with autoscaling rules</li>
        <li>Use custom images (SIG)</li>
        <li>Use faster storage (premium SSD)</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Section 5 — GCP Architecture Scenarios
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        12. Scenario: Backend service on Cloud Run needs VPC access.
      </h3>
      <ul>
        <li>Enable Serverless VPC connector</li>
        <li>Configure egress to VPC</li>
        <li>Ensure firewall rules allow Cloud Run traffic</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        13. Scenario: GKE Pod -- Cloud SQL connection is failing.
      </h3>
      <ul>
        <li>Cloud SQL Proxy not running</li>
        <li>Wrong connection string</li>
        <li>Firewall & VPC peering issues</li>
        <li>Service account missing cloudsql.client role</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Section 6 — DevOps Troubleshooting Questions
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        14. Scenario: Terraform apply suddenly stuck or taking too long.
      </h3>
      <ul>
        <li>State lock not released</li>
        <li>Provider API throttling</li>
        <li>Long-running AWS tasks (RDS create, ASG warm-up)</li>
        <li>Remote backend connectivity issue</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        15. Scenario: Your CI pipeline is failing randomly.
      </h3>
      <ul>
        <li>Secrets rotated / missing</li>
        <li>GitHub Actions runners limits</li>
        <li>Rate limits in provider</li>
        <li>Network issues</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Section 7 — Whiteboard Architecture Questions (High-Level)
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        16. Whiteboard: Design a multi-region, highly available e-commerce platform.
      </h3>
      <ul>
        <li>Global DNS (failover routing)</li>
        <li>CDN for static resources</li>
        <li>Compute layer (EKS/AKS/GKE/ASG)</li>
        <li>Queue (SQS/PubSub/Event Grid)</li>
        <li>Database (Aurora Global DB / CosmosDB / Spanner)</li>
        <li>Monitoring + logs</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        17. Whiteboard: Design CI/CD for microservices.
      </h3>
      <ul>
        <li>Monorepo or multi-repo</li>
        <li>Docker build → push to registry</li>
        <li>Deploy via helm/Terraform</li>
        <li>Automated testing, health checks</li>
        <li>Versioning & canary releases</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        18. Whiteboard: Build a logging/monitoring architecture.
      </h3>
      <ul>
        <li>CloudWatch / Azure Monitor / Stackdriver</li>
        <li>ELK / Loki stack</li>
        <li>OpenTelemetry agents</li>
        <li>Central dashboard + alerts</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        19. Whiteboard: Design a cost-efficient cloud system.
      </h3>
      <ul>
        <li>Right-size instances</li>
        <li>Autoscaling</li>
        <li>Spot instances</li>
        <li>S3 Intelligent-tiering</li>
        <li>Re-architect idle resources</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        20. Whiteboard: Build a multi-cloud DR strategy.
      </h3>
      <ul>
        <li>Multi-region deployments</li>
        <li>Cross-cloud backups</li>
        <li>Failover DNS</li>
        <li>Promote replica workflows</li>
        <li>Shared Terraform modules</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "30px" }}>
        Next Lesson
      </h2>

      <p>
        <b>Lesson 22 → Architecture Whiteboard Solutions + Visual Designs</b>
      </p>
    </div>
  );
}
