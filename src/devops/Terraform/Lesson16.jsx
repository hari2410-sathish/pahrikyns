import React from "react";

export default function Lesson16() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 16 — Real Project 1: Multi-Tier Web App (Design + Implementation)
      </h1>

      <p>
        Project goal: Build a production-ready multi-tier web application infra on AWS using Terraform:
        VPC (3-tier), ALB, Auto Scaling (or EKS if you prefer), RDS (Postgres/MySQL), Redis (ElastiCache),
        S3 for static assets, and secure IAM. Use remote state (S3 + DynamoDB) and modular design.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        Quick summary (what we deliver)
      </h2>
      <ul>
        <li>Reusable Terraform modules: vpc, network, alb, autoscaling (or eks), rds, cache, s3, iam</li>
        <li>Remote state: S3 backend + DynamoDB locking</li>
        <li>CI pipeline notes (GitHub Actions) to run plan & apply</li>
        <li>Runbook: apply, test, destroy</li>
      </ul>

      <hr style={{ margin: "16px 0" }} />

      <h2 style={{ marginTop: "10px", fontWeight: 700 }}>Session A — Design & Planning (45 min)</h2>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Learning objectives</h3>
      <ul>
        <li>Understand architecture & module boundaries</li>
        <li>Define inputs, outputs, and workspaces (dev, stage, prod)</li>
        <li>Plan remote state & secrets strategy</li>
        <li>Break the project into small, testable modules</li>
      </ul>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Architecture (text diagram)</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "12px", borderRadius: "8px" }}>
{`Internet -> ALB (public subnets)
         └─> Target Group -> Auto Scaling Group (private subnets)
                 └─> App Instances (EC2/EKS nodes)
Private Subnets:
  ├─ RDS (Multi-AZ) - private
  ├─ ElastiCache (Redis) - private
  └─ Bastion / NAT

Shared:
  ├─ S3 (static assets, uploads)
  ├─ IAM roles & instance profiles
  └─ S3 backend + DynamoDB lock (terraform state)
`}
      </pre>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Module breakdown</h3>
      <ul>
        <li><b>modules/vpc</b> — create VPC, public/private subnets, IGW, NAT, route tables</li>
        <li><b>modules/alb</b> — ALB, target group, listeners, security groups</li>
        <li><b>modules/compute</b> — Launch Template / ASG (or EKS module alternative)</li>
        <li><b>modules/rds</b> — subnet group, parameter group, RDS instance/cluster</li>
        <li><b>modules/cache</b> — ElastiCache Redis</li>
        <li><b>modules/s3</b> — bucket for uploads & static site</li>
        <li><b>modules/iam</b> — roles/policies for instances & terraform</li>
        <li><b>env root</b> — root level that composes modules per workspace</li>
      </ul>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Workspaces & State</h3>
      <ul>
        <li>Use workspaces: <i>dev</i>, <i>stage</i>, <i>prod</i></li>
        <li>Backend: S3 + DynamoDB locking (example code later)</li>
        <li>State per workspace (key = \"${workspace}/terraform.tfstate\")</li>
      </ul>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Security & Secrets</h3>
      <ul>
        <li>Do NOT store DB passwords in repo. Use SSM Parameter Store or Secrets Manager.</li>
        <li>CI uses GitHub Secrets or Terraform Cloud variables for credentials.</li>
        <li>Least-privilege IAM roles for Terraform and app instances.</li>
      </ul>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Session A quick tasks (instructor)</h3>
      <ol>
        <li>Walk students through architecture diagram</li>
        <li>Open modules folder & show expected inputs/outputs</li>
        <li>Explain deployment order: vpc → iam → network infra → compute → db → cache → alb</li>
      </ol>

      <hr style={{ margin: "16px 0" }} />

      <h2 style={{ marginTop: "10px", fontWeight: 700 }}>Session B — Implementation (45 min)</h2>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Learning objectives</h3>
      <ul>
        <li>Bootstrap repo skeleton and create modules/vpc & modules/s3 (starter)</li>
        <li>Configure remote backend and initialize</li>
        <li>Apply dev workspace end-to-end (small scope: VPC + S3 + ALB + ASG)</li>
      </ul>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Repo skeleton (suggested)</h3>
      <pre style={{ background: "#111", color: "#0af", padding: "12px", borderRadius: "8px" }}>
{`terraform-project/
  modules/
    vpc/
      main.tf
      variables.tf
      outputs.tf
    s3/
      main.tf
      variables.tf
      outputs.tf
    alb/
    compute/
    rds/
    cache/
    iam/
  envs/
    dev/
      main.tf      # composes modules
      variables.tf
    prod/
  backend.tf       # optional shared backend config
  README.md
`}
      </pre>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Backend example (backend.tf)</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "12px", borderRadius: "8px" }}>
{`terraform {
  backend "s3" {
    bucket         = "tf-state-hari"
    key            = "dev/terraform.tfstate"   # use workspace interpolation in production
    region         = "us-east-1"
    dynamodb_table = "tf-lock-table"
    encrypt        = true
  }
}`}
      </pre>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Example: modules/vpc/main.tf (core parts)</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "12px", borderRadius: "8px" }}>
{`resource "aws_vpc" "this" {
  cidr_block = var.vpc_cidr
  tags = var.tags
}

resource "aws_subnet" "public" {
  for_each = var.public_subnets
  vpc_id = aws_vpc.this.id
  cidr_block = each.value
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private" {
  for_each = var.private_subnets
  vpc_id = aws_vpc.this.id
  cidr_block = each.value
}`}
      </pre>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Example: envs/dev/main.tf (compose modules)</h3>
      <pre style={{ background: "#111", color: "#0af", padding: "12px", borderRadius: "8px" }}>
{`provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "../../modules/vpc"
  vpc_cidr = "10.0.0.0/16"
  public_subnets  = { a = "10.0.1.0/24", b = "10.0.2.0/24" }
  private_subnets = { a = "10.0.10.0/24", b = "10.0.11.0/24" }
  tags = local.common_tags
}

module "s3" {
  source = "../../modules/s3"
  bucket_name = "project-dev-assets-${random_id.id.hex}"
  tags = local.common_tags
}

# later: module "alb", module "compute", module "rds"
`}
      </pre>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Commands students will run</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "12px", borderRadius: "8px" }}>
{`cd envs/dev
terraform init
terraform workspace new dev
terraform plan -out=tfplan
terraform apply "tfplan"
# verify resources in console or via aws cli
terraform output
# cleanup
terraform destroy -auto-approve
`}
      </pre>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Smoke test checklist</h3>
      <ul>
        <li>ALB responds with 200 on /health or app endpoint</li>
        <li>ASG has the desired number of instances and instances pass health check</li>
        <li>S3 bucket exists and is versioning enabled</li>
        <li>RDS endpoint is present in outputs (if created)</li>
      </ul>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Student exercise (30–40 minutes)</h3>
      <ol>
        <li>Initialize envs/dev and apply VPC + S3 modules only (keep scope small)</li>
        <li>Then add ALB + basic Launch Template + ASG to attach behind ALB</li>
        <li>Use a minimal user-data that serves a static HTML so health checks pass</li>
        <li>Output ALB DNS name and visit in browser</li>
      </ol>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Common problems & fixes</h3>
      <ul>
        <li><b>Subnet CIDR overlap</b> — choose non-overlapping CIDRs</li>
        <li><b>ALB health check failing</b> — check user-data and security groups</li>
        <li><b>State lock error</b> — verify DynamoDB lock table and remove stale locks carefully</li>
        <li><b>Permissions</b> — ensure Terraform IAM role/user has rights for S3, EC2, ELB, RDS, DynamoDB</li>
      </ul>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>CI / CD & review process (quick)</h3>
      <ul>
        <li>GitHub Actions: on pull_request run terraform fmt, validate, plan</li>
        <li>Post plan as PR comment (use terraform github action)</li>
        <li>Merge → apply on main branch (manual approval if needed)</li>
      </ul>

      <h3 style={{ marginTop: "12px", fontWeight: 600 }}>Homework / Challenge</h3>
      <ol>
        <li>Create modules for rds & cache and add them to dev stack.</li>
        <li>Implement secrets storage for DB password (SSM or Secrets Manager) and retrieve via data source.</li>
        <li>Publish one module to your GitHub (version it with a tag) and consume it via git:: source in another repo.</li>
      </ol>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Instructor tips</h2>
      <ul>
        <li>Keep the first apply small — VPC + S3 only — to avoid long waits and costs.</li>
        <li>Use small instance types (t3.micro) for demos.</li>
        <li>Use <b>skip_final_snapshot = true</b> for demo RDS to avoid accidental snapshot charges (don't do this in prod).</li>
        <li>Encourage students to read terraform plan output line by line before apply.</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Files you can generate now (I can create)</h2>
      <ul>
        <li>Full starter repo with modules/vpc & modules/s3 + envs/dev</li>
        <li>Complete module code for alb & compute (ASG) — ready to apply</li>
        <li>GitHub Actions workflow for PR plan & main apply</li>
      </ul>

      <p style={{ marginTop: "20px" }}>
        When you want, say: <b>“Generate starter repo for Real Project 1”</b> and I'll
        create the repo files (modules/vpc, modules/s3, envs/dev) as JSX files or a downloadable ZIP ready for students.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next</h2>
      <p>
        <b>Real Project 2 → Multi-Cloud Microservice (Azure + GCP)</b>
      </p>
    </div>
  );
}
