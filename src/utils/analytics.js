// src/utils/analytics.js

export function exportToCSV(filename = "analytics.csv", headers = [], rows = []) {
  const csvString = [
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");

  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function aggregateByMonth(items = [], valueKey = "value") {
  const map = {};

  items.forEach((it) => {
    const month = it.month || new Date(it.time || Date.now())
      .toLocaleString("default", { month: "short" });
    map[month] = (map[month] || 0) + (it[valueKey] || 0);
  });

  return Object.keys(map).map((m) => ({
    month: m,
    value: map[m],
  }));
}
