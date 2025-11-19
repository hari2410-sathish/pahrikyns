import React from "react";

export default function Lesson14() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 14 – Terraform Cloud, Workspaces, Remote State & Sentinel Policies
      </h1>

      <p>
        In this lesson, you will learn about Terraform Cloud — HashiCorp’s
        managed platform for storing remote state, running Terraform plans,
        managing teams, and enforcing policies. This is the modern and enterprise
        way to manage Terraform at scale.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>Terraform Cloud overview</li>
        <li>Remote State using Terraform Cloud</li>
        <li>Terraform Cloud Workspaces</li>
        <li>Managing variables in Terraform Cloud</li>
        <li>Private Module Registry overview</li>
        <li>Sentinel policy basics (security governance)</li>
        <li>VCS integration (GitHub/GitLab)</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        1. What is Terraform Cloud?
      </h2>

      <p>Terraform Cloud provides:</p>

      <ul>
        <li>Secure Remote State storage</li>
        <li>Team-based Access Control</li>
        <li>Remote runs (plan/apply in the cloud)</li>
        <li>Policy-as-code (Sentinel)</li>
        <li>Private Module Registry</li>
        <li>VCS integration with GitHub/GitLab</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        2. Configure Terraform Cloud Backend
      </h2>

      <p>Use Terraform Cloud as backend instead of S3 or local state.</p>

      <h3 style={{ fontWeight: 600 }}>Example: terraform block</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`terraform {
  cloud {
    organization = "hari-org"

    workspaces {
      name = "lesson14-workspace"
    }
  }
}`}
      </pre>

      <p>
        After adding this, run <b>terraform init</b> to connect to Terraform Cloud.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        3. Terraform Cloud Workspaces
      </h2>

      <p>A Workspace in Terraform Cloud = environment (dev/stage/prod).</p>

      <ul>
        <li>Each workspace stores its own state</li>
        <li>Works seamlessly with VCS integration</li>
        <li>Can run auto-plan & auto-apply on new commits</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>CLI Workspace Commands</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`terraform workspace list
terraform workspace select dev
terraform workspace new prod`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        4. Variables in Terraform Cloud
      </h2>

      <p>Terraform Cloud supports:</p>

      <ul>
        <li>Environment variables (ex: AWS keys)</li>
        <li>Terraform variables (var.*)</li>
        <li>Sensitive values (encrypted)</li>
      </ul>

      <p>
        Manage variables in Terraform Cloud UI → Workspace → Variables section.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        5. VCS Integration (GitHub/GitLab)
      </h2>

      <p>
        Terraform Cloud can automatically trigger <b>plan</b> & <b>apply</b> when you push
        to a Git repository.
      </p>

      <ul>
        <li>Connect workspace to a Git repo</li>
        <li>Every commit → Terraform plan</li>
        <li>Merge to main/master → apply (optional)</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        6. Private Module Registry
      </h2>

      <p>You can publish internal modules for your team:</p>

      <ul>
        <li>VPC module</li>
        <li>EKS module</li>
        <li>S3 module</li>
        <li>Network module</li>
      </ul>

      <p>
        Terraform Cloud provides versioning, documentation, and dependency graphs
        for modules.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        7. Sentinel Policies (Policy-as-Code)
      </h2>

      <p>
        Sentinel enforces rules BEFORE Terraform applies infrastructure (security,
        compliance, governance).
      </p>

      <h3 style={{ fontWeight: 600 }}>Example: Simple Sentinel rule</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`# Deny public S3 buckets
import "tfplan/v2" as tfplan

public_buckets = filter tfplan.resources.aws_s3_bucket as bucket {
  bucket.applied.acl is "public-read"
}

main = rule { length(public_buckets) is 0 }`}
      </pre>

      <p>This blocks creation of publicly readable S3 buckets.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        8. Remote Operations (Remote Plan & Apply)
      </h2>

      <p>
        With Terraform Cloud, your laptop doesn’t execute Terraform — the run
        happens in the cloud.
      </p>

      <ul>
        <li>Less secret leakage</li>
        <li>More security</li>
        <li>Central control</li>
        <li>Audit logs for every run</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>9. Real-World Use Cases</h2>
      <ul>
        <li>Enterprise teams managing infrastructure</li>
        <li>Shared remote state</li>
        <li>Automated CI/CD pipelines</li>
        <li>Policy-based restriction (no public S3)</li>
        <li>Private module registry sharing</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>10. Hands-On Exercise</h2>

      <ul>
        <li>Create a Terraform Cloud organization</li>
        <li>Create a workspace named “lesson14-workspace”</li>
        <li>Configure Terraform Cloud backend block</li>
        <li>Push code to GitHub and enable auto plan</li>
        <li>Create a simple Sentinel policy</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>11. Common Errors</h2>
      <ul>
        <li><b>Invalid token</b> → login using `terraform login`</li>
        <li><b>Workspace not found</b> → wrong workspace name</li>
        <li><b>Organization mismatch</b> → fix in backend config</li>
        <li><b>Sentinel policy blocked apply</b> → fix policy</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 15 → CI/CD with Terraform (GitHub Actions, GitLab CI)</b>
      </p>
    </div>
  );
}
