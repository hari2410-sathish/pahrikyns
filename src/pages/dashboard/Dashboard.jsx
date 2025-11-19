// src/pages/Dashboard.jsx
import React, { useState, useMemo } from "react";

import Sidebar from "../../components/dashboard/DashboardSidebar";
import TopBar from "../../components/dashboard/TopBar";
import StatCard from "../../components/dashboard/StatCard";
import CourseProgressList from "../../components/dashboard/CourseProgressList";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import UpcomingLessons from "../../components/dashboard/UpcomingLessons";
import UserProfileCard from "../../components/dashboard/UserProfileCard";
import ProgressCard from "../../components/dashboard/ProgressCard";
import NotificationCard from "../../components/dashboard/NotificationCard"; // 🔥 NEW

import RadialChart from "../../components/dashboard/DashboardCharts/RadialChart";
import LineChart from "../../components/dashboard/DashboardCharts/LineChart";
import DonutChart from "../../components/dashboard/DashboardCharts/DonutChart";
import Heatmap from "../../components/dashboard/DashboardCharts/Heatmap";

import Fuse from "fuse.js";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  // Dummy course list (replace later with backend)
  const courses = [
    { title: "Docker & Kubernetes", status: "In progress", percent: 70 },
    { title: "AWS Cloud Practitioner", status: "In progress", percent: 30 },
    { title: "Linux Fundamentals", status: "Completed", percent: 100 },
    { title: "Jenkins CI/CD", status: "Completed", percent: 100 },
    { title: "Terraform Infra as Code", status: "Not Started", percent: 0 },
  ];

  // Notifications Data (Can be dynamic later)
  const notifications = [
    { title: "New lesson added: Docker Swarm", time: "10 min ago" },
    { title: "Completed: Git Branching", time: "2 days ago" },
    { title: "New badge unlocked: DevOps Starter!", time: "3 days ago" },
    { title: "AWS CloudWatch updated lessons", time: "1 week ago" },
  ];

  // Fuzzy search config
  const fuse = useMemo(() => {
    return new Fuse(courses, {
      keys: ["title"],
      threshold: 0.45, // higher = more spelling mistakes allowed
    });
  }, [courses]);

  const filteredCourses = search
    ? fuse.search(search).map((res) => res.item)
    : courses;

  return (
    <div className="dashboard-root">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <main className="dashboard-main">

        {/* SEARCH + TOP INFO */}
        <TopBar onSearch={setSearch} />

        {/* KPI CARDS */}
        <section className="dashboard-grid-kpi">
          <StatCard title="Courses Enrolled" value="12" />
          <StatCard title="Lessons Completed" value="87" />
          <StatCard title="Certificates" value="4" />
          <StatCard title="Study Hours" value="42h" />
        </section>

        {/* CHARTS */}
        <section className="dashboard-grid-charts">
          <RadialChart />
          <LineChart />
          <DonutChart />
        </section>

        {/* HEATMAP + GOALS */}
        <section className="dashboard-grid-heat">
          <Heatmap />
          <ProgressCard />
        </section>

        {/* COURSE + ACTIVITY + UPCOMING + PROFILE + NOTIFICATIONS */}
        <section className="dashboard-grid-bottom">
          <div className="dashboard-grid-bottom-left">

            {/* ★ Search Filtering Applied Here */}
            <CourseProgressList courses={filteredCourses} />

            <ActivityFeed />
          </div>

          <div className="dashboard-grid-bottom-right">
            <UpcomingLessons />
            <UserProfileCard />

            {/* 🔥 NEW NOTIFICATION WIDGET */}
            <NotificationCard notifications={notifications} />
          </div>
        </section>

      </main>
    </div>
  );
}
