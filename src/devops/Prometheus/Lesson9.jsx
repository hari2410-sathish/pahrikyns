import React from "react";

export default function Lesson9() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 9 – AWS Storage & Databases: S3, RDS, DynamoDB
      </h1>

      <p>
        In this lesson, we explore AWS storage and database services using Terraform.
        You will learn how to provision S3 buckets, RDS databases, and DynamoDB
        tables in a production-ready way. These services are essential for
        application data, backups, caching, and state management.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>Creating S3 buckets with versioning & lifecycle rules</li>
        <li>Provisioning RDS MySQL/Postgres database</li>
        <li>DynamoDB table creation</li>
        <li>Subnet groups for RDS</li>
        <li>Backups & storage configuration</li>
        <li>Production-ready patterns</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. S3 Bucket – Most Common Terraform Resource</h2>

      <p>S3 is used for storage, backups, logs, and static websites.</p>

      <h3 style={{ fontWeight: 600 }}>S3 Example</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_s3_bucket" "app_bucket" {
  bucket = "lesson9-app-bucket"
  acl    = "private"

  versioning {
    enabled = true
  }

  tags = {
    project = "lesson9"
    env     = terraform.workspace
  }
}`}
      </pre>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Lifecycle Rules (example)</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_s3_bucket_lifecycle_configuration" "rules" {
  bucket = aws_s3_bucket.app_bucket.id

  rule {
    id = "log-cleanup"
    enabled = true

    expiration {
      days = 30
    }
  }
}`}
      </pre>

      <p>This deletes old log files after 30 days.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. DynamoDB – NoSQL Database</h2>
      <p>
        DynamoDB is a fully managed NoSQL database used for scalable, high-speed
        operations. It is also used heavily for Terraform state locking.
      </p>

      <h3 style={{ fontWeight: 600 }}>DynamoDB Example</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_dynamodb_table" "users" {
  name         = "lesson9-users"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "UserID"

  attribute {
    name = "UserID"
    type = "S"
  }

  tags = {
    app = "lesson9"
  }
}`}
      </pre>

      <p>DynamoDB tables require at least one primary key attribute.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. RDS – Relational Database Service (MySQL/Postgres)</h2>

      <p>
        RDS is used for MySQL, Postgres, MariaDB, MSSQL, and Oracle. Terraform makes
        it easy to create production-ready database clusters.
      </p>

      <h3 style={{ fontWeight: 600 }}>RDS Subnet Group (required for VPC)</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_db_subnet_group" "db_subnets" {
  name       = "lesson9-db-subnet-group"
  subnet_ids = ["subnet-12345", "subnet-67890"]

  tags = {
    Name = "lesson9-db"
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>RDS Database Example</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_db_instance" "app_db" {
  identifier           = "lesson9-db"
  engine               = "mysql"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  db_name              = "appdb"
  username             = "admin"
  password             = "Password123!"
  skip_final_snapshot  = true

  db_subnet_group_name = aws_db_subnet_group.db_subnets.name

  publicly_accessible = false

  backup_retention_period = 7

  tags = {
    env = terraform.workspace
  }
}`}
      </pre>

      <p>Always use private subnets for production RDS instances.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>4. Outputs for RDS</h2>

      <p>Outputs help you fetch DB endpoint and port after apply.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`output "db_endpoint" {
  value = aws_db_instance.app_db.endpoint
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. Real-World Architecture</h2>

      <ul>
        <li>S3 → static files / backups</li>
        <li>DynamoDB → caching / lock table / NoSQL</li>
        <li>RDS → application database</li>
        <li>RDS Subnet Group → mandatory for VPC</li>
        <li>Private subnets → DB layer</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>6. Hands-On Exercise</h2>

      <ul>
        <li>Create S3 bucket with versioning</li>
        <li>Create a DynamoDB table for users</li>
        <li>Create RDS MySQL database in 2 subnets</li>
        <li>Output DB endpoint and bucket name</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>7. Common Errors</h2>

      <ul>
        <li><b>InvalidSubnetGroup</b> → subnet group not linked</li>
        <li><b>Password policy error</b> → use valid DB password</li>
        <li><b>DynamoDB hash key missing</b> → must define attribute</li>
        <li><b>Insufficient permissions</b> → missing IAM rights</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 10 → IAM, Roles, Policies & Security Best Practices</b>
      </p>
    </div>
  );
}
