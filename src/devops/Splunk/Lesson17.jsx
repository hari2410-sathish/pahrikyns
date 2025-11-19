import React from "react";

export default function Lesson17() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700 }}>
        Lesson 17 — Real Project 2: Multi-Cloud Microservice Deployment (Azure + GCP)
      </h1>

      <p>
        In this project, you will build a modern microservice application 
        deployed across two clouds: Azure (AKS) and GCP (Cloud Run + Cloud SQL). 
        Terraform orchestrates everything using separate providers, 
        remote state, workspaces, and cross-cloud secrets.
      </p>

      <hr style={{ margin: "20px 0" }} />

      {/* Session A */}
      <h2 style={{ fontWeight: 700 }}>Session A — Architecture & Design (45 minutes)</h2>

      <h3 style={{ fontWeight: 600 }}>Goal of the Project</h3>
      <p>
        Create a microservice-based app where:
      </p>

      <ul>
        <li>Frontend runs on Azure (AKS)</li>
        <li>Backend service runs on GCP (Cloud Run)</li>
        <li>Database runs on GCP (Cloud SQL — MySQL/Postgres)</li>
        <li>Static assets in Azure Storage</li>
        <li>Secrets stored in Azure Key Vault or GCP Secret Manager</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Architecture Diagram (text)</h3>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
{`Client (Browser)
   |
   v
Azure AKS (Frontend UI)
   |
   v (HTTPS)
GCP Cloud Run (Backend API)
   |
   v
Cloud SQL (Database)
   |
   v
Azure Storage (Static files)
`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Terraform Providers</h3>
      <ul>
        <li>provider "azurerm" {`{}`}</li>
        <li>provider "google" {`{}`}</li>
        <li>provider "kubernetes" (to deploy manifests to AKS)</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Module Breakdown</h3>
      <ul>
        <li><b>modules/azure_network</b> — Resource group + VNet + subnets</li>
        <li><b>modules/aks</b> — AKS cluster + node pool + kubeconfig outputs</li>
        <li><b>modules/azure_storage</b> — blob storage for assets</li>
        <li><b>modules/gcp_network</b> — VPC + subnets</li>
        <li><b>modules/cloud_run</b> — backend microservice deployment</li>
        <li><b>modules/cloud_sql</b> — managed MySQL/Postgres</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Workspaces Design</h3>
      <p>We use:</p>
      <ul>
        <li>dev</li>
        <li>stage</li>
        <li>prod</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Remote State Strategy</h3>
      <ul>
        <li>Use Azure Storage for Azure state</li>
        <li>Use GCS (bucket) for GCP state</li>
        <li>Or use Terraform Cloud workspace to unify both</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Secrets Strategy</h3>
      <ul>
        <li>Azure Key Vault → AKS frontend</li>
        <li>GCP Secret Manager → Cloud Run backend</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Instructor Flow (Session A)</h3>
      <ol>
        <li>Explain multi-cloud architecture</li>
        <li>Show provider blocks and variable structure</li>
        <li>Explain module boundaries</li>
        <li>Discuss networking & identity differences</li>
      </ol>

      <hr style={{ margin: "20px 0" }} />

      {/* Session B */}
      <h2 style={{ fontWeight: 700 }}>Session B — Implementation (45 minutes)</h2>

      <h3 style={{ fontWeight: 600 }}>1. Providers Setup</h3>

      <pre
        style={{
          background: "#111",
          color: "#0af",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
{`provider "azurerm" {
  features {}
}

provider "google" {
  project     = var.gcp_project
  region      = var.gcp_region
  credentials = file("gcp-sa.json")
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>2. Azure AKS Module Example</h3>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
{`resource "azurerm_kubernetes_cluster" "aks" {
  name                = "project-aks"
  location            = var.location
  resource_group_name = var.resource_group
  dns_prefix          = "app"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_B2ms"
  }

  identity {
    type = "SystemAssigned"
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>3. GCP Cloud Run Backend</h3>

      <pre
        style={{
          background: "#111",
          color: "#0af",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
{`resource "google_cloud_run_service" "backend" {
  name     = "backend-api"
  location = var.gcp_region

  template {
    spec {
      containers {
        image = var.backend_image
        env {
          name  = "DB_CONN"
          value = var.cloudsql_connection
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>4. Cloud SQL Example</h3>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
{`resource "google_sql_database_instance" "db" {
  name             = "project-db"
  database_version = "POSTGRES_14"
  region           = var.gcp_region

  settings {
    tier = "db-f1-micro"
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>5. Wiring Frontend → Backend</h3>
      <ul>
        <li>Output Cloud Run URL</li>
        <li>Inject into AKS Deployment manifest</li>
        <li>Apply using Kubernetes provider</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>Kubernetes Deployment Example</h3>

      <pre
        style={{
          background: "#111",
          color: "#0af",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
{`resource "kubernetes_deployment" "frontend" {
  metadata {
    name = "frontend"
  }

  spec {
    replicas = 2

    selector {
      match_labels = { app = "frontend" }
    }

    template {
      metadata {
        labels = { app = "frontend" }
      }
      spec {
        container {
          name  = "frontend"
          image = var.frontend_image
          env {
            name  = "BACKEND_URL"
            value = var.backend_url
          }
        }
      }
    }
  }
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>6. CI/CD Overview</h3>
      <ul>
        <li>GitHub Actions triggers Terraform plan on PR</li>
        <li>Production uses manual approval</li>
        <li>Build Docker → Push to ACR/GCR → Deploy via Terraform</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>7. Hands-On Exercise</h3>
      <ul>
        <li>Create Azure Resource Group + AKS</li>
        <li>Create GCP VPC + Cloud Run service</li>
        <li>Create Cloud SQL instance + DB</li>
        <li>Expose Cloud Run API publicly</li>
        <li>Deploy AKS frontend that consumes Cloud Run backend</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>8. Common Problems</h3>
      <ul>
        <li>GCP service account not having IAM roles → add editor, SQL Admin</li>
        <li>AKS kubeconfig not working → run `az aks get-credentials`</li>
        <li>Cloud Run needs `allow-unauthenticated` unless using IAM</li>
        <li>Network egress blocked from AKS → add outbound rule</li>
      </ul>

      <h2 style={{ marginTop: "30px", fontWeight: 700 }}>Next Lesson</h2>
      <p>
        <b>Real Project 3 → Global Multi-Region Deployment (AWS + Azure + GCP)</b>
      </p>
    </div>
  );
}
