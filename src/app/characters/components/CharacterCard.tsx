import { Character } from "@/types/characters";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="rounded-lg border border-yellow-400/30 bg-gray-900 p-6 transition-all duration-300 hover:border-yellow-400">
      <h2 className="font-orbitron mb-4 text-2xl font-bold">
        {character.name}
      </h2>
      <div className="space-y-2 text-gray-300">
        {character.properties ? (
          <>
            <p>
              <span className="text-yellow-400">Height:</span>{" "}
              {character.properties.height}cm
            </p>
            <p>
              <span className="text-yellow-400">Mass:</span>{" "}
              {character.properties.mass}kg
            </p>
            <p>
              <span className="text-yellow-400">Birth Year:</span>{" "}
              {character.properties.birth_year}
            </p>
            <p>
              <span className="text-yellow-400">Gender:</span>{" "}
              {character.properties.gender}
            </p>
            <p>
              <span className="text-yellow-400">Hair Color:</span>{" "}
              {character.properties.hair_color}
            </p>
            <p>
              <span className="text-yellow-400">Eye Color:</span>{" "}
              {character.properties.eye_color}
            </p>
            <p>
              <span className="text-yellow-400">Skin Color:</span>{" "}
              {character.properties.skin_color}
            </p>
          </>
        ) : (
          <p className="text-yellow-400/70">Loading details...</p>
        )}
      </div>
    </div>
  );
}
