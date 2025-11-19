import React from "react";

export default function Lesson19() {
  const emailConfig = `Manage Jenkins → Configure System:
- SMTP server: smtp.gmail.com
- SMTP Port: 587
- Use TLS: Yes
- Username: your-email@gmail.com
- App Password: (Google App Password)
`;

  const emailPipeline = `pipeline {
  agent any
  stages {
    stage("Build") {
      steps { sh "echo Building..." }
    }
  }
  post {
    failure {
      mail to: "team@company.com",
           subject: "Jenkins Build Failed!",
           body: "The latest build FAILED. Check logs."
    }
  }
}`;

  const slackConfig = `Install: Slack Notification Plugin
Manage Jenkins → Configure System → Slack
- Workspace: your-workspace
- Channel: #devops-alerts
- Credential: Slack Token
- Test Connection`;

  const slackPipeline = `pipeline {
  agent any
  stages {
    stage("Deploy") {
      steps { sh "echo Deploying..." }
    }
  }
  post {
    success {
      slackSend channel: "#devops-alerts", 
                message: "🚀 Deploy Success: Job ${env.JOB_NAME}"
    }
    failure {
      slackSend channel: "#devops-alerts", 
                message: "❌ Build Failed: ${env.JOB_NAME}"
    }
  }
}`;

  const teamsWebhook = `# MS Teams Webhook Example
curl -H "Content-Type: application/json" \\
     -d '{"text": "Jenkins build complete"}' \\
     https://outlook.office.com/webhook/xxxx`;

  const teamsPipeline = `pipeline {
  agent any
  stages { stage("Test") { steps { sh "echo Testing..." } } }
  post {
    always {
      sh '''
      curl -H "Content-Type: application/json" \\
           -d "{ \\"text\\": \\"Jenkins job: ${env.JOB_NAME} completed\\" }" \\
           $TEAMS_URL
      '''
    }
  }
}`;

  const webhookExample = `post {
  always {
    sh '''
      curl -X POST https://api.monitoring.com/event \\
      -H "Content-Type: application/json" \\
      -d "{ \\"job\\": \\"${env.JOB_NAME}\\", \\"status\\": \\"${currentBuild.currentResult}\\" }"
    '''
  }
}`;

  const smsTwilio = `Install: Pipeline Utility Steps
Use Twilio API
withCredentials([string(credentialsId: 'twilio-token', variable: 'TOKEN')]) {
  sh '''
    curl -X POST https://api.twilio.com/... \\
    --data-urlencode "To=+919876543210" \\
    --data-urlencode "From=+18005551234" \\
    --data-urlencode "Body=Jenkins build completed" \\
    -u "ACCOUNTSID:$TOKEN"
  '''
}`;

  const notifyBest = `✔ Use post { success / failure / always }  
✔ Notifications should be short + actionable  
✔ Never expose tokens in logs  
✔ Use Credentials system for all URLs  
✔ Slack/Teams must be mandatory for Prod pipelines  
✔ Email only for weekly or summary alerts  
✔ Use Webhooks to integrate with monitoring tools  
✔ Send SMS only for CRITICAL failures`;

  return (
    <div style={{ fontSize: 16, lineHeight: 1.7, paddingBottom: 60 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>
        Lesson 19 — Jenkins Notification Systems (Slack, Email, Teams, Webhooks, SMS)
      </h1>

      <p>
        Notifications are the heart of CI/CD observability. When builds fail or deployments
        succeed, your team must know instantly. Jenkins integrates with Email, Slack,
        Microsoft Teams, Webhooks, and even SMS systems like Twilio.
      </p>

      <hr />

      <h2>1) Email Notifications (SMTP)</h2>
      <p>Configure SMTP to allow Jenkins to send emails on build events.</p>

      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>
        {emailConfig}
      </pre>

      <h3>Email Notification Pipeline</h3>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>
        {emailPipeline}
      </pre>

      <hr />

      <h2>2) Slack Notifications</h2>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>
        {slackConfig}
      </pre>

      <h3>Slack Pipeline Example</h3>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>
        {slackPipeline}
      </pre>

      <hr />

      <h2>3) Microsoft Teams Notifications</h2>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>
        {teamsWebhook}
      </pre>

      <h3>Teams Pipeline Integration</h3>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>
        {teamsPipeline}
      </pre>

      <hr />

      <h2>4) Generic Webhooks (Monitoring, Alerts, Dashboards)</h2>
      <p>Webhooks allow Jenkins to inform ANY external service.</p>

      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>
        {webhookExample}
      </pre>

      <hr />

      <h2>5) SMS Alerts (Twilio)</h2>
      <pre style={{ background: "#0b1220", color: "white", padding: 12, borderRadius: 6 }}>
        {smsTwilio}
      </pre>

      <hr />

      <h2>6) Notification Best Practices</h2>
      <pre style={{ background: "#111827", color: "#10b981", padding: 16, borderRadius: 6 }}>
        {notifyBest}
      </pre>

      <hr />

      <h2>7) Summary</h2>
      <p>
        Jenkins notifications empower rapid response and ensure deployment pipelines remain
        reliable and observable. In enterprise setups, Slack/Teams + Webhook alerts are
        considered mandatory.
      </p>

      <p style={{ fontWeight: 700, marginTop: 20 }}>
        Next: Lesson 20 — Jenkins Backup, Monitoring, Logs, HA & Disaster Recovery 🔥
      </p>
    </div>
  );
}
