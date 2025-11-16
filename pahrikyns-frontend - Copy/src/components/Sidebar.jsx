// src/components/Sidebar.jsx

import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  ListItemIcon,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { Link } from "react-router-dom";
import { navbarCourses } from "../data/navbarCourses";

export default function Sidebar({ open, onClose }) {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div
        style={{
          width: 280,
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Courses</h2>

        <Divider sx={{ mb: 1 }} />

        <List>
          {navbarCourses.map((cat) => (
            <div key={cat.name}>
              {/* CATEGORY BUTTON */}
              <ListItemButton onClick={() => toggleCategory(cat.name)}>
                <ListItemIcon>{cat.icon}</ListItemIcon>
                <ListItemText primary={cat.name} />

                {openCategory === cat.name ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              {/* TOOLS COLLAPSE */}
              <Collapse in={openCategory === cat.name} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {cat.tools.map((tool) => (
                    <ListItemButton
                      key={tool.name}
                      sx={{ pl: 6 }}
                      component={Link}
                      to={tool.path}
                      onClick={onClose}
                    >
                      <ListItemIcon>{tool.icon}</ListItemIcon>
                      <ListItemText primary={tool.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              <Divider sx={{ my: 1 }} />
            </div>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
