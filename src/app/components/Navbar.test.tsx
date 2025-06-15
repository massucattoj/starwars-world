import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

// Mock usePathname to return different paths for testing
const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders Star Wars logo as home link", () => {
    render(<Navbar />);

    const logo = screen.getByRole("link", { name: /star wars/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("renders all navigation links", () => {
    render(<Navbar />);

    // Check desktop navigation links specifically
    const desktopNav = screen.getByRole("navigation");
    const desktopLinks = desktopNav.querySelectorAll(
      ".hidden.space-x-8.md\\:flex a",
    );

    expect(desktopLinks).toHaveLength(3);
    expect(desktopLinks[0]).toHaveTextContent("Home");
    expect(desktopLinks[1]).toHaveTextContent("Movies");
    expect(desktopLinks[2]).toHaveTextContent("Characters");
  });

  it("highlights active link based on current pathname", () => {
    mockUsePathname.mockReturnValue("/movies");
    render(<Navbar />);

    // Get desktop movies link specifically
    const desktopNav = screen.getByRole("navigation");
    const moviesLink = desktopNav.querySelector('a[href="/movies"]');
    expect(moviesLink).toHaveClass("text-yellow-400");
  });

  it("shows inactive styling for non-current pages", () => {
    mockUsePathname.mockReturnValue("/movies");
    render(<Navbar />);

    // Get desktop home link specifically
    const desktopNav = screen.getByRole("navigation");
    const homeLink = desktopNav.querySelector(
      '.hidden.space-x-8.md\\:flex a[href="/"]',
    );
    expect(homeLink).toHaveClass("text-gray-300");
  });

  it("toggles mobile menu when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Get mobile menu container (with border-t to distinguish from hamburger button)
    const mobileMenuContainer = screen
      .getByRole("navigation")
      .querySelector(".md\\:hidden.border-t");
    expect(mobileMenuContainer).toHaveClass("hidden");

    // Click hamburger button
    const hamburgerButton = screen.getByRole("button");
    await user.click(hamburgerButton);

    // Mobile menu should now be visible
    expect(mobileMenuContainer).toHaveClass("block");
  });

  it("closes mobile menu when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Open mobile menu first
    const hamburgerButton = screen.getByRole("button");
    await user.click(hamburgerButton);

    // Get mobile menu container (with border-t to distinguish from hamburger button)
    const mobileMenuContainer = screen
      .getByRole("navigation")
      .querySelector(".md\\:hidden.border-t");
    expect(mobileMenuContainer).toHaveClass("block");

    // Click on a mobile menu link specifically
    const mobileHomeLink = mobileMenuContainer?.querySelector('a[href="/"]');
    if (mobileHomeLink) {
      await user.click(mobileHomeLink as Element);
    }

    // Mobile menu should be closed
    expect(mobileMenuContainer).toHaveClass("hidden");
  });
});
