import { api, omdbApi } from "@/lib/api";
import { Movie } from "@/types/movies";
import { create } from "zustand";

interface FilmsState {
  films: Movie[];
  loading: boolean;
  error: string | null;
  fetchFilms: () => Promise<void>;
}

export const useMoviesStore = create<FilmsState>((set) => ({
  films: [],
  loading: false,
  error: null,
  fetchFilms: async () => {
    // Check if movies already exist
    const state = useMoviesStore.getState();
    if (state.films.length > 0) return;

    try {
      set({ loading: true, error: null });
      const response = await api.get("/films");
      const films = response.data.result;

      // Fetch posters for each film
      const filmsWithPosters = await Promise.all(
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
              poster: omdbResponse.data.Poster,
            };
          } catch (error) {
            console.error(
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

      set({ films: filmsWithPosters, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch films",
        loading: false,
      });
    }
  },
}));
