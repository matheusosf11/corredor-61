import { about, articles, authors, news, supporters } from "./data";
import { DEMO_IMAGES, demoImageAt } from "./demo-images";
import { bodyToText, initialsFromName } from "./format";
import { categories, getCategory } from "./categories";
import type {
  AboutContent,
  Article,
  Author,
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
  newsBySlugQuery,
  newsQuery,
  searchQuery,
  supportersQuery,
} from "@/sanity/queries";

export { getCategory, categories as getCategoriesList };

export function getCategories() {
  return categories;
}

const NEWS_PAGE_SIZE = 9;
const ARTICLE_PAGE_SIZE = 9;
const fetchOpts = { next: { revalidate: 60, tags: ["sanity"] as string[] } };

function isLive(item: { status: string; publishedAt: string }) {
  return (
    item.status === "published" &&
    new Date(item.publishedAt).getTime() <= Date.now()
  );
}

function byDateDesc<T extends { publishedAt: string }>(a: T, b: T) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

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

function withCover(item: News, index: number): News {
  return {
    ...item,
    cover: { ...item.cover, image: item.cover.image ?? demoImageAt(index) },
  };
}

function withArticleCover(item: Article, index: number): Article {
  const offset = Math.floor(DEMO_IMAGES.length / 2);
  return {
    ...item,
    cover: {
      ...item.cover,
      image: item.cover.image ?? demoImageAt(index + offset),
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

function staticNews(): News[] {
  return news
    .filter(isLive)
    .slice()
    .sort(byDateDesc)
    .map((item, index) => withCover(item, index));
}

function staticArticles(): Article[] {
  return articles
    .filter(isLive)
    .slice()
    .sort(byDateDesc)
    .map((item, index) => withArticleCover(item, index));
}

export async function getPublishedNews(category?: CategorySlug) {
  const rows = await cmsFetch<News[]>(newsQuery);
  const list = rows?.length
    ? rows.map((item, index) => withCover(item, index))
    : staticNews();
  return category ? list.filter((item) => item.category === category) : list;
}

export async function getNewsBySlug(slug: string) {
  const row = await cmsFetch<News | null>(newsBySlugQuery, { slug });
  if (row) return withCover(row, 0);
  return staticNews().find((item) => item.slug === slug) ?? null;
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
  if (rows?.length) {
    return rows.map((item, index) => withArticleCover(item, index));
  }
  return staticArticles();
}

export async function getArticleBySlug(slug: string) {
  const row = await cmsFetch<Article | null>(articleBySlugQuery, { slug });
  if (row) return withArticleCover(row, 0);
  return staticArticles().find((item) => item.slug === slug) ?? null;
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
  if (rows?.length) return rows.map(hydrateAuthor);
  return authors;
}

export async function getActiveAuthors() {
  return (await getAllAuthors()).filter((author) => author.active);
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return (await getAllAuthors()).find((author) => author.slug === slug) ?? null;
}

export async function getAuthor(article: Article) {
  const author = await getAuthorBySlug(article.authorSlug);
  if (!author) {
    throw new Error(`Autor não encontrado: ${article.authorSlug}`);
  }
  return author;
}

export async function getActiveSupporters(): Promise<Supporter[]> {
  const rows = await cmsFetch<Supporter[]>(supportersQuery);
  if (rows?.length) return rows;
  return supporters
    .filter((item) => item.active)
    .slice()
    .sort((a, b) => a.order - b.order);
}

export async function getAbout(): Promise<AboutContent> {
  const row = await cmsFetch<AboutContent | null>(aboutQuery);
  if (row?.proposal) return row;
  return about;
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
