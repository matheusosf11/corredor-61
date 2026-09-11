import Link from "next/link";
import { CoverMedia } from "@/components/ui/CoverMedia";
import type { News } from "@/lib/types";
import { NumerosDoDia } from "./NumerosDoDia";

type PoderSlot = {
  label: string;
  item?: News;
};

export function PoderBlock({
  congresso,
  executivo,
  judiciario,
}: {
  congresso?: News;
  executivo?: News;
  judiciario?: News;
}) {
  const slots: PoderSlot[] = [
    { label: "Congresso", item: congresso },
    { label: "Executivo", item: executivo },
    { label: "Judiciário", item: judiciario },
  ];

  return (
    <section id="poder" className="scroll-mt-[88px]">
      <div className="mb-4 flex items-center gap-2.5">
        <span aria-hidden className="h-5 w-[3px] bg-gold" />
        <h2 className="font-sans text-[18px] font-extrabold tracking-[0.08em] text-[#0b1730] uppercase">
          Poder
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {slots.map((slot) =>
          slot.item ? (
            <Link
              key={slot.label}
              href={`/noticias/${slot.item.slug}`}
              className="group flex flex-col"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <CoverMedia
                  cover={slot.item.cover}
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <span className="mt-2.5 font-sans text-[11px] font-extrabold tracking-[0.16em] text-[#0b1730] uppercase">
                {slot.label}
              </span>
              <h3 className="mt-1 line-clamp-3 font-serif text-[15px] leading-snug text-[#1a2744]">
                {slot.item.title}
              </h3>
            </Link>
          ) : (
            <div key={slot.label} className="bg-[#f4f0e4] p-4">
              <span className="font-sans text-[11px] font-extrabold tracking-[0.16em] text-[#0b1730] uppercase">
                {slot.label}
              </span>
              <p className="mt-2 font-serif text-[14px] text-navy/50">
                Matérias desta frente entram aqui.
              </p>
            </div>
          ),
        )}
        <NumerosDoDia />
      </div>
    </section>
  );
}
