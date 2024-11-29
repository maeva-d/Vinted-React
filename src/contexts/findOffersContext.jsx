import { createContext } from "react";
import { useState } from "react";

export const FindOffersContext = createContext();

export const FindOffersProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");

  return (
    <FindOffersContext.Provider
      value={{
        page,
        title,
        setTitle,
        setPage,
      }}
    >
      {children}
    </FindOffersContext.Provider>
  );
};
