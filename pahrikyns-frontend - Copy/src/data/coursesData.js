export const coursesData = [
  {
    category: "DevOps",
    tools: [
      {
        name: "Git",
        path: "/devops/git",
        lessons: Array.from({ length: 20 }).map((_, i) => ({
          id: `lesson-${i + 1}`,
          title: `Git Lesson ${i + 1}`,
          path: `/devops/git/lesson-${i + 1}`,
        })),
      },
    ],
  },
];
