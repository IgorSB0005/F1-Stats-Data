import type { NewsItem } from "@/types/news";

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "News 1",
    summary:
      "test news one",
    imageUrl: "https://picsum.photos/600/400?random=1",
    publishedAt: "2026-03-27T10:00:00Z",
    slug: "new-platform-update",
  },
  {
    id: "2",
    title: "news 2",
    summary:
      "test news two",
    imageUrl: "https://picsum.photos/600/400?random=2",
    publishedAt: "2026-03-26T14:30:00Z",
    slug: "ui-update",
  },
  {
    id: "3",
    title: "news 3",
    summary:
      "test news three",
    imageUrl: "https://picsum.photos/600/400?random=3",
    publishedAt: "2026-03-25T09:15:00Z",
    slug: "internal-tools",
  },
  {
    id: "4",
    title: "news 4",
    summary: "test news four",
    imageUrl: "https://picsum.photos/600/400?random=4",
    publishedAt: "2026-03-24T16:45:00Z",
    slug: "api-expansion",
  },
  {
    id: "5",
    title: "news 5",
    summary:
      "test news five",
    imageUrl: "https://picsum.photos/600/400?random=5",
    publishedAt: "2026-03-23T11:20:00Z",
    slug: "release-preparation",
  },
  {
    id: "6",
    title: "news 6",
    summary: "test news six",
    imageUrl: "https://picsum.photos/600/400?random=6",
    publishedAt: "2026-03-22T08:00:00Z",
    slug: "content-loading-optimization",
  },
];
