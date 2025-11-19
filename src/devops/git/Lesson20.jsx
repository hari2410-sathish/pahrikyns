// File: src/lessons/devops/git/Lesson20.jsx
// Updated Lesson 20 — Git Advanced Workflows (SVG + Copy Buttons + Answers Toggle)
// Pure JSX + Tailwind

import { useState } from "react";
import LessonUI from "../../components/LessonUI.jsx";


function CopyButton({ text }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="ml-2 px-2 py-1 border rounded text-xs bg-gray-100 hover:bg-gray-200"
    >
      Copy
    </button>
  );
}

export default function Lesson20() {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <LessonUI title="Lesson 20 — Git Advanced Workflows (GitFlow, Trunk-Based, Release Flow, Monorepo)">

      {/* INTRO */}
      <p className="text-gray-700 leading-relaxed mb-4">
        In this final Git lesson, we explore real-world Git workflows used by companies and teams.
        These workflows define how developers collaborate, branch, deploy, and maintain releases.
      </p>

      {/* SECTION 1 — GITFLOW */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. GitFlow Workflow</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        GitFlow is a branching model introduced by Vincent Driessen. It uses long-running branches
        and clear workflows for features, releases, and hotfixes.
      </p>

      {/* SVG — GitFlow */}
      <div className="border rounded bg-white p-4 overflow-x-auto mb-4">
        <svg width="900" height="260" xmlns="http://www.w3.org/2000/svg">
          <text x="80" y="40" fontSize="14">main</text>
          <line x1="60" y1="60" x2="840" y2="60" stroke="#2980b9" strokeWidth="3" />

          <text x="80" y="100" fontSize="14">develop</text>
          <line x1="60" y1="120" x2="840" y2="120" stroke="#27ae60" strokeWidth="3" />

          <text x="80" y="160" fontSize="14">feature/*</text>
          <line x1="60" y1="180" x2="300" y2="180" stroke="#8e44ad" strokeWidth="3" />

          <text x="80" y="210" fontSize="14">hotfix/*</text>
          <line x1="500" y1="220" x2="700" y2="220" stroke="#c0392b" strokeWidth="3" />
        </svg>
      </div>

      <pre className="bg-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto">
{`main       → production-ready code
develop    → next-release code
feature/*  → feature work
release/*  → stabilize next version
hotfix/*   → emergency fixes on main`}
      </pre>

      {/* COMMON COMMANDS */}
      <h3 className="text-xl font-semibold mt-4 mb-2">GitFlow Commands</h3>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git flow init
git flow feature start login
git flow feature finish login
git flow release start v1.0.0
git flow hotfix start critical-fix`}
      </pre>
      <CopyButton text={`git flow init`} />

      {/* PROS & CONS */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Pros & Cons</h3>
      <pre className="bg-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto">
{`✔ Very structured
✔ Good for large teams
✔ Works well with scheduled releases
✘ Too complex for small teams
✘ Slower delivery`}
      </pre>

      {/* SECTION 2 — TRUNK-BASED DEVELOPMENT */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Trunk-Based Development</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Developers work directly on a single branch (main). Features are added using tiny branches
        that merge quickly (same day). CI/CD deploys continuously.
      </p>

      {/* SVG — Trunk Based */}
      <div className="border rounded bg-white p-4 overflow-x-auto mb-4">
        <svg width="900" height="180" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="90" x2="850" y2="90" stroke="#2980b9" strokeWidth="3" />
          <circle cx="200" cy="40" r="20" fill="#fff" stroke="#111" />
          <line x1="200" y1="60" x2="200" y2="90" stroke="#111" />
          <circle cx="450" cy="40" r="20" fill="#fff" stroke="#111" />
          <line x1="450" y1="60" x2="450" y2="90" stroke="#111" />
        </svg>
      </div>

      <pre className="bg-gray-100 p-4 rounded text-sm mb-4 overflow-x-auto">
{`✔ Faster merges
✔ Perfect for CI/CD
✔ No long-running branches
✔ Encourages small PRs
✘ Needs strict discipline`}
      </pre>

      {/* SECTION 3 — RELEASE FLOW */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Release Branching Workflow</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Used by companies that push stable releases while also working on future versions.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git checkout -b release/1.2.0
# stabilize release
git checkout main
git merge release/1.2.0`}
      </pre>
      <CopyButton text={`git checkout -b release/1.2.0`} />

      <pre className="bg-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto">
{`✔ Allows testing before going live
✔ Easy hotfix management
✘ Slightly slower than trunk-based`}
      </pre>

      {/* SECTION 4 — MONOREPO WORKFLOW */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Monorepo Workflow</h2>
      <p className="text-gray-700 mb-4">
        All projects live inside a single Git repository (used by Google, Meta).
      </p>

      <pre className="bg-gray-100 p-4 rounded text-sm mb-2 overflow-x-auto">
{`repo/
 ├── frontend/
 ├── backend/
 ├── infra/
 ├── shared-libs/`}
      </pre>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git subtree push --prefix=frontend/ origin frontend-branch`}
      </pre>
      <CopyButton text={`git subtree push --prefix=frontend/ origin frontend-branch`} />

      <p className="text-gray-700 leading-relaxed mb-6">
        Monorepos require tools like Nx, Bazel, Turborepo, Lerna.
      </p>

      {/* WORKFLOW SUMMARY TABLE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Workflow Comparison</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto">
{`GitFlow     → Best for big teams & releases
Trunk-Based → Best for CI/CD, startups
Release     → Best for scheduled releases
Monorepo    → Best for large multi-team systems`}
      </pre>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Which workflow uses long-running branches?</li>
        <li>Which workflow is best for CI/CD?</li>
        <li>What is a hotfix branch used for?</li>
        <li>Name one benefit of monorepos.</li>
      </ol>

      {/* ANSWERS */}
      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="px-3 py-2 bg-blue-600 text-white rounded mb-4 text-sm hover:bg-blue-700"
      >
        {showAnswers ? "Hide Answers" : "Show Answers"}
      </button>

      {showAnswers && (
        <div className="bg-green-50 border border-green-300 p-4 rounded mb-6">
          <h3 className="font-semibold mb-2">Answers:</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>GitFlow</li>
            <li>Trunk-Based</li>
            <li>Urgent fixes on production</li>
            <li>Centralized code for all teams</li>
          </ul>
        </div>
      )}

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>GitFlow is structured but heavy.</li>
        <li>Trunk-Based is simple and CI/CD-friendly.</li>
        <li>Release workflow supports staged releases.</li>
        <li>Monorepo helps multi-team collaboration.</li>
      </ul>

    </LessonUI>
  );
}
