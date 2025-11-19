// src/pages/MyCourses/MyCourses.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { FaGitAlt, FaAws, FaDocker, FaLinux } from "react-icons/fa";
import {
  SiJenkins,
  SiKubernetes,
  SiTerraform,
  SiAnsible,
  SiPrometheus,
  SiGrafana,
  SiSplunk,
  SiUbuntu,
  SiRedhat,
  SiDebian,
} from "react-icons/si";

export default function MyCourses() {
  // later you can replace these with data from backend / localStorage
  const devopsItems = [
    {
      label: "Git",
      icon: <FaGitAlt />,
      route: "/courses/devops/git",
      lessons: 20,
      progress: 40,
    },
    {
      label: "Jenkins",
      icon: <SiJenkins />,
      route: "/courses/devops/jenkins",
      lessons: 18,
      progress: 65,
    },
    {
      label: "Docker",
      icon: <FaDocker />,
      route: "/courses/devops/docker",
      lessons: 22,
      progress: 80,
    },
    {
      label: "Kubernetes",
      icon: <SiKubernetes />,
      route: "/courses/devops/kubernetes",
      lessons: 25,
      progress: 10,
    },
    {
      label: "Terraform",
      icon: <SiTerraform />,
      route: "/courses/devops/terraform",
      lessons: 15,
      progress: 0,
    },
    {
      label: "Ansible",
      icon: <SiAnsible />,
      route: "/courses/devops/ansible",
      lessons: 16,
      progress: 0,
    },
    {
      label: "Prometheus",
      icon: <SiPrometheus />,
      route: "/courses/devops/prometheus",
      lessons: 14,
      progress: 0,
    },
    {
      label: "Splunk",
      icon: <SiSplunk />,
      route: "/courses/devops/splunk",
      lessons: 14,
      progress: 0,
    },
    {
      label: "Grafana",
      icon: <SiGrafana />,
      route: "/courses/devops/grafana",
      lessons: 12,
      progress: 0,
    },
  ];

  const awsItems = [
    { label: "EC2", icon: <FaAws />, route: "/courses/aws/ec2", lessons: 18, progress: 30 },
    { label: "S3", icon: <FaAws />, route: "/courses/aws/s3", lessons: 16, progress: 0 },
    { label: "IAM", icon: <FaAws />, route: "/courses/aws/iam", lessons: 12, progress: 0 },
    { label: "Lambda", icon: <FaAws />, route: "/courses/aws/lambda", lessons: 14, progress: 0 },
    { label: "SQS", icon: <FaAws />, route: "/courses/aws/sqs", lessons: 10, progress: 0 },
    { label: "SNS", icon: <FaAws />, route: "/courses/aws/sns", lessons: 8, progress: 0 },
  ];

  const osItems = [
    { label: "Linux Basics", icon: <FaLinux />, route: "/courses/os/linux", lessons: 20, progress: 70 },
    { label: "Ubuntu", icon: <SiUbuntu />, route: "/courses/os/ubuntu", lessons: 12, progress: 0 },
    { label: "CentOS", icon: <SiDebian />, route: "/courses/os/centos", lessons: 10, progress: 0 },
    { label: "Red Hat", icon: <SiRedhat />, route: "/courses/os/redhat", lessons: 15, progress: 0 },
    { label: "Shell Commands", icon: <FaLinux />, route: "/courses/os/shell", lessons: 18, progress: 0 },
  ];

  return (
    <div
      style={{
        padding: "60px 90px",
        minHeight: "100vh",
        color: "white",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: "48px",
          fontWeight: "900",
          marginBottom: "10px",
        }}
      >
        My Courses
      </motion.h1>

      <p style={{ opacity: 0.8, marginBottom: "40px" }}>
        Choose a track to continue your DevOps, AWS & OS learning.
      </p>

      {/* DEVOPS */}
      <Section title="DevOps" emoji="🚀" items={devopsItems} />

      {/* AWS */}
      <Section title="AWS" emoji="☁" items={awsItems} />

      {/* OS */}
      <Section title="Operating System" emoji="💻" items={osItems} />
    </div>
  );
}

/* 🔥 SECTION WITH MINIMAL NEON CARD GRID */
function Section({ title, emoji, items }) {
  return (
    <div style={{ marginBottom: "56px" }}>
      {/* Section Title */}
      <h2
        style={{
          fontSize: "30px",
          fontWeight: "800",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#22d3ee",
        }}
      >
        <span style={{ fontSize: "26px" }}>{emoji}</span>
        {title}
      </h2>

      {/* Card Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={item.route}
            style={{
              padding: "18px 20px",
              borderRadius: "18px",
              background: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(148,163,184,0.25)",
              backdropFilter: "blur(20px)",
              textDecoration: "none",
              color: "white",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "0.3s",
              boxShadow: "0 0 18px rgba(15,23,42,0.9)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 0 26px rgba(34,211,238,0.55)";
              e.currentTarget.style.borderColor = "rgba(34,211,238,0.8)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 18px rgba(15,23,42,0.9)";
              e.currentTarget.style.borderColor =
                "rgba(148,163,184,0.25)";
            }}
          >
            {/* Top row: icon + title + lesson count */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "26px",
                    display: "inline-flex",
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "radial-gradient(circle at 30% 0,#22d3ee,#0f172a)",
                  }}
                >
                  {item.icon}
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "16px" }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      opacity: 0.7,
                    }}
                  >
                    {item.lessons} lessons
                  </div>
                </div>
              </div>

              {/* mini progress text on the right */}
              <div
                style={{
                  fontSize: "12px",
                  textAlign: "right",
                  opacity: item.progress > 0 ? 0.8 : 0.5,
                }}
              >
                {item.progress > 0 ? `${item.progress}%` : "Not started"}
              </div>
            </div>

            {/* progress bar */}
            <div
              style={{
                marginTop: "4px",
                height: 7,
                borderRadius: 999,
                background: "rgba(15,23,42,0.9)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${item.progress}%`,
                  height: "100%",
                  borderRadius: "inherit",
                  background:
                    "linear-gradient(90deg,#22c55e,#a3e635,#22c55e)",
                  boxShadow:
                    item.progress > 0
                      ? "0 0 12px rgba(34,197,94,0.7)"
                      : "none",
                  transition: "width 0.35s ease",
                }}
              />
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
