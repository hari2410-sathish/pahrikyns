// src/pages/mycourses/DevOpsCourses.jsx
import React from "react";

export default function DevOpsCourses() {
  return (
    <div className="page">
      <h1>DevOps Courses</h1>

      <div className="course-list">
        <div className="course-card">Git</div>
        <div className="course-card">Jenkins</div>
        <div className="course-card">Docker</div>
        <div className="course-card">Kubernetes</div>
        <div className="course-card">Terraform</div>
        <div className="course-card">Ansible</div>
      </div>
    </div>
  );
}
