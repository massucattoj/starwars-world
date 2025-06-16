import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

// Add custom render method here if needed (e.g., with providers)
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { ...options });

export const createMockCharacter = (overrides = {}) => ({
  uid: "1",
  name: "Luke Skywalker",
  url: "https://www.swapi.tech/api/people/1",
  properties: {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.tech/api/planets/1",
    films: [
      "https://swapi.tech/api/films/1",
      "https://swapi.tech/api/films/2",
      "https://swapi.tech/api/films/3",
    ],
    created: "2024-01-01T00:00:00.000000Z",
    edited: "2024-01-01T00:00:00.000000Z",
    url: "https://www.swapi.tech/api/people/1",
  },
  ...overrides,
});

export const createMockMovie = (overrides = {}) => ({
  uid: "1",
  name: "A New Hope",
  url: "https://www.swapi.tech/api/films/1",
  properties: {
    title: "A New Hope",
    episode_id: 4,
    opening_crawl: "It is a period of civil war...",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1977-05-25",
    characters: ["https://swapi.tech/api/people/1"],
    created: "2024-01-01T00:00:00.000000Z",
    edited: "2024-01-01T00:00:00.000000Z",
    url: "https://www.swapi.tech/api/films/1",
  },
  poster: "https://example.com/poster.jpg",
  ...overrides,
});

export * from "@testing-library/react";
export { customRender as render };
