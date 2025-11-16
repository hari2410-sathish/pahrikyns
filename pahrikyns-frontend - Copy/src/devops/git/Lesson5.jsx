// File: src/lessons/devops/git/Lesson5.jsx
// Updated Lesson 5 — Git Remote Basics (origin, push, pull, fetch) with SVG + Copy Buttons + Answers Toggle
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

export default function Lesson5() {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <LessonUI title="Lesson 5 — Git Remote Basics (origin, push, pull, fetch)">

      {/* INTRO */}
      <p className="text-gray-700 leading-relaxed mb-4">
        Remotes allow your local Git repository to connect with online platforms like GitHub,
        GitLab, and Bitbucket. In this lesson, you will learn how to link your project to a
        remote repo, push commits, pull new updates, and fetch changes safely.
      </p>

      {/* WHAT IS A REMOTE */}
      <h2 className="text-2xl font-semibold mt-4 mb-2">1. What is a Git Remote?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        A remote is a URL pointing to an online repository. The default remote name is
        <strong>origin</strong>.
      </p>

      {/* SVG REMOTE DIAGRAM */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Remote Diagram</h2>
      <div className="border rounded bg-white p-4 overflow-x-auto">
        <svg width="760" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="70" width="200" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="110" y="105" fontSize="12">Local Repo</text>

          <rect x="480" y="70" width="200" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="540" y="105" fontSize="12">Remote Repo (origin)</text>

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#111" />
            </marker>
          </defs>

          <line x1="250" y1="100" x2="480" y2="100" stroke="#111" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="320" y="85" fontSize="12">git push</text>

          <line x1="480" y1="120" x2="250" y2="120" stroke="#111" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="320" y="140" fontSize="12">git pull / fetch</text>
        </svg>
      </div>

      {/* ADD REMOTE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Add a Remote</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">{
`git remote add origin https://github.com/username/repo.git`
}</pre>
      <CopyButton text={`git remote add origin https://github.com/username/repo.git`} />

      {/* VIEW REMOTES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. View Existing Remotes</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">{
`git remote -v`
}</pre>
      <CopyButton text={`git remote -v`} />

      {/* PUSH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Push Code to Remote</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">{
`# First push (set upstream)
git push -u origin main

# Next pushes
git push`
}</pre>
      <CopyButton text={`git push -u origin main`} />

      {/* PULL */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Pull Latest Code</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">{
`git pull`
}</pre>
      <CopyButton text={`git pull`} />

      <p className="text-gray-700 mb-4 leading-relaxed">
        <strong>git pull = fetch + merge</strong>
      </p>

      {/* FETCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Fetch Remote Changes (Safe)</h2>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">{
`git fetch`
}</pre>
      <CopyButton text={`git fetch`} />

      <p className="text-gray-700 mb-6 leading-relaxed">
        Fetch downloads changes but does <strong>not</strong> merge them.
      </p>

      {/* COMMON ERRORS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Common Remote Errors</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>"fatal: remote origin already exists" → you added origin twice.</li>
        <li>"Updates were rejected" → you must pull first.</li>
        <li>Wrong branch name when pushing.</li>
        <li>Using SSH URL without SSH keys configured.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>What is the default remote name?</li>
        <li>Which command shows all remotes?</li>
        <li>What is the difference between <strong>pull</strong> and <strong>fetch</strong>?</li>
        <li>Which command sends your commits to GitHub?</li>
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
            <li>origin</li>
            <li>git remote -v</li>
            <li>pull = fetch + merge; fetch = download only</li>
            <li>git push</li>
          </ul>
        </div>
      )}

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Practice Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create a GitHub repo, connect it using <code>git remote add origin</code>, push your
        project, then run <code>git fetch</code> and observe no merge occurs. Finally run
        <code>git pull</code>.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Remotes connect your local repo to online platforms.</li>
        <li>origin is the default remote.</li>
        <li>push sends commits; pull brings new commits.</li>
        <li>fetch downloads safely without merging.</li>
      </ul>

    </LessonUI>
  );
}
