export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  publishedAt: string;
  slug: string;
};

export type NewsResponse = {
  items: NewsItem[];
};
