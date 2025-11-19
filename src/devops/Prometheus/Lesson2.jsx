import React from "react";

export default function Lesson2() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 2 – Terraform State & Remote Backends (S3 + DynamoDB Locking)
      </h1>

      <p>
        Terraform uses a special file called <b>state</b> to track cloud resources.
        Understanding state is one of the MOST important skills in Terraform.
        In this lesson, you will learn local state, remote state, locking,
        and how to set up S3 + DynamoDB backend like a real DevOps engineer.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>What is terraform.tfstate?</li>
        <li>How Terraform tracks your infrastructure</li>
        <li>Why local state is dangerous for teams</li>
        <li>Remote State using S3 backend</li>
        <li>State Locking using DynamoDB</li>
        <li>How to migrate from local → remote state</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. What is Terraform State?</h2>
      <p>
        Terraform keeps a map of all created resources inside a file called{" "}
        <b>terraform.tfstate</b>. This file contains IDs, names, configurations,
        and dependencies.
      </p>

      <ul>
        <li>State helps Terraform understand what already exists</li>
        <li>Terraform compares state vs. your code to decide changes</li>
        <li>Never manually edit terraform.tfstate</li>
      </ul>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Problems with Local State</h3>
      <ul>
        <li>Stored on your laptop → risky</li>
        <li>No team collaboration</li>
        <li>No locking → race conditions</li>
        <li>Possible corruption</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. Remote State (S3 Backend)</h2>
      <p>To solve all problems, store state remotely.</p>

      <ul>
        <li>S3 bucket stores terraform.tfstate</li>
        <li>DynamoDB table provides state locking</li>
        <li>Safe for teams</li>
        <li>Automatic versioning</li>
        <li>Secure & scalable</li>
      </ul>

      <h3 style={{ marginTop: "20px", fontWeight: 600 }}>S3 Backend Example</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`terraform {
  backend "s3" {
    bucket         = "tf-state-hari"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tf-lock-table"
    encrypt        = true
  }
}`}
      </pre>

      <p>
        After adding this block, run <b>terraform init</b> to configure remote
        backend.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. Creating S3 Bucket & DynamoDB Lock Table</h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_s3_bucket" "tf_state" {
  bucket = "tf-state-hari"
  versioning {
    enabled = true
  }
}

resource "aws_dynamodb_table" "tf_locks" {
  name         = "tf-lock-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>4. State Locking</h2>
      <p>
        DynamoDB provides locking. This prevents two people from running{" "}
        <b>terraform apply</b> at the same time.
      </p>

      <ul>
        <li>Prevents conflicts</li>
        <li>Avoids state corruption</li>
        <li>Team-safe operations</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. Migrating Local State → Remote State</h2>

      <p>Steps:</p>

      <ol>
        <li>Add backend block in main.tf</li>
        <li>Run <b>terraform init</b></li>
        <li>Terraform will ask: “Do you want to copy local state?”</li>
        <li>Type: <b>yes</b></li>
      </ol>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Command</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`terraform init
terraform plan
terraform apply`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>6. Hands-On Exercise</h2>
      <p>Try this yourself:</p>

      <ul>
        <li>Create S3 bucket for state</li>
        <li>Create DynamoDB table for locking</li>
        <li>Add backend block</li>
        <li>Migrate your state</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Common Errors</h2>

      <ul>
        <li>
          <b>AccessDenied:</b> Missing IAM permissions → add S3 + DynamoDB rights
        </li>
        <li>
          <b>State Lock Error:</b> Check DynamoDB table for a stuck lock row
        </li>
        <li>
          <b>Bucket Already Exists:</b> Use a unique bucket name
        </li>
        <li>
          <b>NoSuchBucket:</b> Check bucket region
        </li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 3 → Variables, Outputs, Locals & Workspaces</b>
      </p>
    </div>
  );
}
