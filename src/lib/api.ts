import axios from "axios";

const BASE_URL = "https://www.swapi.tech/api";
const OMDB_API_KEY = "9500496d";
const OMDB_BASE_URL = "https://www.omdbapi.com";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const omdbApi = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: OMDB_API_KEY,
  },
});

export const endpoints = {
  films: "/films",
  people: "/people",
} as const;
