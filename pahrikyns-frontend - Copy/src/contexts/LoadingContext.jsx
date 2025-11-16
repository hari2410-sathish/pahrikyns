import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const showLoading = () => setVisible(true);
  const hideLoading = () => setVisible(false);

  return (
    <LoadingContext.Provider value={{ visible, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

// Default export needed for App.jsx import
export default LoadingProvider;
