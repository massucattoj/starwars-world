import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SWAPI_BASE_URL;
const OMDB_BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL;
const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

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
