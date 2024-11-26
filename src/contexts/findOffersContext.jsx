import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const FindOffersContext = createContext();

export const FindOffersProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  return (
    <FindOffersContext.Provider
      value={{
        page,
        title,
        setTitle,
        setPage,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </FindOffersContext.Provider>
  );
};
