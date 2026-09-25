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
