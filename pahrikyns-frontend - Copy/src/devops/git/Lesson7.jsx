// File: src/lessons/devops/git/Lesson7.jsx
// Full Detailed Git Lesson 7 — Remote Repositories (Push, Pull, Fetch, Origin)
// Pure JSX + Tailwind (No external libraries)

import LessonUI from "../../components/LessonUI.jsx";


export default function Lesson7() {
  return (
    <LessonUI title="Lesson 7 — Remote Repositories: Push, Pull, Fetch, Origin (FULL Detailed Version)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        In this lesson, you will learn how Git interacts with remote servers such as
        GitHub, GitLab, and Bitbucket. You will understand remotes, how to push and pull,
        how fetch works, and how to set upstream branches.
      </p>

      {/* WHAT IS REMOTE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. What is a Remote?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        A <strong>remote</strong> is a link (URL) pointing to a repository hosted on a server.
        The most common remote name is <code>origin</code>.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# show configured remotes
git remote -v

# sample output
origin    git@github.com:user/project.git (fetch)
origin    git@github.com:user/project.git (push)`}
      </pre>

      {/* ADD REMOTE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Adding a Remote</h2>
      <p className="text-gray-700 mb-2 leading-relaxed">Use SSH or HTTPS:</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# HTTPS
git remote add origin https://github.com/user/repo.git

# SSH
git remote add origin git@github.com:user/repo.git`}
      </pre>

      {/* PUSH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Pushing Changes</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        The first push usually requires setting upstream:
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# first push
git push -u origin main

# after that
git push`}
      </pre>

      {/* UPSTREAM EXPLANATION */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Understanding Upstream Branch</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        When you set <code>-u</code>, your local branch remembers the remote branch it is linked to.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`Local branch: main
Upstream: origin/main

This enables:
git push
git pull
(git knows where to push/pull automatically)`}
      </pre>

      {/* PULL */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Pulling Changes</h2>
      <p className="text-gray-700 mb-2 leading-relaxed">
        Git pull = fetch + merge.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git pull

# or

git pull origin main`}
      </pre>

      {/* FETCH */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Fetching Changes</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        <strong>git fetch</strong> downloads remote changes but does NOT merge automatically.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git fetch

git log origin/main --oneline
# inspect before merging`}
      </pre>

      {/* DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Remote Workflow Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 overflow-x-auto leading-relaxed">
{`              Git Remote Interaction

      ┌─────────┐        git push        ┌──────────────┐
      │  LOCAL  │ ---------------------> │   REMOTE     │
      │         │ <--------------------- │ (GitHub/etc) │
      └─────────┘        git pull        └──────────────┘


      git fetch  = get updates but DO NOT merge
      git pull   = fetch + merge`}
      </pre>

      {/* REMOTE COMMANDS SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Common Remote Commands</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git remote -v           # list remotes
git remote add origin <url>
git push -u origin main  # first push
git push                 # subsequent pushes

git fetch                # download but don't merge
git pull                 # fetch + merge
git remote remove origin # remove remote`}
      </pre>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Always pull before pushing to avoid conflicts.</li>
        <li>Use SSH instead of HTTPS for easier authentication.</li>
        <li>Set upstream for clean workflow: <code>git push -u origin main</code>.</li>
        <li>Inspect changes with <code>git fetch</code> before merging.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>What is a Git remote?</li>
        <li>What is the difference between <code>git fetch</code> and <code>git pull</code>?</li>
        <li>What does <code>-u</code> do in <code>git push -u origin main</code>?</li>
        <li>How do you list your remotes?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create a new GitHub repository, add it as a remote, push your commits using
        <code className="bg-gray-200 px-1 py-0.5 rounded"> git push -u origin main </code>,
        then make a second commit and push normally using <code>git push</code>. Try using
        <code>git fetch</code> and inspect <code>origin/main</code>.
      </p>

    </LessonUI>
  );
}
