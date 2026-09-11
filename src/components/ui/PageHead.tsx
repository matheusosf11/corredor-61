import type { ReactNode } from "react";

export function PageHead({
  eyebrow,
  title,
  description,
  meta,
  nav,
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  nav?: ReactNode;
  size?: "md" | "sm";
}) {
  return (
    <div className="pad-x border-b border-navy/12 bg-cream py-9 md:py-11">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[70ch]">
          {eyebrow ? (
            <span className="eyebrow mb-3 block text-[10px] text-gold-ink">
              {eyebrow}
            </span>
          ) : null}
          <h1
            className={`tracking-[-0.025em] text-navy ${
              size === "sm"
                ? "text-[26px] md:text-[30px]"
                : "text-[30px] font-extrabold md:text-[34px]"
            }`}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-1.5 font-serif text-[13px] leading-relaxed text-navy/60 md:text-[14px]">
              {description}
            </p>
          ) : null}
        </div>
        {nav ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
            {nav}
          </div>
        ) : meta ? (
          <span className="font-mono text-[11px] whitespace-nowrap text-navy/50">
            {meta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
