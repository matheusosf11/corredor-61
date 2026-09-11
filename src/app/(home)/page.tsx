import { takeNews } from "@/lib/editorial";
import {
  getAllAuthors,
  getHomeArticles,
  getPublishedNews,
} from "@/lib/queries";
import { EditoriaRail } from "./_components/EditoriaRail";
import { HomeHero } from "./_components/HomeHero";
import { NewsletterBar } from "./_components/NewsletterBar";
import { PoderBlock } from "./_components/PoderBlock";
import { StoryTeaser } from "./_components/StoryTeaser";

export default async function HomePage() {
  const [news, articles, authors] = await Promise.all([
    getPublishedNews(),
    getHomeArticles(8),
    getAllAuthors(),
  ]);
  const authorsBySlug = new Map(authors.map((author) => [author.slug, author]));
  const used = new Set<string>();
  const hero = takeNews(news, used);
  const bastidores = takeNews(news, used, "politica");
  const entenda = takeNews(news, used, "institucional");
  const opiniao = articles[0];
  const congresso = takeNews(news, used, "legislativo");
  const executivo = takeNews(news, used, "institucional");
  const judiciario = takeNews(news, used, "judiciario");
  const opiniaoAuthor = opiniao
    ? authorsBySlug.get(opiniao.authorSlug)
    : undefined;

  return (
    <div className="bg-white">
      <h1 className="sr-only">
        Corredor 61 — Brasília por dentro, notícias e artigos sobre política,
        direito e legislação
      </h1>

      <div className="pad-x py-5 lg:py-6">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:gap-6">
          <div className="flex min-w-0 flex-col gap-6">
            {hero ? (
              <HomeHero item={hero} />
            ) : (
              <div className="flex min-h-[280px] items-center bg-[#0b1730] px-8 py-16">
                <p className="font-serif text-[18px] text-cream/80">
                  As primeiras notícias aparecem aqui assim que forem publicadas
                  no estúdio.
                </p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-3">
              {bastidores ? (
                <StoryTeaser
                  href={`/noticias/${bastidores.slug}`}
                  eyebrow="Bastidores"
                  title={bastidores.title}
                  cover={bastidores.cover}
                />
              ) : null}
              {entenda ? (
                <StoryTeaser
                  href={`/noticias/${entenda.slug}`}
                  eyebrow="Entenda"
                  title={entenda.title}
                  cover={entenda.cover}
                />
              ) : null}
              {opiniao ? (
                <StoryTeaser
                  href={`/artigos/${opiniao.slug}`}
                  eyebrow="Opinião"
                  title={opiniao.title}
                  cover={opiniao.cover}
                  cta={`Por ${opiniaoAuthor?.name ?? "Redação"} →`}
                />
              ) : null}
            </div>

            <PoderBlock
              congresso={congresso}
              executivo={executivo}
              judiciario={judiciario}
            />

            <NewsletterBar />
          </div>

          <EditoriaRail />
        </div>
      </div>
    </div>
  );
}
