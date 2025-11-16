// File: src/lessons/devops/git/Lesson14.jsx
// Full Detailed Git Lesson 14 — Hooks: client-side & server-side (pre-commit, pre-push, pre-receive)
// Pure JSX + Tailwind (No external libraries)

import LessonUI from "../../components/LessonUI.jsx";


export default function Lesson14() {
  return (
    <LessonUI title="Lesson 14 — Git Hooks: Client-side & Server-side (FULL)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        Git hooks are scripts that run automatically at certain points in Git's workflow.
        Hooks can enforce checks, run tests, or integrate with CI. There are <strong>client-side</strong>
        hooks (run on developer machines) and <strong>server-side</strong> hooks (run on the repository host).
      </p>

      {/* HOOKS OVERVIEW */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Where hooks live</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Hooks are stored in the <code>.git/hooks/</code> directory of a repository. By default, sample
        hook files are provided (e.g., <code>pre-commit.sample</code>), but they are inactive until made executable and named correctly (no .sample).
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`ls -la .git/hooks
# sample files like pre-commit.sample, pre-push.sample, post-commit.sample`}
      </pre>

      {/* CLIENT-SIDE HOOKS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Client-side hooks (examples)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Client-side hooks run on developers' machines. Common ones:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li><code>pre-commit</code> — run before a commit is created (lint, tests)</li>
        <li><code>prepare-commit-msg</code> — modify commit message template</li>
        <li><code>commit-msg</code> — validate commit message (conventional commits)</li>
        <li><code>pre-push</code> — run before pushing to a remote (run test suite)</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Sample pre-commit script (bash)</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`#!/bin/sh
# .git/hooks/pre-commit (make executable: chmod +x .git/hooks/pre-commit)

# run lint only on staged JS files
STAGED=$(git diff --cached --name-only --diff-filter=ACM | grep '\.js$')
if [ -n "$STAGED" ]; then
  echo "Running eslint on staged files..."
  # run eslint (assumes eslint installed locally)
  npx eslint $STAGED
  if [ $? -ne 0 ]; then
    echo "ESLint failed. Commit aborted."
    exit 1
  fi
fi

exit 0`}
      </pre>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Make the script executable: <code>chmod +x .git/hooks/pre-commit</code>. The hook will block the commit if the script exits with non-zero status.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Sample pre-push script (run tests)</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`#!/bin/sh
# .git/hooks/pre-push

# run lightweight tests before allowing push
echo "Running quick tests..."
# example: run node-based test command
authoring/npx --no-install npm test -- --watchAll=false --bail
RESULT=$?
if [ $RESULT -ne 0 ]; then
  echo "Tests failed. Push aborted."
  exit 1
fi
exit 0`}
      </pre>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Client-side hooks are not shared via Git by default (they live in .git which is not committed).
        To share hooks, use tooling like <code>husky</code>, <code>lefthook</code>, or add a setup script to copy hooks into <code>.git/hooks</code>.
      </p>

      {/* SHARING HOOKS - HUSKY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing hooks: Husky & alternatives</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Husky and similar tools let you declare hooks in package.json (or config) so they run for all contributors after installing dependencies.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# install husky
npm install husky --save-dev

# setup
npx husky install

# add a pre-commit hook
npx husky add .husky/pre-commit "npm test"`}
      </pre>

      <p className="text-gray-700 mb-4 leading-relaxed">
        This approach ensures hooks are present for developers who run <code>npm install</code> and follow setup steps.
      </p>

      {/* SERVER-SIDE HOOKS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Server-side hooks (examples)</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Server-side hooks run on the central repository host (e.g., Git server). Common server-side hooks:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li><code>pre-receive</code> — run before any refs are updated on the server; can reject pushes.</li>
        <li><code>update</code> — per-ref hook; runs once per branch pushed.</li>
        <li><code>post-receive</code> — runs after refs are updated (used for deployment or CI triggers).</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Sample pre-receive (reject force-push to protected branch)</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`#!/bin/sh
# pre-receive hook on server
while read oldrev newrev refname; do
  branch=$(echo $refname | sed 's,refs/heads/,,' )
  if [ "$branch" = "main" ]; then
    # reject force pushes (newrev should not be 000...)
    if [ "$newrev" = "0000000000000000000000000000000000000000" ]; then
      echo "Deleting main is forbidden."
      exit 1
    fi
  fi
done
exit 0`}
      </pre>

      <p className="text-gray-700 mb-4 leading-relaxed">
        For hosted services like GitHub/GitLab, server-side hooks are not directly configurable; instead, use branch protection rules and webhooks/CI to enforce policies.
      </p>

      {/* SECURITY & PERFORMANCE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Security & Performance Considerations</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Client hooks can be bypassed by users—don't rely on them for security; use server-side enforcement.</li>
        <li>Hooks that run heavy tests can slow down development; prefer lightweight checks locally and full CI server checks.</li>
        <li>Always make hook scripts idempotent and fail-safe to avoid blocking workflows unnecessarily.</li>
      </ul>

      {/* DEBUGGING HOOKS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Debugging Hooks</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Check permissions: hook must be executable (<code>chmod +x</code>).</li>
        <li>Run the script manually to see errors.</li>
        <li>Print debug logs to a file: <code>echo "debug" &gt;&gt; /tmp/hook.log</code>.</li>
        <li>Ensure PATH is set or use absolute paths to node/python binaries.</li>
      </ol>

      {/* DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Hooks Flow Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 leading-relaxed overflow-x-auto">
{`Client-side hooks:  (pre-commit)  Developer's machine
[dev edits] -> git commit -> pre-commit -> commit complete

Server-side hooks:  (pre-receive)  Server
git push -> pre-receive (validate) -> accept/reject -> post-receive (deploy)`}
      </pre>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Use client hooks for developer convenience (lint, format) and server-side checks for enforcement.</li>
        <li>Share hooks using tooling (Husky, Lefthook) or setup scripts, not by committing .git/hooks directly.</li>
        <li>Keep hooks fast; heavy workloads belong to CI (GitHub Actions, GitLab CI).</li>
        <li>Document hook setup in README or setup scripts to onboard contributors.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>Where do Git hooks live in a repository?</li>
        <li>Which hook runs before a commit is created?</li>
        <li>Why shouldn't you rely only on client-side hooks for security?</li>
        <li>How can you share hooks with your team?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create a <code>pre-commit</code> hook that runs a linter (or a small script that checks for TODO comments) and blocks commits if the check fails. Then install Husky and configure the same pre-commit check via Husky so it runs for all contributors after installation.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li>Hooks automate actions during Git events (commit/push/receive).</li>
        <li>Client hooks run locally; server hooks run on the host — use server checks for enforcement.</li>
        <li>Use tooling like Husky to share hooks across teams.</li>
        <li>Keep hooks fast, testable, and well-documented.</li>
      </ul>

    </LessonUI>
  );
}
