import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  loading,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1 || loading}
          className="rounded-lg border border-yellow-400/30 bg-gray-900 px-4 py-2 text-yellow-400 transition-all duration-200 hover:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="font-orbitron text-yellow-400">
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages || loading}
          className="rounded-lg border border-yellow-400/30 bg-gray-900 px-4 py-2 text-yellow-400 transition-all duration-200 hover:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
