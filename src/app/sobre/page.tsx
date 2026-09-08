import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getAbout } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "Proposta, objetivos e pessoas por trás do portal Corredor 61.",
};

export default async function SobrePage() {
  const about = await getAbout();

  return (
    <div>
      {/* Abertura — faixa marinho */}
      <div className="pad-x flex flex-col items-center bg-navy py-12 md:py-[52px]">
        <div className="flex w-full max-w-[64ch] flex-col gap-4">
          <span className="nav-link text-[10px] leading-none text-gold">
            Sobre nós
          </span>
          <h1 className="text-[28px] leading-[1.08] font-extrabold tracking-[-0.03em] text-[#f7f4ea] text-pretty sm:text-[34px] md:text-[42px]">
            Um corredor entre o debate público e as instâncias de decisão
          </h1>
        </div>
      </div>

      {/* Corpo — coluna única, só com o essencial */}
      <div className="pad-x flex flex-col items-center bg-white pt-12 pb-16 md:pt-14 md:pb-[72px]">
        <div className="flex w-full max-w-[64ch] flex-col gap-7">
          <p className="font-serif text-[18px] leading-[1.7] text-[#1a1a1a] text-justify hyphens-auto md:text-[19px]">
            {about.proposal}
          </p>
          <p className="font-serif text-[16px] leading-[1.72] text-[#1a1a1a]/80 text-justify hyphens-auto md:text-[17px]">
            O nome remete a Brasília e ao corredor institucional que liga o
            debate público ao Congresso, ao Executivo, ao Judiciário e aos demais
            órgãos. A proposta é dar endereço permanente a conteúdos que hoje
            ficam dispersos entre redes sociais, assessorias e veículos
            generalistas.
          </p>

          <section aria-labelledby="sobre-objetivos" className="flex flex-col gap-3.5">
            <h2
              id="sobre-objetivos"
              className="nav-link mt-3.5 text-[12px] leading-none text-navy"
            >
              Objetivos
            </h2>
            {about.objectives.map((objective) => (
              <p
                key={objective}
                className="font-serif text-[16px] leading-[1.6] text-[#1a1a1a] text-justify hyphens-auto md:text-[17px]"
              >
                {objective}
              </p>
            ))}
          </section>

          <section
            aria-labelledby="sobre-quem-faz"
            className="mt-3.5 flex flex-col gap-5 border-t border-navy/15 pt-[22px]"
          >
            <h2
              id="sobre-quem-faz"
              className="nav-link text-[12px] leading-none text-navy"
            >
              Quem faz
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
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
          </section>

          <section
            aria-labelledby="sobre-contato"
            className="mt-3.5 flex flex-col gap-2.5 border-t border-navy/15 pt-[22px]"
          >
            <h2
              id="sobre-contato"
              className="nav-link text-[12px] leading-none text-navy"
            >
              Contato
            </h2>
            <p className="font-serif text-[16px] leading-[1.6] text-[#1a1a1a]/80 text-justify hyphens-auto md:text-[17px]">
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
