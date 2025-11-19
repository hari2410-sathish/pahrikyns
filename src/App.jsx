// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// GLOBAL STYLES
import "./index.css";
import "./styles/dashboard.css";

// NAV & FOOTER
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// PUBLIC PAGES
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseTools from "./pages/CourseTools";
import LessonList from "./pages/LessonList";
import LessonPage from "./pages/LessonPage";

// 🆕 MY COURSES PAGES (Correct import)
import MyCourses from "./pages/dashboard/MyCourses";
import DevOpsCourses from "./pages/MyCourses/DevOpsCourses";
import AwsCourses from "./pages/MyCourses/AwsCourses";
import OsCourses from "./pages/MyCourses/OsCourses";

// AUTH
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";

// ADMIN
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import ManageCourses from "./pages/admin/ManageCourses";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";
import AddLesson from "./pages/admin/AddLesson";
import EditLesson from "./pages/admin/EditLesson";
import ManageLessons from "./pages/admin/ManageLessons";
import Projects from "./pages/admin/Projects";

import MCQTests from "./pages/admin/MCQTests";
import AddTest from "./pages/admin/AddTest";
import EditTest from "./pages/admin/EditTest";
import ViewTest from "./pages/admin/ViewTest";
import TakeTest from "./pages/admin/TakeTest";
import TestResult from "./pages/admin/TestResult";

// Page transition wrapper
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: "calc(100vh - 160px)" }}
    >
      {children}
    </motion.div>
  );
}

// Background particles
function NeonParticles({ count = 28 }) {
  const particles = React.useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 4 + Math.random() * 6,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 6,
      opacity: 0.45 + Math.random() * 0.5,
    })), []);

  return (
    <div className="neon-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <NeonParticles count={28} />
      <NavBar />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>

          {/* PUBLIC */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/courses" element={<PageWrapper><Courses /></PageWrapper>} />
          
          {/* 🆕 MY COURSES AREA */}
          <Route path="/my-courses" element={<PageWrapper><MyCourses /></PageWrapper>} />
          <Route path="/my-courses/devops" element={<PageWrapper><DevOpsCourses /></PageWrapper>} />
          <Route path="/my-courses/aws" element={<PageWrapper><AwsCourses /></PageWrapper>} />
          <Route path="/my-courses/os" element={<PageWrapper><OsCourses /></PageWrapper>} />

          {/* COURSE → LESSON STRUCTURE */}
          <Route path="/courses/:category" element={<PageWrapper><CourseTools /></PageWrapper>} />
          <Route path="/courses/:category/:tool" element={<PageWrapper><LessonList /></PageWrapper>} />
          <Route path="/courses/:category/:tool/:lessonId" element={<PageWrapper><LessonPage /></PageWrapper>} />

          {/* AUTH */}
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />

          {/* ADMIN */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />
          import AccountSettings from "./pages/dashboard/AccountSettings";
import ViewProfile from "./pages/dashboard/ViewProfile";

// ...
<Route
  path="/dashboard/profile"
  element={<PageWrapper><ViewProfile /></PageWrapper>}
/>
<Route
  path="/dashboard/settings"
  element={<PageWrapper><AccountSettings /></PageWrapper>}
/>


          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route path="dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
            <Route path="manage-courses" element={<PageWrapper><ManageCourses /></PageWrapper>} />
            <Route path="add-course" element={<PageWrapper><AddCourse /></PageWrapper>} />
            <Route path="edit-course/:id" element={<PageWrapper><EditCourse /></PageWrapper>} />

            <Route path="add-lesson/:courseId" element={<PageWrapper><AddLesson /></PageWrapper>} />
            <Route path="manage-lessons/:courseId" element={<PageWrapper><ManageLessons /></PageWrapper>} />
            <Route path="edit-lesson/:courseId/:lessonId" element={<PageWrapper><EditLesson /></PageWrapper>} />

            <Route path="mcq-tests" element={<PageWrapper><MCQTests /></PageWrapper>} />
            <Route path="add-test" element={<PageWrapper><AddTest /></PageWrapper>} />
            <Route path="view-test/:id" element={<PageWrapper><ViewTest /></PageWrapper>} />
            <Route path="edit-test/:id" element={<PageWrapper><EditTest /></PageWrapper>} />
            <Route path="take-test/:id" element={<PageWrapper><TakeTest /></PageWrapper>} />
            <Route path="test-result/:resultId" element={<PageWrapper><TestResult /></PageWrapper>} />

            <Route path="projects" element={<PageWrapper><Projects /></PageWrapper>} />
          </Route>
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}
