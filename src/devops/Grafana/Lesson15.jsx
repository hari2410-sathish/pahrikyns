import React from "react";

export default function Lesson15() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 15 – CI/CD for Terraform (GitHub Actions, GitLab CI, Automation Pipelines)
      </h1>

      <p>
        In this lesson, you will learn how to automate Terraform using CI/CD.
        This is how real companies run Terraform: pull request → plan → approval →
        apply. We will cover GitHub Actions, GitLab CI, remote state, Terraform
        Cloud, and security best practices.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>CI/CD workflow for Terraform</li>
        <li>GitHub Actions pipeline</li>
        <li>GitLab CI pipeline</li>
        <li>Terraform Cloud automation</li>
        <li>Secure workflows (no secrets leak)</li>
        <li>PR-based plan & approval flows</li>
        <li>Auto-formatting, validation & linting</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        1. Why Terraform CI/CD?
      </h2>

      <p>Manual terraform apply is risky in teams. CI/CD provides:</p>
      <ul>
        <li>Automation & speed</li>
        <li>Plan preview for pull requests</li>
        <li>Approval gates</li>
        <li>Remote execution</li>
        <li>Audit logging</li>
        <li>No local secrets exposure</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        2. GitHub Actions for Terraform
      </h2>

      <p>Create the workflow file:</p>

      <h3 style={{ fontWeight: 600 }}>📄 .github/workflows/terraform.yaml</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`name: Terraform CI

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  terraform:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2

      - name: Terraform Format
        run: terraform fmt -check

      - name: Terraform Init
        run: terraform init

      - name: Terraform Plan
        run: terraform plan -no-color
`}
      </pre>

      <p>This pipeline runs terraform init, fmt, and plan.</p>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Add Apply on Main Branch</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`      - name: Terraform Apply
        if: github.ref == 'refs/heads/main'
        run: terraform apply -auto-approve`}
      </pre>

      <p>
        This ensures only main branch changes apply infrastructure (safe practice).
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        3. GitLab CI for Terraform
      </h2>

      <p>GitLab CI is YAML-based like GitHub.</p>

      <h3 style={{ fontWeight: 600 }}>📄 .gitlab-ci.yml</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`stages:
  - validate
  - plan
  - apply

validate:
  stage: validate
  image: hashicorp/terraform
  script:
    - terraform init
    - terraform fmt -check
    - terraform validate

plan:
  stage: plan
  image: hashicorp/terraform
  script:
    - terraform init
    - terraform plan -out tf.plan
  artifacts:
    paths:
      - tf.plan

apply:
  stage: apply
  image: hashicorp/terraform
  when: manual
  script:
    - terraform apply -auto-approve tf.plan
`}
      </pre>

      <p>
        GitLab supports manual approval for apply which is widely used in
        production.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        4. Terraform Cloud CI/CD Integration
      </h2>

      <p>Terraform Cloud supports:</p>
      <ul>
        <li>Auto plan on PR</li>
        <li>Manual approve</li>
        <li>Remote apply</li>
        <li>Audit logs</li>
        <li>Policy checks (Sentinel)</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Terraform Cloud Workflow</h3>
      <ul>
        <li>Developer pushes Git commit</li>
        <li>Terraform Cloud auto-runs plan</li>
        <li>Approval required</li>
        <li>Terraform Cloud runs apply</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        5. Security Best Practices
      </h2>

      <ul>
        <li>Never store AWS keys in repo</li>
        <li>Use GitHub Secrets / GitLab CI Variables</li>
        <li>Enable branch protection rules</li>
        <li>Use IAM roles instead of long-lived credentials</li>
        <li>Use Terraform Cloud remote state</li>
        <li>Add Sentinel policies for governance</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        6. Add Terraform Format, Lint & Validate (Recommended)
      </h2>

      <p>Add to CI pipeline:</p>

      <ul>
        <li><b>terraform fmt</b> – formatting check</li>
        <li><b>terraform validate</b> – syntax</li>
        <li><b>tflint</b> – linting for best practices</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>7. Hands-On Exercise</h2>

      <ul>
        <li>Create GitHub Actions workflow for Terraform</li>
        <li>Trigger plan on PR</li>
        <li>Trigger apply on main branch only</li>
        <li>Add terraform fmt & validate steps</li>
        <li>Store AWS credentials in GitHub Secrets</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Common Errors</h2>

      <ul>
        <li><b>No credentials found</b> → missing secrets</li>
        <li><b>Terraform init fails</b> → backend misconfiguration</li>
        <li><b>Plan fails</b> → syntax or missing variables</li>
        <li><b>Apply auto-fails</b> → branch protection not configured</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Section</h2>
      <p>
        <b>Next → Real Project 1 (AWS VPC + EC2 + ALB + ASG) — Full Production Deployment</b>
      </p>
    </div>
  );
}
