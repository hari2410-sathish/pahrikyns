import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");

  const showNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {message && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "12px 20px",
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
            zIndex: 9999
          }}
        >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}

// main hook
export const useNotification = () => useContext(NotificationContext);

// extra alias (so Login.jsx will work)
export const useNotify = () => useContext(NotificationContext);
