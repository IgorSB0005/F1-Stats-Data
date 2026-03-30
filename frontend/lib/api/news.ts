import type { NewsItem } from "@/types/news";

const NEWS_API_KEY = "http://localhost:8000";

export async function getLatestNews(limit = 8): Promise<NewsItem[]> {
  const response = await fetch(`${NEWS_API_KEY}/news?limit=${limit}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("cant resolve news");
  }

  const data = await response.json();

  const newsArray: NewsItem[] = Array.isArray(data) ? data : [];

  return [...newsArray]
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    .slice(0, limit);
}
