import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const handleSearch = (q) => setQuery(q);

  return (
    <SearchContext.Provider
      value={{ isSearchOpen, openSearch, closeSearch, query, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
