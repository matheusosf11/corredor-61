import type { MetadataRoute } from "next";
import { cities } from "@/lib/places";
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
    "/mundo",
    "/brasil",
    "/cidades",
    "/bastidores",
    "/artigos",
    "/videos",
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
    ...cities.map((city) => ({
      url: `${base}/cidades/${city.slug}`,
      lastModified: new Date(),
    })),
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
