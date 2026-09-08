import type { MetadataRoute } from "next";
import {
  getActiveAuthors,
  getPublishedArticles,
  getPublishedNews,
} from "@/lib/queries";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/noticias",
    "/artigos",
    "/autores",
    "/sobre",
    "/apoiadores",
    "/busca",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const news = getPublishedNews().map((item) => ({
    url: `${base}/noticias/${item.slug}`,
    lastModified: new Date(item.publishedAt),
  }));

  const articles = getPublishedArticles().map((item) => ({
    url: `${base}/artigos/${item.slug}`,
    lastModified: new Date(item.publishedAt),
  }));

  const authors = getActiveAuthors().map((item) => ({
    url: `${base}/autores/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...news, ...articles, ...authors];
}
