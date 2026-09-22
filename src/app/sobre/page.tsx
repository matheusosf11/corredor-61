import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getAbout } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "O Corredor 61 é um portal de conteúdo técnico, jurídico, legislativo e político que conecta informação, análise e experiência prática sobre o poder público e o debate nacional.",
};

function splitObjective(item: string) {
  const index = item.indexOf(":");
  if (index === -1) return { label: null, text: item };
  return {
    label: item.slice(0, index).trim(),
    text: item.slice(index + 1).trim(),
  };
}

const prose =
  "font-sans text-[17px] leading-[1.75] font-normal text-[#333] md:text-[18px]";

export default async function SobrePage() {
  const about = await getAbout();

  return (
    <div>
      <div className="pad-x flex flex-col items-center border-b border-navy/12 bg-cream py-12 md:py-[52px]">
        <div className="flex w-full max-w-[860px] flex-col gap-4">
          <span className="nav-link text-[10px] leading-none text-gold-ink">
            Sobre nós
          </span>
          <h1 className="text-[28px] leading-[1.08] font-extrabold tracking-[-0.03em] text-navy text-pretty sm:text-[34px] md:text-[42px]">
            {about.title}
          </h1>
          <p className={prose}>
            {about.proposal}
          </p>
        </div>
      </div>

      <div className="pad-x flex flex-col items-center bg-white pt-12 pb-16 md:pt-14 md:pb-[72px]">
        <div className="flex w-full max-w-[860px] flex-col">
          <div className="flex flex-col gap-9 md:gap-11">
            {about.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className={prose}>
                {paragraph}
              </p>
            ))}
          </div>

          <section
            aria-labelledby="sobre-objetivos"
            className="mt-16 border-t border-navy/15 pt-10 md:mt-20 md:pt-12"
          >
            <h2
              id="sobre-objetivos"
              className="nav-link text-[18px] leading-none text-navy md:text-[20px]"
            >
              Objetivos
            </h2>
            <div className="mt-2 divide-y divide-navy/12">
              {about.objectives.map((objective) => {
                const { label, text } = splitObjective(objective);
                return (
                  <div key={objective} className="py-7 md:py-8">
                    {label ? (
                      <h3 className="font-sans text-[18px] leading-snug font-bold text-navy md:text-[20px]">
                        {label}
                      </h3>
                    ) : null}
                    <p className={`${prose} mt-4`}>{text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            aria-labelledby="sobre-quem-faz"
            className="mt-16 flex flex-col gap-8 border-t border-navy/15 pt-10 md:mt-20 md:gap-9 md:pt-12"
          >
            <h2
              id="sobre-quem-faz"
              className="nav-link text-[18px] leading-none text-navy md:text-[20px]"
            >
              Quem faz
            </h2>
            {about.whoMakes.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className={prose}>
                {paragraph}
              </p>
            ))}
            {about.people.length > 0 ? (
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
                {about.people.map((person, index) => (
                  <div key={person.name} className="flex flex-col gap-2.5">
                    <div
                      role="img"
                      aria-label={`Foto de ${person.name}`}
                      style={{
                        backgroundImage: `url("${person.photoUrl ?? `/team/${(index % 3) + 1}.jpg`}")`,
                      }}
                      className="aspect-[4/5] w-full bg-cover bg-top"
                    />
                    <span className="font-sans text-[16px] leading-[1.24] font-bold text-navy text-pretty">
                      {person.name}
                    </span>
                    <span className="font-mono text-[11.5px] leading-[1.45] text-navy/60">
                      {person.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          <section
            aria-labelledby="sobre-contato"
            className="mt-16 flex flex-col gap-4 border-t border-navy/15 pt-10 md:mt-20 md:pt-12"
          >
            <h2
              id="sobre-contato"
              className="nav-link text-[18px] leading-none text-navy md:text-[20px]"
            >
              Contato
            </h2>
            <p className={prose}>
              Sugestões de pauta e propostas de artigo chegam pelo Instagram do
              portal.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start font-sans text-[12px] font-bold tracking-[0.14em] text-gold-ink uppercase"
            >
              {site.instagramHandle} ↗
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
