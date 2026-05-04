import type { NewsItem } from "@/types/news";

function getNewsApiBase() {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEWS_SERVICE_URL || process.env.NEXT_PUBLIC_NEWS_SERVICE_URL
      : process.env.NEXT_PUBLIC_NEWS_SERVICE_URL || process.env.NEWS_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("NEWS service URL is not configured");
  }

  return baseUrl;
}

export async function getLatestNews(limit = 20): Promise<NewsItem[]> {
  const response = await fetch(`${getNewsApiBase()}/news?limit=${limit}`, {
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
