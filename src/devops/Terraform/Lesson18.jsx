import React from "react";

export default function Lesson18() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 18 — Real Project 3: Global Multi-Region Deployment + DR (AWS + Azure + GCP)
      </h1>

      <p>
        Project goal: Build a highly available, multi-region architecture that serves global traffic,
        uses provider-native CDNs / global load balancers, and demonstrates failover and disaster recovery (DR)
        across AWS, Azure & GCP. Terraform orchestrates multi-region stacks with modular design and policy checks.
      </p>

      <hr style={{ margin: "16px 0" }} />

      <h2 style={{ fontWeight: 700 }}>Session A — Design & Planning (45 minutes)</h2>

      <h3 style={{ fontWeight: 600 }}>Learning objectives</h3>
      <ul>
        <li>Understand global architecture choices and trade-offs</li>
        <li>Design multi-region deployments per cloud</li>
        <li>Plan global load balancing + CDN + failover</li>
        <li>Create a DR runbook: failover steps & state recovery</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>High-level architecture (text diagram)</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "12px", borderRadius: "8px" }}>
{`Global DNS (Route53 / Cloud DNS / Azure DNS)
   |
   +--> AWS Region A (us-east-1)  -> ALB -> ASG / EKS -> App
   |        └ CloudFront (optional)
   |
   +--> Azure Region B (westeurope) -> Azure Front Door -> AKS -> App
   |
   +--> GCP Region C (europe-west1)  -> Cloud Load Balancer -> GKE / Cloud Run -> App

CDN Edge: CloudFront / Azure CDN / Cloud CDN (cache static content)
Health Checks & Failover:
  - Primary region health checked via global LB
  - If primary fails, DNS/Global LB shifts traffic to next healthy region
State & Backups:
  - Global backup for DB (cross-region read replicas)
  - Regular snapshots to cross-region storage
Terraform State:
  - Use Terraform Cloud or per-cloud remote backends (S3/GCS/Azure Blob) with workspace orchestration
`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Module breakdown</h3>
      <ul>
        <li><b>modules/global-dns</b> — abstract global DNS records & health checks</li>
        <li><b>modules/aws-region</b> — VPC, ALB/CloudFront, ASG/EKS, RDS (read-replica)</li>
        <li><b>modules/azure-region</b> — VNet, Front Door, AKS, Azure DB for PostgreSQL</li>
        <li><b>modules/gcp-region</b> — VPC, Cloud Load Balancer, GKE/Cloud Run, Cloud SQL</li>
        <li><b>modules/cdn</b> — caching rules, origin groups</li>
        <li><b>modules/backup</b> — cross-region snapshot + replication config</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Key design principles</h3>
      <ul>
        <li>Serve static assets from CDN edge (reduces latency & region load)</li>
        <li>Use active-passive or active-active failover depending on DB replication capability</li>
        <li>Design DB replication (read replicas + promoted replica for DR)</li>
        <li>Keep state & secrets secure; rotate keys and use provider secrets managers</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Failover strategies (examples)</h3>
      <ul>
        <li><b>DNS failover:</b> Route53 / Cloud DNS health checks + weighted failover</li>
        <li><b>Global load balancer:</b> Azure Front Door or GCP Global LB or CloudFront with origin groups</li>
        <li><b>Active-Active:</b> All regions serve traffic (requires multi-region DB sync)</li>
        <li><b>Active-Passive:</b> Primary region serves traffic; standby ready to be promoted</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>DR Runbook (short)</h3>
      <ol>
        <li>Detect failure via health checks & alerts (CloudWatch / Azure Monitor / Stackdriver)</li>
        <li>Validate secondary region readiness (instances healthy, DB replica lag within threshold)</li>
        <li>Promote secondary DB replica to primary (provider-specific steps)</li>
        <li>Update global DNS / LB to route to promoted region</li>
        <li>Run smoke tests and rollback if errors</li>
      </ol>

      <hr style={{ margin: "16px 0" }} />

      <h2 style={{ fontWeight: 700 }}>Session B — Implementation & Hands-on (45 minutes)</h2>

      <h3 style={{ fontWeight: 600 }}>What we'll implement in the workshop scope</h3>
      <p>
        To keep the demo short & cost-controlled we will implement a <b>minimal multi-region proof</b>:
      </p>
      <ul>
        <li>Deploy App in two regions (AWS us-east-1 and GCP europe-west1) — small instance / micro</li>
        <li>Configure a simple global DNS (Route53 weighted records) to demonstrate failover switching</li>
        <li>Use CloudFront as CDN origin (AWS region) and demonstrate cache behavior</li>
        <li>Configure automated snapshots of DB (if created) to cross-region storage (concept + sample config)</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Why a small scope?</h3>
      <p>
        Full multi-cloud active-active production is complex and costly. Demo focuses on mechanisms:
        global DNS weighted failover, health checks, CDN origin groups, and backup replication.
      </p>

      <h3 style={{ fontWeight: 600 }}>Terraform provider examples</h3>
      <pre style={{ background: "#111", color: "#0af", padding: "12px", borderRadius: "8px" }}>
{`# AWS provider (primary)
provider "aws" {
  alias  = "aws_primary"
  region = "us-east-1"
}

# GCP provider (secondary)
provider "google" {
  alias = "gcp_secondary"
  project = var.gcp_project
  region  = "europe-west1"
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Example: Route53 weighted record + health check (global-dns module)</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "12px", borderRadius: "8px" }}>
{`resource "aws_route53_health_check" "app_primary" {
  fqdn              = "app-primary.example.com"
  type              = "HTTP"
  resource_path     = "/health"
  failure_threshold = 3
}

resource "aws_route53_record" "app_weighted" {
  zone_id = var.zone_id
  name    = var.domain
  type    = "A"

  weighted_routing_policy {
    weight = 100
    health_check_id = aws_route53_health_check.app_primary.id
  }

  set_identifier = "aws-primary"
  ttl            = 60

  alias {
    name                   = aws_lb.app.dns_name
    zone_id                = aws_lb.app.zone_id
    evaluate_target_health = true
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Example: CloudFront origin-groups (simple failover)</h3>
      <pre style={{ background: "#111", color: "#0af", padding: "12px", borderRadius: "8px" }}>
{`resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_lb.app.dns_name
    origin_id   = "primary-origin"
  }

  origin {
    domain_name = google_cloud_run_service.backend.status[0].url
    origin_id   = "secondary-origin"
  }

  default_cache_behavior {
    target_origin_id = "primary-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods = ["GET", "HEAD"]
  }

  # origin groups & failover are more advanced (concept shown here)
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>DB cross-region snapshot example (concept)</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "12px", borderRadius: "8px" }}>
{`# AWS RDS snapshot copy to another region (concept)
resource "aws_db_snapshot" "rds_snapshot" {
  db_instance_identifier = aws_db_instance.app.id
  db_snapshot_identifier = "pre-failover-$(timestamp())"
}

resource "aws_rds_cluster_snapshot_copy" "copy_snapshot" {
  source_db_cluster_snapshot_identifier = aws_db_snapshot.rds_snapshot.id
  destination_region = "us-west-2"
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Hands-on exercise (30 minutes)</h3>
      <ol>
        <li>Deploy a small EC2 (or Fargate/ECSlite) app in AWS us-east-1 that returns 200 on /health</li>
        <li>Deploy a tiny Cloud Run service on GCP europe-west1 that returns 200 on /health</li>
        <li>Create Route53 weighted records pointing to both origins with health checks on the primary</li>
        <li>Simulate primary failure (stop app) and verify Route53 shifts traffic to secondary</li>
        <li>Observe TTL behavior and caching if CloudFront is used</li>
      </ol>

      <h3 style={{ fontWeight: 600 }}>Commands & workflow students run</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "12px", borderRadius: "8px" }}>
{`# AWS (primary) - small demo
cd envs/global/aws
terraform init
terraform workspace new global-demo
terraform apply -auto-approve

# GCP (secondary)
cd ../gcp
terraform init
terraform workspace new global-demo
terraform apply -auto-approve

# Root/global DNS
cd ../dns
terraform init
terraform apply -auto-approve
`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Smoke tests</h3>
      <ul>
        <li>curl https://your-domain/health → returns 200 (when primary healthy)</li>
        <li>Stop primary app → after health-check failure time, curl returns 200 from secondary</li>
        <li>Check CDN edge returns cached content when primary temporarily down</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Cost & safety tips</h3>
      <ul>
        <li>Use smallest machine types or serverless (Cloud Run, Lambda) where possible</li>
        <li>Remove resources after demo (`terraform destroy` in each env)</li>
        <li>Use limited quotas / sandbox accounts to avoid unexpected billing</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>CI/CD & automation notes</h3>
      <ul>
        <li>Use Terraform Cloud as orchestrator for multi-backend orchestration</li>
        <li>Use health-check alerts to trigger automated failover workflows (careful — prefer manual approval)</li>
        <li>Store provider credentials in secure CI secrets (GitHub Secrets / Vault)</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Instructor troubleshooting checklist</h3>
      <ul>
        <li>DNS not switching: check health check config & public accessibility of health endpoint</li>
        <li>Route53 weighted not taking effect: validate weight & set_identifiers</li>
        <li>CloudFront caching: TTL may delay observable failover; test with low TTL</li>
        <li>Cross-region snapshot issues: check snapshot permissions & provider region</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Homework / challenge</h3>
      <ol>
        <li>Extend demo to add Azure region and configure Azure Front Door to participate in failover</li>
        <li>Implement automated DB promotion script (safe & tested) and document manual promotion steps</li>
        <li>Write a Sentinel / OPA policy that blocks creation of public origins without TLS</li>
      </ol>

      <h2 style={{ fontWeight: 700, marginTop: "16px" }}>Next</h2>
      <p>
        <b>Next → Interview Prep Lessons (Mock interviews & Q/A)</b>
      </p>
    </div>
  );
}
