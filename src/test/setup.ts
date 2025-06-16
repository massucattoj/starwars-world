import "@testing-library/jest-dom";

import React from "react";
import { vi } from "vitest";

// Mock environment variables
process.env.NEXT_PUBLIC_SWAPI_BASE_URL = "https://www.swapi.tech/api";
process.env.NEXT_PUBLIC_OMDB_BASE_URL = "https://www.omdbapi.com";
process.env.NEXT_PUBLIC_OMDB_API_KEY = "9500496d";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    };
  },
  usePathname() {
    return "/";
  },
  useParams() {
    return {};
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: (props: any) => {
     
    return React.createElement("img", props);
  },
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => {
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Mock axios
vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    })),
  },
}));
