"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMoviesStore } from "@/store/useMoviesStore";

export default function MoviesPage() {
  const { films, loading, error, fetchFilms } = useMoviesStore();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  const handleImageError = (filmId: string) => {
    setImageErrors((prev) => ({ ...prev, [filmId]: true }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-yellow-400">
        <div className="font-orbitron text-2xl">Loading films...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-yellow-400">
        <div className="font-orbitron text-2xl text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  console.log(films);

  return (
    <main className="min-h-screen bg-black p-8 text-yellow-400">
      <div className="container mx-auto">
        <h1 className="font-orbitron mb-8 text-4xl font-bold">
          Star Wars Films
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {films.map((film) => (
            <div
              key={film.uid}
              className="overflow-hidden rounded-lg border border-yellow-400/30 bg-gray-900 transition-all duration-300 hover:border-yellow-400"
            >
              {/* Movie Poster */}
              <div className="flex h-96 w-full items-center justify-center bg-gray-800">
                {film.poster && !imageErrors[film.uid] ? (
                  <Image
                    src={film.poster}
                    alt={film.properties.title}
                    width={300}
                    height={450}
                    className="h-full w-auto object-contain p-4"
                    onError={() => handleImageError(film.uid)}
                  />
                ) : (
                  <div className="text-center">
                    <div className="mb-2 text-6xl">🎬</div>
                    <p className="font-orbitron text-lg text-yellow-400/70">
                      {film.properties.title}
                    </p>
                  </div>
                )}
              </div>

              {/* Movie Details */}
              <div className="p-6">
                <h2 className="font-orbitron mb-4 text-2xl font-bold">
                  Episode {film.properties.episode_id}: {film.properties.title}
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p>
                    <span className="text-yellow-400">Director:</span>{" "}
                    {film.properties.director}
                  </p>
                  <p>
                    <span className="text-yellow-400">Producer:</span>{" "}
                    {film.properties.producer}
                  </p>
                  <p>
                    <span className="text-yellow-400">Release Date:</span>{" "}
                    {film.properties.release_date}
                  </p>
                  <p className="mt-4 line-clamp-3 text-sm">
                    {film.properties.opening_crawl}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
