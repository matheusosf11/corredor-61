import type { Supporter } from "@/lib/types";

function PlaceholderMark({
  label,
  onDark = false,
}: {
  label: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={`font-sans text-[13px] font-extrabold tracking-[0.14em] uppercase ${
        onDark ? "text-cream/80" : "text-navy/45"
      }`}
    >
      {label}
    </span>
  );
}

/** Marca do apoiador. No rodapé, versão baixa sobre o azul. */
export function SupporterLogo({
  item,
  onDark = false,
}: {
  item: Supporter;
  onDark?: boolean;
}) {
  const inner = (
    <span
      className={
        onDark
          ? "flex h-14 items-center justify-center border border-cream/15 px-3 text-center"
          : "motif flex h-[120px] flex-col items-center justify-center gap-1.5 border border-navy/12 px-2 text-center"
      }
    >
      {item.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logoUrl}
          alt={item.name}
          className={`max-w-[85%] object-contain ${onDark ? "max-h-8" : "max-h-16"}`}
        />
      ) : (
        <PlaceholderMark label={item.shortName} onDark={onDark} />
      )}
      <span className="sr-only">{item.name}</span>
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
            <span className="motif flex h-14 w-full items-center justify-center border border-navy/12 px-2">
              {item.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.logoUrl}
                  alt=""
                  className="max-h-10 max-w-full object-contain"
                />
              ) : (
                <span className="font-mono text-[11px] tracking-[0.08em] text-navy/45 uppercase">
                  {item.shortName}
                </span>
              )}
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
