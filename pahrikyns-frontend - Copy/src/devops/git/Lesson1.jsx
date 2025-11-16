// File: src/lessons/devops/git/Lesson1.jsx
// Updated Lesson 1 — Added SVG Diagram + Copy Buttons + Quiz Answers Toggle
// Pure JSX + Tailwind (Drop-in ready)

import { useState } from "react";
import LessonUI from "../../components/LessonUI.jsx";


// Small reusable Copy button
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

export default function Lesson1() {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <LessonUI title="Lesson 1 — Introduction to Git (FULL Updated Version)">

      {/* INTRO */}
      <h2 className="text-2xl font-semibold mt-4 mb-2">What is Git?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Git is a <strong>distributed version control system</strong> used to track and manage project
        history. Git records snapshots (commits) so developers can revert, branch, merge,
        and collaborate without losing work.
      </p>

      {/* WHY GIT */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Why do we use Git?</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Tracks history of all changes.</li>
        <li>Avoids overwriting each other's work.</li>
        <li>Branching enables safe experimentation.</li>
        <li>Works seamlessly with GitHub, GitLab, Bitbucket.</li>
      </ul>

      {/* SVG DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Git Architecture Diagram</h2>
      <div className="border rounded-lg bg-white p-4 overflow-x-auto">
        <svg width="720" height="140" viewBox="0 0 720 140" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="200" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="30" y="55" fontFamily="sans-serif" fontSize="12">Working Directory</text>

          <rect x="260" y="20" width="200" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="295" y="55" fontFamily="sans-serif" fontSize="12">Staging Area (Index)</text>

          <rect x="510" y="20" width="200" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="545" y="55" fontFamily="sans-serif" fontSize="12">Repository (.git)</text>

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#111" />
            </marker>
          </defs>

          <line x1="210" y1="50" x2="260" y2="50" stroke="#111" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="460" y1="50" x2="510" y2="50" stroke="#111" strokeWidth="2" markerEnd="url(#arrow)" />
        </svg>
      </div>

      {/* BASIC COMMANDS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2 flex items-center">
        Basic Git Commands
      </h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto mb-2">
{`git init

git status

git add filename.txt
# or add everything
git add .

git commit -m "Initial commit"

git log --oneline --graph --decorate`}
      </pre>
      <CopyButton text={`git init\n\ngit status\n\ngit add filename.txt\ngit add .\n\ngit commit -m "Initial commit"\n\ngit log --oneline --graph --decorate`} />

      {/* WORKFLOW DIAGRAM (ASCII) */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Git Workflow Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm leading-relaxed overflow-x-auto mb-6">
{`EDIT → ADD → COMMIT → LOG

   ┌──────────┐      ┌───────────────┐      ┌─────────────┐
   |  Working  | --→  |  Staging Area | --→  | Repository  |
   | Directory |      |   (Index)     |      |   (.git)    |
   └──────────┘      └───────────────┘      └─────────────┘

Command mapping:
edit file.txt       → (manual)
git add file.txt    → move to staging
git commit          → save snapshot
`}      </pre>

      {/* REAL EXAMPLE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Real-world Example</h2>
      <p className="text-gray-700 mb-4">
        Sample history after building a small website:
      </p>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`commit a18fd21 (Added homepage UI)
commit 8cd133e (Styled navbar)
commit e32bf91 (Initial project setup)`}
      </pre>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Which command initializes a Git repository?</li>
        <li>Why do we use <code>git add</code> before committing?</li>
        <li>Which command shows commit history in one line?</li>
      </ol>

      {/* ANSWERS TOGGLE */}
      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="px-3 py-2 bg-blue-600 text-white rounded mb-4 text-sm hover:bg-blue-700"
      >
        {showAnswers ? "Hide Answers" : "Show Answers"}
      </button>

      {showAnswers && (
        <div className="bg-green-50 border border-green-300 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Answers:</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><strong>git init</strong></li>
            <li>To move changes into the <strong>staging area</strong></li>
            <li><strong>git log --oneline</strong></li>
          </ul>
        </div>
      )}

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Practice Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Create a folder <strong>myproject</strong>, initialize Git, add 2 files, make 3 commits.
        Then run <code>git log --oneline</code>.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Git stores snapshots of code using commits.</li>
        <li>Standard workflow → Edit → Add → Commit.</li>
        <li>All history lives in the <code>.git</code> folder.</li>
      </ul>

    </LessonUI>
  );
}
