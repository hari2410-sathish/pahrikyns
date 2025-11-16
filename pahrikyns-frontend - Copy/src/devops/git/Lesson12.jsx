// File: src/lessons/devops/git/Lesson12.jsx
// Full Detailed Git Lesson 12 — Tags & Releases (lightweight, annotated, pushing, versioning)
// Pure JSX + Tailwind

import LessonUI from "../../components/LessonUI.jsx";

export default function Lesson12() {
  return (
    <LessonUI title="Lesson 12 — Git Tags & Releases (FULL Detailed Version)">

      {/* INTRO */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        Tags are used to mark specific points in Git history—usually versions or releases.
        They help identify important commits such as v1.0.0 or stable release points.
        Git supports two types of tags: <strong>lightweight</strong> and <strong>annotated</strong>.
      </p>

      {/* WHAT ARE TAGS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. What Are Git Tags?</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        A tag is like a snapshot label or “bookmark” pointing to a specific commit.
        Tags never move once created, unlike branches.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 overflow-x-auto leading-relaxed">
{`main branch:   A ---- B ---- C ---- D (HEAD)

Tag v1.0.0 may point to commit C
Tag v1.1.0 may point to commit D`}      
      </pre>

      {/* TYPES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Two Types of Tags</h2>

      <h3 className="text-xl font-semibold mt-4 mb-2">Lightweight Tags</h3>
      <p className="text-gray-700 mb-2 leading-relaxed">A simple pointer to a commit (no metadata).</p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git tag v1.0.0

git tag v1.0.0 <commit-id>`}      
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Annotated Tags (Recommended)</h3>
      <p className="text-gray-700 mb-2 leading-relaxed">
        Annotated tags contain metadata (author, date, message) and are stored as full Git objects.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git tag -a v1.0.0 -m "Release version 1.0.0"

git tag -a v1.0.0 <commit-id> -m "Stable release"`}      
      </pre>

      {/* SHOW TAGS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Viewing Tags</h2>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`git tag

git tag -l "v1.*"`}      
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Show tag details</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`git show v1.0.0`}      
      </pre>

      {/* PUSH TAGS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Pushing Tags to Remote</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Tags are <u>not pushed automatically</u>. You must push them explicitly.
      </p>

      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# push one tag
git push origin v1.0.0

# push all tags
git push origin --tags`}      
      </pre>

      <h3 className="text-xl font-semibold mt-4 mb-2">Delete a remote tag</h3>
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm mb-6 overflow-x-auto">
{`# delete local tag
git tag -d v1.0.0

# delete remote tag
git push origin :refs/tags/v1.0.0`}      
      </pre>

      {/* VERSIONING */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Semantic Versioning (SemVer)</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 leading-relaxed overflow-x-auto">
{`vMAJOR.MINOR.PATCH

1.0.0 → Initial stable version
1.1.0 → New features, backward compatible
1.1.1 → Small fixes`}      
      </pre>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li><strong>MAJOR:</strong> Breaking changes</li>
        <li><strong>MINOR:</strong> Backward-compatible features</li>
        <li><strong>PATCH:</strong> Bug fixes</li>
      </ul>

      {/* RELEASES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. GitHub Releases</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        GitHub allows turning a tag into a downloadable "Release" (ZIP/TAR) with notes.
      </p>

      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`GitHub → Repo → Releases → Draft new release
Choose tag → Add notes → Publish`}      
      </pre>

      {/* DIAGRAM */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Tag Workflow Diagram</h2>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-6 leading-relaxed overflow-x-auto">
{`Commit History:
A ---- B ---- C ---- D ---- E
              ^
              |
           Tag v1.0.0`}      
      </pre>

      {/* BEST PRACTICES */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Best Practices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Use <strong>annotated</strong> tags for releases.</li>
        <li>Follow semantic versioning for consistency.</li>
        <li>Push tags with <code>--tags</code> when publishing releases.</li>
        <li>Never reuse or change existing release tags.</li>
        <li>Add release notes on GitHub for important milestones.</li>
      </ul>

      {/* QUIZ */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Mini Quiz</h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
        <li>What is the difference between lightweight and annotated tags?</li>
        <li>How do you push all local tags to a remote?</li>
        <li>What does SemVer stand for?</li>
        <li>How do you delete a remote tag?</li>
      </ol>

      {/* EXERCISE */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Exercise</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Create three commits, tag the second commit as <code>v1.0.0</code>, tag the latest commit
        as <code>v1.1.0</code> using annotated tags, and push them to GitHub. Then create a new release
        from GitHub UI using <code>v1.1.0</code>.
      </p>

      {/* SUMMARY */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
        <li><strong>Tags</strong> mark important points in commit history.</li>
        <li><strong>Annotated tags</strong> are preferred for releases.</li>
        <li><strong>Pushing tags</strong> requires manual commands.</li>
        <li><strong>SemVer</strong> defines a release versioning standard.</li>
        <li><strong>GitHub Releases</strong> add notes and downloadable bundles.</li>
      </ul>

    </LessonUI>
  );
}
