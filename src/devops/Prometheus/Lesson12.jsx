import React from "react";

export default function Lesson12() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 12 – Azure Provider Deep Dive (Resource Groups, Storage Accounts, AKS Basics)
      </h1>

      <p>
        In this lesson, you will learn how to use the AzureRM provider in Terraform.
        We will create resource groups, storage accounts, and explore basics of AKS
        (Azure Kubernetes Service). This lesson gives you the foundation needed for
        multi-cloud Terraform deployments.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>Azure provider authentication</li>
        <li>Working with Azure Resource Groups</li>
        <li>Creating Azure Storage accounts</li>
        <li>Azure naming rules (important!)</li>
        <li>Basics of AKS cluster creation</li>
        <li>Azure Identity & Service Principal overview</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. AzureRM Provider Setup</h2>

      <p>Use Azure Service Principal credentials to authenticate.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`provider "azurerm" {
  features {}
}`}
      </pre>

      <p>
        AzureRM provider automatically reads environment variables:  
        <b>ARM_SUBSCRIPTION_ID</b>, <b>ARM_CLIENT_ID</b>, <b>ARM_CLIENT_SECRET</b>, <b>ARM_TENANT_ID</b>
      </p>

      <h3 style={{ marginTop: "15px", fontWeight: 600 }}>Azure Login (CLI)</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`az login`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. Resource Groups</h2>

      <p>Every Azure deployment starts with a Resource Group (RG).</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "azurerm_resource_group" "lesson12_rg" {
  name     = "lesson12-resources"
  location = "East US"
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. Storage Accounts</h2>

      <p>Azure Storage accounts store blobs, files, queues, and tables.</p>
      <p><b>Important rule:</b> Storage account name must be globally unique & only lowercase letters + numbers.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "azurerm_storage_account" "lesson12_storage" {
  name                     = "lesson12storage123"
  resource_group_name      = azurerm_resource_group.lesson12_rg.name
  location                 = azurerm_resource_group.lesson12_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}`}
      </pre>

      <p>Use storage accounts for Terraform remote state, logs, or application files.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>4. Azure Identity (Service Principal)</h2>

      <p>Azure uses Service Principals (SP) for Terraform authentication.</p>

      <h3 style={{ fontWeight: 600 }}>Create SP:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`az ad sp create-for-rbac --name terraform-sp --role contributor`}
      </pre>

      <p>Use generated values in environment variables for Terraform.</p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. Basics of AKS (Azure Kubernetes Service)</h2>

      <p>AKS is Azure’s managed Kubernetes platform.</p>

      <h3 style={{ fontWeight: 600 }}>AKS Example (simplified)</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "azurerm_kubernetes_cluster" "lesson12_aks" {
  name                = "lesson12aks"
  location            = azurerm_resource_group.lesson12_rg.location
  resource_group_name = azurerm_resource_group.lesson12_rg.name
  dns_prefix          = "lesson12-k8s"

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

      <p>
        This creates a basic AKS cluster with 2 worker nodes.  
        Great for multi-cloud practice.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>6. Outputs</h2>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`output "resource_group" {
  value = azurerm_resource_group.lesson12_rg.name
}

output "storage_account" {
  value = azurerm_storage_account.lesson12_storage.primary_blob_endpoint
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>7. Real-World Use Cases</h2>

      <ul>
        <li>Store Terraform remote state in Azure Storage</li>
        <li>Create resource groups per environment (dev/stage/prod)</li>
        <li>AKS cluster for container applications</li>
        <li>Blob storage for backups and file storage</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Hands-On Exercise</h2>

      <ul>
        <li>Create a Resource Group</li>
        <li>Create a unique Storage Account</li>
        <li>Enable blob storage public access</li>
        <li>Create a basic AKS cluster</li>
        <li>Output storage endpoint URL</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>9. Common Errors</h2>

      <ul>
        <li><b>Name must be lowercase</b> → Azure does not allow uppercase</li>
        <li><b>Storage account name exists</b> → must be globally unique</li>
        <li><b>Invalid Service Principal</b> → wrong credentials</li>
        <li><b>AKS subnet missing</b> → ensure VNet/subnet created</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 13 → Google Cloud Provider Deep Dive (GCP)</b>
      </p>
    </div>
  );
}
