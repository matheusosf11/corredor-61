import type { Supporter } from "@/lib/types";

/** Espaço reservado para a logo/foto do apoiador (faixa do rodapé e da home). */
export function SupporterLogo({ item }: { item: Supporter }) {
  const inner = (
    <span className="motif flex h-[120px] flex-col items-center justify-center gap-1.5 border border-navy/12 px-2 text-center">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 text-navy/30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m4 16 5-5 4 4 3-3 4 4" />
      </svg>
      <span className="font-mono text-[9px] tracking-[0.08em] text-navy/40 uppercase">
        {item.shortName}
      </span>
      <span className="sr-only"> — {item.name}</span>
    </span>
  );

  return item.url ? (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-opacity hover:opacity-80"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

/** Grade completa usada na página /apoiadores. */
export function SupportersGrid({ items }: { items: Supporter[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
      {items.map((item) => {
        const card = (
          <span className="flex h-full flex-col items-center gap-3 border border-navy/12 bg-cream px-4 py-7 text-center">
            <span className="motif flex h-14 w-full items-center justify-center border border-navy/12 font-mono text-[11px] tracking-[0.08em] text-navy/45 uppercase">
              {item.shortName}
            </span>
            <span className="font-sans text-[15px] leading-snug font-semibold text-navy">
              {item.name}
            </span>
            <span className="font-mono text-[10.5px] text-navy/50">
              {item.url ? "site do apoiador ↗" : "apoiador institucional"}
            </span>
          </span>
        );

        return (
          <li key={item.slug}>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full hover:border-navy"
              >
                {card}
              </a>
            ) : (
              card
            )}
          </li>
        );
      })}
    </ul>
  );
}
