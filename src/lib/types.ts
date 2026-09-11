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

/** Corpo do CMS (Portable Text) ou blocos estáticos do seed. */
export type ContentBody = BodyBlock[] | unknown[];

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
  photoUrl?: string;
};

export type News = {
  slug: string;
  title: string;
  dek: string;
  body: ContentBody;
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
  body: ContentBody;
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
  logoUrl?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
};

export type AboutContent = {
  title: string;
  proposal: string;
  intro: string[];
  objectives: string[];
  whoMakes: string[];
  people: TeamMember[];
};

export type SearchHit = {
  type: "noticia" | "artigo";
  slug: string;
  title: string;
  dek: string;
  href: string;
};
