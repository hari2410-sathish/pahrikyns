import React from "react";

export default function ProgressCard() {
  return (
    <div className="holo-card">
      <div className="widget-header">
        <h3>Learning Goals</h3>
      </div>

      <ul className="goals-list">
        <li>Finish Docker & Kubernetes course this week</li>
        <li>Score 90%+ in next Jenkins test</li>
        <li>Complete 3 Terraform labs on AWS</li>
      </ul>

      <div className="goals-footer">
        <span>Weekly completion: 60%</span>
        <button className="secondary-btn">Edit goals</button>
      </div>
    </div>
  );
}
