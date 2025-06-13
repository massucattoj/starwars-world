"use client";

import { useEffect, useState } from "react";
import { useMoviesStore } from "@/store/useMoviesStore";
import MovieCard from "./components/MovieCard";
import MovieCardSkeleton from "./components/LoadingMoviewSkeleton";

export default function MoviesPage() {
  const { films, loading, error, fetchFilms } = useMoviesStore();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (films.length === 0) {
      fetchFilms();
    }
  }, []);

  const handleImageError = (filmId: string) => {
    setImageErrors((prev) => ({ ...prev, [filmId]: true }));
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-yellow-400">
        <div className="font-orbitron text-2xl text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black p-8 text-yellow-400">
      <div className="container mx-auto">
        <h1 className="font-orbitron mb-8 text-4xl font-bold">
          Star Wars Films
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          ) : films.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="text-yellow-400/70">No films found</p>
            </div>
          ) : (
            films.map((film) => (
              <MovieCard
                key={film.uid}
                film={film}
                imageErrors={imageErrors}
                handleImageError={handleImageError}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
