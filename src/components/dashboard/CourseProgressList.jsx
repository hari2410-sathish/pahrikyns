import React from "react";

const COURSES = [
  { id: 1, title: "Docker & Kubernetes", progress: 78 },
  { id: 2, title: "Jenkins CI/CD Pipeline", progress: 92 },
  { id: 3, title: "Terraform on AWS", progress: 46 },
  { id: 4, title: "Linux Admin Basics", progress: 63 },
];

export default function CourseProgressList() {
  return (
    <div className="holo-card">
      <div className="widget-header">
        <h3>My Courses</h3>
        <button className="secondary-btn">View All</button>
      </div>

      <div className="course-list">
        {COURSES.map((c) => (
          <div key={c.id} className="course-row">
            <div className="course-main">
              <div className="course-title">{c.title}</div>
              <div className="course-progress-bar">
                <div
                  className="course-progress-fill"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>
            <div className="course-progress-label">{c.progress}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
