export default function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-yellow-400/30 bg-gray-900">
      <div className="flex h-96 w-full items-center justify-center bg-gray-800">
        <div className="h-full w-full animate-pulse bg-yellow-400/20" />
      </div>

      <div className="p-6">
        <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-yellow-400/20" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-4 animate-pulse rounded bg-yellow-400/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
