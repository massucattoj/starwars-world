interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-yellow-400/30 bg-gray-900 px-4 py-2 text-yellow-400 transition-all duration-200 hover:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-4 py-2 ${
            currentPage === page
              ? "bg-yellow-400 text-black"
              : "border border-yellow-400/30 bg-gray-900 text-yellow-400 hover:border-yellow-400"
          } transition-all duration-200`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-yellow-400/30 bg-gray-900 px-4 py-2 text-yellow-400 transition-all duration-200 hover:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
