import CodeBlock from "../../components/CodeBlock";

export default function Lesson1() {
  return (
    <div style={{ lineHeight: "1.7", fontSize: "17px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
        Jenkins Lesson 1 — Introduction to Jenkins
      </h1>

      <p>
        Jenkins is one of the most widely used <b>CI/CD automation servers</b>.
        It helps automate code building, testing, and deployment in software
        development.
      </p>

      <h2>🚀 What is CI/CD?</h2>
      <p>
        <b>CI (Continuous Integration)</b> automatically builds and tests your
        code whenever a developer pushes changes.
      </p>
      <p>
        <b>CD (Continuous Delivery/Deployment)</b> automatically deploys the
        application to servers or cloud once testing is successful.
      </p>

      <ul>
        <li>CI = Build & Test automation</li>
        <li>CD = Packaging & Deployment automation</li>
      </ul>

      <h2>🧩 Why Jenkins?</h2>
      <ul>
        <li>✔ 100% free and open-source</li>
        <li>✔ Supports 1800+ plugins (Git, Docker, Kubernetes, etc.)</li>
        <li>✔ Can automate any build, test, or deployment pipeline</li>
        <li>✔ Supports pipelines-as-code using <b>Jenkinsfile</b></li>
        <li>✔ Works with any programming language</li>
      </ul>

      <h2>🏗 Architecture Overview</h2>
      <p>
        Jenkins follows a <b>Master–Agent</b> architecture (Distributed builds).
      </p>

      <h3>🟦 Master Node</h3>
      <ul>
        <li>Controls jobs</li>
        <li>Schedules builds</li>
        <li>Manages plugins & credentials</li>
      </ul>

      <h3>🟩 Agent Nodes</h3>
      <ul>
        <li>Run the actual build/test jobs</li>
        <li>Can be Linux/Windows/Docker/Kubernetes agents</li>
      </ul>

      <h2>⚙ Typical Jenkins CI/CD Flow</h2>

      <ol>
        <li>Developer pushes code to GitHub/GitLab/Bitbucket</li>
        <li>Webhook triggers Jenkins</li>
        <li>Jenkins pulls the latest code</li>
        <li>Jenkins builds & runs tests</li>
        <li>Jenkins packages artifacts (JAR, WAR, Docker image…)</li>
        <li>Jenkins deploys to servers/Kubernetes</li>
      </ol>

      <h2>📌 Real-World Use Cases</h2>
      <ul>
        <li>Automate Java/Maven builds</li>
        <li>Deploy apps to AWS EC2, Docker, or Kubernetes</li>
        <li>Trigger pipelines on git push</li>
        <li>Integrate SonarQube for code quality</li>
        <li>Create multi-stage CI/CD pipelines</li>
      </ul>

      <h2>🎯 Summary</h2>
      <p>
        Jenkins is the heart of CI/CD automation.  
        In the upcoming lessons, you will install Jenkins, configure jobs,
        create pipelines, integrate Git/Docker/K8s, and build a real CI/CD project.
      </p>

      <p><b>Next: Jenkins Installation (Lesson 2)</b></p>
    </div>
  );
}
