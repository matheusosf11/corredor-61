import { cities } from "./places";
import type { Category } from "./types";

export type NavChild = {
  href: string;
  label: string;
  external?: boolean;
};

export type NavGroup = {
  heading: string;
  items: NavChild[];
};

export type NavItem = {
  href: string;
  label: string;
  match?: string[];
  groups?: NavGroup[];
};

const cityLinks: NavChild[] = cities.map((city) => ({
  href: `/cidades/${city.slug}`,
  label: city.name,
}));

export const primaryNav: NavItem[] = [
  {
    href: "/noticias",
    label: "Notícias",
    groups: [
      {
        heading: "Por tema",
        items: [
          { href: "/noticias", label: "Todas" },
          { href: "/noticias?categoria=legislativo", label: "Legislativo" },
          { href: "/noticias?categoria=judiciario", label: "Judiciário" },
          { href: "/noticias?categoria=politica", label: "Política" },
          { href: "/noticias?categoria=institucional", label: "Institucional" },
        ],
      },
    ],
  },
  {
    href: "/mundo",
    label: "Mundo",
  },
  {
    href: "/brasil",
    label: "Brasil",
  },
  {
    href: "/cidades",
    label: "Cidades",
    match: ["/cidades"],
    groups: [
      {
        heading: "Cidades",
        items: [{ href: "/cidades", label: "Todas" }, ...cityLinks],
      },
    ],
  },
  {
    href: "/bastidores",
    label: "Bastidores",
  },
  {
    href: "/artigos",
    label: "Artigos",
    match: ["/artigos", "/autores"],
    groups: [
      {
        heading: "Opinião",
        items: [
          { href: "/artigos", label: "Todos os artigos" },
          { href: "/autores", label: "Autores" },
        ],
      },
    ],
  },
  {
    href: "/videos",
    label: "Vídeos",
    groups: [
      {
        heading: "Instagram",
        items: [
          { href: "/videos", label: "Podcasts e reels" },
          {
            href: "https://www.instagram.com/corredor61.br",
            label: "Perfil @corredor61.br",
            external: true,
          },
        ],
      },
    ],
  },
  {
    href: "/sobre",
    label: "Portal",
    match: ["/sobre"],
    groups: [
      {
        heading: "Institucional",
        items: [{ href: "/sobre", label: "Sobre nós" }],
      },
    ],
  },
];

function newsThemeItems(cats: Category[]): NavChild[] {
  return [
    { href: "/noticias", label: "Todas" },
    ...cats.map((category) => ({
      href: `/noticias?categoria=${category.slug}`,
      label: category.name,
    })),
  ];
}

export function buildPrimaryNav(cats: Category[]): NavItem[] {
  return primaryNav.map((item) => {
    if (item.href !== "/noticias") return item;
    return {
      ...item,
      groups: [{ heading: "Por tema", items: newsThemeItems(cats) }],
    };
  });
}

export function buildCardNavItems(cats: Category[]) {
  return cardNavItems.map((item) => {
    if (item.label !== "Notícias") return item;
    return {
      ...item,
      links: [
        { label: "Todas", href: "/noticias", ariaLabel: "Todas as notícias" },
        ...cats.map((category) => ({
          label: category.name,
          href: `/noticias?categoria=${category.slug}`,
          ariaLabel: `Notícias de ${category.name}`,
        })),
      ],
    };
  });
}

export function navItemIsActive(item: NavItem, pathname: string) {
  const bases = item.match ?? [item.href];
  return bases.some(
    (href) => pathname === href || pathname.startsWith(`${href}/`),
  );
}

/** O card de Cidades lista as cidades de `places.ts`. */
export const cardNavItems = [
  {
    label: "Notícias",
    bgColor: "#0b1730",
    textColor: "#f4f0e4",
    links: [
      { label: "Todas", href: "/noticias", ariaLabel: "Todas as notícias" },
      {
        label: "Legislativo",
        href: "/noticias?categoria=legislativo",
        ariaLabel: "Notícias do Legislativo",
      },
      {
        label: "Judiciário",
        href: "/noticias?categoria=judiciario",
        ariaLabel: "Notícias do Judiciário",
      },
      {
        label: "Política",
        href: "/noticias?categoria=politica",
        ariaLabel: "Notícias de Política",
      },
      {
        label: "Institucional",
        href: "/noticias?categoria=institucional",
        ariaLabel: "Notícias institucionais",
      },
    ],
  },
  {
    label: "Mundo",
    bgColor: "#0b1730",
    textColor: "#f4f0e4",
    links: [
      { label: "Notícias", href: "/mundo", ariaLabel: "Notícias do mundo" },
    ],
  },
  {
    label: "Brasil",
    bgColor: "#101f3c",
    textColor: "#f4f0e4",
    links: [
      { label: "Notícias", href: "/brasil", ariaLabel: "Notícias do Brasil" },
    ],
  },
  {
    label: "Cidades",
    bgColor: "#142848",
    textColor: "#f4f0e4",
    links: [
      { label: "Todas", href: "/cidades", ariaLabel: "Notícias das cidades" },
      ...cities.map((city) => ({
        label: city.name,
        href: `/cidades/${city.slug}`,
        ariaLabel: `Notícias de ${city.name}`,
      })),
    ],
  },
  {
    label: "Bastidores",
    bgColor: "#0b1730",
    textColor: "#f4f0e4",
    links: [
      {
        label: "Notícias",
        href: "/bastidores",
        ariaLabel: "Notícias de bastidores",
      },
    ],
  },
  {
    label: "Artigos",
    bgColor: "#101f3c",
    textColor: "#f4f0e4",
    links: [
      { label: "Todos os artigos", href: "/artigos", ariaLabel: "Todos os artigos" },
      { label: "Autores", href: "/autores", ariaLabel: "Autores" },
      { label: "Vídeos", href: "/videos", ariaLabel: "Vídeos no Instagram" },
    ],
  },
  {
    label: "Portal",
    bgColor: "#001630",
    textColor: "#f4f0e4",
    links: [
      { label: "Sobre nós", href: "/sobre", ariaLabel: "Sobre o Corredor 61" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/corredor61.br",
        ariaLabel: "Perfil no Instagram",
        external: true,
      },
    ],
  },
];
