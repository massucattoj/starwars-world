import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders hero image with correct alt text", () => {
    render(<HeroSection />);

    const heroImage = screen.getByAltText("Star Wars Hero");
    expect(heroImage).toBeInTheDocument();
  });

  it("renders welcome heading", () => {
    render(<HeroSection />);

    const heading = screen.getByRole("heading", {
      name: /welcome to a galaxy far, far away/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<HeroSection />);

    const description = screen.getByText(/embark on an epic journey/i);
    expect(description).toBeInTheDocument();
  });

  it("has correct CSS classes for styling", () => {
    render(<HeroSection />);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveClass(
      "font-orbitron",
      "mb-4",
      "text-3xl",
      "font-bold",
    );
  });
});
