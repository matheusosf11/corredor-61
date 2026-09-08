import type { ReactNode } from "react";

type Tone = "gold" | "muted" | "on-dark";

const toneClass: Record<Tone, string> = {
  gold: "text-gold-ink",
  muted: "text-navy/55",
  "on-dark": "text-gold",
};

export function Eyebrow({
  children,
  tone = "gold",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`eyebrow block text-[10px] ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
