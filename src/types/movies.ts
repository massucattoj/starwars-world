export interface Movie {
  uid: string;
  properties: {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    url: string;
  };
  poster?: string | null;
}

export interface MoviesResponse {
  message: string;
  result: Movie[];
  total_records: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
}

export interface MoviePoster {
  url: string;
  title: string;
}
