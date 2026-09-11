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

export const editorialNav: NavItem[] = [
  { href: "/noticias", label: "Notícias" },
  { href: "/noticias?categoria=politica", label: "Bastidores" },
  { href: "/noticias?categoria=institucional", label: "Entenda" },
  { href: "/artigos", label: "Opinião", match: ["/artigos"] },
  { href: "/#poder", label: "Poder" },
  { href: "/#economia", label: "Economia" },
];

export const moreNav: NavItem[] = [
  { href: "/videos", label: "Vídeos" },
  { href: "/autores", label: "Autores" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/apoiadores", label: "Apoiadores" },
];

export const primaryNav: NavItem[] = [...editorialNav, ...moreNav];

export function navItemIsActive(
  item: NavItem,
  pathname: string,
  search = "",
) {
  const [rawPath, query] = item.href.split("?");
  const path = rawPath.split("#")[0];
  const params = new URLSearchParams(query ?? "");
  const categoria = params.get("categoria");
  const currentCategoria = new URLSearchParams(search).get("categoria");

  if (path === "/noticias" && categoria) {
    return pathname === "/noticias" && currentCategoria === categoria;
  }

  if (path === "/noticias") {
    return pathname === "/noticias" && !currentCategoria;
  }

  const bases = item.match ?? [path];
  return bases.some(
    (href) =>
      href !== "/" &&
      href !== "" &&
      (pathname === href || pathname.startsWith(`${href}/`)),
  );
}

/** Mantido para a proposta A; a B não usa CardNav. */
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
