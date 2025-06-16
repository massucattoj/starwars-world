import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMoviesStore } from "./useMoviesStore";

const { mockApiGet, mockOmdbApiGet } = vi.hoisted(() => ({
  mockApiGet: vi.fn(),
  mockOmdbApiGet: vi.fn(),
}));

vi.mock("@/lib/api", () => ({
  api: {
    get: mockApiGet,
  },
  omdbApi: {
    get: mockOmdbApiGet,
  },
}));

describe("useMoviesStore", () => {
  beforeEach(() => {
    // Reset the store state before each test
    useMoviesStore.setState({
      films: [],
      loading: false,
      error: null,
      hasAttemptedFetch: false,
    });
    vi.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useMoviesStore());

    expect(result.current.films).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.hasAttemptedFetch).toBe(false);
  });

  it("should not fetch films if already loading", async () => {
    const { result } = renderHook(() => useMoviesStore());

    // Set loading state
    act(() => {
      useMoviesStore.setState({ loading: true });
    });

    await act(async () => {
      await result.current.fetchFilms();
    });

    expect(mockApiGet).not.toHaveBeenCalled();
  });

  it("should not fetch films if already have films", async () => {
    const { result } = renderHook(() => useMoviesStore());

    // Set films already exist
    act(() => {
      useMoviesStore.setState({
        films: [{ uid: "1", name: "Test Film", url: "test-url" }] as any,
      });
    });

    await act(async () => {
      await result.current.fetchFilms();
    });

    expect(mockApiGet).not.toHaveBeenCalled();
  });

  it("should successfully fetch films with posters", async () => {
    const mockFilmsResponse = {
      data: {
        result: [
          {
            uid: "1",
            name: "A New Hope",
            url: "test-url",
            properties: {
              title: "A New Hope",
              episode_id: 4,
              director: "George Lucas",
              producer: "Gary Kurtz, Rick McCallum",
              release_date: "1977-05-25",
            },
          },
        ],
      },
    };

    const mockPosterResponse = {
      data: {
        Poster: "https://example.com/poster.jpg",
      },
    };

    mockApiGet.mockResolvedValue(mockFilmsResponse);
    mockOmdbApiGet.mockResolvedValue(mockPosterResponse);

    const { result } = renderHook(() => useMoviesStore());

    await act(async () => {
      await result.current.fetchFilms();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.films).toHaveLength(1);
    expect(result.current.films[0]).toMatchObject({
      uid: "1",
      name: "A New Hope",
      poster: "https://example.com/poster.jpg",
    });
    expect(result.current.hasAttemptedFetch).toBe(true);
  });

  it('should set poster to null when OMDB returns "N/A"', async () => {
    const mockFilmsResponse = {
      data: {
        result: [
          {
            uid: "1",
            name: "A New Hope",
            url: "test-url",
            properties: {
              title: "A New Hope",
              episode_id: 4,
            },
          },
        ],
      },
    };

    const mockPosterResponse = {
      data: {
        Poster: "N/A",
      },
    };

    mockApiGet.mockResolvedValue(mockFilmsResponse);
    mockOmdbApiGet.mockResolvedValue(mockPosterResponse);

    const { result } = renderHook(() => useMoviesStore());

    await act(async () => {
      await result.current.fetchFilms();
    });

    expect(result.current.films[0].poster).toBe(null);
  });
});
