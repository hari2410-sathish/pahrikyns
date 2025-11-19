// File: src/lessons/devops/git/Lesson8.jsx
// Full Detailed Git Lesson 8 — GitHub Workflows: Forks, Pull Requests, Code Review, Collaboration
// Pure JSX + Tailwind (No external libraries)

import LessonUI from "../../components/LessonUI.jsx";


export default function Lesson8() {
  return (
    <LessonUI title="Lesson 8 — GitHub Workflows: Forks, Pull Requests, Code Review (FULL)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        This lesson teaches common collaboration workflows used on platforms like GitHub,
        GitLab, and Bitbucket: forks, feature branches, pull requests (PRs), code review,
        and branch protection. You'll see when to use which workflow and how to run an effective PR.
      </p>

      {/* WORKFLOWS OVERVIEW */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Common Collaboration Workflows</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>
          <strong>Centralized workflow:</strong> Everyone pushes to a shared main branch (simple teams).
        </li>
        <li>
          <strong>Feature branch workflow:</strong> Developers create short-lived branches and open PRs to merge.
        </li>
        <li>
          <strong>Fork & PR workflow:</strong> Common for open-source: contributors fork the repo, push to their fork, and open PRs to the original repo.
        </li>
        <li>
          <strong>Trunk-based & GitFlow:</strong> More advanced; teams choose according to release cadence.
        </li>
      </ul>

      {/* FORK WORKFLOW */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Fork & Pull Request Workflow (Open Source)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Steps for contributing to an open-source project via fork:
      </p>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Fork the original repo to your account (GitHub "Fork" button).</li>
        <li>Clone your fork: <code>git clone git@github.com:youruser/repo.git</code>.</li>
        <li>Create a branch: <code>git switch -c feature/awesome</code>.</li>
        <li>Make changes, commit, push to your fork: <code>git push origin feature/awesome</code>.</li>
        <li>Open a Pull Request from your fork's branch to the original repo's target branch (e.g., <code>main</code>).</li>
        <li>Address review comments and push updates to the same branch — PR updates automatically.</li>
      </ol>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# clone your fork
git clone git@github.com:youruser/repo.git

# set upstream to original repo (optional, to stay updated)
git remote add upstream git@github.com:original/repo.git

git fetch upstream
git merge upstream/main`}
      </pre>

      {/* FEATURE BRANCH WORKFLOW */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Feature Branch Workflow (Teams)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Teams commonly create feature branches from <code>main</code> and open PRs into <code>main</code> or <code>develop</code>.
      </p>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# create feature branch from latest main
git fetch origin
git switch main
git pull
git switch -c feature/xyz

# after work
git add .
git commit -m "feat: add xyz"
git push -u origin feature/xyz`}
      </pre>

      {/* PULL REQUEST Anatomy */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Anatomy of a Good Pull Request</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li><strong>Title:</strong> Clear and concise, e.g., <code>feat(auth): add JWT login</code>.</li>
        <li><strong>Description:</strong> Explain what changed, why, and link related issues.</li>
        <li><strong>Changes:</strong> Short summary of key changes and files touched.</li>
        <li><strong>Testing:</strong> Steps to reproduce and test locally (commands, expected output).</li>
        <li><strong>Screenshots / GIFs:</strong> For UI changes, show before/after.</li>
        <li><strong>Checklist:</strong> Linting passed, tests added/updated, docs updated.</li>
      </ul>

      {/* REVIEW & MERGE STRATEGIES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Code Review & Merge Strategies</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Common merge strategies when accepting PRs:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li><strong>Merge commit (default):</strong> Keeps branch history and adds a merge commit.</li>
        <li><strong>Squash and merge:</strong> Combine all commits into one clean commit on target branch.</li>
        <li><strong>Rebase and merge:</strong> Rewrites commits on top of target for linear history.</li>
      </ul>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Reviewers should focus on readability, correctness, tests, size (small PRs are easier), and security implications.
      </p>

      {/* PROTECTED BRANCHES & CI */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Branch Protection & CI</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Protect important branches (like <code>main</code>) by requiring:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Passing CI checks (tests/lint)</li>
        <li>Minimum number of approving reviews</li>
        <li>No direct pushes (must use PRs)</li>
        <li>Signed commits (optional)</li>
      </ul>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# example: GitHub Actions triggers on PR
events: [push, pull_request]

# Protected branch: require 1-2 approvers, require status checks (CI)`}
      </pre>

      {/* HANDLING REVIEW COMMENTS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Handling Review Comments</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Respond politely and explain choices if you disagree.</li>
        <li>Make requested changes in the same branch and push — PR updates automatically.</li>
        <li>Small follow-up commits are fine; squash if requested by the maintainer.</li>
      </ol>

      {/* DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Workflow Diagram (Fork / PR)</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 leading-relaxed overflow-x-auto">
{`Contributor Forks -> Contributor Branch -> Push to fork -> Open PR -> Maintainer Reviews -> Merge to Upstream

  YOUR FORK                    UPSTREAM
  clone/push                    review/merge
   |                             |
feature/xyz  ---- PR ---->  upstream/main`}
      </pre>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Best Practices for PRs</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Keep PRs small and focused (one purpose per PR).</li>
        <li>Write clear descriptions and include tests.</li>
        <li>Run lint and tests locally before opening PR.</li>
        <li>Use draft PRs to get early feedback.</li>
        <li>Use labels and assign proper reviewers.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>When should you use a fork-and-PR workflow?</li>
        <li>What are advantages of squash-and-merge?</li>
        <li>Why keep PRs small?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Fork a sample repo (or create a private test repo), implement a small feature on a branch,
        open a PR, request a reviewer, respond to a comment (you can self-review), and merge using
        one of the merge strategies. Observe how the commit history changes with each strategy.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Forks + PRs are ideal for open source or external contributors.</li>
        <li>Use feature branches and PRs for team collaboration to keep history clean.</li>
        <li>Protect branches and require CI and reviews for safer merges.</li>
        <li>Follow PR best practices to speed reviews and maintain code quality.</li>
      </ul>

    </LessonUI>
  );
}
