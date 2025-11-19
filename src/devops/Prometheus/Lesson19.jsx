import React from "react";

export default function Lesson19() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>

      <h1 style={{ fontSize: "32px", fontWeight: 700 }}>
        Lesson 19 – Terraform Interview Preparation (Set 1: Core Concepts + Scenarios)
      </h1>

      <p>
        This lesson covers the MOST commonly asked Terraform interview questions, 
        including deep explanations and short scenario questions. 
        These questions help you crack Associate + Professional-level interviews.
      </p>

      <h2 style={{ fontWeight: 700, marginTop: "20px" }}>
        Section 1 — Basic & Core Terraform Questions
      </h2>

      <h3 style={{ fontWeight: 600 }}>1. What is Terraform?</h3>
      <p>
        Terraform is an Infrastructure as Code (IaC) tool used to provision cloud 
        and on-prem resources using declarative configuration files.
      </p>

      <h3 style={{ fontWeight: 600 }}>2. What is the difference: Terraform vs Ansible?</h3>
      <ul>
        <li><b>Terraform</b> → IaC, provisioning tool (create infra)</li>
        <li><b>Ansible</b> → configuration management (configure servers)</li>
        <li>Terraform = desired state. Ansible = procedural tasks.</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>3. What is Desired State?</h3>
      <p>
        Terraform checks the current infrastructure state and ensures the deployed 
        environment matches the configuration in code. If something changes manually,
        Terraform will detect & fix in the next apply.
      </p>

      <h3 style={{ fontWeight: 600 }}>4. What is a Provider?</h3>
      <p>
        A provider is a plugin that allows Terraform to communicate with cloud services 
        like AWS, Azure, GCP, Kubernetes, GitHub, etc.
      </p>

      <h3 style={{ fontWeight: 600 }}>5. What is a Resource?</h3>
      <p>
        A resource represents infrastructure like EC2, S3 bucket, VPC, AKS cluster, etc.
      </p>

      <h3 style={{ fontWeight: 600 }}>6. What is a Data Source?</h3>
      <p>
        Data sources fetch existing cloud resources for use in Terraform without creating new ones.
      </p>

      <h3 style={{ fontWeight: 600 }}>7. What is terraform plan?</h3>
      <p>
        terraform plan shows what changes Terraform will make before applying.
      </p>

      <h3 style={{ fontWeight: 600 }}>8. What is terraform apply?</h3>
      <p>Applies changes and updates real infrastructure to match the code.</p>

      <h3 style={{ fontWeight: 600 }}>9. What is terraform destroy?</h3>
      <p>Deletes all resources created by the current Terraform code.</p>

      <h3 style={{ fontWeight: 600 }}>10. What is terraform init?</h3>
      <p>
        Initializes the configuration, downloads provider plugins, sets backends, and prepares the environment.
      </p>

      <h2 style={{ fontWeight: 700, marginTop: "25px" }}>
        Section 2 — State File Interview Questions
      </h2>

      <h3 style={{ fontWeight: 600 }}>11. What is terraform.tfstate?</h3>
      <p>
        Terraform state file stores the mapping between your code and real resources.
        Terraform uses this file to track changes.
      </p>

      <h3 style={{ fontWeight: 600 }}>12. Why is state file required?</h3>
      <ul>
        <li>Tracks resource IDs</li>
        <li>Allows incremental changes instead of full recreation</li>
        <li>Enables detect drift (manual changes)</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>13. What happens if state file is deleted?</h3>
      <p>
        Terraform loses track of existing infrastructure. A new plan will try to 
        recreate everything (dangerous). Always store state in remote backend.
      </p>

      <h3 style={{ fontWeight: 600 }}>14. What is Remote State?</h3>
      <p>S3 / Azure Blob / GCS / Terraform Cloud — centralized, safe & team-friendly.</p>

      <h3 style={{ fontWeight: 600 }}>15. What is State Locking?</h3>
      <p>Prevents two people from running apply at the same time. Done via DynamoDB, GCS locks, etc.</p>

      <h2 style={{ fontWeight: 700, marginTop: "25px" }}>
        Section 3 — Terraform Variables & Modules
      </h2>

      <h3 style={{ fontWeight: 600 }}>16. What types of variables exist?</h3>
      <ul>
        <li>string</li>
        <li>number</li>
        <li>bool</li>
        <li>list</li>
        <li>map</li>
        <li>object</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>17. What is a Module?</h3>
      <p>
        A module is a folder containing Terraform code, making the code reusable and maintainable.
      </p>

      <h3 style={{ fontWeight: 600 }}>18. Why use Modules?</h3>
      <ul>
        <li>Code reuse</li>
        <li>Cleaner structure</li>
        <li>Easier testing</li>
        <li>Scalable architecture</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>19. What is terraform workspace?</h3>
      <p>
        Workspaces allow multiple environments like dev, stage, and prod using the same code.
      </p>

      <h3 style={{ fontWeight: 600 }}>20. What is output?</h3>
      <p>Outputs expose key information such as ALB DNS, DB endpoint, etc.</p>

      <h2 style={{ fontWeight: 700, marginTop: "25px" }}>
        Section 4 — Scenario-Based Interview Questions
      </h2>

      <h3 style={{ fontWeight: 600 }}>
        21. Scenario: You changed a variable but terraform plan shows no changes. Why?
      </h3>
      <ul>
        <li>Variable not used in resource</li>
        <li>Value overridden by .tfvars or workspace</li>
        <li>Default value overriding input</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        22. Scenario: Someone manually changed a resource on AWS. What happens?
      </h3>
      <p>
        Terraform will detect drift and attempt to overwrite manual changes to maintain desired state.
      </p>

      <h3 style={{ fontWeight: 600 }}>
        23. Scenario: You apply code and AWS says "resource already exists".
      </h3>
      <ul>
        <li>You did not import the resource into state</li>
        <li>Use: <b>terraform import</b></li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        24. Scenario: You want one module to read output from another module. How?
      </h3>
      <p>Use module outputs: <b>module.vpc.vpc_id</b></p>

      <h3 style={{ fontWeight: 600 }}>
        25. Scenario: You want to deploy same infrastructure in 3 regions with same code.
      </h3>
      <p>Use count/for_each OR multiple modules with different inputs.</p>

      <h3 style={{ fontWeight: 600 }}>26. Scenario: How to version modules?</h3>
      <p>Use git tags or Terraform Registry module versions.</p>

      <h3 style={{ fontWeight: 600 }}>
        27. Scenario: How to store DB password securely?
      </h3>
      <ul>
        <li>AWS SSM Parameter Store</li>
        <li>AWS Secrets Manager</li>
        <li>Azure Key Vault</li>
        <li>GCP Secret Manager</li>
      </ul>

      <h3 style={{ fontWeight: 600 }}>
        28. Scenario: How to prevent accidental deletion of a resource?
      </h3>
      <p>Use <b>lifecycle {`{ prevent_destroy = true }`}</b></p>

      <h3 style={{ fontWeight: 600 }}>
        29. Scenario: How to ignore manual changes to a resource?
      </h3>
      <p>Use <b>lifecycle {`{ ignore_changes = [...] }`}</b></p>

      <h3 style={{ fontWeight: 600 }}>
        30. Scenario: How to manage multi-environment deployments?
      </h3>
      <ul>
        <li>Workspaces</li>
        <li>Separate env folders (dev/stage/prod)</li>
        <li>Terragrunt (for large orgs)</li>
        <li>Terraform Cloud</li>
      </ul>

      <h2 style={{ fontWeight: 700, marginTop: "25px" }}>
        Next Lesson
      </h2>
      <p>
        <b>Lesson 20 → Terraform Interview Questions Set 2 (Advanced Topics + Cloud Scenarios)</b>
      </p>
    </div>
  );
}
