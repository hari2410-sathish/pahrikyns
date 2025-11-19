import React from "react";

export default function Lesson23() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>

      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 23 – Terraform Interview Lab: Hands-On Tasks & Challenges
      </h1>

      <p>
        This lesson contains the MOST realistic hands-on Terraform tasks that interviewers give
        during DevOps, Cloud Engineer, and SRE interviews. These tasks test your ability to code
        Terraform quickly, debug issues, and design solutions.
      </p>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>Section 1 — Quick Hands-On Tasks (10–15 min each)</h2>

      <h3 style={{ fontWeight: 600 }}>1. Task: Create an S3 Bucket with Versioning + Encryption</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "15px", borderRadius: "10px" }}>
{`resource "aws_s3_bucket" "demo" {
  bucket = "interview-${random_id.id.hex}"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

resource "random_id" "id" {
  byte_length = 4
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>2. Task: Create an EC2 Instance with a Security Group</h3>
      <pre style={{ background: "#111", color: "#0af", padding: "15px", borderRadius: "10px" }}>
{`resource "aws_security_group" "web" {
  name   = "web-sg"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = "t3.micro"
  vpc_security_group_ids = [aws_security_group.web.id]
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>3. Task: Output the Public IP of the instance</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "15px", borderRadius: "10px" }}>
{`output "web_public_ip" {
  value = aws_instance.web.public_ip
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>4. Task: Use a Data Source to fetch latest AMI</h3>
      <pre style={{ background: "#111", color: "#0af", padding: "15px", borderRadius: "10px" }}>
{`data "aws_ami" "amazon_linux" {
  owners      = ["amazon"]
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*"]
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>5. Task: Create an IAM Role + EC2 Instance Profile</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "15px", borderRadius: "10px" }}>
{`resource "aws_iam_role" "ec2_role" {
  name = "demo-role"
  assume_role_policy = data.aws_iam_policy_document.ec2.json
}

data "aws_iam_policy_document" "ec2" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "demo-profile"
  role = aws_iam_role.ec2_role.name
}`}
      </pre>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>
        Section 2 — Practical Debug / Fix Tasks (Frequently Asked in Interviews)
      </h2>

      <h3 style={{ fontWeight: 600 }}>6. Task: Fix this broken Terraform code</h3>
      <p><b>Interviewer gives:</b></p>

      <pre style={{ background: "#111", color: "#f00", padding: "15px", borderRadius: "10px" }}>
{`resource aws_s3_bucket demo {
  bucket = "wrong syntax bucket"
}`}
      </pre>

      <p><b>Correct answer:</b></p>

      <pre style={{ background: "#111", color: "#0f0", padding: "15px", borderRadius: "10px" }}>
{`resource "aws_s3_bucket" "demo" {
  bucket = "correct-bucket-name"
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>7. Task: Fix: Resource is getting recreated every apply</h3>
      <p><b>Root causes:</b></p>
      <ul>
        <li>Random value used without <code>keepers</code></li>
        <li>Dynamic tags changing every run</li>
        <li>Ignore changes missing</li>
      </ul>

      <p><b>Fix example:</b></p>
      <pre style={{ background: "#111", color: "#0af", padding: "15px", borderRadius: "10px" }}>
{`lifecycle {
  ignore_changes = [tags]
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>8. Task: Import an existing resource to avoid recreation</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "15px", borderRadius: "10px" }}>
{`terraform import aws_s3_bucket.demo my-existing-bucket`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>9. Task: Fix “state file lost or corrupted”</h3>
      <ul>
        <li>Recover from S3 version (remote backend)</li>
        <li>Terraform Cloud state history</li>
        <li>Use <b>terraform refresh</b></li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>10. Task: Make Terraform ignore manual changes to SG description</h3>
      <pre style={{ background: "#111", color: "#0af", padding: "15px", borderRadius: "10px" }}>
{`lifecycle {
  ignore_changes = [description]
}`}
      </pre>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>Section 3 — Mini Architecture Tasks (15–20 min)</h2>

      <h3 style={{ fontWeight: 600 }}>11. Task: Create an ALB + Target Group + Listener</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "15px", borderRadius: "10px" }}>
{`resource "aws_lb" "app" {
  name               = "demo-alb"
  load_balancer_type = "application"
  subnets            = var.public_subnets
}

resource "aws_lb_target_group" "tg" {
  name     = "demo-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_lb.app.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg.arn
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>12. Task: Build a VPC with Public & Private Subnets</h3>
      <pre style={{ background: "#111", color: "#0af", padding: "15px", borderRadius: "10px" }}>
{`resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  cidr_block = "10.0.1.0/24"
  vpc_id     = aws_vpc.main.id
  map_public_ip_on_launch = true
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>13. Task: Deploy a simple EKS Cluster (basic)</h3>
      <pre style={{ background: "#111", color: "#0f0", padding: "15px", borderRadius: "10px" }}>
{`module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "demo-eks"
  cluster_version = "1.29"
  subnets         = var.private_subnets
  vpc_id          = var.vpc_id
}`}
      </pre>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontWeight: 700 }}>
        Section 4 — Final Real Interview Take-Home Assignments
      </h2>

      <h3 style={{ fontWeight: 600 }}>14. Assignment: Deploy a 3-Tier App with Terraform</h3>
      <ul>
        <li>Create VPC</li>
        <li>Create ALB</li>
        <li>Create ASG (2 instances)</li>
        <li>Create RDS</li>
        <li>Output ALB DNS + DB Endpoint</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>15. Assignment: Build a CI/CD Pipeline</h3>
      <ul>
        <li>Plan on PR</li>
        <li>Apply on main</li>
        <li>Store state in S3 backend with DynamoDB lock</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>16. Assignment: Multi-Region Failover Task</h3>
      <ul>
        <li>Deploy ALB in us-east-1 & eu-west-1</li>
        <li>Route53 health checks + weighted routing</li>
        <li>Failover simulation</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>17. Assignment: Create a Terraform Module</h3>
      <ul>
        <li>Create reusable module (EC2 or ALB or S3)</li>
        <li>Publish on GitHub with versioning</li>
        <li>Use that module in a sample project</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>18. Assignment: Debug a broken Terraform project</h3>
      <ul>
        <li>Fix provider version mismatch</li>
        <li>Fix backend configuration</li>
        <li>Fix resource recreation issue</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "30px" }}>Course Completed 🎉</h2>

      <p>
        You have completed all lessons, 3 real projects, and interview preparation!
        If you want, I can now create:
      </p>

      <ul>
        <li>Full course PDF</li>
        <li>Full ZIP folder with all lessons (JSX)</li>
        <li>Student assignments bundle</li>
        <li>Mock interview script</li>
      </ul>

      <p style={{ marginTop: "10px" }}>
        Tell me what you want next!
      </p>

    </div>
  );
}
