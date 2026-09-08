"use client";

import Link from "next/link";
import AnimatedList from "./AnimatedList";

export type ArtigoItem = {
  slug: string;
  title: string;
  authorName: string;
  authorRole: string;
  dateLabel: string;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function ArtigosList({ items }: { items: ArtigoItem[] }) {
  return (
    <AnimatedList
      className="c61-artlist"
      showGradients={false}
      displayScrollbar={false}
      enableArrowNavigation={false}
      items={items.map((a) => (
        <Link
          key={a.slug}
          href={`/artigos/${a.slug}`}
          className="group flex items-start gap-3.5"
          aria-label={`${a.title} — por ${a.authorName}`}
        >
          <span
            aria-hidden
            className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/25 font-mono text-[12px] tracking-[0.04em] text-cream/80"
          >
            {initials(a.authorName)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-serif text-[14px] leading-snug text-cream/90 group-hover:text-cream text-pretty">
              {a.title}
            </span>
            <span className="eyebrow mt-1.5 block text-[10px] tracking-[0.06em] text-cream/55">
              {a.authorName}
            </span>
            <span className="mt-1 block truncate font-mono text-[10px] text-cream/45">
              {a.authorRole ? `${a.authorRole} · ${a.dateLabel}` : a.dateLabel}
            </span>
          </span>
        </Link>
      ))}
    />
  );
}
