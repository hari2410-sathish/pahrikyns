// File: src/lessons/devops/git/Lesson18.jsx
// Full Detailed Git Lesson 18 — Git Patch & Format-Patch (create, apply, email patches)
// Pure JSX + Tailwind

import LessonUI from "../../components/LessonUI.jsx";

export default function Lesson18() {
  return (
    <LessonUI title="Lesson 18 — Git Patch & Format-Patch (FULL Detailed Version)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        Git patches are text files that describe changes between commits. They are widely used in
        open-source workflows, email-based code review systems, and environments where direct push
        access is restricted. This lesson covers <strong>git diff</strong> based patches and
        <strong>git format-patch</strong> email-style patches.
      </p>

      {/* WHAT IS PATCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. What is a Patch?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        A patch is a text file that contains differences between two versions of code.
        Anyone with access to the patch can apply it to their own copy of the repository.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Patch file contains:
+ added lines
- removed lines
metadata (commit message, author, date)
context around changes`}      </pre>

      {/* CREATE PATCH USING DIFF */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Create Patch Using git diff</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">Create a patch of unstaged or staged changes:</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# generate patch for unstaged changes
git diff > changes.patch

# generate patch for staged changes
git diff --cached > staged.patch`}      </pre>

      {/* APPLY PATCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Apply Patch</h2>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`git apply changes.patch`}      </pre>

      <p className="text-gray-700 mb-4 leading-relaxed">Check if patch can be applied cleanly:</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git apply --check changes.patch`}      </pre>

      {/* FORMAT-PATCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Create Email-style Patches (git format-patch)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        <code>git format-patch</code> creates patches with full commit metadata — perfect for emailing
        patches in open-source workflows.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# generate patch for last commit
git format-patch -1

# generate patches for last 3 commits
git format-patch -3

# generate patch range
git format-patch commitA..commitB`}      </pre>

      <p className="text-gray-700 mb-4 leading-relaxed">
        This produces files like:
        <code class="bg-gray-200 px-2 py-1 rounded ml-1">0001-fix-login.patch</code>
      </p>

      {/* APPLY FORMAT PATCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Apply format-patch (git am)</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git am 0001-fix-login.patch`}      </pre>

      <p className="text-gray-700 mb-4 leading-relaxed">
        <code>git am</code> applies patches and preserves author, date, commit message — unlike
        <code>git apply</code>, which does not create commits automatically.
      </p>

      {/* MULTIPLE PATCHES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Apply Multiple Patches</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git am *.patch`}      </pre>

      {/* PATCH CONFLICTS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Handling Patch Conflicts</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# conflict happens
git am --continue

# skip patch
git am --skip

# abort series
git am --abort`}      </pre>

      {/* DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Patch Workflow Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Dev A makes commit C
Dev A runs: git format-patch -1
→ generates 0001-some-change.patch
Dev B runs: git am 0001-some-change.patch
→ applies commit with same author + message`}      </pre>

      {/* USE CASES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Real-world Use Cases</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Open-source projects accepting patches via email.</li>
        <li>Teams where contributors don’t have push access.</li>
        <li>Backup system for commits before rewriting history.</li>
        <li>Sharing a fix without pushing a branch.</li>
        <li>Migrating commits between repos without remote access.</li>
      </ul>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Use <code>format-patch</code> for email-based workflows.</li>
        <li>Use <code>git am</code> to preserve full commit metadata.</li>
        <li>Check patch compatibility using <code>git apply --check</code>.</li>
        <li>Store patches before rebasing or rewriting history.</li>
        <li>Avoid modifying patches manually unless necessary.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>What is the difference between <code>git apply</code> and <code>git am</code>?</li>
        <li>How do you generate patches for the last 3 commits?</li>
        <li>Which command preserves author and commit message?</li>
        <li>How do you apply multiple patches?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create 2 commits on a feature branch. Use <code>git format-patch -2</code> to generate
        patches. Switch to main and apply them using <code>git am</code>. Introduce an artificial
        conflict in a patch and practice <code>--continue</code>, <code>--skip</code>, and <code>--abort</code>.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li>Patches describe code changes in plain text.</li>
        <li><strong>git diff &gt; file.patch</strong> creates basic patches.</li>
        <li><strong>git format-patch</strong> creates email-ready patches with metadata.</li>
        <li><strong>git am</strong> applies patches as commits.</li>
        <li>Patches are essential for offline, email, and distributed workflows.</li>
      </ul>

    </LessonUI>
  );
}
