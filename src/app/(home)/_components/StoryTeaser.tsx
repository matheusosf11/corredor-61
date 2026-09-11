import Link from "next/link";
import { CoverMedia } from "@/components/ui/CoverMedia";
import type { Cover } from "@/lib/types";

export function StoryTeaser({
  href,
  eyebrow,
  title,
  cover,
  cta = "Leia mais →",
}: {
  href: string;
  eyebrow: string;
  title: string;
  cover: Cover;
  cta?: string;
}) {
  return (
    <Link href={href} className="group flex flex-col">
      <div className="aspect-[16/10] overflow-hidden">
        <CoverMedia
          cover={cover}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <span className="mt-3 font-sans text-[11px] font-extrabold tracking-[0.16em] text-[#0b1730] uppercase">
        {eyebrow}
      </span>
      <h3 className="mt-1.5 line-clamp-3 font-serif text-[17px] leading-snug text-[#1a2744] group-hover:text-[#0b1730]">
        {title}
      </h3>
      <span className="mt-3 font-sans text-[10px] font-extrabold tracking-[0.14em] text-gold-ink uppercase">
        {cta}
      </span>
    </Link>
  );
}
