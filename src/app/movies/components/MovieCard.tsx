import Image from "next/image";

import { Movie } from "@/types/movies";

interface MovieCardProps {
  film: Movie;
  imageErrors: Record<string, boolean>;
  handleImageError: (filmId: string) => void;
}

const MovieCard = ({ film, imageErrors, handleImageError }: MovieCardProps) => {
  return (
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
  );
};

export default MovieCard;
