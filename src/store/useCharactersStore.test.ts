import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useCharactersStore } from "./useCharactersStore";

// Use vi.hoisted to properly hoist mock variables
const { mockApiGet } = vi.hoisted(() => ({
  mockApiGet: vi.fn(),
}));

// Mock the API module
vi.mock("@/lib/api", () => ({
  api: {
    get: mockApiGet,
  },
}));

describe("useCharactersStore", () => {
  beforeEach(() => {
    // Reset the store state before each test
    useCharactersStore.setState({
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
    });
    vi.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useCharactersStore());

    expect(result.current.characters).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.totalRecords).toBe(0);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.filter).toBe("");
    expect(result.current.hasAttemptedFetch).toBe(false);
  });

  it("should set filter and reset attempt flag", () => {
    const { result } = renderHook(() => useCharactersStore());

    // Set hasAttemptedFetch to true first
    act(() => {
      useCharactersStore.setState({ hasAttemptedFetch: true });
    });

    expect(result.current.hasAttemptedFetch).toBe(true);

    // Set filter should reset attempt flag
    act(() => {
      result.current.setFilter("Luke");
    });

    expect(result.current.filter).toBe("Luke");
    expect(result.current.hasAttemptedFetch).toBe(false);
  });

  it("should clear error when clearError is called", () => {
    const { result } = renderHook(() => useCharactersStore());

    // Set an error first
    act(() => {
      useCharactersStore.setState({ error: "Test error" });
    });

    expect(result.current.error).toBe("Test error");

    // Clear the error
    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBe(null);
  });

  it("should not fetch characters if already loading", async () => {
    const { result } = renderHook(() => useCharactersStore());

    // Set loading state
    act(() => {
      useCharactersStore.setState({ loading: true });
    });

    await act(async () => {
      await result.current.fetchCharacters();
    });

    expect(mockApiGet).not.toHaveBeenCalled();
  });

  it("should not refetch on same request with error", async () => {
    const { result } = renderHook(() => useCharactersStore());

    // Set state to simulate a failed previous attempt
    act(() => {
      useCharactersStore.setState({
        currentPage: 1,
        filter: "",
        hasAttemptedFetch: true,
        characters: [],
        error: "Previous error",
      });
    });

    await act(async () => {
      await result.current.fetchCharacters(1, "");
    });

    expect(mockApiGet).not.toHaveBeenCalled();
  });

  it("should successfully fetch characters without filter", async () => {
    const mockCharactersResponse = {
      data: {
        results: [
          {
            uid: "1",
            name: "Luke Skywalker",
            url: "https://www.swapi.tech/api/people/1",
          },
        ],
        total_pages: 5,
        total_records: 82,
        next: "https://www.swapi.tech/api/people?page=2&limit=6",
        previous: null,
      },
    };

    const mockCharacterDetailsResponse = {
      data: {
        result: {
          properties: {
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            hair_color: "blond",
            skin_color: "fair",
            eye_color: "blue",
            birth_year: "19BBY",
            gender: "male",
          },
        },
      },
    };

    mockApiGet
      .mockResolvedValueOnce(mockCharactersResponse)
      .mockResolvedValueOnce(mockCharacterDetailsResponse);

    const { result } = renderHook(() => useCharactersStore());

    await act(async () => {
      await result.current.fetchCharacters(1);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.characters).toHaveLength(1);
    expect(result.current.characters[0]).toMatchObject({
      uid: "1",
      name: "Luke Skywalker",
      properties: expect.objectContaining({
        name: "Luke Skywalker",
        height: "172",
      }),
    });
    expect(result.current.totalPages).toBe(5);
    expect(result.current.totalRecords).toBe(82);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.hasAttemptedFetch).toBe(true);
  });

  it("should successfully fetch characters with filter", async () => {
    const mockFilteredResponse = {
      data: {
        result: [
          {
            uid: "1",
            properties: {
              name: "Luke Skywalker",
              url: "https://www.swapi.tech/api/people/1",
              height: "172",
            },
          },
        ],
      },
    };

    mockApiGet.mockResolvedValue(mockFilteredResponse);

    const { result } = renderHook(() => useCharactersStore());

    await act(async () => {
      result.current.setFilter("Luke");
    });

    await act(async () => {
      await result.current.fetchCharacters(1, "Luke");
    });

    expect(mockApiGet).toHaveBeenCalledWith("/people?page=1&limit=6&name=Luke");
    expect(result.current.characters).toHaveLength(1);
    expect(result.current.characters[0]).toMatchObject({
      uid: "1",
      name: "Luke Skywalker",
      properties: expect.objectContaining({
        name: "Luke Skywalker",
      }),
    });
    expect(result.current.totalPages).toBe(1);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.hasPreviousPage).toBe(false);
  });

  it("should navigate to next page when nextPage is called", async () => {
    const { result } = renderHook(() => useCharactersStore());

    // Set up state to simulate having a next page
    act(() => {
      useCharactersStore.setState({
        currentPage: 1,
        totalPages: 3,
        loading: false,
      });
    });

    mockApiGet.mockResolvedValue({
      data: {
        results: [],
        total_pages: 3,
        total_records: 0,
        next: null,
        previous: null,
      },
    });

    await act(async () => {
      result.current.nextPage();
    });

    expect(mockApiGet).toHaveBeenCalledWith("/people?page=2&limit=6");
  });

  it("should not navigate to next page if on last page", async () => {
    const { result } = renderHook(() => useCharactersStore());

    // Set up state to simulate being on last page
    act(() => {
      useCharactersStore.setState({
        currentPage: 3,
        totalPages: 3,
        loading: false,
      });
    });

    await act(async () => {
      result.current.nextPage();
    });

    expect(mockApiGet).not.toHaveBeenCalled();
  });

  it("should navigate to previous page when previousPage is called", async () => {
    const { result } = renderHook(() => useCharactersStore());

    // Set up state to simulate being on page 2
    act(() => {
      useCharactersStore.setState({
        currentPage: 2,
        totalPages: 3,
        loading: false,
      });
    });

    mockApiGet.mockResolvedValue({
      data: {
        results: [],
        total_pages: 3,
        total_records: 0,
        next: null,
        previous: null,
      },
    });

    await act(async () => {
      result.current.previousPage();
    });

    expect(mockApiGet).toHaveBeenCalledWith("/people?page=1&limit=6");
  });

  it("should not navigate to previous page if on first page", async () => {
    const { result } = renderHook(() => useCharactersStore());

    // Set up state to simulate being on first page
    act(() => {
      useCharactersStore.setState({
        currentPage: 1,
        totalPages: 3,
        loading: false,
      });
    });

    await act(async () => {
      result.current.previousPage();
    });

    expect(mockApiGet).not.toHaveBeenCalled();
  });
});
