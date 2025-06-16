import { api, omdbApi } from "@/lib/api";
import { Movie } from "@/types/movies";
import { create } from "zustand";

interface FilmsState {
  films: Movie[];
  loading: boolean;
  error: string | null;
  hasAttemptedFetch: boolean;
  fetchFilms: () => Promise<void>;
  clearError: () => void;
}

export const useMoviesStore = create<FilmsState>((set, get) => ({
  films: [],
  loading: false,
  error: null,
  hasAttemptedFetch: false,

  clearError: () => {
    set({ error: null });
  },

  fetchFilms: async () => {
    const { films, loading, hasAttemptedFetch } = get();

    // Prevent multiple simultaneous requests or refetching if already attempted and failed
    if (
      loading ||
      films.length > 0 ||
      (hasAttemptedFetch && films.length === 0)
    )
      return;

    try {
      set({ loading: true, error: null, hasAttemptedFetch: true });

      const response = await api.get("/films");
      const films = response.data.result;

      const filmsWithPosters = await Promise.allSettled(
        films.map(async (film: Movie) => {
          try {
            const omdbResponse = await omdbApi.get("", {
              params: {
                t: film.properties.title,
                type: "movie",
              },
            });
            return {
              ...film,
              poster:
                omdbResponse.data.Poster !== "N/A"
                  ? omdbResponse.data.Poster
                  : null,
            };
          } catch (error) {
            console.warn(
              `Failed to fetch poster for ${film.properties.title}:`,
              error,
            );
            return {
              ...film,
              poster: null,
            };
          }
        }),
      );

      // Extract successful results
      const successfulFilms = filmsWithPosters
        .filter(
          (result): result is PromiseFulfilledResult<Movie> =>
            result.status === "fulfilled",
        )
        .map((result) => result.value);

      set({ films: successfulFilms, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch films",
        loading: false,
      });
    }
  },
}));
