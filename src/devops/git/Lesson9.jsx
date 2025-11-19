// File: src/lessons/devops/git/Lesson9.jsx
// Full Detailed Git Lesson 9 — Stashing & Cleaning (git stash, git stash apply/pop, git clean)
// Pure JSX + Tailwind (No external libraries)

import LessonUI from "../../components/LessonUI.jsx";


export default function Lesson9() {
  return (
    <LessonUI title="Lesson 9 — Stashing & Cleaning (FULL Detailed Version)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        Stashing allows you to temporarily save uncommitted changes without committing them.
        Cleaning helps remove untracked files. These tools are essential when switching
        branches, pulling changes, or preparing your workspace for a clean build.
      </p>

      {/* WHAT IS STASH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. What is Git Stash?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        <strong>git stash</strong> saves your modified and staged changes into a temporary
        storage area (the "stash stack") and reverts your working directory to a clean state.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`Working Dir (dirty) → git stash → Working Dir (clean)`}
      </pre>

      {/* BASIC STASH COMMANDS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Basic Stash Commands</h2>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# save modified files
git stash

# save with message
git stash push -m "work in progress on login page"

# list stashes
git stash list`}
      </pre>

      {/* APPLY/POP */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Applying or Popping Stash</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        After stashing, you may want to restore those changes. There are two ways:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li><strong>apply:</strong> restore changes but keep stash in stack.</li>
        <li><strong>pop:</strong> restore and remove stash from stack.</li>
      </ul>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# apply latest stash
git stash apply

# apply and remove
git stash pop

# apply a specific stash
git stash apply stash@{2}`}
      </pre>

      {/* STASH DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Stash Workflow Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`       ┌────────────┐    git stash     ┌────────────┐
       │  Working   │ ---------------->│   Stash     │
       │ Directory  │                  │   Stack     │
       └────────────┘  git stash pop   └────────────┘
                ^ <----------------------------------
                |        restore changes
`}
      </pre>

      {/* STASH UNTRACKED FILES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Stashing Untracked Files</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        By default, stash ignores untracked files. Use <code>-u</code> or <code>-a</code> to include them.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# include untracked files
git stash -u

# include ignored files also
git stash -a`}
      </pre>

      {/* DROPPING & CLEARING */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Remove Stashes (Drop/Clear)</h2>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# delete one stash
git stash drop stash@{1}

# delete all stashes
git stash clear`}
      </pre>

      {/* GIT CLEAN */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Cleaning Untracked Files</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        <strong>git clean</strong> removes untracked files or directories.
        Use with caution—files will be permanently deleted.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Dry run (safe)</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`git clean -n
# shows what will be deleted`}
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Delete untracked files</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git clean -f      # files only
git clean -fd     # including dirs
git clean -fx     # including ignored files`}
      </pre>

      {/* CLEAN DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Cleaning Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Before Clean:
- main.js
- app.css
- build/ (untracked)
- temp.log (untracked)

After 'git clean -fd':
- main.js
- app.css
# untracked files removed`}
      </pre>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Use <code>git stash</code> before switching branches with uncommitted work.</li>
        <li>Use stash messages (<code>-m</code>) for clarity.</li>
        <li>Never use <code>git clean -fx</code> unless you're sure — this deletes ignored files too.</li>
        <li>Use <code>git clean -n</code> to preview before deleting.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>What is the difference between <code>git stash apply</code> and <code>git stash pop</code>?</li>
        <li>How do you stash untracked files?</li>
        <li>What does <code>git clean -n</code> do?</li>
        <li>What command deletes all stashes?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Modify two files and create one untracked file. Stash everything (both tracked
        and untracked), switch branches, return, and then apply the stash. Finally, create
        junk files and use <code>git clean -n</code> and <code>git clean -f</code> to clean your working tree.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li><strong>git stash</strong> temporarily saves work without committing.</li>
        <li><strong>apply</strong> restores but keeps stash; <strong>pop</strong> restores and removes.</li>
        <li><strong>git clean</strong> safely deletes untracked files (dangerous if misused).</li>
        <li>Stashing is essential for switching contexts safely.</li>
      </ul>

    </LessonUI>
  );
}
