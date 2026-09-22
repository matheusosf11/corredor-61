import type { Metadata } from "next";
import { PlaceNewsList } from "@/components/news/PlaceNewsList";
import { cities, type PlaceSlug } from "@/lib/places";
import { getNewsByPlaces } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Cidades",
  description:
    "Notícias locais de Rio de Janeiro, São Paulo, Brasília e das próximas cidades do Corredor 61.",
};

export default async function CidadesPage() {
  const items = await getNewsByPlaces(cities.map((city) => city.slug as PlaceSlug));
  return (
    <PlaceNewsList title="Cidades" items={items} activeHref="/cidades" />
  );
}
