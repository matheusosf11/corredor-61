import Link from "next/link";
import { CoverMedia } from "@/components/ui/CoverMedia";
import type { News } from "@/lib/types";

export function HomeHero({ item }: { item: News }) {
  return (
    <Link
      href={`/noticias/${item.slug}`}
      className="group relative block min-h-[280px] overflow-hidden md:min-h-[340px] lg:min-h-[360px]"
    >
      <CoverMedia cover={item.cover} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07101f]/92 via-[#07101f]/62 to-[#07101f]/10" />
      <div className="relative z-10 flex h-full min-h-[280px] max-w-[34rem] flex-col justify-center px-6 py-8 md:min-h-[340px] md:px-9 lg:min-h-[360px]">
        <span className="mb-4 inline-flex w-fit bg-gold px-2.5 py-1 font-sans text-[10px] font-extrabold tracking-[0.18em] text-[#0b1730] uppercase">
          Agora
        </span>
        <h2 className="font-sans text-[28px] leading-[1.08] font-extrabold tracking-[-0.03em] text-white md:text-[38px]">
          {item.title}
        </h2>
        <p className="mt-4 line-clamp-3 font-serif text-[15px] leading-relaxed text-white/80 md:text-[16px]">
          {item.dek}
        </p>
        <span className="mt-6 font-sans text-[11px] font-extrabold tracking-[0.16em] text-gold uppercase group-hover:text-white">
          Leia a matéria →
        </span>
      </div>
    </Link>
  );
}
