// File: src/lessons/devops/git/Lesson15.jsx
// Full Detailed Git Lesson 15 — Git Worktrees (multiple branches checked out simultaneously)
// Pure JSX + Tailwind

import LessonUI from "../../components/LessonUI.jsx";


export default function Lesson15() {
  return (
    <LessonUI title="Lesson 15 — Git Worktrees: Multiple Working Directories (FULL Detailed Version)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        Git worktrees allow you to have multiple working directories attached to a single
        Git repository. This is extremely useful when you want to work on multiple branches
        simultaneously without needing to clone the repo again.
      </p>

      {/* WHAT ARE WORKTREES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. What Are Git Worktrees?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        A worktree is an additional checkout of a Git repository, linked to the same
        <code>.git</code> database. Each worktree has its own working directory and can be on
        a different branch.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Main repo → .git (shared)
Worktree1 → branch: main
Worktree2 → branch: feature/login
Worktree3 → branch: bugfix/session`}
      </pre>

      {/* CREATE WORKTREE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Creating a Worktree</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">Create a new branch in a different folder:</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# create folder + checkout branch
 git worktree add ../feature-login feature/login

# if branch doesn't exist
git worktree add ../feature-login -b feature/login`}
      </pre>

      {/* LIST WORKTREES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. List All Worktrees</h2>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git worktree list

# Example output:
/path/project/main   ab12cd3 [main]
/path/project/feature-login  d91ac44 [feature/login]`}
      </pre>

      {/* REMOVE WORKTREE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Removing a Worktree</h2>
      <p className="text-gray-700 mb-2 leading-relaxed">Two steps: remove folder + prune metadata.</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# remove worktree folder
rm -rf ../feature-login

# prune metadata
git worktree prune`}
      </pre>

      {/* WORKTREE LOCKS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Worktree Locks & Safety</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Git prevents checking out the same branch into multiple worktrees.
        A worktree is locked to ensure branch safety.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`Trying to checkout 'main' in two worktrees:
error: 'main' is already checked out in '/path/project/main'`}
      </pre>

      {/* REAL-WORLD USE CASES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Real-world Use Cases</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Fixing bugs on one branch while developing a feature on another.</li>
        <li>Running different environments (frontend, backend) with different branches.</li>
        <li>Testing PR branches locally without switching your main working tree.</li>
        <li>Building release candidates while working on next sprint code.</li>
      </ul>

      {/* DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Worktree Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`                 .git (shared)
                     │
     ┌────────────────┼────────────────┐
     │                │                │
 main worktree   feature worktree   bugfix worktree
   /main             /feature           /bugfix`}      
      </pre>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Use worktrees instead of multiple clones to save disk space.</li>
        <li>Never manually delete the <code>.git/worktrees</code> folder — use <code>git worktree prune</code>.</li>
        <li>Keep worktree names clear: <code>../wt-login</code>, <code>../wt-bugfix</code>.</li>
        <li>Use worktrees for parallel development across multiple branches.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Why use a worktree instead of cloning a repo twice?</li>
        <li>How do you create a new worktree with a new branch?</li>
        <li>What is the purpose of <code>git worktree prune</code>?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create two worktrees: one for a feature branch and one for a bugfix branch.
        Make separate changes in each, commit them, and push the branches. Then remove
        one worktree and prune metadata. Observe how all worktrees share the same .git database.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Git worktrees provide multiple working directories per repo.</li>
        <li>Each worktree can be on a different branch.</li>
        <li>Worktrees share .git storage → lightweight and fast.</li>
        <li>Use prune to clean up removed worktrees properly.</li>
      </ul>

    </LessonUI>
  );
}
