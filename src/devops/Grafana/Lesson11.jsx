import React from "react";

export default function Lesson11() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>
        Lesson 11 – Kubernetes & EKS: Cluster, Node Groups & IRSA
      </h1>

      <p>
        In this lesson, you will learn how to deploy a production-ready EKS
        (Elastic Kubernetes Service) cluster using Terraform. EKS is one of the most
        important services in modern DevOps and cloud-native deployments.
        You will also learn IRSA (IAM Roles for Service Accounts), node groups,
        and the Kubernetes provider usage in Terraform.
      </p>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>What You Will Learn</h2>
      <ul>
        <li>What Kubernetes is and how EKS works</li>
        <li>EKS cluster creation using Terraform</li>
        <li>Managed Node Groups (EC2 Worker Nodes)</li>
        <li>IRSA (IAM Roles for Service Accounts)</li>
        <li>Connecting Terraform to the EKS cluster</li>
        <li>Deploying Kubernetes resources using Terraform</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>1. What is Kubernetes?</h2>

      <p>
        Kubernetes is a container orchestration platform. It manages deployments,
        scaling, networking, and self-healing of applications.
      </p>

      <ul>
        <li><b>Pods</b> → smallest deployable unit</li>
        <li><b>Deployments</b> → manage pod replicas</li>
        <li><b>Services</b> → networking for pods</li>
        <li><b>Ingress</b> → external access</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>2. Why EKS?</h2>

      <ul>
        <li>Fully managed Kubernetes control plane</li>
        <li>Scalable and secure worker nodes</li>
        <li>Integrates with IAM, VPC, CloudWatch, ALB</li>
        <li>Production-ready</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>3. EKS Cluster Creation (Terraform)</h2>

      <p>Install EKS using aws_eks_cluster resource.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_eks_cluster" "lesson11" {
  name     = "lesson11-eks"
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = ["subnet-12345", "subnet-67890"]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_AmazonEKSClusterPolicy,
  ]
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>4. Node Groups (Worker Nodes)</h2>

      <p>
        Node Groups are EC2 instances that run your containers inside Kubernetes.
      </p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_eks_node_group" "lesson11_nodes" {
  cluster_name    = aws_eks_cluster.lesson11.name
  node_group_name = "lesson11-nodegroup"
  node_role_arn   = aws_iam_role.eks_nodes.arn
  subnet_ids      = ["subnet-12345", "subnet-67890"]

  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }

  instance_types = ["t3.medium"]
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>5. IAM Roles for EKS</h2>

      <p>EKS requires IAM roles for both cluster and nodes.</p>

      <h3 style={{ fontWeight: 600 }}>Cluster Role:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_iam_role" "eks_role" {
  name = "lesson11-eks-role"

  assume_role_policy = data.aws_iam_policy_document.eks_assume_role.json
}`}
      </pre>

      <h3 style={{ fontWeight: 600 }}>Node Group Role:</h3>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`resource "aws_iam_role" "eks_nodes" {
  name = "lesson11-node-role"

  assume_role_policy = data.aws_iam_policy_document.nodes_assume_role.json
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>6. IRSA (IAM Roles for Service Accounts)</h2>

      <p>
        IRSA allows Kubernetes pods to assume IAM roles without storing AWS
        credentials inside containers.
      </p>

      <h3 style={{ fontWeight: 600 }}>Steps:</h3>
      <ul>
        <li>Create OIDC provider</li>
        <li>Create IAM role for service account</li>
        <li>Attach policy to role</li>
        <li>Link role to Kubernetes service account</li>
      </ul>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "aws_iam_openid_connect_provider" "eks_oidc" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["9e99a48a9960b14926bb7f3b02e22da0afd0cb0a"]
  url             = aws_eks_cluster.lesson11.identity[0].oidc[0].issuer
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>7. Connecting Terraform to EKS</h2>

      <p>Use Kubernetes provider (after cluster is created).</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0af",
        }}
      >
{`provider "kubernetes" {
  host                   = aws_eks_cluster.lesson11.endpoint
  cluster_ca_certificate = base64decode(aws_eks_cluster.lesson11.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.lesson11.token
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>8. Deploy a Kubernetes App using Terraform</h2>

      <p>Example: Deploy nginx using the Kubernetes provider.</p>

      <pre
        style={{
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
          color: "#0f0",
        }}
      >
{`resource "kubernetes_deployment" "nginx" {
  metadata {
    name = "lesson11-nginx"
  }

  spec {
    replicas = 2

    selector {
      match_labels = { app = "nginx" }
    }

    template {
      metadata {
        labels = { app = "nginx" }
      }

      spec {
        container {
          image = "nginx"
          name  = "nginx"
        }
      }
    }
  }
}`}
      </pre>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>9. Hands-On Exercise</h2>

      <ul>
        <li>Create an EKS cluster using Terraform</li>
        <li>Deploy a node group with 2 nodes</li>
        <li>Enable IRSA for the cluster</li>
        <li>Deploy an nginx pod using Kubernetes provider</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>10. Common Errors</h2>

      <ul>
        <li><b>AccessDenied</b> → wrong IAM role or missing policy</li>
        <li><b>Nodegroup creation failed</b> → subnet mismatch</li>
        <li><b>OIDC not found</b> → cluster must be created first</li>
        <li><b>Kubernetes provider cannot connect</b> → missing kubeconfig token</li>
      </ul>

      <h2 style={{ marginTop: "20px", fontWeight: 600 }}>Next Lesson</h2>
      <p>
        <b>Lesson 12 → Azure Provider Deep Dive</b>
      </p>
    </div>
  );
}
