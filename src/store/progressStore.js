// src/store/progressStore.js

export const saveProgress = (key, value) => {
  let progress = JSON.parse(localStorage.getItem("progress")) || {};
  progress[key] = value;
  localStorage.setItem("progress", JSON.stringify(progress));
};

export const getProgress = () => {
  return JSON.parse(localStorage.getItem("progress")) || {};
};
