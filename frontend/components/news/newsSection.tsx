"use client";

import { useEffect, useState } from "react";
import { getLatestNews } from "@/lib/api/news";
import type { NewsItem } from "@/types/news";
import { NewsCarousel } from "./newsCarousel";
import { NewsSkeleton } from "./newsSkeleton";

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getLatestNews(8);
        setNews(data);
      } catch (error) {
        console.error("news loading error :", error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  return (
    <section className="space-y-6">

      {loading ? <NewsSkeleton /> : <NewsCarousel items={news} />}
    </section>
  );
}
