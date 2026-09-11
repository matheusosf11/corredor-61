import type { CategorySlug, News } from "./types";

export type EditoriaCard = {
  id: string;
  label: string;
  href: string;
  dek: string;
  seed: string;
  icon: "columns" | "search" | "opinion" | "gavel" | "chart" | "pin";
};

export const editoriaCards: EditoriaCard[] = [
  {
    id: "bastidores",
    label: "Bastidores",
    href: "/noticias?categoria=politica",
    dek: "O que está por trás das decisões.",
    seed: "bastidores-corredor-61",
    icon: "columns",
  },
  {
    id: "entenda",
    label: "Entenda",
    href: "/noticias?categoria=institucional",
    dek: "Explicações claras sobre o que importa.",
    seed: "entenda-corredor-61",
    icon: "search",
  },
  {
    id: "opiniao",
    label: "Opinião",
    href: "/artigos",
    dek: "Ideias de quem conhece por dentro as instituições.",
    seed: "opiniao-corredor-61",
    icon: "opinion",
  },
  {
    id: "poder",
    label: "Poder",
    href: "/#poder",
    dek: "Congresso | Executivo | Judiciário",
    seed: "poder-corredor-61",
    icon: "gavel",
  },
  {
    id: "economia",
    label: "Economia",
    href: "/#economia",
    dek: "Os impactos das decisões no seu dia a dia.",
    seed: "economia-corredor-61",
    icon: "chart",
  },
  {
    id: "regiao",
    label: "Região",
    href: "/noticias",
    dek: "O que acontece em Brasília e no entorno.",
    seed: "regiao-corredor-61",
    icon: "pin",
  },
];

export const dayNumbers = [
  {
    value: "R$ 12,6 bi",
    label: "emendas parlamentares previstas para 2026",
  },
  {
    value: "3",
    label: "projetos prioritários na pauta do Congresso",
  },
  {
    value: "72%",
    label: "aprovação da agenda econômica no Senado",
  },
];

export function takeNews(
  items: News[],
  used: Set<string>,
  category?: CategorySlug,
): News | undefined {
  const found =
    items.find(
      (item) =>
        !used.has(item.slug) && (category ? item.category === category : true),
    ) ?? items.find((item) => !used.has(item.slug));
  if (found) used.add(found.slug);
  return found;
}
