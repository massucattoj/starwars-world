import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-yellow-400">
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Greeting Message */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="font-orbitron mb-4 text-3xl font-bold md:text-4xl">
            Welcome to a Galaxy Far, Far Away
          </h2>
          <p className="text-lg text-gray-300">
            Embark on an epic journey through the Star Wars universe. Explore
            the legendary films that shaped generations and meet the
            unforgettable characters who brought this galaxy to life.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Movies Card */}
          <Link href="/movies" className="group">
            <div className="rounded-lg border border-yellow-400/30 bg-gray-900 p-6 transition-all duration-300 hover:border-yellow-400">
              <h2 className="font-orbitron mb-4 text-2xl font-bold text-yellow-400">
                Movies
              </h2>
              <p className="text-gray-300">
                Explore the epic saga of Star Wars through all its cinematic
                adventures.
              </p>
            </div>
          </Link>

          {/* Characters Card */}
          <Link href="/characters" className="group">
            <div className="rounded-lg border border-yellow-400/30 bg-gray-900 p-6 transition-all duration-300 hover:border-yellow-400">
              <h2 className="font-orbitron mb-4 text-2xl font-bold text-yellow-400">
                Characters
              </h2>
              <p className="text-gray-300">
                Discover the heroes, villains, and legends that shape the Star
                Wars universe.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
