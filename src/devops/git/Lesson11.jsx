// File: src/lessons/devops/git/Lesson11.jsx
// Full Detailed Git Lesson 11 — Rewriting History (amend, rebase -i, reset, dangers)
// Pure JSX + Tailwind

import LessonUI from "../../components/LessonUI.jsx";

export default function Lesson11() {
  return (
    <LessonUI title="Lesson 11 — Rewriting History: amend, rebase -i, reset (FULL)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        Git allows you to rewrite history to clean up commits, fix messages, or remove mistakes.
        But rewriting history must be done carefully—especially if commits are already pushed.
        This lesson covers <strong>amend</strong>, <strong>interactive rebase</strong>, and
        <strong>reset</strong> with diagrams and best practices.
      </p>

      {/* AMEND */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. git commit --amend</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Use amend to modify the latest commit—update message or add forgotten files.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# update last commit message
git commit --amend -m "fix: corrected message"

# add forgotten file
git add newfile.js
git commit --amend --no-edit`}      
      </pre>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 leading-relaxed overflow-x-auto">
{`Before amend:
A --- B (HEAD)
After amend:
A --- B' (HEAD)
# commit ID changes`}      
      </pre>

      <p className="text-gray-700 mb-4 leading-relaxed text-red-600">
        ⚠️ Never amend commits that are already pushed to shared remote branches.
      </p>

      {/* REBASE INTERACTIVE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Interactive Rebase (git rebase -i)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Use interactive rebase to edit, reorder, squash, or delete commits.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# rewrite last 3 commits
git rebase -i HEAD~3`}      
      </pre>

      <p className="text-gray-700 mb-4">Edit file:</p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`pick a92bd1c First commit
pick 1bf8821 Add feature X
pick d109ac1 Fix typo

# change to:
pick a92bd1c First commit
squash 1bf8821 Add feature X
squash d109ac1 Fix typo`}      
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Rebase Diagram</h3>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Before rebase:
A --- B --- C --- D (HEAD)

After squash:
A --- B' (HEAD)
# Cleaner history`}      
      </pre>

      <p className="text-red-600 text-sm mb-6">⚠️ Warning: Do NOT rebase commits already pushed to shared branches.</p>

      {/* RESET */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. git reset (soft, mixed, hard)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">Reset moves HEAD and optionally modifies staging and working directory.</p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 leading-relaxed overflow-x-auto">
{`Types of reset:

soft  → keep changes staged
mixed → keep changes unstaged (default)
hard  → delete all local changes`}      
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Examples</h3>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# move HEAD back but keep changes staged
git reset --soft HEAD~1

# move HEAD back and unstage changes
git reset HEAD~1

# DANGEROUS: delete all changes
git reset --hard HEAD~1`}      
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Reset Diagram</h3>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Before reset:
A --- B --- C (HEAD)

After reset HEAD~1:
A --- B (HEAD)
# C removed from history`}      
      </pre>

      <p className="text-red-600 text-sm mb-6">⚠️ Never use hard reset on shared branches.</p>

      {/* REFL0G */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. git reflog (Recover Lost Commits)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        If you lose commits after a reset or rebase, reflog helps restore them.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git reflog
# find commit hash
git reset --hard <hash>
`}      </pre>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Use <strong>amend</strong> for small fixes in local commits only.</li>
        <li>Use <strong>interactive rebase</strong> to clean commit history before merging.</li>
        <li>NEVER rebase commits that others already pulled.</li>
        <li>Reset only local work; avoid <code>--hard</code> unless necessary.</li>
        <li>Use <strong>reflog</strong> to recover lost work after mistakes.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>What does <code>git commit --amend</code> do?</li>
        <li>When should you use interactive rebase?</li>
        <li>What is the difference between <code>reset --soft</code> and <code>reset --hard</code>?</li>
        <li>How do you recover a lost commit?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create 4 commits with different messages. Use <code>git rebase -i HEAD~4</code> to squash
        them into 1 clean commit. Then intentionally reset one commit using
        <code>reset --hard</code>, and use <code>reflog</code> to recover it.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li><strong>Amend</strong> fixes the latest commit.</li>
        <li><strong>Rebase -i</strong> rewrites multiple commits (squash, edit, reorder).</li>
        <li><strong>Reset</strong> modifies commit history locally.</li>
        <li><strong>Reflog</strong> recovers lost work.</li>
        <li>Rewriting history is powerful but dangerous—use with caution.</li>
      </ul>

    </LessonUI>
  );
}
