import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Abas de filtro encostadas na borda inferior do cabeçalho da página. */
export function PageTabs({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <nav
      aria-label={label}
      className="-mb-px mt-7 flex gap-1.5 overflow-x-auto [scrollbar-width:none] md:mt-8 [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </nav>
  );
}

export function PageTab({
  href,
  active,
  label,
  fluid = false,
  expand = false,
  style,
}: {
  href: string;
  active: boolean;
  label: string;
  /** No desktop, encolhe para caber mais abas na linha e cresce no hover. */
  fluid?: boolean;
  /** Entra abrindo a partir da aba anterior. */
  expand?: boolean;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={href}
      title={fluid ? label : undefined}
      aria-current={active ? "page" : undefined}
      style={style}
      className={cn(
        "flex h-10 flex-1 items-center justify-between gap-3 rounded-t-[2px] px-4 font-sans text-[11px] leading-none font-bold tracking-[0.15em] whitespace-nowrap uppercase transition-[flex-grow,background-color,color] duration-300 ease-out md:h-11 md:px-5 md:text-[11.5px]",
        fluid &&
          "md:min-w-0 md:gap-2 md:px-3 md:text-[10.5px] md:tracking-[0.1em] md:hover:grow-[1.35] md:focus-visible:grow-[1.35] lg:px-4 lg:text-[11.5px] lg:tracking-[0.15em]",
        fluid && active && "md:min-w-fit",
        expand && "motion-safe:md:animate-tab-expand",
        active
          ? "border-x border-t-2 border-navy/12 border-t-gold bg-paper text-navy"
          : "border border-b-0 border-navy/12 bg-[#e9e4d4] text-navy/75 hover:bg-[#efeadc] hover:text-navy",
      )}
    >
      <span className={fluid ? "md:truncate" : undefined}>{label}</span>
      {active ? (
        <span aria-hidden className="h-[5px] w-[5px] shrink-0 rounded-full bg-gold" />
      ) : null}
    </Link>
  );
}
