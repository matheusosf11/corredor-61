import type { MetadataRoute } from "next";
import {
  getActiveAuthors,
  getPublishedArticles,
  getPublishedNews,
} from "@/lib/queries";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const [news, articles, authors] = await Promise.all([
    getPublishedNews(),
    getPublishedArticles(),
    getActiveAuthors(),
  ]);

  return [
    ...staticRoutes,
    ...news.map((item) => ({
      url: `${base}/noticias/${item.slug}`,
      lastModified: new Date(item.publishedAt),
    })),
    ...articles.map((item) => ({
      url: `${base}/artigos/${item.slug}`,
      lastModified: new Date(item.publishedAt),
    })),
    ...authors.map((item) => ({
      url: `${base}/autores/${item.slug}`,
      lastModified: new Date(),
    })),
  ];
}
