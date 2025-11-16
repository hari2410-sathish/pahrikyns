// File: src/lessons/devops/git/Lesson19.jsx
// Full Detailed Git Lesson 19 — Git Security: GPG Signing, Verified Commits, Protected Branches
// Pure JSX + Tailwind

import LessonUI from "../../components/LessonUI.jsx";


export default function Lesson19() {
  return (
    <LessonUI title="Lesson 19 — Git Security: GPG Signing & Protected Branches (FULL)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        Modern Git workflows require strong security practices. This lesson covers commit signing
        with <strong>GPG keys</strong>, verifying signatures on GitHub/GitLab, secure SSH keys,
        protecting critical branches, and preventing unauthorized or dangerous actions.
      </p>

      {/* WHY SECURITY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Why Git Security Matters</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Prevents impersonation (fake commits).</li>
        <li>Ensures commits come from trusted developers.</li>
        <li>Protects critical branches from accidental pushes.</li>
        <li>Secures access to private repositories.</li>
        <li>Improves auditability and compliance.</li>
      </ul>

      {/* SSH KEY BASICS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Secure SSH Keys (Quick Recap)</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# generate secure 4096-bit key
ssh-keygen -t ed25519 -C "you@example.com"

# or RSA (older but still used)
ssh-keygen -t rsa -b 4096 -C "you@example.com"`}      </pre>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Add your public key to GitHub/GitLab → Settings → SSH Keys.
      </p>

      {/* GPG SIGNING INTRO */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. GPG Commit Signing — What & Why?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Git commit signatures use GPG to prove the author identity.
        GitHub will mark signed commits with:
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`✔ VERIFIED (trusted)
⚠ UNVERIFIED (unknown)
✖ INVALID (signature mismatch)`}
      </pre>

      {/* GENERATE GPG KEY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Generate GPG Key</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`gpg --full-generate-key
# Choose: RSA 4096 bits
# Set name + email (must match GitHub email)`}      </pre>

      {/* LIST + EXPORT GPG KEY */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Export public key (upload to GitHub/GitLab)</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`gpg --list-secret-keys --keyid-format LONG

# export
gpg --armor --export <KEY-ID>`}      </pre>

      {/* ENABLE SIGNING */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Enable Commit Signing</h2>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`git config --global user.signingkey <KEY-ID>
git config --global commit.gpgsign true`}      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Sign individual commit</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git commit -S -m "Signed commit"`}      </pre>

      {/* SIGN TAGS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Sign Git Tags</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git tag -s v1.0.0 -m "Signed release tag"`}      </pre>

      {/* VERIFY SIGNATURES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Verifying Signatures</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git verify-commit <commit>
git verify-tag <tag>`}      </pre>

      {/* DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Signature Flow Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Dev's GPG Private Key → signs commit
GitHub imports Public Key → verifies
If valid → "✔ Verified" badge shown`}      </pre>

      {/* PROTECTED BRANCHES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Protected Branches</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Platforms like GitHub, GitLab, Bitbucket support protecting important branches:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Prevent force pushes</li>
        <li>Require pull requests</li>
        <li>Require code review approvals</li>
        <li>Require signed commits only</li>
        <li>Prevent branch deletions</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Example (GitHub)</h3>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Repo → Settings → Branches → Branch Protection Rules
Add rule for: main
✔ Require pull request
✔ Require signed commits
✔ Require status checks
✔ Block force pushes`}      </pre>

      {/* SECURITY SCENARIOS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Real-world Security Scenarios</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Prevent unverified contributors from pushing code.</li>
        <li>Block accidental force push on main branch.</li>
        <li>Ensure production code always comes from verified developers.</li>
        <li>Detect tampered commits using GPG verification.</li>
      </ul>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">10. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Always enable commit signing for sensitive projects.</li>
        <li>Use branch protection rules for main, develop, release branches.</li>
        <li>Rotate SSH and GPG keys regularly.</li>
        <li>Never share private keys (SSH/GPG).</li>
        <li>Enable 2FA on GitHub/GitLab accounts.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>What is the purpose of GPG signing?</li>
        <li>How do you generate a GPG key?</li>
        <li>What does GitHub show for valid signatures?</li>
        <li>What are protected branches used for?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Generate a GPG key, configure Git to sign all commits, push two signed commits to GitHub,
        and verify that your commits show "Verified". Then enable branch protection on
        <code>main</code> requiring signed commits.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Commit signing prevents impersonation.</li>
        <li>Protected branches enforce safe workflows.</li>
        <li>GPG + SSH keys secure developer identity and code integrity.</li>
        <li>Critical for professional and enterprise Git usage.</li>
      </ul>

    </LessonUI>
  );
}
