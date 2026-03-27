export function NewsSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="min-w-[280px] max-w-[320px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
        >
          <div className="h-44 w-full animate-pulse bg-neutral-800" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
            <div className="h-6 w-4/5 animate-pulse rounded bg-neutral-800" />
            <div className="h-4 w-full animate-pulse rounded bg-neutral-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
