import type { Metadata } from "next";
import { PlaceNewsList } from "@/components/news/PlaceNewsList";
import { getNewsByPlace } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Brasil",
  description: "Notícias nacionais no Corredor 61.",
};

export default async function BrasilPage() {
  const items = await getNewsByPlace("brasil");
  return (
    <PlaceNewsList title="Brasil" items={items} activeHref="/brasil" />
  );
}
