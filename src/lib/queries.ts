import { about, articles, authors, categories, news, supporters } from "./data";
import { DEMO_IMAGES, demoImageAt } from "./demo-images";
import { bodyToText } from "./format";
import type {
  Article,
  Author,
  CategorySlug,
  News,
  SearchHit,
} from "./types";

const NEWS_PAGE_SIZE = 9;
const ARTICLE_PAGE_SIZE = 9;

function isLive(item: { status: string; publishedAt: string }) {
  return (
    item.status === "published" &&
    new Date(item.publishedAt).getTime() <= Date.now()
  );
}

function byDateDesc<T extends { publishedAt: string }>(a: T, b: T) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export function getCategories() {
  return categories;
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug) ?? null;
}

/**
 * Lista completa de notícias publicadas, ordenada, com uma capa de
 * demonstração fixa por posição (rodízio) — assim uma mesma matéria mostra
 * sempre a mesma imagem em qualquer lugar e listas não repetem capas.
 */
function publishedNewsWithCovers(): News[] {
  return news
    .filter(isLive)
    .slice()
    .sort(byDateDesc)
    .map((item, index) => ({
      ...item,
      cover: { ...item.cover, image: item.cover.image ?? demoImageAt(index) },
    }));
}

export function getPublishedNews(category?: CategorySlug) {
  const list = publishedNewsWithCovers();
  return category
    ? list.filter((item) => item.category === category)
    : list;
}

export function getNewsBySlug(slug: string) {
  return getPublishedNews().find((item) => item.slug === slug) ?? null;
}

export function getFeaturedNews(): News {
  const published = getPublishedNews();
  const featured = published.find((item) => item.featured) ?? published[0];
  if (!featured) {
    throw new Error("Nenhuma notícia publicada para a home.");
  }
  return featured;
}

export function getHomeHeroNews(limit = 5): News[] {
  const published = getPublishedNews();
  const featured = published.find((item) => item.featured);
  const ordered = featured
    ? [featured, ...published.filter((item) => item.slug !== featured.slug)]
    : published;
  return ordered.slice(0, limit);
}

export function getHomeNewsGrid(featuredSlug: string, limit = 6) {
  return getPublishedNews()
    .filter((item) => item.slug !== featuredSlug)
    .slice(0, limit);
}

export function getNewsPage(page: number, category?: CategorySlug) {
  const items = getPublishedNews(category);
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

export function getPublishedArticles() {
  // Deslocamento no rodízio para não coincidir com a capa da notícia de mesma
  // posição quando as duas listas aparecem juntas (ex.: home).
  const offset = Math.floor(DEMO_IMAGES.length / 2);
  return articles
    .filter(isLive)
    .slice()
    .sort(byDateDesc)
    .map((item, index) => ({
      ...item,
      cover: {
        ...item.cover,
        image: item.cover.image ?? demoImageAt(index + offset),
      },
    }));
}

export function getArticleBySlug(slug: string) {
  return getPublishedArticles().find((item) => item.slug === slug) ?? null;
}

export function getHomeArticles(limit = 5) {
  return getPublishedArticles().slice(0, limit);
}

export function getArticlesPage(page: number) {
  const items = getPublishedArticles();
  const totalPages = Math.max(1, Math.ceil(items.length / ARTICLE_PAGE_SIZE));
  const current = Math.min(Math.max(page, 1), totalPages);
  const start = (current - 1) * ARTICLE_PAGE_SIZE;
  return {
    items: items.slice(start, start + ARTICLE_PAGE_SIZE),
    page: current,
    totalPages,
    total: items.length,
  };
}

export function getArticlesByAuthor(authorSlug: string) {
  return getPublishedArticles().filter((item) => item.authorSlug === authorSlug);
}

export function getAllAuthors() {
  return authors;
}

export function getActiveAuthors() {
  return authors.filter((author) => author.active);
}

export function getAuthorBySlug(slug: string): Author | null {
  return authors.find((author) => author.slug === slug) ?? null;
}

export function getAuthor(article: Article) {
  const author = getAuthorBySlug(article.authorSlug);
  if (!author) {
    throw new Error(`Autor não encontrado: ${article.authorSlug}`);
  }
  return author;
}

export function getActiveSupporters() {
  return supporters
    .filter((item) => item.active)
    .slice()
    .sort((a, b) => a.order - b.order);
}

export function getAbout() {
  return about;
}

export function getSiteStats() {
  return {
    news: getPublishedNews().length,
    articles: getPublishedArticles().length,
    authors: getActiveAuthors().length,
  };
}

export function getRecentFeed(limit = 8) {
  const mixed = [
    ...getPublishedNews().map((item) => ({
      type: "noticia" as const,
      slug: item.slug,
      title: item.title,
      publishedAt: item.publishedAt,
      href: `/noticias/${item.slug}`,
    })),
    ...getPublishedArticles().map((item) => ({
      type: "artigo" as const,
      slug: item.slug,
      title: item.title,
      publishedAt: item.publishedAt,
      href: `/artigos/${item.slug}`,
    })),
  ]
    .sort(byDateDesc)
    .slice(0, limit);

  return mixed;
}

export function searchContent(query: string): SearchHit[] {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  const newsHits: SearchHit[] = getPublishedNews()
    .filter((item) => matches(item.title, item.dek, bodyToText(item.body), term))
    .map((item) => ({
      type: "noticia",
      slug: item.slug,
      title: item.title,
      dek: item.dek,
      href: `/noticias/${item.slug}`,
    }));

  const articleHits: SearchHit[] = getPublishedArticles()
    .filter((item) => matches(item.title, item.dek, bodyToText(item.body), term))
    .map((item) => ({
      type: "artigo",
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
