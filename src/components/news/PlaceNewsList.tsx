import { RevealHeading } from "@/components/motion/RevealHeading";
import { NewsCard } from "@/components/news/NewsItems";
import { PageTab, PageTabs } from "@/components/ui/PageTabs";
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
  const inCities =
    activeHref === "/cidades" || activeHref.startsWith("/cidades/");
  // Só abre com animação ao entrar em Cidades, não ao trocar de cidade.
  const expandCities = activeHref === "/cidades";

  return (
    <div>
      <div className="pad-x border-b border-navy/12 bg-cream pt-9 md:pt-11">
        <RevealHeading
          className="text-[30px] leading-none font-extrabold tracking-[-0.025em] text-navy md:text-[34px]"
          prefix={
            <span aria-hidden className="mr-[0.35em] font-extrabold text-gold">
              /
            </span>
          }
        >
          {title}
        </RevealHeading>
        <PageTabs label="Editorias">
          <PageTab fluid href="/mundo" active={activeHref === "/mundo"} label="Mundo" />
          <PageTab fluid href="/brasil" active={activeHref === "/brasil"} label="Brasil" />
          <PageTab
            fluid
            href="/bastidores"
            active={activeHref === "/bastidores"}
            label="Bastidores"
          />
          <PageTab
            fluid
            href="/cidades"
            active={activeHref === "/cidades"}
            label="Cidades"
          />
          {inCities
            ? cities.map((city, i) => (
                <PageTab
                  key={city.slug}
                  fluid
                  expand={expandCities}
                  style={expandCities ? { animationDelay: `${i * 40}ms` } : undefined}
                  href={cityHref(city.slug)}
                  active={activeHref === cityHref(city.slug)}
                  label={city.name}
                />
              ))
            : null}
        </PageTabs>
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
