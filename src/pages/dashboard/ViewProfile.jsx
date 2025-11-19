import React from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ViewProfile() {
  const user = {
    name: "Hari Sathish",
    role: "Student · DevOps",
    email: "harisathish@gmail.com",
    phone: "+91 98765 43210",
    location: "Tamil Nadu, India",
    avatar: "/assets/profile.png", // change later
  };

  return (
    <div style={{ padding: "60px 80px", color: "white", position: "relative" }}>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ fontSize: "42px", fontWeight: "900", marginBottom: "25px" }}
      >
        My Profile
      </motion.h1>

      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>

        {/* LEFT — USER CARD */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "350px",
            padding: "35px",
            borderRadius: "22px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
          }}
        >
          {/* Avatar */}
          <img
            src={user.avatar}
            alt="profile"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              marginBottom: "20px",
              border: "4px solid rgba(0,200,255,0.6)",
            }}
          />

          <h2 style={{ fontSize: "28px", marginBottom: "6px" }}>{user.name}</h2>
          <p style={{ opacity: 0.8, marginBottom: "20px" }}>{user.role}</p>

          {/* Edit Profile Button */}
          <button
            style={{
              background: "linear-gradient(90deg,#00eaff,#7367f0)",
              border: "none",
              padding: "12px 25px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              color: "#000",
            }}
          >
            <FaUserEdit /> Edit Profile
          </button>
        </motion.div>

        {/* RIGHT — DETAILS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            flex: 1,
            padding: "35px",
            borderRadius: "22px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 style={{ fontSize: "26px", marginBottom: "25px", color: "#00eaff" }}>
            Profile Details
          </h2>

          {[
            { label: "Email", value: user.email, icon: <FaEnvelope /> },
            { label: "Phone", value: user.phone, icon: <FaPhone /> },
            { label: "Location", value: user.location, icon: <FaMapMarkerAlt /> },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "18px",
                marginBottom: "18px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                fontSize: "18px",
              }}
            >
              <span style={{ fontSize: "22px", color: "#00eaff" }}>{item.icon}</span>
              <div>
                <div style={{ opacity: 0.6, fontSize: "14px" }}>{item.label}</div>
                <div style={{ fontWeight: "600" }}>{item.value}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
