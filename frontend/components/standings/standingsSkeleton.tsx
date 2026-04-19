export default function StandingsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 rounded-xl bg-white/5 animate-pulse" />
      ))}
    </div>
  );
}
