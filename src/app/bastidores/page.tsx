import type { Metadata } from "next";
import { PlaceNewsList } from "@/components/news/PlaceNewsList";
import { getNewsByPlace } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Bastidores",
  description:
    "Negociações, corredores e o que acontece fora do plenário no Corredor 61.",
};

export default async function BastidoresPage() {
  const items = await getNewsByPlace("bastidores");
  return (
    <PlaceNewsList title="Bastidores" items={items} activeHref="/bastidores" />
  );
}
