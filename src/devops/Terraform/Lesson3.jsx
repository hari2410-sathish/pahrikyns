import React from "react";

export default function Lesson3() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 3 – Variables, Outputs, Locals & Workspaces
      </h1>

      <p>
        In this lesson, you will learn how to make Terraform configurations more
        dynamic, reusable, and environment-friendly using variables, locals,
        outputs, and workspaces. These concepts form the foundation of
        multi-environment deployments (dev, stage, prod).
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>Input variables and variable types</li>
        <li>Default values and validations</li>
        <li>Outputs and their purpose</li>
        <li>Locals for internal reusable values</li>
        <li>Workspaces for multi-environment setups</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. Variables</h2>
      <p>Variables allow you to make Terraform code flexible and reusable.</p>

      <p><b>variables.tf example:</b></p>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "tags" {
  type = map(string)
  default = {
    project = "terraform-lessons"
    owner   = "Hari"
  }
}`}
      </pre>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>How to use variables inside main.tf</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "demo" {
  bucket = "lesson3-demo-bucket"
  tags   = var.tags
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. Variable Types</h2>
      <ul>
        <li>string</li>
        <li>number</li>
        <li>bool</li>
        <li>list(string)</li>
        <li>map(any)</li>
        <li>object()</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. Outputs</h2>
      <p>
        Outputs help you print important values after running <b>terraform apply</b>.
      </p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`output "bucket_name" {
  value       = aws_s3_bucket.demo.bucket
  description = "Name of the created bucket"
}`}
      </pre>

      <p>
        After applying: <b>terraform output bucket_name</b> prints the bucket name.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>4. Locals</h2>
      <p>Locals are like internal variables used only inside Terraform.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`locals {
  env       = terraform.workspace
  base_tags = {
    owner = "Hari"
    env   = terraform.workspace
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Using locals:</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_s3_bucket" "demo" {
  bucket = "lesson3-${local.env}-bucket"
  tags   = local.base_tags
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. Workspaces (dev, stage, prod)</h2>
      <p>
        Workspaces allow you to deploy the same Terraform code to different
        environments without rewriting anything.
      </p>

      <h3 style={{ color: "#0af", marginTop: "10px" }}>Common Workspaces</h3>
      <ul>
        <li>default</li>
        <li>dev</li>
        <li>stage</li>
        <li>prod</li>
      </ul>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Workspace Commands</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`terraform workspace list
terraform workspace new dev
terraform workspace select dev`}
      </pre>

      <p><b>terraform.workspace</b> automatically returns the current workspace name.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>6. Real Example: Different Bucket per Workspace</h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_s3_bucket" "lesson3" {
  bucket = "tf-${terraform.workspace}-bucket"
}`}
      </pre>

      <p>
        In dev workspace → <b>tf-dev-bucket</b>  
        In prod workspace → <b>tf-prod-bucket</b>
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>7. Hands-On Exercise</h2>
      <p>Create this setup:</p>
      <ul>
        <li>A variable for environment name</li>
        <li>A local block that merges tags</li>
        <li>An S3 bucket whose name includes the workspace</li>
        <li>Print the bucket name using outputs</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Common Errors</h2>
      <ul>
        <li><b>Invalid variable type</b> → Match type exactly</li>
        <li><b>Workspace not found</b> → Create workspace before selecting</li>
        <li><b>Output not showing</b> → Resource not created or depends_on missing</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 4 → Modules: Design, Structure & Reusability</b>
      </p>
    </div>
  );
}
