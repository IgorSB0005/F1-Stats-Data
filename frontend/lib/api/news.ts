import type { NewsItem, NewsResponse } from "@/types/news";
import { mockNews } from "@/mocks/news";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function getLatestNews(limit = 8): Promise<NewsItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [...mockNews]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);

  // const response = await fetch(`${API_BASE_URL}/news?limit=${limit}`, {
  //   next: { revalidate: 300 }, // кэш на 5 минут
  // });

  // if (!response.ok) {
  //   throw new Error("Не удалось загрузить новости");
  // }

  // const data: NewsResponse = await response.json();

  // return data.items
  //   .sort(
  //     (a, b) =>
  //       new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  //   )
  //   .slice(0, limit);
}
