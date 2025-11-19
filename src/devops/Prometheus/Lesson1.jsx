import React from "react";

export default function Lesson1() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 1 – Terraform Fundamentals & Workflow
      </h1>

      <p>
        Welcome to the first lesson of Terraform! In this lesson, you’ll learn the
        core idea of Infrastructure as Code (IaC), Terraform workflow, providers,
        resources, and how Terraform actually creates infrastructure safely.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>What is Infrastructure as Code (IaC)?</li>
        <li>What Terraform is and how it works internally</li>
        <li>Providers, Resources, Variables & Outputs basics</li>
        <li>Terraform commands: init, plan, apply, destroy</li>
        <li>How Terraform state works (very important)</li>
        <li>Full demo: Create a simple AWS S3 bucket</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. What is Terraform?</h2>
      <p>
        Terraform is an open-source Infrastructure as Code tool. It lets you
        create cloud resources like VPC, EC2, databases, buckets, load balancers,
        etc., using code instead of clicking in AWS/Azure/GCP consoles.
      </p>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Why use Terraform?</h3>
      <ul>
        <li>Automate everything</li>
        <li>No manual mistakes</li>
        <li>Reusable code</li>
        <li>Fast deployment</li>
        <li>Version control (Git)</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. Terraform Architecture</h2>
      <ul>
        <li>Your Code (HCL files)</li>
        <li>Terraform CLI (runs plan/apply commands)</li>
        <li>Providers (AWS, Azure, GCP, Kubernetes, etc.)</li>
        <li>State File (terraform.tfstate)</li>
      </ul>

      <p>
        Terraform builds a dependency graph and applies changes in the correct
        order. This is why Terraform is safe and predictable.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. Terraform File Basics</h2>
      <p>Main Terraform files:</p>
      <ul>
        <li>main.tf → Provider, Resources</li>
        <li>variables.tf → Inputs</li>
        <li>outputs.tf → Output values</li>
        <li>terraform.tfstate → Current infrastructure state</li>
      </ul>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Sample Code</h3>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
          overflowX: "auto",
        }}
      >
{`provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "demo" {
  bucket = "terraform-demo-bucket-123"
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>4. Terraform Commands</h2>
      <ul>
        <li><b>terraform init</b> – Downloads provider plugins</li>
        <li><b>terraform plan</b> – Shows what Terraform will create</li>
        <li><b>terraform apply</b> – Creates resources</li>
        <li><b>terraform destroy</b> – Deletes everything</li>
      </ul>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Command Example</h3>
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
terraform apply
terraform destroy`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. Terraform State (Very Important)</h2>
      <ul>
        <li>Keeps track of created resources</li>
        <li>Stored in terraform.tfstate</li>
        <li>Terraform uses state to know what exists</li>
        <li>Do not edit state manually</li>
      </ul>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>State Storage</h3>
      <ul>
        <li>Local — terraform.tfstate (default)</li>
        <li>Remote — S3 + DynamoDB lock (recommended)</li>
        <li>Terraform Cloud remote backend</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>6. Hands-On Demo</h2>
      <p>Create an S3 bucket using Terraform.</p>
      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_s3_bucket" "demo" {
  bucket = "my-lesson1-demo"
  acl    = "private"
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>7. Exercise</h2>
      <p>Try this yourself:</p>
      <ul>
        <li>Create an S3 bucket</li>
        <li>Enable versioning</li>
        <li>Print bucket name using outputs</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 2 → Terraform State & Backends (S3 + DynamoDB Locking)</b>
      </p>
    </div>
  );
}
