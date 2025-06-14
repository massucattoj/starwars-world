import { api } from "@/lib/api";
import {
  Character,
  CharacterProperties,
  CharactersResponse,
} from "@/types/characters";
import { create } from "zustand";

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
  setFilter: (filter: string) => void;
  fetchCharacters: (page?: number, searchFilter?: string) => Promise<void>;
  nextPage: () => void;
  previousPage: () => void;
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

  setFilter: (filter: string) => {
    set({ filter });
  },

  fetchCharacters: async (page = 1, searchFilter?: string) => {
    console.log("fetchCharacters", page, searchFilter);
    const state = get();

    if (state.loading) return;

    const filter = searchFilter ?? state.filter;

    try {
      set({ loading: true, error: null });

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

        charactersWithDetails = await Promise.all(
          results.map(async (character) => {
            try {
              const detailsResponse = await api.get<{
                result: { properties: CharacterProperties };
              }>(`/people/${character.uid}`);
              return {
                ...character,
                properties: detailsResponse.data.result.properties,
              };
            } catch (error) {
              console.error(
                `Failed to fetch details for character ${character.uid}:`,
                error,
              );
              return character;
            }
          }),
        );

        totalPages = total_pages;
        totalRecords = total_records;
        next = nextPage;
        previous = prevPage;
      }

      set({
        characters: charactersWithDetails,
        currentPage: page, // ✅ Always update this
        totalPages,
        totalRecords,
        hasNextPage: !!next,
        hasPreviousPage: !!previous,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch characters",
        loading: false,
      });
    }
  },

  nextPage: () => {
    const { currentPage, totalPages, filter } = get();
    if (currentPage < totalPages) {
      get().fetchCharacters(currentPage + 1, filter);
    }
  },

  previousPage: () => {
    const { currentPage, filter } = get();
    if (currentPage > 1) {
      get().fetchCharacters(currentPage - 1, filter);
    }
  },
}));
