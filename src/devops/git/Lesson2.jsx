// File: src/lessons/devops/git/Lesson2.jsx
// Updated Lesson 2 — Git Installation, Configuration, First Repo (SVG + Copy Buttons + Answers Toggle)
// Pure JSX + Tailwind (Paste-ready)

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

export default function Lesson2() {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <LessonUI title="Lesson 2 — Git Installation, Setup & Creating Your First Repo (FULL Updated Version)">

      {/* INTRO */}
      <p className="text-gray-700 leading-relaxed mb-4">
        In this lesson you will install Git, configure your identity, explore global Git
        settings, and create your very first real Git repository with commits.
      </p>

      {/* INSTALLATION */}
      <h2 className="text-2xl font-semibold mt-4 mb-2">1. Install Git</h2>
      <p className="text-gray-700 mb-4">Download Git from the official site:</p>
      <pre className="bg-gray-100 p-3 rounded text-sm mb-4">https://git-scm.com/downloads</pre>

      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Windows → Git Bash included</li>
        <li>macOS → Homebrew or .dmg installer</li>
        <li>Linux → apt / yum / pacman</li>
      </ul>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`# Ubuntu / Debian
sudo apt install git -y

# Fedora / RHEL
dnf install git -y

# macOS (Homebrew)
brew install git`}
      </pre>
      <CopyButton text={`sudo apt install git -y`} />

      <p className="text-gray-700 mb-6 leading-relaxed">
        After installation, verify Git:
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm mb-4 overflow-x-auto">
{`git --version`}
      </pre>

      {/* CONFIG */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Configure Git (Required)</h2>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`git config --global user.name "Your Name"
git config --global user.email "you@example.com"`}      </pre>
      <CopyButton text={`git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"`} />

      <p className="text-gray-700 mb-4">
        Check all your global configs:
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-6">
{`git config --list`}      </pre>

      {/* SVG DIAGRAM FOR CONFIG */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Git Config Levels</h2>
      <div className="border rounded bg-white p-4 overflow-x-auto">
        <svg width="760" height="140" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="220" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="40" y="55" fontSize="12" fontFamily="sans-serif">System Config (/etc/gitconfig)</text>

          <rect x="260" y="20" width="220" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="295" y="55" fontSize="12" fontFamily="sans-serif">Global Config (~/.gitconfig)</text>

          <rect x="510" y="20" width="220" height="60" rx="8" fill="#fff" stroke="#111" />
          <text x="540" y="55" fontSize="12" fontFamily="sans-serif">Local Config (repo/.git/config)</text>
        </svg>
      </div>

      {/* CREATE FIRST REPO */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Create Your First Git Repository</h2>
      <p className="text-gray-700 mb-4">Follow this real-world example:</p>

      <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-2">
{`mkdir first-project
cd first-project

git init

echo "Hello Git" > main.txt

git add main.txt
git commit -m "feat: initial file"`}      </pre>
      <CopyButton text={`mkdir first-project\ncd first-project\ngit init\necho "Hello Git" > main.txt\ngit add main.txt\ngit commit -m "feat: initial file"`} />

      <p className="text-gray-700 mt-4 mb-2">Check your commit:</p>
      <pre className="bg-gray-900 text-white p-4 rounded text-sm mb-6 overflow-x-auto">
{`git log --oneline --graph`}      </pre>

      {/* WORKFLOW ASCII */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Local Repo Flow</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm leading-relaxed mb-6 overflow-x-auto">
{`EDIT → ADD → COMMIT

main.txt (edit)
   ↓
git add main.txt
   ↓
git commit -m "message"`}      </pre>

      {/* COMMON ERRORS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Common Beginner Errors</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>"Nothing to commit" → you forgot <strong>git add</strong>.</li>
        <li>Wrong username/email → commit shows incorrect author.</li>
        <li>Initializing Git in the wrong folder.</li>
        <li>Editing files AFTER staging — requires another add.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Which command sets your username globally?</li>
        <li>What does <code>git config --list</code> do?</li>
        <li>What command creates a new Git repository?</li>
        <li>Which file stores local repo settings?</li>
      </ol>

      {/* SHOW ANSWERS BUTTON */}
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
            <li><strong>git config --global user.name "Name"</strong></li>
            <li>Shows all active configuration values</li>
            <li><strong>git init</strong></li>
            <li><strong>.git/config</strong></li>
          </ul>
        </div>
      )}

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Practice Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create a repo, add two files, make two commits, then run
        <code className="bg-gray-200 px-1 rounded"> git log --oneline </code>.
        Check that your name/email appears correctly.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Git must be configured before first use.</li>
        <li>Global config stores your identity.</li>
        <li>Local repo begins when you run <code>git init</code>.</li>
        <li>Basic workflow: Edit → Add → Commit.</li>
      </ul>

    </LessonUI>
  );
}
