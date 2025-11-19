import React from "react";

export default function Lesson5() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 5 – Provisioners, Null Resources & External Data
      </h1>

      <p>
        Provisioners allow Terraform to execute scripts or commands on local or
        remote machines. Although not recommended for routine tasks, they are
        useful in specific cases. In this lesson, you will also learn
        <b> null_resource </b> and the <b>external data</b> provider which allow
        dynamic and script-based data handling.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>What provisioners are and when to use them</li>
        <li>local-exec and remote-exec provisioners</li>
        <li>null_resource and its usage</li>
        <li>Triggers for running provisioners</li>
        <li>External data provider (fetch data from scripts)</li>
        <li>Best practices & anti-patterns</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. What Are Provisioners?</h2>
      <p>
        Provisioners allow Terraform to run commands on the local machine or a
        remote server. They are often used for:
      </p>

      <ul>
        <li>Running small scripts after infrastructure creation</li>
        <li>Bootstrapping servers</li>
        <li>Collecting data or updating configs</li>
      </ul>

      <p><b>Important:</b> Provisioners are NOT recommended for routine work.</p>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Provisioner Types</h3>
      <ul>
        <li>local-exec</li>
        <li>remote-exec</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. local-exec Example</h2>

      <p>Executes a command locally on your machine.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "null_resource" "local_test" {
  provisioner "local-exec" {
    command = "echo Terraform local-exec ran!"
  }
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. remote-exec Example</h2>

      <p>Runs commands on a remote server using SSH.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_instance" "demo" {
  ami           = "ami-0c94855ba95c71c99"
  instance_type = "t2.micro"

  provisioner "remote-exec" {
    inline = [
      "sudo apt update -y",
      "sudo apt install nginx -y"
    ]
  }

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file("~/.ssh/id_rsa")
    host        = self.public_ip
  }
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>4. What is null_resource?</h2>

      <p>
        <b>null_resource</b> allows running provisioners without creating any cloud
        resource. It is extremely useful for triggers.
      </p>

      <h3 style={{ fontWeight: 600 }}>Trigger Example</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "null_resource" "trigger_example" {
  triggers = {
    timestamp = timestamp()
  }

  provisioner "local-exec" {
    command = "echo Trigger fired!"
  }
}`}
      </pre>

      <p>
        Whenever the trigger value changes, the <b>null_resource</b> runs again.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. External Data Provider</h2>

      <p>
        Use this when you want Terraform to fetch data from an external script
        (Python, Bash, Node.js etc.).
      </p>

      <h3 style={{ fontWeight: 600 }}>external data example:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`data "external" "example" {
  program = ["python3", "${path.module}/script.py"]
}

output "external_output" {
  value = data.external.example.result
}`}
      </pre>

      <p><b>script.py</b> must print valid JSON as output.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        6. When NOT to Use Provisioners (Anti-Patterns)
      </h2>

      <ul>
        <li>Not for configuration management (use Ansible instead)</li>
        <li>Not for large startup scripts</li>
        <li>Not for installing full software packages</li>
        <li>Not for complex automation</li>
      </ul>

      <p>
        Provisioners should be used only when unavoidable (ex: running a script,
        generating a file, or triggering a local command).
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>
        7. Hands-On Exercise
      </h2>

      <ul>
        <li>Create a null_resource</li>
        <li>Add a trigger using timestamp()</li>
        <li>Use local-exec to print a message</li>
        <li>Run terraform apply → Change trigger → Apply again</li>
        <li>Observe null_resource re-run</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Common Errors</h2>
      <ul>
        <li><b>Connection timeout</b> → Wrong SSH key or security group</li>
        <li><b>Command failure</b> → Failing script/command</li>
        <li><b>Missing dependencies</b> → Python/Node not installed</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 6 → Terraform Templating, Functions & Dynamic Blocks</b>
      </p>
    </div>
  );
}
