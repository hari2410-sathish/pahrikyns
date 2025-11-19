import React from "react";

export default function Lesson4() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 4 – Terraform Modules (Design, Structure & Reusability)
      </h1>

      <p>
        In Terraform, Modules are the MOST important concept for building real-world,
        production-grade infrastructure. A Module helps you reuse code, avoid duplication,
        and maintain a clean architecture for dev, stage, and prod environments.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>What a Terraform module is</li>
        <li>Why modules are essential in real DevOps projects</li>
        <li>How to create your own custom module</li>
        <li>How to use local modules & remote modules</li>
        <li>Module versioning (Git tags, registry versions)</li>
        <li>Best practices for module design</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        1. What is a Terraform Module?
      </h2>
      <p>
        A Module is just a folder that contains Terraform files. It lets you wrap
        commonly used resources into reusable packages.
      </p>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Module folder structure:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`my-vpc-module/
  main.tf
  variables.tf
  outputs.tf`}
      </pre>

      <p>
        Every module contains its own inputs (variables), outputs, and resources.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        2. Why Use Modules?
      </h2>

      <ul>
        <li>Avoid repeating same resources in every environment</li>
        <li>Clean and organized Terraform repo</li>
        <li>One module → many reusable deployments</li>
        <li>Version control and easy updates</li>
        <li>Standardization (same infrastructure pattern everywhere)</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        3. Creating a Simple Module (Example: S3 Bucket Module)
      </h2>

      <p><b>Inside module folder:</b></p>

      <h3 style={{ fontWeight: 600 }}>main.tf</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name

  versioning {
    enabled = var.enable_versioning
  }

  tags = var.tags
}`}
      </pre>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>variables.tf</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`variable "bucket_name" {
  type = string
}

variable "enable_versioning" {
  type    = bool
  default = true
}

variable "tags" {
  type = map(string)
}`}
      </pre>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>outputs.tf</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`output "bucket_id" {
  value = aws_s3_bucket.this.id
}

output "bucket_arn" {
  value = aws_s3_bucket.this.arn
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        4. Using the Module in Your Root Project (main.tf)
      </h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`module "s3_bucket" {
  source            = "./modules/s3"
  bucket_name       = "lesson4-module-demo"
  enable_versioning = true

  tags = {
    project = "terraform-course"
    env     = terraform.workspace
  }
}`}
      </pre>

      <p>Here <b>source</b> can be local path, Git repo, or Registry module.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        5. Module Sources (Local, Git, Registry)
      </h2>

      <h3 style={{ fontWeight: 600 }}>Local Module:</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`source = "./modules/network"`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>GitHub Module:</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`source = "git::https://github.com/hari/terraform-modules.git//vpc?ref=v1.0.0"`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Terraform Registry Module:</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`source = "terraform-aws-modules/vpc/aws"`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        6. Module Versioning (Real DevOps Practice)
      </h2>
      <ul>
        <li>Use Git tags like <b>v1.0.0</b>, <b>v1.1.0</b>, <b>v2.0.0</b></li>
        <li>Pin module version for stability</li>
        <li>Never use latest tag for production</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Example:</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`source = "git::https://github.com/hari/tf-modules.git//eks?ref=v2.0.1"`}      
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        7. Best Practices for Modules
      </h2>
      <ul>
        <li>Keep modules small and focused</li>
        <li>Use variables for all dynamic values</li>
        <li>Use outputs to expose important values</li>
        <li>Avoid hardcoding</li>
        <li>Document your module (README.md)</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Hands-On Exercise</h2>
      <p>Create a reusable Terraform module that deploys:</p>
      <ul>
        <li>1 S3 bucket</li>
        <li>Enable versioning</li>
        <li>Output bucket ARN</li>
        <li>Use this module twice with different names</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>9. Common Errors</h2>
      <ul>
        <li><b>Module infinite recursion</b> → Avoid source pointing to itself</li>
        <li><b>Missing variable</b> → Add default or pass value</li>
        <li><b>Wrong Git ref</b> → Check branch/tag name</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 5 → Provisioners, Null Resources & External Data</b>
      </p>
    </div>
  );
}
