import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import AppThemeProvider from "./ThemeContext";
import AdminAuthProvider from "./contexts/AdminAuthContext";
import NotificationProvider from "./components/NotificationProvider";
import LoadingProvider from "./contexts/LoadingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppThemeProvider>
        <AdminAuthProvider>
          <NotificationProvider>
            <LoadingProvider>
              <App />
            </LoadingProvider>
          </NotificationProvider>
        </AdminAuthProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
