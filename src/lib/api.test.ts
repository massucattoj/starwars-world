import { describe, it, expect, vi } from "vitest";

// Mock axios to avoid conflicts with global mocks
vi.mock("axios", () => ({
  default: {
    create: vi.fn((config) => ({
      defaults: {
        baseURL: config.baseURL,
        headers: config.headers,
        params: config.params,
      },
    })),
  },
}));

import { api, omdbApi, endpoints } from "./api";

describe("API Configuration", () => {
  it("should have correct base URL for Star Wars API", () => {
    expect(api.defaults.baseURL).toBe(process.env.NEXT_PUBLIC_SWAPI_BASE_URL);
  });

  it("should have correct headers for Star Wars API", () => {
    expect(api.defaults.headers["Content-Type"]).toBe("application/json");
  });

  it("should have correct base URL for OMDB API", () => {
    expect(omdbApi.defaults.baseURL).toBe(
      process.env.NEXT_PUBLIC_OMDB_BASE_URL,
    );
  });

  it("should have API key configured for OMDB API", () => {
    expect(omdbApi.defaults.params.apikey).toBe(
      process.env.NEXT_PUBLIC_OMDB_API_KEY,
    );
  });

  it("should export correct endpoints", () => {
    expect(endpoints.films).toBe("/films");
    expect(endpoints.people).toBe("/people");
  });
});
