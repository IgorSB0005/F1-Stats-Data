"use client";

import { useEffect, useMemo, useState } from "react";
import { getLatestNews } from "@/lib/api/news";
import type { NewsItem } from "@/types/news";
import { NewsCarousel } from "./newsCarousel";
import { NewsSkeleton } from "./newsSkeleton";
import { useAuth } from "@/lib/auth/auth-context";

const TEAM_ALIASES: Record<string, string[]> = {
  "red bull": ["red bull", "redbull"],
  "aston martin": ["aston martin", "astonmartin"],
  "racing bulls": ["racing bulls", "rb"],
  sauber: ["sauber", "kick sauber"],
};

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  const prioritizedNews = useMemo(() => {
    if (!user?.favorite_team) {
      return news;
    }

    const favoriteTeam = user.favorite_team.toLowerCase().trim();
    const aliases = TEAM_ALIASES[favoriteTeam] || [favoriteTeam];

    const scoreItem = (item: NewsItem) => {
      const tags = (item.tags || []).map((tag) => tag.toLowerCase());
      const haystack = `${item.title} ${item.content} ${tags.join(" ")}`.toLowerCase();

      const tagMatch = aliases.some((alias) => tags.includes(alias));
      const textMatch = aliases.some((alias) => haystack.includes(alias));

      return (tagMatch ? 3 : 0) + (textMatch ? 1 : 0);
    };

    return [...news].sort((a, b) => scoreItem(b) - scoreItem(a));
  }, [news, user?.favorite_team]);

  return (
    <section className="space-y-6">

      {loading ? <NewsSkeleton /> : <NewsCarousel items={prioritizedNews} />}
    </section>
  );
}
