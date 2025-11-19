// src/pages/mycourses/AwsCourses.jsx
import React from "react";

export default function AwsCourses() {
  return (
    <div className="page">
      <h1>AWS Courses</h1>

      <div className="course-list">
        <div className="course-card">EC2</div>
        <div className="course-card">S3</div>
        <div className="course-card">IAM</div>
        <div className="course-card">Lambda</div>
        <div className="course-card">SQS</div>
        <div className="course-card">SNS</div>
        <div className="course-card">CloudWatch</div>
      </div>
    </div>
  );
}
