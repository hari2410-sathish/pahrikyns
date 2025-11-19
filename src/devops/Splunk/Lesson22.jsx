import React from "react";

export default function Lesson22() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      
      <h1 style={{ fontSize: "32px", fontWeight: 700 }}>
        Lesson 22 – Architecture Whiteboard Solutions (Visual Design + Explanation)
      </h1>

      <p>
        This lesson contains full whiteboard-style architectures with clean ASCII diagrams,
        explanations, and reasoning. These answers are perfect for cloud/DevOps interviews.
      </p>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>1. High-Availability 3-Tier Architecture (AWS)</h2>

      <p><b>Problem:</b> Design a 3-tier application with high availability, autoscaling, and secure networking.</p>

      <pre style={{ background: "#111", color: "#0f0", padding: "15px", borderRadius: "10px" }}>
{`                   ┌──────────────────────────────────────────┐
                   │               Internet Users              │
                   └───────────────────────┬──────────────────┘
                                           │
                                    ┌──────▼──────┐
                                    │    ALB       │
                                    └──────┬──────┘
                          ┌──────────────────────────────────┐
                          │          Private Subnets          │
                          │                                  │
                ┌─────────▼──────────┐          ┌────────────▼─────────┐
                │ Application ASG     │          │ Application ASG       │
                │ (EC2/ECS/EKS nodes) │          │ (Multi-AZ)            │
                └─────────┬──────────┘          └────────────┬─────────┘
                          │                                  │
                          │          ┌───────────────────────▼──────────────────────┐
                          │          │               RDS Multi-AZ                   │
                          │          │      Postgres/MySQL with automatic failover  │
                          │          └──────────────────────────────────────────────┘
`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Key Points</h3>
      <ul>
        <li>Public ALB, private compute, private database</li>
        <li>ASG enables scaling</li>
        <li>RDS Multi-AZ ensures high availability</li>
        <li>S3 for assets, CloudFront for global CDN</li>
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>2. Serverless Microservices Architecture</h2>

      <p><b>Problem:</b> Design a scalable serverless microservice solution.</p>

      <pre style={{ background: "#111", color: "#0af", padding: "15px", borderRadius: "10px" }}>
{`                          ┌──────────────────────────────┐
                          │          API Gateway           │
                          └───────────────┬───────────────┘
                                          │
              ┌───────────────────────────┼───────────────────────────┐
              │                           │                           │
       ┌──────▼───────┐           ┌──────▼───────┐            ┌──────▼───────┐
       │ Lambda (A)   │           │ Lambda (B)   │            │ Lambda (C)   │
       └──────┬───────┘           └──────┬───────┘            └──────┬───────┘
              │                           │                           │
     ┌────────▼────────┐         ┌────────▼────────┐         ┌────────▼────────┐
     │ DynamoDB (A)    │         │ DynamoDB (B)    │         │ DynamoDB (C)    │
     └─────────────────┘         └─────────────────┘         └─────────────────┘
`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Key Points</h3>
      <ul>
        <li>Fully serverless → no servers to manage</li>
        <li>API Gateway + Lambda + DynamoDB</li>
        <li>Auto-scaling & pay-per-use</li>
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>3. Global Multi-Region Failover Architecture</h2>

      <p><b>Problem:</b> Build a global system with automatic failover.</p>

      <pre style={{ background: "#111", color: "#0f0", padding: "15px", borderRadius: "10px" }}>
{`                ┌───────────────────────────────┐
                │              Users             │
                └───────────────────────┬────────┘
                                        │
                         ┌──────────────▼──────────────┐
                         │  Route53 / Global DNS        │
                         └───────┬─────────────┬───────┘
                                 │             │
                  ┌──────────────▼────────┐   ┌───────────────▼─────────┐
                  │   AWS (us-east-1)     │   │  AWS (eu-west-1)        │
                  │   Primary Region      │   │  Secondary Region       │
                  └──────────────┬────────┘   └───────────────┬────────┘
                                 │                            │
                           ┌─────▼─────┐                ┌─────▼─────┐
                           │  ALB + ASG │                │ ALB + ASG  │
                           └─────┬─────┘                └─────┬─────┘
                                 │                            │
                       ┌─────────▼────────┐        ┌─────────▼────────┐
                       │ Aurora Global DB │        │ Read Replica      │
                       └──────────────────┘        └───────────────────┘
`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Key Points</h3>
      <ul>
        <li>Global DNS failover</li>
        <li>Health checks for active-passive setup</li>
        <li>Cross-region read replicas</li>
        <li>S3 Multi-region replication for assets</li>
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>4. CI/CD Pipeline with Dev, Stage, Prod</h2>

      <p><b>Problem:</b> Show how CI/CD pipeline deploys through multiple environments.</p>

      <pre style={{
        background: "#111",
        color: "#0af",
        padding: "15px",
        borderRadius: "10px"
      }}>
{` GitHub Actions / GitLab CI
    │
    ├── Step 1: Code Build (Docker, Tests)
    │
    ├── Step 2: Deploy to Dev
    │        ├── Terraform plan
    │        └── Terraform apply
    │
    ├── Step 3: Deploy to Stage (manual approve)
    │        ├── More tests + integration
    │        └── Load tests
    │
    └── Step 4: Deploy to Prod (manual approve)
             ├── Terraform apply
             └── Smoke tests
`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Key Points</h3>
      <ul>
        <li>Plan on PR, apply on main</li>
        <li>Approval gate before prod</li>
        <li>Use Terraform workspaces or separate folders</li>
        <li>Store secrets in SSM/Key Vault/Secret Manager</li>
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>5. Kubernetes Cluster with Ingress + Autoscaling</h2>

      <p><b>Problem:</b> Whiteboard an AKS/EKS/GKE architecture with scaling & ingress.</p>

      <pre style={{
        background: "#111",
        color: "#0f0",
        padding: "15px",
        borderRadius: "10px"
      }}>
{`                 ┌───────────────────────────────┐
                 │             Users              │
                 └───────────────────────┬────────┘
                                         │
                                    ┌────▼─────┐
                                    │ Ingress  │
                                    │ (Nginx)  │
                                    └────┬─────┘
                                         │
                          ┌──────────────┼────────────────┐
                          │              │                │
                 ┌────────▼──────┐ ┌────▼────────┐ ┌─────▼────────┐
                 │ Frontend Pod  │ │ Backend Pod │ │ Auth Pod      │
                 └────────┬──────┘ └────┬────────┘ └─────┬────────┘
                          │              │                │
              ┌───────────▼────────┐ ┌──▼───────────┐ ┌──▼───────────┐
              │ HPA (Auto-scale)   │ │ Redis Cache  │ │ Postgres DB   │
              │ based on metrics   │ └──────────────┘ └───────────────┘
              └────────────────────┘
`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Key Points</h3>
      <ul>
        <li>Ingress controller manages routing</li>
        <li>Horizontal Pod Autoscaler scales pods automatically</li>
        <li>Cluster Autoscaler scales nodes</li>
        <li>DB and Cache remain external services</li>
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>6. Multi-Cloud Architecture (AWS + Azure + GCP)</h2>

      <pre style={{
        background: "#111",
        color: "#0af",
        padding: "15px",
        borderRadius: "10px"
      }}>
{` Users -> Global DNS
        │
        ├── AWS us-east-1  (Primary API)
        ├── Azure westeurope (Secondary API)
        └── GCP asia-southeast1 (Static + CDN)

All clouds share:
- CI/CD
- Observability
- Terraform modules
- Event bus / messaging (if hybrid)
`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Key Points</h3>
      <ul>
        <li>AWS hosts primary workload</li>
        <li>Azure handles failover or analytics</li>
        <li>GCP handles CDN, static delivery, or ML workloads</li>
        <li>Terraform orchestrates all three</li>
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Next Lesson
      </h2>

      <p>
        <b>Lesson 23 → Interview Lab: Hands-On Terraform Tasks + Challenges</b>
      </p>

    </div>
  );
}
