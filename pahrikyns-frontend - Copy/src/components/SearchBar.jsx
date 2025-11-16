// src/components/SearchBar.jsx

import React, { useState } from "react";
import { TextField, Paper, List, ListItem, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import { navbarCourses } from "../data/navbarCourses";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // 🔍 SEARCH FILTER LOGIC
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (!value || value.length < 2) {
      setResults([]);
      return;
    }

    // flatten the structure: category → tools
    const matched = [];

    navbarCourses.forEach((cat) => {
      cat.tools.forEach((tool) => {
        if (tool.name.toLowerCase().includes(value)) {
          matched.push({
            name: tool.name,
            path: tool.path,
          });
        }
      });
    });

    setResults(matched);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextField
        size="small"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        sx={{
          width: 250,
          borderRadius: "8px",
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
          },
        }}
      />

      {/* SEARCH RESULT DROPDOWN */}
      {results.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "45px",
            left: 0,
            width: "100%",
            maxHeight: "250px",
            overflowY: "auto",
            zIndex: 20,
            backgroundColor: "background.paper",
          }}
        >
          <List>
            {results.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setQuery("")}
                >
                  {item.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}
