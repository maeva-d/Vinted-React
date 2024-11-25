import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const FindOffersContext = createContext();

export const FindOffersProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");

  // setSearchParams({ page: page, title: title });

  return (
    <FindOffersContext.Provider
      value={{
        title,
        setTitle,
        page,
        setPage,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </FindOffersContext.Provider>
  );
};
