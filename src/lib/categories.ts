import type { Category, CategorySlug } from "./types";

export const categories: Category[] = [
  { slug: "legislativo", name: "Legislativo" },
  { slug: "judiciario", name: "Judiciário" },
  { slug: "politica", name: "Política" },
  { slug: "institucional", name: "Institucional" },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug) ?? null;
}

export function isCategorySlug(value: string): value is CategorySlug {
  return Boolean(value);
}

export function categoryLabel(
  slug?: string,
  name?: string,
  fallback = "",
) {
  if (name && name !== slug) return name;
  if (!slug) return fallback;
  return getCategory(slug)?.name ?? name ?? fallback;
}
