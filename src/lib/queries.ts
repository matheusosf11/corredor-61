import { about } from "./data";
import { bodyToText, initialsFromName } from "./format";
import { categories, categoryLabel, getCategory } from "./categories";
import type { InstagramPost } from "./instagramPosts";
import type { PlaceSlug } from "./places";
import type {
  AboutContent,
  Article,
  Author,
  Category,
  CategorySlug,
  News,
  SearchHit,
  Supporter,
} from "./types";
import { client } from "@/sanity/client";
import {
  aboutQuery,
  articleBySlugQuery,
  articlesQuery,
  authorsQuery,
  categoriesQuery,
  newsBySlugQuery,
  newsQuery,
  searchQuery,
  supportersQuery,
  videosQuery,
} from "@/sanity/queries";

export { getCategory, categories as getCategoriesList };

export async function getCategories(): Promise<Category[]> {
  const rows = await cmsFetch<Category[]>(categoriesQuery);
  if (rows?.length) {
    return rows.filter((row) => row.slug && row.name);
  }
  return categories;
}

const NEWS_PAGE_SIZE = 9;
const ARTICLE_PAGE_SIZE = 9;
const fetchOpts = { next: { revalidate: 60, tags: ["sanity"] as string[] } };

async function cmsFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, fetchOpts);
  } catch (error) {
    console.error("Sanity:", error);
    return null;
  }
}

function withCover(item: News): News {
  return {
    ...item,
    categoryName: categoryLabel(item.category, item.categoryName),
    cover: {
      alt: item.cover?.alt ?? item.title,
      motif: item.cover?.motif ?? item.category,
      image: item.cover?.image,
    },
  };
}

function withArticleCover(item: Article): Article {
  return {
    ...item,
    authorSlug: item.authorSlug ?? "",
    categoryName: item.category
      ? categoryLabel(item.category, item.categoryName, "Opinião")
      : "Opinião",
    cover: {
      alt: item.cover?.alt ?? item.title,
      motif: item.cover?.motif ?? "opiniao",
      image: item.cover?.image,
    },
  };
}

function hydrateAuthor(
  row: Partial<Author> & { name: string; slug: string },
): Author {
  return {
    slug: row.slug,
    name: row.name,
    role: row.role ?? "",
    bio: row.bio ?? "",
    initials: row.initials || initialsFromName(row.name),
    active: row.active ?? true,
    photoUrl: row.photoUrl,
  };
}

export async function getPublishedNews(category?: CategorySlug) {
  const rows = await cmsFetch<News[]>(newsQuery);
  const list = (rows ?? []).map((item) => withCover(item));
  return category ? list.filter((item) => item.category === category) : list;
}

export async function getNewsBySlug(slug: string) {
  const row = await cmsFetch<News | null>(newsBySlugQuery, { slug });
  return row ? withCover(row) : null;
}

export async function getHomeHeroNews(limit = 5): Promise<News[]> {
  const published = await getPublishedNews();
  const featured = published.find((item) => item.featured);
  const ordered = featured
    ? [featured, ...published.filter((item) => item.slug !== featured.slug)]
    : published;
  return ordered.slice(0, limit);
}

export async function getHomeNewsGrid(featuredSlug: string, limit = 6) {
  return (await getPublishedNews())
    .filter((item) => item.slug !== featuredSlug)
    .slice(0, limit);
}

export async function getNewsByPlace(place: PlaceSlug) {
  return (await getPublishedNews()).filter((item) => item.place === place);
}

export async function getNewsByPlaces(places: PlaceSlug[]) {
  const allowed = new Set(places);
  return (await getPublishedNews()).filter(
    (item) => item.place && allowed.has(item.place),
  );
}

export async function getNewsPage(page: number, category?: CategorySlug) {
  const items = await getPublishedNews(category);
  const totalPages = Math.max(1, Math.ceil(items.length / NEWS_PAGE_SIZE));
  const current = Math.min(Math.max(page, 1), totalPages);
  const start = (current - 1) * NEWS_PAGE_SIZE;
  return {
    items: items.slice(start, start + NEWS_PAGE_SIZE),
    page: current,
    totalPages,
    total: items.length,
  };
}

export async function getPublishedArticles() {
  const rows = await cmsFetch<Article[]>(articlesQuery);
  return (rows ?? []).map((item) => withArticleCover(item));
}

export async function getArticleBySlug(slug: string) {
  const row = await cmsFetch<Article | null>(articleBySlugQuery, { slug });
  return row ? withArticleCover(row) : null;
}

export async function getHomeArticles(limit = 5) {
  return (await getPublishedArticles()).slice(0, limit);
}

export async function getArticlesByAuthor(authorSlug: string) {
  return (await getPublishedArticles()).filter(
    (item) => item.authorSlug === authorSlug,
  );
}

export async function getAllAuthors() {
  const rows = await cmsFetch<Author[]>(authorsQuery);
  return (rows ?? []).map(hydrateAuthor);
}

export async function getActiveAuthors() {
  return (await getAllAuthors()).filter((author) => author.active);
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return (await getAllAuthors()).find((author) => author.slug === slug) ?? null;
}

export async function getAuthor(article: Article) {
  const author = article.authorSlug
    ? await getAuthorBySlug(article.authorSlug)
    : null;
  if (author) return author;
  return {
    slug: article.authorSlug || "corredor-61",
    name: article.authorName || "Corredor 61",
    role: "",
    bio: "",
    initials: initialsFromName(article.authorName || "Corredor 61"),
    active: true,
    photoUrl: article.authorPhotoUrl,
  };
}

export async function getActiveSupporters(): Promise<Supporter[]> {
  const rows = await cmsFetch<Supporter[]>(supportersQuery);
  return (rows ?? []).filter((item) => item.active !== false);
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const rows = await cmsFetch<InstagramPost[]>(videosQuery);
  return (rows ?? []).filter((row) => row.href && row.cover);
}

export async function getAbout(): Promise<AboutContent> {
  const row = await cmsFetch<AboutContent | null>(aboutQuery);
  if (!row?.proposal) return about;
  return {
    ...about,
    ...row,
    intro: row.intro?.length ? row.intro : about.intro,
    whoMakes: row.whoMakes?.length ? row.whoMakes : about.whoMakes,
    people: row.people ?? [],
  };
}

export async function searchContent(query: string): Promise<SearchHit[]> {
  const term = query.trim();
  if (!term) return [];

  const rows = await cmsFetch<
    { _type: string; slug: string; title: string; dek: string }[] | null
  >(searchQuery, { term: `${term}*` });

  if (rows?.length) {
    return rows.map((hit) => ({
      type: hit._type === "article" ? ("artigo" as const) : ("noticia" as const),
      slug: hit.slug,
      title: hit.title,
      dek: hit.dek,
      href:
        hit._type === "article"
          ? `/artigos/${hit.slug}`
          : `/noticias/${hit.slug}`,
    }));
  }

  const needle = term.toLowerCase();
  const newsHits: SearchHit[] = (await getPublishedNews())
    .filter((item) =>
      matches(item.title, item.dek, bodyToText(item.body), needle),
    )
    .map((item) => ({
      type: "noticia" as const,
      slug: item.slug,
      title: item.title,
      dek: item.dek,
      href: `/noticias/${item.slug}`,
    }));

  const articleHits: SearchHit[] = (await getPublishedArticles())
    .filter((item) =>
      matches(item.title, item.dek, bodyToText(item.body), needle),
    )
    .map((item) => ({
      type: "artigo" as const,
      slug: item.slug,
      title: item.title,
      dek: item.dek,
      href: `/artigos/${item.slug}`,
    }));

  return [...newsHits, ...articleHits];
}

function matches(title: string, dek: string, body: string, term: string) {
  return `${title} ${dek} ${body}`.toLowerCase().includes(term);
}

export const PAGE_SIZE = { news: NEWS_PAGE_SIZE, articles: ARTICLE_PAGE_SIZE };
