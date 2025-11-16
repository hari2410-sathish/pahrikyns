// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Main Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";

// Course System
import CourseTools from "./pages/CourseTools";
import LessonList from "./pages/LessonList";
import LessonPage from "./pages/LessonPage";

// Admin Pages
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";
import AddLesson from "./pages/admin/AddLesson";
import EditLesson from "./pages/admin/EditLesson";
import Projects from "./pages/admin/Projects";
import MCQTests from "./pages/admin/MCQTests";
import AddTest from "./pages/admin/AddTest";
import AdminLogin from "./pages/admin/AdminLogin";

export default function App() {
  return (
    <>
      <NavBar />

      <Routes>

        {/* Default Admin redirect */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />

        {/* ------------------------------------
            NEW COURSE SYSTEM (GLOBAL ROUTING)
           ------------------------------------ */}

        {/* CATEGORY → /courses/devops */}
        <Route path="/courses/:category" element={<CourseTools />} />

        {/* TOOL LIST → /courses/devops/git */}
        <Route path="/courses/:category/:tool" element={<LessonList />} />

        {/* LESSON PAGE → /courses/devops/git/lesson-1 */}
        <Route
          path="/courses/:category/:tool/:lessonId"
          element={<LessonPage />}
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Area */}
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="edit-course/:id" element={<EditCourse />} />
          <Route path="add-lesson/:courseId" element={<AddLesson />} />
          <Route path="edit-lesson/:lessonId" element={<EditLesson />} />
          <Route path="projects" element={<Projects />} />
          <Route path="mcq-tests" element={<MCQTests />} />
          <Route path="add-test" element={<AddTest />} />
        </Route>

      </Routes>

      <Footer />
    </>
  );
}
