import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export default function NotificationProvider({ children }) {
  // Toast message
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Notification panel items
  const [items, setItems] = useState([]);

  /* -------------------
      Toast Notify
  -------------------- */
  const notify = (message, severity = "info") => {
    setToast({ open: true, message, severity });
  };

  /* -------------------
      Push Panel Message
  -------------------- */
  const push = useCallback((notif) => {
    const n = {
      id: notif.id || Date.now(),
      title: notif.title || "Notification",
      message: notif.message || "",
      level: notif.level || "info",
      createdAt: notif.createdAt || new Date().toISOString(),
      seen: false,
    };
    setItems((s) => [n, ...s]);
  }, []);

  const markSeen = (id) => {
    setItems((s) =>
      s.map((n) => (n.id === id ? { ...n, seen: true } : n))
    );
  };

  const remove = (id) => {
    setItems((s) => s.filter((x) => x.id !== id));
  };

  const clearAll = () => setItems([]);

  return (
    <NotificationContext.Provider
      value={{ items, push, notify, markSeen, remove, clearAll }}
    >
      {children}

      {/* Toast UI */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((s) => ({ ...s, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}
