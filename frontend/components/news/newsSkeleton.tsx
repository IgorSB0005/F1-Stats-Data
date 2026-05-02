export function NewsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 sm:min-w-[280px] sm:max-w-[320px]"
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
