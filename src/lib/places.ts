export const cities = [
  { slug: "rio-de-janeiro", name: "Rio de Janeiro" },
  { slug: "sao-paulo", name: "São Paulo" },
  { slug: "brasilia", name: "Brasília" },
] as const;

export type CitySlug = (typeof cities)[number]["slug"];
export type PlaceSlug = "mundo" | "brasil" | "bastidores" | CitySlug;

export type Place = {
  slug: PlaceSlug;
  name: string;
  href: string;
  description: string;
};

export function cityHref(slug: CitySlug) {
  return `/cidades/${slug}`;
}

export const places: Place[] = [
  {
    slug: "mundo",
    name: "Mundo",
    href: "/mundo",
    description: "Notícias de fora do Brasil.",
  },
  {
    slug: "brasil",
    name: "Brasil",
    href: "/brasil",
    description: "Notícias nacionais, sem recorte de uma cidade.",
  },
  {
    slug: "bastidores",
    name: "Bastidores",
    href: "/bastidores",
    description: "Negociações, corredores e o que acontece fora do plenário.",
  },
  ...cities.map((city) => ({
    slug: city.slug,
    name: city.name,
    href: cityHref(city.slug),
    description: `Notícias de ${city.name}.`,
  })),
];

export const placeOptions = places.map((place) => ({
  title: `${place.name} (${place.href})`,
  value: place.slug,
}));

export function placeName(slug: string | undefined) {
  return places.find((place) => place.slug === slug)?.name ?? slug ?? "";
}

/** Cobertura de demonstração, enquanto o CMS não marca a praça. */
export const seedNewsPlaces: Record<string, PlaceSlug> = {
  "ccj-analisa-rito-legislativo": "brasilia",
  "stf-pauta-orgaos-de-controle": "brasilia",
  "congresso-calendario-votacoes": "brasilia",
  "tcu-orientacoes-convenios": "brasilia",
  "camara-marco-dados-publicos": "brasilia",
  "comissao-mista-medidas-provisorias": "brasilia",
  "agu-parecer-conflitos-federativos": "brasilia",
  "senado-agenda-sabatinas-indicados": "brasilia",
  "camara-aprova-urgencia-marco-licitacoes": "brasilia",
  "tribunal-prazos-processuais-digitais": "brasil",
  "estados-regra-transferencias": "brasil",
  "cnj-revisa-metas-produtividade": "brasil",
  "tcu-audita-transferencias-fundo-a-fundo": "brasil",
  "governadores-discutem-pacto-federativo": "brasil",
};

export function getPlace(slug: string) {
  return places.find((place) => place.slug === slug) ?? null;
}

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug) ?? null;
}

export function isCitySlug(slug: string): slug is CitySlug {
  return cities.some((city) => city.slug === slug);
}
