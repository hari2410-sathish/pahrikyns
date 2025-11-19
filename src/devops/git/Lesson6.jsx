// File: src/lessons/devops/git/Lesson6.jsx
// Updated Lesson 6 — Git Clone, Upstream Tracking, Remote Branches (SVG + Copy Buttons + Answers Toggle)
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

export default function Lesson6() {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <LessonUI title="Lesson 6 — Git Clone, Upstream Tracking & Remote Branches (FULL Updated Version)">

      {/* INTRO */}
      <p className="text-gray-700 leading-relaxed mb-4">
        In this lesson you will learn how to clone repositories, understand tracking branches, work
        with remote branches, and set up upstream remotes for open-source contributions.
      </p>

      {/* WHAT IS CLONE */}
      <h2 className="text-2xl font-semibold mt-4 mb-2">1. What is <code>git clone</code>?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        <code>git clone</code> downloads a remote repository onto your computer and automatically
        configures <strong>origin</strong> as its remote.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git clone https://github.com/username/project.git`}
      </pre>
      <CopyButton text={`git clone https://github.com/username/project.git`} />

      {/* SVG CLONE DIAGRAM */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Clone Diagram</h2>
      <div className="border rounded bg-white p-4 overflow-x-auto">
        <svg width="760" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="80" width="220" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="100" y="115">GitHub Repo</text>

          <rect x="480" y="80" width="220" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="520" y="115">Local Clone</text>

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#111" />
            </marker>
          </defs>

          <line x1="270" y1="110" x2="480" y2="110" stroke="#111" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="320" y="95">git clone</text>
        </svg>
      </div>

      {/* REMOTE BRANCHES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Remote Branches</h2>
      <p className="text-gray-700 mb-4">
        After cloning, you automatically get remote-tracking branches:
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git branch -r`}
      </pre>
      <CopyButton text={`git branch -r`} />

      <pre className="bg-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto">
{`origin/main
origin/dev
origin/feature/login`}
      </pre>

      {/* TRACKING BRANCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Tracking Branches</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        When you clone a repo, <code>main</code> automatically tracks <code>origin/main</code>.
        You can create tracking branches manually too:
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git checkout -b dev origin/dev`}
      </pre>
      <CopyButton text={`git checkout -b dev origin/dev`} />

      <p className="text-gray-700 mb-6">This means: your <strong>dev</strong> branch tracks <strong>origin/dev</strong>.</p>

      {/* UPSTREAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Setting Upstream for Open-Source</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        When contributing to open-source, you fork a repo → clone your fork → then add the original
        repo as <strong>upstream</strong>.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git remote add upstream https://github.com/original/repo.git`}
      </pre>
      <CopyButton text={`git remote add upstream https://github.com/original/repo.git`} />

      <p className="text-gray-700 mb-4">Now fetch original updates:</p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git fetch upstream`}
      </pre>
      <CopyButton text={`git fetch upstream`} />

      <p className="text-gray-700 mb-6 leading-relaxed">
        Bring upstream changes into your main:
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git checkout main
git merge upstream/main`}
      </pre>
      <CopyButton text={`git checkout main\\ngit merge upstream/main`} />

      {/* FETCH VS PULL */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Fetch vs Pull (Important!)</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm leading-relaxed mb-6 overflow-x-auto">
{`git fetch → downloads updates only
git pull  → fetch + merge`}
      </pre>

      {/* COMMON ERRORS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Common Mistakes</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Editing files without being on the correct branch.</li>
        <li>Forgetting to set upstream before pushing.</li>
        <li>Pushing to the wrong remote (origin vs upstream).</li>
        <li>Cloning SSH repo without setting SSH keys.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Which command creates a local copy of a remote repo?</li>
        <li>What does <code>git branch -r</code> show?</li>
        <li>What is the use of <code>upstream</code> remote?</li>
        <li>What's the difference between fetch and pull?</li>
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
            <li><strong>git clone</strong></li>
            <li>Remote-tracking branches</li>
            <li>Sync your fork with the original repo</li>
            <li>fetch = download only, pull = download + merge</li>
          </ul>
        </div>
      )}

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Practice Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Fork a GitHub repo → clone your fork → add upstream → fetch upstream changes → merge them
        into your local main branch.
      </p>

    </LessonUI>
  );
}
