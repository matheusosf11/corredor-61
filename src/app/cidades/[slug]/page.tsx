import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceNewsList } from "@/components/news/PlaceNewsList";
import { cities, cityHref, getCity } from "@/lib/places";
import { getNewsByPlace } from "@/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return { title: "Cidade" };
  return {
    title: city.name,
    description: `Notícias de ${city.name} no Corredor 61.`,
  };
}

export default async function CidadePage({ params }: Props) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  const items = await getNewsByPlace(city.slug);
  return (
    <PlaceNewsList
      title={city.name}
      items={items}
      activeHref={cityHref(city.slug)}
    />
  );
}
