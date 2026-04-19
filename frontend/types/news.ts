export type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url?: string | null;
  published_at: string;
  source_url?: string | null;
  tags?: string[];
};

export type NewsResponse = {
  items: NewsItem[];
};

