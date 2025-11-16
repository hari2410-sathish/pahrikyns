// src/components/CourseCard.jsx
import React, { useContext } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { AppThemeContext } from "../ThemeContext";

export default function CourseCard({ title, subtitle, students }) {
  const { variant } = useContext(AppThemeContext);

  const isFuturistic = variant === "futuristic";

  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 1,
        height: "100%",
        background: isFuturistic
          ? "rgba(255,255,255,0.04)"
          : "background.paper",
        backdropFilter: isFuturistic ? "blur(10px)" : "none",
        border: isFuturistic ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "0.25s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        {/* Title + Subtitle */}
        <Box sx={{ minHeight: 40 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>

        {/* Footer Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {students ? `${students} students` : ""}
          </Typography>

          <Button
            variant={isFuturistic ? "contained" : "outlined"}
            color="secondary"
            size="small"
          >
            Start Learning
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
