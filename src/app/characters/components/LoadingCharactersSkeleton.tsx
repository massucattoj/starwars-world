export function LoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-yellow-400/30 bg-gray-900 p-6"
        >
          <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-yellow-400/20" />
          <div className="space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-yellow-400/20"
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
