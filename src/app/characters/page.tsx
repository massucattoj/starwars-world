"use client";

import { useCallback, useEffect, useState } from "react";

import { useCharactersStore } from "@/store/useCharactersStore";

import { CharacterCard } from "./components/CharacterCard";
import { LoadingSkeleton } from "./components/LoadingCharactersSkeleton";
import { Pagination } from "./components/Pagination";
import { SearchBar } from "./components/SearchBar";

export default function CharactersPage() {
  const {
    characters,
    loading,
    error,
    fetchCharacters,
    currentPage,
    totalPages,
    filter,
    hasAttemptedFetch,
    setFilter,
    nextPage,
    previousPage,
    clearError,
  } = useCharactersStore();

  const [searchTerm, setSearchTerm] = useState(filter);

  // Debounced filter handler
  const handleFilterChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Initial load
  useEffect(() => {
    if (
      characters.length === 0 &&
      !filter &&
      !searchTerm &&
      !hasAttemptedFetch &&
      !loading
    ) {
      fetchCharacters(1);
      return;
    }
  }, [characters.length, hasAttemptedFetch, loading]);

  // Handle search term changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 2) {
        setFilter(searchTerm);
        fetchCharacters(1, searchTerm);
      } else if (searchTerm === "") {
        setFilter("");
        fetchCharacters(1, "");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]); // Only depend on searchTerm

  const handleRetry = () => {
    clearError();
    if (filter) {
      fetchCharacters(1, filter);
    } else {
      fetchCharacters(1);
    }
  };

  return (
    <main className="min-h-screen bg-black p-8 text-yellow-400">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="font-orbitron text-4xl font-bold">
            Star Wars Characters
          </h1>

          <SearchBar value={searchTerm} onChange={handleFilterChange} />
        </div>

        {error && (
          <div className="mb-8 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center">
            <div className="font-orbitron mb-2 text-xl text-red-500">
              Something went wrong
            </div>
            <p className="mb-4 text-gray-300">{error}</p>
            <button
              onClick={handleRetry}
              className="rounded bg-yellow-400 px-4 py-2 font-semibold text-black transition-colors hover:bg-yellow-300"
              disabled={loading}
            >
              {loading ? "Retrying..." : "Try Again"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <LoadingSkeleton />
          ) : characters.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="text-yellow-400/70">
                {filter
                  ? `No characters found for "${filter}"`
                  : "No characters found"}
              </p>
            </div>
          ) : (
            characters.map((character) => (
              <CharacterCard key={character.uid} character={character} />
            ))
          )}
        </div>

        {characters.length > 0 && !filter && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            onPrevious={previousPage}
            onNext={nextPage}
          />
        )}
      </div>
    </main>
  );
}
