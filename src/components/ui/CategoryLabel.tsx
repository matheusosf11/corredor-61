import { getCategory } from "@/lib/categories";
import type { CategorySlug } from "@/lib/types";

export function CategoryLabel({
  slug,
  suffix,
  tone = "gold",
  className = "",
}: {
  slug?: CategorySlug;
  suffix?: string;
  tone?: "gold" | "on-dark";
  className?: string;
}) {
  if (!slug) return null;
  const category = getCategory(slug);
  if (!category) return null;

  return (
    <span
      className={`eyebrow text-[9.5px] ${
        tone === "on-dark" ? "text-gold" : "text-gold-ink"
      } ${className}`}
    >
      {category.name}
      {suffix ? ` · ${suffix}` : ""}
    </span>
  );
}

/** Etiqueta sólida (chip) usada nos heros de matéria e artigo. */
export function CategoryChip({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`eyebrow inline-block bg-gold px-2.5 py-1.5 text-[10px] text-blackish ${className}`}
    >
      {label}
    </span>
  );
}
