"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path
      ? "text-yellow-400"
      : "text-gray-300 hover:text-yellow-400";
  };

  return (
    <nav className="border-b border-yellow-400/30 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-orbitron text-xl font-bold text-yellow-400"
          >
            Star Wars
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-yellow-400 hover:text-yellow-300 md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden space-x-8 md:flex">
            <Link
              href="/"
              className={`font-orbitron transition-colors duration-200 ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className={`font-orbitron transition-colors duration-200 ${isActive("/movies")}`}
            >
              Movies
            </Link>
            <Link
              href="/characters"
              className={`font-orbitron transition-colors duration-200 ${isActive("/characters")}`}
            >
              Characters
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } border-t border-yellow-400/30`}
        >
          <div className="flex flex-col space-y-4 py-4">
            <Link
              href="/"
              className={`font-orbitron transition-colors duration-200 ${isActive("/")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className={`font-orbitron transition-colors duration-200 ${isActive("/movies")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              href="/characters"
              className={`font-orbitron transition-colors duration-200 ${isActive("/characters")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Characters
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
