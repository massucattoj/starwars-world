import { create } from "zustand";

import { api } from "@/lib/api";
import {
  Character,
  CharacterProperties,
  CharactersResponse,
} from "@/types/characters";

interface CharactersState {
  characters: (Character & { properties?: CharacterProperties })[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  filter: string;
  hasAttemptedFetch: boolean;
  setFilter: (filter: string) => void;
  fetchCharacters: (page?: number, searchFilter?: string) => Promise<void>;
  nextPage: () => void;
  previousPage: () => void;
  clearError: () => void;
}

export const useCharactersStore = create<CharactersState>((set, get) => ({
  characters: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalRecords: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  filter: "",
  hasAttemptedFetch: false,

  setFilter: (filter: string) => {
    set({ filter, hasAttemptedFetch: false }); // Reset attempt flag when filter changes
  },

  clearError: () => {
    set({ error: null });
  },

  fetchCharacters: async (page = 1, searchFilter?: string) => {
    const state = get();

    if (state.loading) return;

    const filter = searchFilter ?? state.filter;

    // Prevent infinite loops on error - but allow refetch if filter changed or page changed
    const isSameRequest = page === state.currentPage && filter === state.filter;
    if (
      isSameRequest &&
      state.hasAttemptedFetch &&
      state.characters.length === 0 &&
      state.error
    ) {
      return;
    }

    try {
      set({ loading: true, error: null, hasAttemptedFetch: true });

      let charactersWithDetails;
      let totalPages;
      let totalRecords;
      let next;
      let previous;

      if (filter) {
        const response = await api.get<{ result: any[] }>(
          `/people?page=${page}&limit=6&name=${filter}`,
        );

        charactersWithDetails = response.data.result.map((character) => ({
          uid: character.uid,
          name: character.properties.name,
          url: character.properties.url,
          properties: character.properties,
        }));

        totalPages = 1;
        totalRecords = charactersWithDetails.length;
        next = null;
        previous = null;
      } else {
        const response = await api.get<CharactersResponse>(
          `/people?page=${page}&limit=6`,
        );

        const {
          results,
          total_pages,
          total_records,
          next: nextPage,
          previous: prevPage,
        } = response.data;

        // Fetch character details with better error handling
        const characterDetailsPromises = results.map(async (character) => {
          try {
            const detailsResponse = await api.get<{
              result: { properties: CharacterProperties };
            }>(`/people/${character.uid}`);
            return {
              ...character,
              properties: detailsResponse.data.result.properties,
            };
          } catch (error) {
            console.warn(
              `Failed to fetch details for character ${character.uid}:`,
              error,
            );
            return {
              ...character,
              properties: undefined,
            };
          }
        });

        const settledResults = await Promise.allSettled(
          characterDetailsPromises,
        );

        charactersWithDetails = settledResults
          .filter(
            (result): result is PromiseFulfilledResult<any> =>
              result.status === "fulfilled",
          )
          .map((result) => result.value);

        totalPages = total_pages;
        totalRecords = total_records;
        next = nextPage;
        previous = prevPage;
      }

      set({
        characters: charactersWithDetails,
        currentPage: page,
        totalPages,
        totalRecords,
        hasNextPage: !!next,
        hasPreviousPage: !!previous,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch characters",
        loading: false,
      });
    }
  },

  nextPage: () => {
    const { currentPage, totalPages, filter, loading } = get();
    if (!loading && currentPage < totalPages) {
      get().fetchCharacters(currentPage + 1, filter);
    }
  },

  previousPage: () => {
    const { currentPage, filter, loading } = get();
    if (!loading && currentPage > 1) {
      get().fetchCharacters(currentPage - 1, filter);
    }
  },
}));
