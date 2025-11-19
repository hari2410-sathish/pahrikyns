// File: src/lessons/devops/git/Lesson3.jsx
// Updated Lesson 3 — Git Branching Basics (SVG + Copy Buttons + Answers Toggle)
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

export default function Lesson3() {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <LessonUI title="Lesson 3 — Git Branching Basics (FULL Updated Version)">

      {/* INTRO */}
      <p className="text-gray-700 leading-relaxed mb-4">
        Branching is one of Git's most powerful features. It allows you to create a separate
        line of development where you can experiment, fix bugs, or build features without
        affecting the main project.
      </p>

      {/* WHAT IS BRANCHING */}
      <h2 className="text-2xl font-semibold mt-4 mb-2">1. What is a Git Branch?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        A branch is simply a pointer to a specific commit. When you commit on a branch,
        the pointer moves forward. The default branch is usually <strong>main</strong>.
      </p>

      {/* SVG DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Branch Diagram</h2>
      <div className="border rounded bg-white p-4 overflow-x-auto">
        <svg width="760" height="180" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="90" r="20" stroke="#111" fill="#fff" />
          <text x="72" y="95" fontSize="12">A</text>

          <circle cx="180" cy="90" r="20" stroke="#111" fill="#fff" />
          <text x="172" y="95" fontSize="12">B</text>

          <circle cx="280" cy="90" r="20" stroke="#111" fill="#fff" />
          <text x="272" y="95" fontSize="12">C</text>

          <line x1="100" y1="90" x2="160" y2="90" stroke="#111" />
          <line x1="200" y1="90" x2="260" y2="90" stroke="#111" />

          <text x="240" y="130" fontSize="12">main</text>

          <circle cx="280" cy="40" r="20" stroke="#111" fill="#fff" />
          <text x="272" y="45" fontSize="12">X</text>

          <line x1="280" y1="70" x2="280" y2="60" stroke="#111" />
          <text x="300" y="40" fontSize="12">feature/login</text>
        </svg>
      </div>

      {/* CREATE BRANCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Create a Branch</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git branch feature/login`}
      </pre>
      <CopyButton text={`git branch feature/login`} />

      {/* SWITCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Switch to a Branch</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git checkout feature/login
# or (newer command)
git switch feature/login`}
      </pre>
      <CopyButton text={`git switch feature/login`} />

      {/* CREATE + SWITCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Create & Switch (One Command)</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git checkout -b feature/login
# or
git switch -c feature/login`}
      </pre>
      <CopyButton text={`git switch -c feature/login`} />

      {/* LIST BRANCHES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. List Branches</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git branch`}
      </pre>
      <CopyButton text={`git branch`} />

      <p className="text-gray-700 mb-4 leading-relaxed">
        The active branch has a <strong>*</strong> star next to it.
      </p>

      {/* DELETE BRANCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Delete a Branch</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git branch -d feature/login`}
      </pre>
      <CopyButton text={`git branch -d feature/login`} />

      <p className="text-gray-700 mb-6 leading-relaxed">
        Use <code>-D</code> for force-delete.
      </p>

      {/* MERGE BASIC */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Merge Basic Example</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git checkout main
git merge feature/login`}
      </pre>
      <CopyButton text={`git checkout main\\ngit merge feature/login`} />

      <p className="text-gray-700 mb-4">
        After merging, the branch history becomes unified.
      </p>

      {/* ASCII MERGE DIAGRAM */}
      <pre className="bg-gray-100 p-4 rounded text-sm leading-relaxed mb-6 overflow-x-auto">
{`Before merge:
main:    A --- B --- C
feature:            \\---- X

After merge:
main: A --- B --- C --- M`}
      </pre>

      {/* COMMON MISTAKES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Common Mistakes</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Editing files on the wrong branch.</li>
        <li>Forgetting to switch before starting a feature.</li>
        <li>Creating branches with unclear names.</li>
        <li>Not committing before switching (uncommitted changes carry over).</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Which command lists all branches?</li>
        <li>How do you create and switch to a new branch?</li>
        <li>What command merges a branch into main?</li>
      </ol>

      {/* ANSWERS TOGGLE */}
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
            <li><strong>git branch</strong></li>
            <li><strong>git checkout -b name</strong> or <strong>git switch -c name</strong></li>
            <li><strong>git merge branchname</strong></li>
          </ul>
        </div>
      )}

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Practice Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create a branch <strong>feature/header</strong>, add a file, commit it, switch back to
        main, and merge the feature branch. Draw the commit graph.
      </p>

    </LessonUI>
  );
}
