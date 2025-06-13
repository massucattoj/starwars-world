"use client";

import { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useCharactersStore } from "@/store/useCharactersStore";

export default function CharactersPage() {
  const {
    characters,
    loading,
    error,
    fetchCharacters,
    currentPage,
    totalPages,
    totalRecords,
    filter,
    setFilter,
    nextPage,
    previousPage,
  } = useCharactersStore();

  const [searchTerm, setSearchTerm] = useState(filter);

  // Debounced filter handler
  const handleFilterChange = useCallback(
    (value: string) => {
      setSearchTerm(value);

      // Clear any existing timeout
      const timeoutId = setTimeout(() => {
        if (value.length > 2 || value.length === 0) {
          setFilter(value);
        }
      }, 500);

      // Cleanup function to clear the timeout
      return () => clearTimeout(timeoutId);
    },
    [setFilter],
  );

  // Effect to handle filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 2 || searchTerm.length === 0) {
        setFilter(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, setFilter]);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage, fetchCharacters, filter]);

  return (
    <main className="min-h-screen bg-black p-8 text-yellow-400">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="font-orbitron text-4xl font-bold">
            Star Wars Characters
          </h1>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilterChange(e.target.value)}
              placeholder="Search by name..."
              className="w-full rounded-lg border border-yellow-400/30 bg-gray-900 px-4 py-2 pl-10 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-400 focus:outline-none md:w-64"
            />
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-yellow-400/50" />
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center">
            <div className="font-orbitron text-xl text-red-500">
              Error: {error}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Loading skeleton for character cards
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-yellow-400/30 bg-gray-900 p-6"
              >
                <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-yellow-400/20" />
                <div className="space-y-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 animate-pulse rounded bg-yellow-400/20"
                    />
                  ))}
                </div>
              </div>
            ))
          ) : characters.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="text-yellow-400/70">No characters found</p>
            </div>
          ) : (
            characters.map((character) => (
              <div
                key={character.uid}
                className="rounded-lg border border-yellow-400/30 bg-gray-900 p-6 transition-all duration-300 hover:border-yellow-400"
              >
                <h2 className="font-orbitron mb-4 text-2xl font-bold">
                  {character.name}
                </h2>
                <div className="space-y-2 text-gray-300">
                  {character.properties ? (
                    <>
                      <p>
                        <span className="text-yellow-400">Height:</span>{" "}
                        {character.properties.height}cm
                      </p>
                      <p>
                        <span className="text-yellow-400">Mass:</span>{" "}
                        {character.properties.mass}kg
                      </p>
                      <p>
                        <span className="text-yellow-400">Birth Year:</span>{" "}
                        {character.properties.birth_year}
                      </p>
                      <p>
                        <span className="text-yellow-400">Gender:</span>{" "}
                        {character.properties.gender}
                      </p>
                      <p>
                        <span className="text-yellow-400">Hair Color:</span>{" "}
                        {character.properties.hair_color}
                      </p>
                      <p>
                        <span className="text-yellow-400">Eye Color:</span>{" "}
                        {character.properties.eye_color}
                      </p>
                      <p>
                        <span className="text-yellow-400">Skin Color:</span>{" "}
                        {character.properties.skin_color}
                      </p>
                    </>
                  ) : (
                    <p className="text-yellow-400/70">Loading details...</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {characters.length > 0 && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-4">
              <button
                onClick={previousPage}
                disabled={currentPage === 1 || loading}
                className="rounded-lg border border-yellow-400/30 bg-gray-900 px-4 py-2 text-yellow-400 transition-all duration-200 hover:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="font-orbitron text-yellow-400">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages || loading}
                className="rounded-lg border border-yellow-400/30 bg-gray-900 px-4 py-2 text-yellow-400 transition-all duration-200 hover:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
