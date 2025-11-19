// File: src/lessons/devops/git/Lesson17.jsx
// Full Detailed Git Lesson 17 — Git Cherry-pick (selective commits across branches)
// Pure JSX + Tailwind

import LessonUI from "../../components/LessonUI.jsx";


export default function Lesson17() {
  return (
    <LessonUI title="Lesson 17 — Git Cherry-pick: Selective Commit Transfer (FULL)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        <strong>git cherry-pick</strong> lets you take specific commits from one branch and apply
        them onto another branch. It's extremely useful when you need to transfer bug fixes,
        patch commits, or specific changes without merging the entire branch.
      </p>

      {/* WHAT IS CHERRY PICK */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. What is Cherry-pick?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Cherry-pick copies a commit <strong>exactly as-is</strong> onto your current branch,
        creating a new commit with a new hash.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 overflow-x-auto leading-relaxed">
{`Branch A:  A --- B --- C
Branch B:  X --- Y

Cherry-pick commit C onto Branch B → new commit C' on B
`}      </pre>

      {/* BASIC COMMAND */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Basic Cherry-pick Command</h2>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# switch to branch where you want commit applied
git checkout main

# apply specific commit
git cherry-pick <commit-hash>`}      </pre>

      {/* MULTIPLE COMMITS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Cherry-pick Multiple Commits</h2>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# multiple commits one-by-one
git cherry-pick <hash1> <hash2> <hash3>

# cherry-pick a range
git cherry-pick A..B   # picks commits after A up to B`}      </pre>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Example:
A..D → picks B, C, D (excludes A)
`}      </pre>

      {/* CONFLICTS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Cherry-pick Conflicts (How to Fix)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Cherry-picking may cause merge-like conflicts. Fix them manually, then continue.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`git cherry-pick <hash>
# conflict happens

# fix conflicts in files

# stage fixed files
git add .

# continue
git cherry-pick --continue`}      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Abort cherry-pick</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git cherry-pick --abort`}      </pre>

      {/* SKIP */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Skip a Commit</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git cherry-pick --skip`}      </pre>

      {/* USE CASES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Real-world Use Cases</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Migrate bug fix from dev branch → main branch.</li>
        <li>Apply hotfix to production without merging incomplete feature work.</li>
        <li>Bring a single commit from a huge PR into your branch.</li>
        <li>Extract a good commit from a broken branch.</li>
      </ul>

      {/* DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Cherry-pick Diagram</h2>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Before:
feature:   A --- B --- C
main:      X --- Y

After cherry-pick C onto main:
main: X --- Y --- C'

C' = same changes, new commit hash`}      </pre>

      {/* DANGERS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Risks & Mistakes to Avoid</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Cherry-picking duplicate commits can cause duplicated changes.</li>
        <li>Do not cherry-pick large merge commits unless necessary.</li>
        <li>Be careful when cherry-picking into long-lived branches — may cause conflicts.</li>
        <li>Avoid cherry-picking commits that rely on earlier commits not included.</li>
      </ul>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Use cherry-pick for small, isolated commits.</li>
        <li>For large code migrations, prefer merge or rebase.</li>
        <li>Document cherry-picked commits in your PRs.</li>
        <li>Keep feature branches clean to reduce conflicts.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>What does cherry-pick do?</li>
        <li>How do you cherry-pick multiple commits?</li>
        <li>How do you continue after fixing conflicts?</li>
        <li>Why does cherry-pick create a new commit hash?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create a feature branch with 3 commits. Switch to main and cherry-pick only the
        middle commit. Then practice resolving a cherry-pick conflict by editing files,
        staging them, and using <code>git cherry-pick --continue</code>.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Cherry-pick brings specific commits from one branch to another.</li>
        <li>New commit = same changes, but new hash.</li>
        <li>Handle conflicts just like merge conflicts.</li>
        <li>Best for isolated fixes, not full branch syncing.</li>
      </ul>

    </LessonUI>
  );
}
