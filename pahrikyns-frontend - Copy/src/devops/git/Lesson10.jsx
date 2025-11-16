// File: src/lessons/devops/git/Lesson10.jsx
// Full Detailed Git Lesson 10 — Inspecting History (log, show, diff, blame, bisect)
// Pure JSX + Tailwind

import LessonUI from "../../components/LessonUI.jsx";


export default function Lesson10() {
  return (
    <LessonUI title="Lesson 10 — Inspecting History: log, show, diff, blame, bisect (FULL)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        This lesson covers advanced Git history inspection tools: <code>git log</code>,
        <code>git show</code>, <code>git diff</code>, <code>git blame</code>, and <code>git bisect</code>.
        These commands help you track changes, debug issues, and understand who changed what.
      </p>

      {/* LOG BASICS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. git log (Commit History)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">View detailed commit history:</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`git log

git log --oneline

git log --graph --oneline --decorate

git log --author="Hari"

git log --since="2 weeks ago"`}
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Log Diagram</h3>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`main branch history:

* a92bd1c  Fix bug in login
* 4ab1930  Add navbar UI
* e31a22f  Initial commit`}
      </pre>

      {/* GIT SHOW */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. git show (View Commit Details)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Shows commit message AND file changes of a specific commit.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git show a92bd1c

git show HEAD~1

git show HEAD:file.txt`}      
      </pre>

      {/* DIFF */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. git diff (See File Differences)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">Compare changes before staging, after staging, or between commits.</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# unstaged changes
git diff

# staged vs last commit
git diff --cached

# between commits
git diff commit1 commit2

# specific file
git diff main feature/login -- index.js`}      
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Diff Diagram</h3>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`+ added line
- removed line

Example:

- const isLogged = false;
+ const isLogged = true;`}      
      </pre>

      {/* BLAME */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. git blame (Who changed a line?)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Shows line-by-line authorship for a file. Useful for debugging.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git blame index.js

# blame with commit info
git blame -L 10,50 index.js`}      
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Blame Output Example</h3>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 overflow-x-auto leading-relaxed">
{`e31a22f (Hari 2024-02-01) const apiUrl = '/login';
a92bd1c (Kumar 2024-02-03) function handleLogin() {`}      
      </pre>

      {/* BISECT */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. git bisect (Find Bug Introductions)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        <strong>git bisect</strong> helps find which commit introduced a bug by binary search.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`git bisect start
git bisect bad HEAD
git bisect good a92bd1c

# Git checks out a commit → run tests → tell Git
git bisect good
# or
git bisect bad

# when done
git bisect reset`}      
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Bisect Diagram</h3>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Commit History:

A -- B -- C -- D -- E -- F -- G

Bug appears at G.
A = good, G = bad.
Bisect tests C, then E, then F → finds bug commit.`}      
      </pre>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Use <code>--oneline --graph</code> for clean readable history.</li>
        <li>Use <code>git show</code> to inspect specific commits before merging.</li>
        <li>Use <code>git diff</code> before committing to review changes.</li>
        <li>Use <code>git blame</code> to identify ownership of problematic lines.</li>
        <li>Use <code>git bisect</code> when bugs are hard to locate.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>What command shows commit history in a graph?</li>
        <li>How do you inspect a single commit’s changes?</li>
        <li>What does <code>git blame</code> show?</li>
        <li>What problem does <code>git bisect</code> solve?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create several commits changing a file. Use <code>git log --oneline --graph</code> to
        visualize your history, <code>git show</code> to inspect one commit, <code>git diff</code>
        between two commits, and <code>git blame</code> on a file. Create a bug intentionally and try
        <code>git bisect</code> to identify the commit that introduced it.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
        <li><strong>git log</strong> → explore commit history.</li>
        <li><strong>git show</strong> → inspect specific commit details.</li>
        <li><strong>git diff</strong> → compare versions.</li>
        <li><strong>git blame</strong> → find who changed each line.</li>
        <li><strong>git bisect</strong> → identify the commit where a bug started.</li>
      </ul>

    </LessonUI>
  );
}
