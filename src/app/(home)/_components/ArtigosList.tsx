"use client";

import Link from "next/link";
import AnimatedList from "./AnimatedList";
import { AuthorMark } from "@/components/ui/AuthorMark";

export type ArtigoItem = {
  slug: string;
  title: string;
  authorName: string;
  authorPhotoUrl?: string;
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
          className="group flex items-center gap-3.5"
          aria-label={`${a.title} — por ${a.authorName}`}
        >
          <AuthorMark
            initials={initials(a.authorName)}
            photoUrl={a.authorPhotoUrl}
            name={a.authorName}
            size={64}
            onDark
          />
          <span className="min-w-0 flex-1">
            <span className="eyebrow block text-[10px] tracking-[0.06em] text-cream/55">
              {a.authorName}
            </span>
            <span className="mt-1 block font-serif text-[14px] leading-snug text-cream/90 group-hover:text-cream text-pretty">
              {a.title}
            </span>
          </span>
        </Link>
      ))}
    />
  );
}
