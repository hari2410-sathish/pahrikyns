import React from "react";
import TopNav from "./TopNav";
import Sidebar from "./AppSidebar";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <>
      <TopNav />

      <Sidebar />

      <Box
        sx={{
          marginLeft: "240px",
          marginTop: "80px",
          padding: "20px",
        }}
      >
        {children}
      </Box>
    </>
  );
}
