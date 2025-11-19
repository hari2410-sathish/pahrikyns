// src/contexts/LoadingContext.jsx
import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export default function LoadingProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <LoadingContext.Provider value={{ visible, show, hide }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
