import { createContext, useState } from "react";

export const QueryContext = createContext();

export const QueryContextProvider = ({ children }) => {
  const [queryValue, setQueryValue] = useState("");

  return (
    <QueryContext.Provider value={{ queryValue, setQueryValue }}>
      {children}
    </QueryContext.Provider>
  );
};
