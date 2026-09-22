import Link from "next/link";
import { NewsCard } from "@/components/news/NewsItems";
import { cities, cityHref } from "@/lib/places";
import type { News } from "@/lib/types";

export function PlaceNewsList({
  title,
  items,
  activeHref,
}: {
  title: string;
  items: News[];
  activeHref: string;
}) {
  return (
    <div>
      <div className="pad-x border-b border-navy/12 bg-cream py-3 md:py-3.5">
        <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
          <h1 className="font-sans text-[28px] leading-none font-extrabold tracking-[0.08em] text-navy uppercase md:text-[36px]">
            {title}
          </h1>
          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end"
            aria-label="Editorias"
          >
            <PlaceChip href="/mundo" active={activeHref === "/mundo"} label="Mundo" />
            <PlaceChip href="/brasil" active={activeHref === "/brasil"} label="Brasil" />
            <PlaceChip
              href="/bastidores"
              active={activeHref === "/bastidores"}
              label="Bastidores"
            />
            <PlaceChip
              href="/cidades"
              active={activeHref === "/cidades"}
              label="Cidades"
            />
            {cities.map((city) => (
              <PlaceChip
                key={city.slug}
                href={cityHref(city.slug)}
                active={activeHref === cityHref(city.slug)}
                label={city.name}
              />
            ))}
          </nav>
        </div>
      </div>
      <div className="pad-x pt-10 pb-14">
        {items.length === 0 ? (
          <p className="py-16 text-center font-serif text-[15px] text-navy/60">
            Nenhuma notícia publicada nesta editoria por enquanto.
          </p>
        ) : (
          <div className="grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {items.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PlaceChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`nav-link text-[13px] whitespace-nowrap transition-colors md:text-[14px] ${
        active ? "text-gold" : "text-navy hover:text-gold"
      }`}
    >
      {label}
    </Link>
  );
}
