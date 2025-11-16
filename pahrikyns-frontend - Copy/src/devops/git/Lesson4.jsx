// File: src/lessons/devops/git/Lesson4.jsx
// Updated Lesson 4 — Merge vs Rebase (FULL) with SVG + Copy Buttons + Answers Toggle
// Pure JSX + Tailwind

import { useState } from "react";
import LessonUI from "../../components/LessonUI.jsx";


function CopyButton({ text }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="ml-2 px-2 py-1 border rounded text-xs bg-gray-100 hover:bg-gray-200"
    >Copy</button>
  );
}

export default function Lesson4() {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <LessonUI title="Lesson 4 — Merge vs Rebase (FULL Updated Version)">

      {/* INTRO */}
      <p className="text-gray-700 leading-relaxed mb-4">
        Merge and Rebase are two ways to integrate changes from one branch into another. Both
        achieve similar results but create very different histories. Understanding the difference
        is critical for clean Git workflows.
      </p>

      {/* WHAT MERGE DOES */}
      <h2 className="text-2xl font-semibold mt-4 mb-2">1. What is <span className="text-blue-600">git merge</span>?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Merge creates a new commit that joins two branches. It preserves full history and
        is non-destructive.
      </p>

      {/* MERGE SVG */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Merge Diagram</h3>
      <div className="border bg-white p-4 rounded overflow-x-auto">
        <svg width="760" height="200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="120" cy="140" r="20" fill="#fff" stroke="#111" /><text x="112" y="145">A</text>
          <circle cx="220" cy="140" r="20" fill="#fff" stroke="#111" /><text x="212" y="145">B</text>
          <circle cx="320" cy="140" r="20" fill="#fff" stroke="#111" /><text x="312" y="145">C</text>

          <line x1="140" y1="140" x2="200" y2="140" stroke="#111" />
          <line x1="240" y1="140" x2="300" y2="140" stroke="#111" />

          <circle cx="320" cy="70" r="20" fill="#fff" stroke="#111" /><text x="312" y="75">X</text>
          <line x1="320" y1="90" x2="320" y2="120" stroke="#111" />

          <circle cx="420" cy="140" r="20" fill="#fff" stroke="#111" /><text x="412" y="145">M</text>
          <line x1="340" y1="140" x2="400" y2="140" stroke="#111" />
          <line x1="320" y1="90" x2="420" y2="140" stroke="#111" />
        </svg>
      </div>

      <pre className="bg-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto">{
`main:    A — B — C
feature:          \— X

After merge:
main: A — B — C — M`}
      </pre>

      {/* MERGE COMMAND */}
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">{
`git checkout main
git merge feature`}
      </pre>
      <CopyButton text={`git checkout main\ngit merge feature`} />

      {/* WHAT REBASE DOES */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">2. What is <span className="text-green-600">git rebase</span>?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Rebase rewrites commit history by moving your branch commits on top of another branch.
        It creates a linear project history.
      </p>

      {/* REBASE SVG */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Rebase Diagram</h3>
      <div className="border bg-white p-4 rounded overflow-x-auto">
        <svg width="760" height="220" xmlns="http://www.w3.org/2000/svg">
          <circle cx="120" cy="160" r="20" stroke="#111" fill="#fff" /><text x="112" y="165">A</text>
          <circle cx="220" cy="160" r="20" stroke="#111" fill="#fff" /><text x="212" y="165">B</text>
          <circle cx="320" cy="160" r="20" stroke="#111" fill="#fff" /><text x="312" y="165">C</text>

          <line x1="140" y1="160" x2="200" y2="160" stroke="#111" />
          <line x1="240" y1="160" x2="300" y2="160" stroke="#111" />

          <circle cx="320" cy="80" r="20" stroke="#111" fill="#fff" /><text x="312" y="85">X</text>

          <line x1="320" y1="100" x2="320" y2="130" stroke="#111" />

          <circle cx="420" cy="160" r="20" stroke="#111" fill="#fff" /><text x="412" y="165">X'</text>
          <line x1="340" y1="160" x2="400" y2="160" stroke="#111" />
        </svg>
      </div>

      <pre className="bg-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto">{
`Before rebase:
main:    A — B — C
feature:          \— X

After rebase:
feature: A — B — C — X'`}      </pre>

      {/* REBASE COMMAND */}
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">{
`git checkout feature
git rebase main`}
      </pre>
      <CopyButton text={`git checkout feature\ngit rebase main`} />

      {/* DIFFERENCE TABLE */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Merge vs Rebase (Quick Comparison)</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto">{
`MERGE:
✔ Keeps full history
✔ Safe, no rewrite
✘ Creates merge commits

REBASE:
✔ Clean linear history
✔ No merge commits
✘ Rewrites history (dangerous on shared branches)`}
      </pre>

      {/* COMMON ERRORS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Common Mistakes</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Rebasing a branch that others are using.</li>
        <li>Forgetting to resolve conflicts after rebase.</li>
        <li>Merging without switching to the correct branch.</li>
        <li>Pushing rewritten commits without force pushing.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Which creates a merge commit: merge or rebase?</li>
        <li>Which operation rewrites commit history?</li>
        <li>How do you replay feature commits onto main?</li>
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
            <li>Merge creates a merge commit.</li>
            <li>Rebase rewrites history.</li>
            <li><strong>git rebase main</strong></li>
          </ul>
        </div>
      )}

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Practice Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create a feature branch, make two commits, then practice merging into main
        and rebasing onto main. Draw both histories.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Merge preserves history; Rebase creates clean linear history.</li>
        <li>Never rebase shared/public branches.</li>
        <li>Merge commits act as merge history markers.</li>
      </ul>

    </LessonUI>
  );
}