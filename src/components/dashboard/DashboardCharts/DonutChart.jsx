import { getProgress } from "../../../store/progressStore";

export default function DonutChart() {
  const p = getProgress();

  const segments = [
    { label: "DevOps", value: p.devops || 0, color: "#06b6d4" },
    { label: "Cloud", value: p.aws || 0, color: "#7c3aed" },
    { label: "Linux", value: p.linux || 0, color: "#22c55e" },
  ];
