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
      {
        heading: "Por região",
        items: [
          { href: "/noticias", label: "Brasília" },
          { href: "/noticias", label: "São Paulo" },
          { href: "/noticias", label: "Mundo" },
        ],
      },
    ],
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
    match: ["/sobre", "/apoiadores"],
    groups: [
      {
        heading: "Institucional",
        items: [
          { href: "/sobre", label: "Sobre nós" },
          { href: "/apoiadores", label: "Apoiadores" },
        ],
      },
    ],
  },
];

export function navItemIsActive(item: NavItem, pathname: string) {
  const bases = item.match ?? [item.href];
  return bases.some(
    (href) => pathname === href || pathname.startsWith(`${href}/`),
  );
}

/** CardNav só renderiza 3 cartões — o 4º item (Vídeos) entra em Artigos. */
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
      { label: "Apoiadores", href: "/apoiadores", ariaLabel: "Apoiadores" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/corredor61.br",
        ariaLabel: "Perfil no Instagram",
        external: true,
      },
    ],
  },
];
