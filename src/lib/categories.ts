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
  return categories.some((category) => category.slug === value);
}
