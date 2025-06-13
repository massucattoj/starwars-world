import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name..."
        className="w-full rounded-lg border border-yellow-400/30 bg-gray-900 px-4 py-2 pl-10 text-yellow-400 placeholder-yellow-400/50 focus:border-yellow-400 focus:outline-none md:w-64"
      />
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-yellow-400/50" />
    </div>
  );
}
