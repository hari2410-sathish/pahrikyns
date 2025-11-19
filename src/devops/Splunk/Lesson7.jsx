import React from "react";

export default function Lesson6() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 6 – Terraform Templating, Functions, For-Each, Count & Dynamic Blocks
      </h1>

      <p>
        In this lesson, you will learn powerful HCL features that help you build
        flexible and production-ready Terraform code: templating, functions,
        loops, and dynamic blocks. These features are heavily used in real DevOps
        modules and automation.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>Terraform functions (string, numeric, collection functions)</li>
        <li>templatefile function for cloud-init or config files</li>
        <li>count and for_each loops</li>
        <li>Dynamic blocks (generate nested configuration)</li>
        <li>How to avoid code duplication using loops</li>
        <li>Real production examples (EC2, S3, Security Groups)</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        1. Terraform Functions
      </h2>

      <p>Terraform supports many built-in functions:</p>
      <ul>
        <li>String functions → <b>upper(), lower(), join()</b></li>
        <li>Numeric functions → <b>min(), max()</b></li>
        <li>Collection functions → <b>length(), contains(), merge()</b></li>
        <li>Time functions → <b>timestamp()</b></li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Examples:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`locals {
  name_upper = upper("terraform")
  merged_tags = merge(
    { project = "lesson6" },
    { owner = "hari" }
  )
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        2. Templating With templatefile()
      </h2>

      <p>
        Use <b>templatefile()</b> to load external template files (cloud-init, scripts,
        config files, YAML etc.).
      </p>

      <h3 style={{ fontWeight: 600 }}>Example: cloud-init template</h3>
      <p><b>cloud-init.tpl</b></p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`#cloud-config
package_update: true
runcmd:
  - echo "Hello from ${name}"`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>main.tf usage:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`data "template_file" "init" {
  template = file("${path.module}/cloud-init.tpl")
  vars = {
    name = "Terraform Lesson 6"
  }
}

resource "aws_instance" "demo" {
  ami           = "ami-0c94855ba95c71c99"
  instance_type = "t2.micro"
  user_data     = data.template_file.init.rendered
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        3. count – Create Multiple Resources
      </h2>

      <p>Use <b>count</b> when you want N copies of a resource.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_s3_bucket" "logs" {
  count  = 3
  bucket = "lesson6-logs-${count.index}"
}`}
      </pre>

      <p>This creates 3 buckets: logs-0, logs-1, logs-2</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        4. for_each – Loop Over Maps or Sets
      </h2>

      <h3 style={{ fontWeight: 600 }}>Example: create security group rules using for_each</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`variable "allow_ports" {
  type = list(number)
  default = [22, 80, 443]
}

resource "aws_security_group_rule" "allow_inbound" {
  for_each = toset(var.allow_ports)

  type        = "ingress"
  from_port   = each.value
  to_port     = each.value
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}`}
      </pre>

      <p>
        Terraform will create a rule for each port (22 → SSH, 80 → HTTP, 443 → HTTPS).
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        5. Dynamic Blocks – Powerful Nested Resource Creation
      </h2>

      <p>
        Dynamic blocks generate nested configuration blocks dynamically using loops.
      </p>

      <h3 style={{ fontWeight: 600 }}>Example: multiple IAM policy statements</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_iam_policy" "example" {
  name = "lesson6-iam"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      for action in ["s3:ListBucket", "s3:GetObject"] : {
        Effect = "Allow"
        Action = action
        Resource = "*"
      }
    ]
  })
}`}
      </pre>

      <p>
        Dynamic blocks make your code flexible and avoid repeating similar nested
        blocks.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        6. Real Example: Multiple EC2 Instances Using for_each
      </h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`variable "servers" {
  default = {
    web  = "t2.micro"
    app  = "t2.small"
    data = "t2.medium"
  }
}

resource "aws_instance" "servers" {
  for_each      = var.servers
  ami           = "ami-0c94855ba95c71c99"
  instance_type = each.value
  tags = {
    Name = each.key
  }
}`}
      </pre>

      <p>This creates 3 EC2 instances (web, app, data) with different sizes.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>7. Hands-On Exercise</h2>
      <ul>
        <li>Create 3 S3 buckets using <b>count</b></li>
        <li>Create 3 EC2 instances using <b>for_each</b></li>
        <li>Create a cloud-init template using <b>templatefile()</b></li>
        <li>Generate tags using <b>locals</b> + <b>merge()</b> function</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Common Errors</h2>
      <ul>
        <li><b>“Invalid for_each argument”</b> → data must be a map or set</li>
        <li><b>templatefile path error</b> → wrong file location</li>
        <li><b>Duplicate resource names</b> → count.index conflict</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 7 → AWS VPC: Networking, Subnets, Routing & Security Groups</b>
      </p>
    </div>
  );
}
