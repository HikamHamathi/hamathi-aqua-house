import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        showSuggestions,
        setShowSuggestions,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);