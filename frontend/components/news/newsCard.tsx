import Link from "next/link";
import Image from "next/image";
import type { NewsItem } from "@/types/news";

type NewsCardProps = {
  item: NewsItem;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group block min-w-[280px] max-w-[320px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition-transform duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative h-44 w-full overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-neutral-400">
            no image
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <p className="text-sm text-neutral-400">
          {formatDate(item.publishedAt)}
        </p>

        <h3 className="line-clamp-2 text-lg font-semibold text-white">
          {item.title}
        </h3>

        <p className="line-clamp-3 text-sm text-neutral-300">{item.summary}</p>
      </div>
    </Link>
  );
}
