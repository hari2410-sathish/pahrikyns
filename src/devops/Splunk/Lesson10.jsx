import React from "react";

export default function Lesson10() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 10 – IAM: Roles, Policies, Instance Profiles & Security Best Practices
      </h1>

      <p>
        IAM (Identity and Access Management) is one of the MOST important topics in AWS
        and Terraform. Every resource you deploy needs proper permissions. In this
        lesson, you will learn how to create IAM roles, policies, and instance
        profiles in Terraform — with real production examples.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>IAM Users, Groups & Roles (concepts overview)</li>
        <li>Inline policies vs managed policies</li>
        <li>IAM Role creation with Terraform</li>
        <li>IAM Policy creation using JSON</li>
        <li>Instance Profile for EC2</li>
        <li>Least-privilege security best practices</li>
        <li>Real-world IAM setup for S3, EC2, Lambda</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. What is IAM?</h2>

      <p>
        IAM controls who can access what in AWS. Terraform lets you create all IAM
        resources as infrastructure code.
      </p>

      <ul>
        <li><b>User</b> → physical person</li>
        <li><b>Group</b> → collection of users</li>
        <li><b>Role</b> → permissions for AWS services</li>
        <li><b>Policy</b> → JSON document with allowed/denied actions</li>
        <li><b>Instance Profile</b> → role attached to EC2 instance</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. IAM Policy Example (JSON)</h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`data "aws_iam_policy_document" "s3_read_policy" {
  statement {
    actions   = ["s3:GetObject", "s3:ListBucket"]
    resources = ["*"]
  }
}`}
      </pre>

      <p>This produces an IAM policy JSON automatically.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. Creating an IAM Role</h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_iam_role" "ec2_role" {
  name = "lesson10-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}`}
      </pre>

      <p>This allows EC2 to assume this IAM role.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        4. Attaching IAM Policy to Role
      </h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_iam_policy" "s3_read" {
  name   = "lesson10-s3-read"
  policy = data.aws_iam_policy_document.s3_read_policy.json
}

resource "aws_iam_role_policy_attachment" "attach_s3" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = aws_iam_policy.s3_read.arn
}`}
      </pre>

      <p>This role now has S3 read permissions.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. Instance Profile (Attach IAM Role to EC2)</h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_iam_instance_profile" "ec2_profile" {
  name = "lesson10-profile"
  role = aws_iam_role.ec2_role.name
}`}
      </pre>

      <p>Attach this instance profile to EC2:</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_instance" "web" {
  ami                  = "ami-0c94855ba95c71c99"
  instance_type        = "t2.micro"
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name
}`}
      </pre>

      <p>Now EC2 automatically gets S3 access (no access keys needed).</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        6. Managed vs Inline Policies
      </h2>

      <ul>
        <li><b>Managed</b> → reusable, stored in AWS, multiple roles can use</li>
        <li><b>Inline</b> → attached directly to one role only</li>
      </ul>

      <p>Best practice: Use managed policies for clean architecture.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        7. Least Privilege Best Practices
      </h2>

      <ul>
        <li>Only grant the minimum needed permissions</li>
        <li>Never use <b>\"Action\": \"*\"</b></li>
        <li>Separate dev/stage/prod permissions</li>
        <li>Always attach IAM roles to EC2/Lambda instead of Access Keys</li>
        <li>Rotate Access Keys regularly</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Real-World IAM Patterns</h2>

      <ul>
        <li>EC2 Role → S3 Read/Write</li>
        <li>Lambda Role → CloudWatch Logs + DynamoDB access</li>
        <li>EKS IRSA → Pod-level IAM permissions</li>
        <li>Terraform Role → S3 + DynamoDB lock table</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>9. Hands-On Exercise</h2>

      <ul>
        <li>Create an IAM role for EC2</li>
        <li>Create a policy allowing S3:GetObject</li>
        <li>Attach the policy to the role</li>
        <li>Create an instance profile</li>
        <li>Launch EC2 using this profile</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>10. Common Errors</h2>

      <ul>
        <li><b>MalformedPolicyDocument</b> → JSON syntax error</li>
        <li><b>AccessDenied</b> → missing IAM permissions</li>
        <li><b>Instance profile not found</b> → wrong role name</li>
        <li><b>Principal cannot be assumed</b> → incorrect assume_role_policy</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 11 → Kubernetes & EKS: Cluster, Node Groups, IRSA</b>
      </p>
    </div>
  );
}
