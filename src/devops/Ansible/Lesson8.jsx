import React from "react";

export default function Lesson8() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 8 – AWS Compute: EC2, Launch Templates & Auto Scaling Groups (ASG)
      </h1>

      <p>
        In this lesson, we focus on AWS Compute services using Terraform. You will
        learn how to create EC2 instances, configure Launch Templates, and set up
        Auto Scaling Groups for scalable applications. This is one of the most
        important topics in real DevOps and production deployments.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>Launching EC2 instances with Terraform</li>
        <li>Launch Templates (LT) for reusable server configs</li>
        <li>Auto Scaling Group (ASG) for scaling up/down automatically</li>
        <li>User-data (cloud-init) for bootstrapping instances</li>
        <li>Load balancing concept with ASG</li>
        <li>Real-world production patterns</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. EC2 Basics</h2>

      <p>An EC2 instance is a virtual server running on AWS. To create one:</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_instance" "web" {
  ami           = "ami-0c94855ba95c71c99"
  instance_type = "t2.micro"

  tags = {
    Name = "lesson8-ec2"
  }
}`}
      </pre>

      <p>
        This simple EC2 instance will be the foundation for our ASG and Launch
        Template setup.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. User Data (Cloud-Init)</h2>

      <p>User-data is a script that runs at EC2 boot time.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`user_data = <<EOF
#!/bin/bash
sudo apt update -y
sudo apt install nginx -y
echo "<h1>Hello from Lesson 8</h1>" > /var/www/html/index.html
EOF`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. Launch Templates</h2>

      <p>
        Launch Templates (LT) allow you to define EC2 configurations once and reuse
        them inside ASGs.
      </p>

      <h3 style={{ fontWeight: 600 }}>Launch Template Example</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_launch_template" "web_lt" {
  name_prefix   = "lesson8-lt-"
  image_id      = "ami-0c94855ba95c71c99"
  instance_type = "t2.micro"

  user_data = base64encode(<<EOF
#!/bin/bash
sudo apt update -y
sudo apt install nginx -y
EOF
  )

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "lesson8-instance"
    }
  }
}`}
      </pre>

      <p>
        Launch Templates make it easy to update instance configuration without
        rewriting ASG logic.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>4. Auto Scaling Group (ASG)</h2>

      <p>
        Auto Scaling Groups manage a group of EC2 instances and automatically scale
        them based on load.
      </p>

      <h3 style={{ fontWeight: 600 }}>ASG Example</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_autoscaling_group" "web_asg" {
  desired_capacity = 2
  max_size         = 3
  min_size         = 1
  vpc_zone_identifier = ["subnet-12345", "subnet-67890"]

  launch_template {
    id      = aws_launch_template.web_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "lesson8-asg"
    propagate_at_launch = true
  }
}`}
      </pre>

      <p>
        When you increase CPU load or manually change desired capacity, EC2
        instances automatically scale.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. ASG + Load Balancer (Concept)</h2>

      <p>Auto Scaling Groups are usually connected to a load balancer:</p>
      <ul>
        <li>Application Load Balancer (ALB)</li>
        <li>Network Load Balancer (NLB)</li>
      </ul>

      <p>
        ALB distributes traffic and automatically attaches/detaches EC2 instances
        as ASG scales.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>6. Real-World Architecture</h2>

      <ul>
        <li>ALB (public subnet)</li>
        <li>ASG → multiple EC2 instances (private subnet)</li>
        <li>Launch Template for configuration</li>
        <li>Target groups for health checks</li>
        <li>Scaling based on CPU or requests</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>7. Hands-On Exercise</h2>

      <ul>
        <li>Create a Launch Template with nginx installation</li>
        <li>Create an Auto Scaling Group with min=1, max=3, desired=1</li>
        <li>Use user-data to print custom HTML</li>
        <li>Add tags to instances using LT</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Common Errors</h2>

      <ul>
        <li><b>Subnet mismatch</b> → ASG requires private subnets usually</li>
        <li><b>Launch template not found</b> → Wrong version or missing LT resource</li>
        <li><b>User-data not executed</b> → Missing base64encode</li>
        <li><b>Scaling stuck</b> → Health check failures</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 9 → AWS Storage & Databases: S3, RDS, DynamoDB</b>
      </p>
    </div>
  );
}
