"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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

          <div className="flex space-x-8">
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
      </div>
    </nav>
  );
}
