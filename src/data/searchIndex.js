import { courses } from "./coursesData";
import { lessons } from "./lessonsData";

export const searchIndex = [];

// Loop all course categories
Object.values(courses).forEach((category) => {
  // Loop all tools inside category
  Object.values(category.tools).forEach((tool) => {
    searchIndex.push({
      title: tool.title,
      type: "Tool",
      category: category.title,
      description: tool.description,
      route: `/courses/${category.id}/${tool.id}`,
    });
  });
});

// OPTIONAL: Add lessons also
Object.keys(lessons).forEach((category) => {
  Object.keys(lessons[category]).forEach((tool) => {
    lessons[category][tool].forEach((lesson) => {
      searchIndex.push({
        title: lesson.title,
        type: "Lesson",
        category,
        route: `/courses/${category}/${tool}/${lesson.id}`,
      });
    });
  });
});

console.log("🔍 Search Index Loaded:", searchIndex);
