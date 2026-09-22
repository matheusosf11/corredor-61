import type { Metadata } from "next";
import { PlaceNewsList } from "@/components/news/PlaceNewsList";
import { getNewsByPlace } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Mundo",
  description: "Notícias de fora do Brasil no Corredor 61.",
};

export default async function MundoPage() {
  const items = await getNewsByPlace("mundo");
  return (
    <PlaceNewsList title="Mundo" items={items} activeHref="/mundo" />
  );
}
