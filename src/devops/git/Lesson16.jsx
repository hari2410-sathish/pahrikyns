// File: src/lessons/devops/git/Lesson16.jsx
// Full Detailed Git Lesson 16 — Git Reflog Deep Dive (recover everything, reset disasters)
// Pure JSX + Tailwind

import LessonUI from "../../components/LessonUI.jsx";


export default function Lesson16() {
  return (
    <LessonUI title="Lesson 16 — Git Reflog Deep Dive: Recover Anything (FULL)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        <strong>git reflog</strong> is one of the most powerful and life‑saving commands in Git.
        It records every movement of HEAD — commits, rebases, resets, checkouts, merges.
        Even if you <strong>delete branches, hard reset, or lose commits</strong>, reflog lets you recover them.
      </p>

      {/* WHAT IS REFLOG */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. What is the Reflog?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Reflog is a local history of everything your HEAD has pointed to. It tracks actions like:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Commits</li>
        <li>Branch switches</li>
        <li>Resets (soft/mixed/hard)</li>
        <li>Rebases</li>
        <li>Merges & cherry-picks</li>
      </ul>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git reflog
# Example:
# a3c1d2c HEAD@{0}: commit: add login logic
# 91bdac1 HEAD@{1}: reset: moving to HEAD~1
# d20c311 HEAD@{2}: commit: update UI`}      </pre>

      {/* HOW IT WORKS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Reflog vs Commit History</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm leading-relaxed mb-6 overflow-x-auto">
{`git log      → shows reachable commits (branch history)
git reflog    → shows ALL commits HEAD pointed to (reachable or not)`}      </pre>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Even commits removed from branches still appear in reflog for a period (default 90 days).
      </p>

      {/* RECOVER LOST COMMITS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Recover Lost Commits</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Suppose you accidentally hard‑reset and lost work:
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`git reset --hard HEAD~2   # OOPS! commit lost`}      </pre>

      <p className="text-gray-700 mb-2">Recover using reflog:</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git reflog
# find the lost commit hash
git reset --hard <lost-hash>`}      </pre>

      {/* DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Reflog Safety Net Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Before reset:
A --- B --- C (HEAD)

After accidental reset:
A --- B (HEAD)

Reflog still has C:
HEAD@{2} = C

Restore with:
git reset --hard C`}      </pre>

      {/* RESTORE DELETED BRANCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Restore Deleted Branches</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`git branch -D feature/login   # branch deleted`}      </pre>

      <p className="text-gray-700 mb-2">Recover branch:</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git reflog
# find the commit where branch last pointed
git branch feature/login <hash>`}      </pre>

      {/* RECOVER FROM BAD MERGE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Undo a Bad Merge</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git merge feature-x   # bad merge
# want to undo?
git reflog
# find commit before merge
git reset --hard HEAD@{1}`}      </pre>

      {/* RECOVER AFTER REBASE DISASTER */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Recover After Rebase Disaster</h2>
      <p className="text-gray-700 mb-2 leading-relaxed">Rebase rewrites history → reflog keeps everything.</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git rebase -i HEAD~5   # messed up

# recover original chain:
git reflog
# find commit before rebase
git reset --hard <old-hash>`}      </pre>

      {/* CLEAN REFLOG */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Cleaning Reflog</h2>
      <p className="text-gray-700 mb-2">Usually automatic, but can be cleaned manually:</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git reflog expire --expire=30.days.ago --all
git gc --prune=now --aggressive`}      </pre>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Always check reflog before assuming work is lost.</li>
        <li>Use reflog to explore timeline of actions when debugging mistakes.</li>
        <li>Never panic after a hard reset or rebase—reflog remembers everything.</li>
        <li>Use <code>git gc</code> carefully; it permanently clears unreachable commits.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>What does reflog track that git log does NOT?</li>
        <li>How do you recover a deleted branch?</li>
        <li>Which command fully restores a lost commit?</li>
        <li>Why is reflog useful after a rebase?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Make 5 commits, then perform a hard reset that removes 3 commits. Use
        <code className="bg-gray-200 px-2 py-1 rounded"> git reflog </code> to locate the lost commits
        and restore them using <code>git reset --hard</code>. Then delete a branch and recover it.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Reflog tracks every movement of HEAD.</li>
        <li>You can restore lost commits, branches, merges, rebases.</li>
        <li>Reflog is the most important recovery tool in Git.</li>
      </ul>

    </LessonUI>
  );
}
