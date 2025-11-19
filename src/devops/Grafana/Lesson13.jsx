import React from "react";

export default function Lesson13() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 13 – Google Cloud Provider Deep Dive (GCP Compute, VPC, IAM & Cloud SQL)
      </h1>

      <p>
        In this lesson, you will learn how to use the Google Cloud provider in Terraform.
        We will create a VPC, subnets, a Compute Engine VM, a service account,
        and a Cloud SQL database. This helps you build multi-cloud Terraform
        capability across AWS, Azure, and now GCP.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>GCP provider authentication (Service Account key)</li>
        <li>Creating VPC & subnets</li>
        <li>Compute Engine VM creation</li>
        <li>IAM service accounts</li>
        <li>Cloud SQL (MySQL/Postgres) basics</li>
        <li>Using outputs for connection details</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. GCP Provider Setup</h2>

      <p>Terraform connects to GCP using a Service Account JSON key file.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`provider "google" {
  project = var.project_id
  region  = var.region
  credentials = file("account-key.json")
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Service Account Sample Command</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`gcloud iam service-accounts create terraform-sa`}
      </pre>

      <p>Download key:</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`gcloud iam service-accounts keys create account-key.json \
  --iam-account terraform-sa@YOUR_PROJECT.iam.gserviceaccount.com`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. VPC Network & Subnets</h2>

      <p>GCP VPCs are global, and subnets are regional.</p>

      <h3 style={{ fontWeight: 600 }}>VPC Example:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "google_compute_network" "lesson13_vpc" {
  name                    = "lesson13-vpc"
  auto_create_subnetworks = false
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Subnet Example:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "google_compute_subnetwork" "lesson13_subnet" {
  name          = "lesson13-subnet"
  ip_cidr_range = "10.10.0.0/24"
  network       = google_compute_network.lesson13_vpc.id
  region        = var.region
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. Compute Engine VM</h2>

      <p>GCP’s EC2 equivalent is Google Compute Engine (GCE).</p>

      <h3 style={{ fontWeight: 600 }}>VM Example:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "google_compute_instance" "lesson13_vm" {
  name         = "lesson13-vm"
  machine_type = "e2-medium"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    subnetwork = google_compute_subnetwork.lesson13_subnet.id

    access_config {}
  }

  metadata_startup_script = <<EOF
#!/bin/bash
apt update -y
apt install nginx -y
EOF

  tags = ["lesson13"]
}`}
      </pre>

      <p>The VM will install Nginx on startup using the metadata script.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>4. IAM Service Account</h2>

      <p>Service Accounts allow VMs to access GCP APIs securely.</p>

      <h3 style={{ fontWeight: 600 }}>IAM SA Example:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "google_service_account" "lesson13_sa" {
  account_id   = "lesson13-sa"
  display_name = "Lesson 13 Service Account"
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Assign IAM Role (Storage Viewer Example)</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "google_project_iam_binding" "lesson13_bind" {
  role    = "roles/storage.objectViewer"
  members = [
    "serviceAccount:${google_service_account.lesson13_sa.email}"
  ]
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. Cloud SQL (MySQL/Postgres) Basic Setup</h2>

      <p>Cloud SQL is GCP’s managed relational database service.</p>

      <h3 style={{ fontWeight: 600 }}>Cloud SQL Instance</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "google_sql_database_instance" "lesson13_db" {
  name             = "lesson13-db"
  database_version = "MYSQL_8_0"
  region           = var.region

  settings {
    tier = "db-f1-micro"
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Create a Database</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "google_sql_database" "lesson13_db_main" {
  name     = "appdb"
  instance = google_sql_database_instance.lesson13_db.name
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>6. Outputs</h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`output "vm_ip" {
  value = google_compute_instance.lesson13_vm.network_interface[0].access_config[0].nat_ip
}

output "sql_connection" {
  value = google_sql_database_instance.lesson13_db.connection_name
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>7. Real-World Use Cases</h2>
      <ul>
        <li>Enterprise multi-cloud (AWS + Azure + GCP)</li>
        <li>Hybrid workloads (VM + DB + VPC)</li>
        <li>Cloud SQL for managed MySQL/Postgres</li>
        <li>Service Accounts for secure workloads</li>
        <li>Nginx VM for test environments</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Hands-On Exercise</h2>
      <ul>
        <li>Create a VPC & subnet in GCP</li>
        <li>Create a Compute Engine VM with startup script</li>
        <li>Create a Service Account & attach a role</li>
        <li>Create a Cloud SQL instance</li>
        <li>Output VM Public IP & SQL connection name</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>9. Common Errors</h2>
      <ul>
        <li><b>Permission denied</b> → wrong IAM role for Service Account</li>
        <li><b>Quota exceeded</b> → free tier limits</li>
        <li><b>Invalid region</b> → Cloud SQL not available in all regions</li>
        <li><b>CIDR overlap</b> → wrong VPC IP range</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 14 → Terraform Cloud, Workspaces & Policies</b>
      </p>
    </div>
  );
}
