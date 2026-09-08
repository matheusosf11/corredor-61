export type CategorySlug =
  | "legislativo"
  | "judiciario"
  | "politica"
  | "institucional";

export type Category = {
  slug: CategorySlug;
  name: string;
};

export type ContentStatus = "draft" | "published";

export type BodyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Cover = {
  alt: string;
  motif: CategorySlug | "opiniao";
  /** Capa explícita. Sem CMS, é preenchida com uma imagem de demonstração. */
  image?: string;
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  active: boolean;
};

export type News = {
  slug: string;
  title: string;
  dek: string;
  body: BodyBlock[];
  cover: Cover;
  authorName: string;
  category: CategorySlug;
  publishedAt: string;
  status: ContentStatus;
  featured?: boolean;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  body: BodyBlock[];
  cover: Cover;
  authorSlug: string;
  category?: CategorySlug;
  publishedAt: string;
  status: ContentStatus;
};

export type Supporter = {
  slug: string;
  name: string;
  shortName: string;
  url?: string;
  order: number;
  active: boolean;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export type AboutContent = {
  title: string;
  proposal: string;
  objectives: string[];
  people: TeamMember[];
};

export type SearchHit = {
  type: "noticia" | "artigo";
  slug: string;
  title: string;
  dek: string;
  href: string;
};
