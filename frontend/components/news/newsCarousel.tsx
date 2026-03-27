"use client";

import type { NewsItem } from "@/types/news";
import { NewsCard } from "./newsCard";

type NewsCarouselProps = {
  items: NewsItem[];
};

export function NewsCarousel({ items }: NewsCarouselProps) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 p-6 text-neutral-400">
        No news yet
      </div>
    );
  }

  return (
    <div className="max-h-[720px] overflow-y-auto pr-2">
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
