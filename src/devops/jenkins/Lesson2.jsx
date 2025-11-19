import CodeBlock from "../../components/CodeBlock";

export default function Lesson2() {
  return (
    <div style={{ lineHeight: '1.7', fontSize: '17px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800' }}>
        Jenkins Lesson 2 — Installation & Setup (Deep Version)
      </h1>

      <p>
        In this lesson, you will learn how to install Jenkins on different
        environments: <b>Ubuntu Server (Recommended)</b>, <b>Windows</b>, and
        <b>Docker</b>. We will also configure Jenkins as a service and access the
        admin dashboard.
      </p>

      {/* -------------------- Ubuntu Installation -------------------- */}
      <h2>🐧 Install Jenkins on Ubuntu (Best Method)</h2>

      <h3>Step 1: Update Server</h3>
      <pre className="code-block">
        sudo apt update && sudo apt upgrade -y
      </pre>

      <h3>Step 2: Install Java (Required)</h3>
      <p>Jenkins requires Java 11 or Java 17.</p>
      <pre className="code-block">
        sudo apt install openjdk-11-jdk -y
      </pre>

      <h3>Step 3: Add Jenkins Repo</h3>
      <pre className="code-block">
{`curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \\
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \\
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \\
  /etc/apt/sources.list.d/jenkins.list > /dev/null`}
      </pre>

      <h3>Step 4: Install Jenkins</h3>
      <pre className="code-block">
{`sudo apt update
sudo apt install jenkins -y`}
      </pre>

      <h3>Step 5: Start and Enable Service</h3>
      <pre className="code-block">
{`sudo systemctl start jenkins
sudo systemctl enable jenkins

# Check status
sudo systemctl status jenkins`}
      </pre>

      <h3>Step 6: Open Firewall</h3>
      <pre className="code-block">
{`sudo ufw allow 8080/tcp
sudo ufw reload`}
      </pre>

      <h3>Step 7: Get Initial Admin Password</h3>
      <pre className="code-block">
        sudo cat /var/lib/jenkins/secrets/initialAdminPassword
      </pre>

      <p>Now open your browser:</p>
      <p><b>http://your-server-ip:8080</b></p>

      <p>Paste the password → Choose Plugins → Create Admin User.</p>

      <hr />

      {/* -------------------- Windows Installation -------------------- */}
      <h2>🪟 Install Jenkins on Windows</h2>

      <h3>Step 1: Download MSI Installer</h3>
      <p>
        Go to: <b>https://www.jenkins.io/download</b> → Windows → Download.
      </p>

      <h3>Step 2: Install Java</h3>
      <p>Jenkins requires Java. Install from:</p>
      <p><b>https://adoptium.net</b></p>

      <h3>Step 3: Run Installer</h3>
      <ul>
        <li>Next → Next → Install</li>
        <li>Jenkins will run as a Windows service</li>
      </ul>

      <h3>Step 4: Open Jenkins</h3>
      <p><b>http://localhost:8080</b></p>

      <h3>Step 5: Get Initial Password</h3>
      <pre className="code-block">
{`C:\\Program Files\\Jenkins\\secrets\\initialAdminPassword`}
      </pre>

      <hr />

      {/* -------------------- Docker Installation -------------------- */}
      <h2>🐳 Install Jenkins using Docker (Fastest Method)</h2>

      <h3>Step 1: Pull Jenkins Image</h3>
      <pre className="code-block">
        docker pull jenkins/jenkins:lts
      </pre>

      <h3>Step 2: Run Jenkins Container</h3>
      <pre className="code-block">
{`docker run -d \\
  -p 8080:8080 -p 50000:50000 \\
  --name jenkins \\
  -v jenkins_home:/var/jenkins_home \\
  jenkins/jenkins:lts`}
      </pre>

      <h3>Step 3: View Jenkins Logs</h3>
      <pre className="code-block">
        docker logs -f jenkins
      </pre>

      <h3>Step 4: Get Admin Password</h3>
      <pre className="code-block">
{`docker exec -it jenkins sh
cat /var/jenkins_home/secrets/initialAdminPassword`}
      </pre>

      <hr />

      {/* -------------------- Jenkins Dashboard -------------------- */}
      <h2>📡 Accessing Jenkins Dashboard</h2>
      <ol>
        <li>Open browser → <b>http://server-ip:8080</b></li>
        <li>Paste admin password</li>
        <li>Select plugins (Recommended preset)</li>
        <li>Create Admin User</li>
        <li>Jenkins is ready 🎉</li>
      </ol>

      <h2>🧪 Verify Jenkins Installation</h2>
      <pre className="code-block">
{`# Check version
jenkins --version

# Check service
sudo systemctl status jenkins`}
      </pre>

      <h2>🎯 Summary</h2>
      <ul>
        <li>Jenkins requires Java and runs on port 8080</li>
        <li>You installed Jenkins via Ubuntu, Windows & Docker</li>
        <li>You know how to get the initial admin password</li>
        <li>You accessed the Jenkins dashboard for the first time</li>
      </ul>

      <p><b>Next Up: Jenkins Lesson 3 — Freestyle Job (First CI Job)</b></p>
    </div>
  );
}
