import Link from "next/link";
import {
  formatDate,
  formatDayMonth,
  formatFullDate,
  formatTime,
} from "@/lib/format";
import { getCategory } from "@/lib/categories";
import type { News } from "@/lib/types";
import { CoverMedia } from "@/components/ui/CoverMedia";

function catName(item: News) {
  return getCategory(item.category)?.name ?? "";
}

/** Cartão de notícia com imagem no topo — grade da home. */
export function NewsCard({
  item,
  onDark = false,
}: {
  item: News;
  onDark?: boolean;
}) {
  return (
    <Link href={`/noticias/${item.slug}`} className="group flex flex-col">
      <div
        className={`aspect-[3/2] overflow-hidden rounded-lg border ${
          onDark ? "border-cream/15" : "border-navy/10"
        }`}
      >
        <CoverMedia
          cover={item.cover}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <span
        className={`mt-4 text-[15px] lowercase transition-colors ${
          onDark
            ? "text-cream/70 group-hover:text-gold"
            : "text-navy group-hover:text-gold-ink"
        }`}
      >
        {catName(item)}
      </span>
      <h3
        className={`mt-1.5 line-clamp-2 text-[20px] leading-[1.15] font-extrabold tracking-[-0.01em] transition-colors md:text-[22px] ${
          onDark
            ? "text-cream group-hover:text-gold"
            : "text-navy group-hover:text-gold-ink"
        }`}
      >
        {item.title}
      </h3>
      <span
        className={`mt-3 text-[13px] ${
          onDark ? "text-cream/50" : "text-navy/45"
        }`}
      >
        {formatFullDate(item.publishedAt)}
      </span>
    </Link>
  );
}

/** Linha completa da listagem /noticias. */
export function NewsRow({ item }: { item: News }) {
  return (
    <Link
      href={`/noticias/${item.slug}`}
      className="group flex flex-col gap-3 border-b border-navy/12 py-7 sm:flex-row sm:gap-[26px]"
    >
      <div className="aspect-[16/9] w-full shrink-0 border border-navy/12 sm:aspect-auto sm:h-[140px] sm:w-[220px]">
        <CoverMedia cover={item.cover} />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <span className="eyebrow text-[9.5px] tracking-[0.14em] text-gold-ink">
            {catName(item)}
          </span>
          <span className="h-px w-4 bg-navy/25" />
          <span className="font-mono text-[10.5px] text-navy/45">
            {formatDayMonth(item.publishedAt)} · {formatTime(item.publishedAt)}
          </span>
        </div>
        <h2 className="max-w-[44ch] text-[20px] leading-tight font-bold tracking-[-0.015em] text-navy group-hover:underline decoration-gold underline-offset-4 md:text-[24px]">
          {item.title}
        </h2>
        <p className="max-w-[70ch] font-serif text-[15.5px] leading-relaxed text-[#1a1a1a]/70">
          {item.dek}
        </p>
        <span className="font-mono text-[10.5px] text-navy/40">
          por {item.authorName}
        </span>
      </div>
    </Link>
  );
}

/** Linha compacta (home e blocos secundários). */
export function NewsCompactRow({ item }: { item: News }) {
  return (
    <Link
      href={`/noticias/${item.slug}`}
      className="group flex gap-3.5 border-b border-navy/12 py-5"
    >
      <div className="h-[72px] w-24 shrink-0 border border-navy/12">
        <CoverMedia cover={item.cover} />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="eyebrow text-[9.5px] tracking-[0.14em] text-gold-ink">
          {catName(item)}
        </span>
        <h3 className="text-[15.5px] leading-snug font-semibold text-navy group-hover:underline decoration-gold underline-offset-4">
          {item.title}
        </h3>
        <span className="font-mono text-[10.5px] text-navy/45">
          {formatDate(item.publishedAt)}
        </span>
      </div>
    </Link>
  );
}
