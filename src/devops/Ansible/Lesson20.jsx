import React from "react";

export default function Lesson20() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>

      <h1 style={{ fontSize: "32px", fontWeight: 700 }}>
        Lesson 20 – Terraform Interview Preparation (Set 2: Advanced + Cloud Scenarios)
      </h1>

      <p>
        This lesson contains advanced Terraform interview questions, real architecture scenarios,
        troubleshooting, multi-cloud situations, and behaviour-based questions that top companies ask.
      </p>

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Section 1 — Advanced Terraform Questions
      </h2>

      <h3 style={{ fontWeight: 600 }}>1. What is Terraform Dependency Graph?</h3>
      <p>
        Terraform creates a DAG (Directed Acyclic Graph) to determine the correct
        order for creating and destroying resources based on dependencies.
      </p>

      <h3 style={{ fontWeight: 600 }}>2. How to force a resource to be created before another?</h3>
      <ul>
        <li>Use <b>depends_on</b></li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>3. What is terraform taint?</h3>
      <p>
        terraform taint marks a resource for recreation during the next apply.
        In Terraform v1+, manual tainting is rare but still useful.
      </p>

      <h3 style={{ fontWeight: 600 }}>4. What is terraform import?</h3>
      <p>
        terraform import brings existing cloud resources under Terraform control.
      </p>

      <h3 style={{ fontWeight: 600 }}>5. What is the difference between local-exec and remote-exec?</h3>
      <ul>
        <li><b>local-exec</b> → runs commands on your machine running Terraform</li>
        <li><b>remote-exec</b> → runs commands on the remote VM created</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>6. Explain lifecycle meta-arguments.</h3>
      <ul>
        <li><b>create_before_destroy</b></li>
        <li><b>prevent_destroy</b></li>
        <li><b>ignore_changes</b></li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>7. What is the difference between count and for_each?</h3>
      <ul>
        <li><b>count</b> → index-based</li>
        <li><b>for_each</b> → key-value based, predictable ordering</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>8. How to run Terraform in Automation (CI/CD)?</h3>
      <ul>
        <li>GitHub Actions</li>
        <li>GitLab CI</li>
        <li>Terraform Cloud</li>
        <li>Jenkins</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>9. Why use Terragrunt?</h3>
      <ul>
        <li>Multi-environment hierarchy</li>
        <li>Automatic remote state configuration</li>
        <li>DRY for large organizations</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>10. How do you prevent secret leakage in Terraform?</h3>
      <ul>
        <li>Use SSM/Secrets Manager/Key Vault/Secret Manager</li>
        <li>Use sensitive variables</li>
        <li>Never commit .tfvars</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "25px" }}>
        Section 2 — Cloud Scenario Questions (AWS, Azure, GCP)
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        11. Scenario: You deployed an EC2 instance using Terraform. Someone terminated it manually. What happens?
      </h3>
      <p>
        terraform plan will detect the resource missing and recreate the instance.
      </p>

      <h3 style={{ fontWeight: 600 }}>
        12. Scenario: Your ALB keeps recreating every terraform apply. Why?
      </h3>
      <ul>
        <li>Tags mismatch</li>
        <li>Listener config changed</li>
        <li>Security group dynamic changes</li>
        <li>Using random_id without stable values</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        13. Scenario: AKS cluster created via Terraform but you cannot connect using kubectl.
      </h3>
      <ul>
        <li>You did not run <b>az aks get-credentials</b></li>
        <li>Kubeconfig provider not configured</li>
        <li>Network/firewall issue</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        14. Scenario: GCP Cloud Run fails with “Unauthenticated request”.
      </h3>
      <ul>
        <li>You need to run <b>gcloud run services add-iam-policy-binding</b> OR</li>
        <li>Set <b>allow_unauthenticated</b></li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        15. Scenario: You want multi-region EKS with cross-region ALB failover. Can Terraform do it?
      </h3>
      <p>Yes. Use Route53 health checks + weighted failover + ALB modules per region.</p>

      <h3 style={{ fontWeight: 600 }}>
        16. Scenario: RDS password should not appear in logs or state. How to fix?
      </h3>
      <ul>
        <li>Use <b>sensitive = true</b></li>
        <li>Store in SSM/Secrets Manager and read with data source</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        17. Scenario: You have 50 microservices. How do you manage Terraform structure?
      </h3>
      <ul>
        <li>Use modules</li>
        <li>Use Terragrunt for multi-environment orchestration</li>
        <li>Separate repos or monorepo with modular structure</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        18. Scenario: You want to share Terraform modules with your team securely.
      </h3>
      <p>Use Terraform Cloud Private Module Registry.</p>

      <h3 style={{ fontWeight: 600 }}>
        19. Scenario: You want to run terraform apply only after PR merge.
      </h3>
      <p>CI rule: plan on PR → apply on main.</p>

      <h3 style={{ fontWeight: 600 }}>
        20. Scenario: You need to rollback Terraform changes. How?
      </h3>
      <ul>
        <li>Use git revert on configuration</li>
        <li>Re-run terraform apply</li>
        <li>Use versioned remote state backups</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "25px" }}>
        Section 3 — Architecture-Based Interview Questions
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        21. How do you structure Terraform for a large enterprise?
      </h3>
      <ul>
        <li>Root module + child modules</li>
        <li>One folder per environment</li>
        <li>Backend per workspace/environment</li>
        <li>Use Terragrunt for DRY config</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        22. How do you design Terraform for multi-cloud architecture?
      </h3>
      <ul>
        <li>Separate provider blocks</li>
        <li>Use different state backends</li>
        <li>Combine modules in orchestration layer</li>
        <li>Avoid hard-coded cloud resources</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        23. How do you handle secrets in Terraform across clouds?
      </h3>
      <ul>
        <li>AWS Secrets Manager</li>
        <li>Azure Key Vault</li>
        <li>GCP Secret Manager</li>
        <li>Vault (HashiCorp)</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        24. How do you integrate Terraform with Kubernetes?
      </h3>
      <ul>
        <li>Use Kubernetes provider</li>
        <li>Use helm provider</li>
        <li>Deploy manifests + helm charts</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        25. How do you implement cross-region DR in Terraform?
      </h3>
      <ul>
        <li>Create replication at DB/storage layer</li>
        <li>Use Route53/Front Door/GCP LB failover</li>
        <li>Create snapshot jobs + promotion scripts</li>
        <li>Use multi-region modules</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "25px" }}>
        Section 4 — Behaviour & Experience Questions
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        26. Tell me about a time Terraform deployment went wrong.
      </h3>
      <p>Talk about drift, bad variable, missing depends_on, or wrong region.</p>

      <h3 style={{ fontWeight: 600 }}>
        27. What is the largest Terraform module you built?
      </h3>
      <p>Explain VPC module, EKS module, or a multi-cloud module.</p>

      <h3 style={{ fontWeight: 600 }}>
        28. How do you debug Terraform errors?
      </h3>
      <ul>
        <li>Check plan carefully</li>
        <li>Use -refresh-only</li>
        <li>terraform graph</li>
        <li>terraform console</li>
        <li>enable TF_LOG</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        29. How do you convince a team to adopt Terraform?
      </h3>
      <ul>
        <li>Consistency</li>
        <li>Version control</li>
        <li>Automation</li>
        <li>Zero manual work</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        30. What are common mistakes with Terraform?
      </h3>
      <ul>
        <li>Hardcoding regions or credentials</li>
        <li>Not using remote state</li>
        <li>No separation for envs</li>
        <li>Using count incorrectly leading to resource recreation</li>
        <li>Not reading plan output thoroughly</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "30px" }}>
        Next Lesson
      </h2>

      <p>
        <b>Lesson 21 → DevOps Cloud Scenarios (High-Level + Whiteboard Questions)</b>
      </p>
    </div>
  );
}
