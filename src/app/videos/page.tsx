import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/ui/PageHead";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vídeos",
  description:
    "Podcasts e publicações do Corredor 61 no Instagram. O vídeo abre lá; aqui só o convite.",
};

const videos = [
  {
    title: "Lula: democracia não pode ficar refém de vazamentos seletivos",
    href: "https://www.instagram.com/reel/Dc2Gv5ls-NJ/",
    cover: "/videos/reel-1.jpg",
    coverAlt: "Capa do reel do Corredor 61 sobre Lula e o Banco Master",
  },
  {
    title: "Renan Santos: não vou desistir da disputa presidencial",
    href: "https://www.instagram.com/reel/Dcue9b0MGdH/",
    cover: "/videos/reel-2.jpg",
    coverAlt: "Capa do reel do Corredor 61 com Renan Santos",
  },
  {
    title: "Flávio Bolsonaro: vou respeitar o resultado das urnas",
    href: "https://www.instagram.com/reel/Dcnv22PuEDM/",
    cover: "/videos/reel-3.jpg",
    coverAlt: "Capa do reel do Corredor 61 com Flávio Bolsonaro",
  },
];

export default function VideosPage() {
  return (
    <div>
      <PageHead
        eyebrow="Instagram"
        title="Vídeos"
        description="Não há player no portal: cada card redireciona para o Instagram, no mesmo espírito de um link no WhatsApp. Assim o site permanece leve e as visitas reforçam o perfil."
      />
      <div className="pad-x bg-navy py-14">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {videos.map((item) => (
            <li key={item.href} className="max-w-[220px]">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col border border-cream/20 bg-[#0b1730] transition-colors hover:border-gold"
              >
                <span className="relative aspect-[4/5] overflow-hidden border-b border-cream/15 bg-blackish">
                  <Image
                    src={item.cover}
                    alt={item.coverAlt}
                    fill
                    sizes="220px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-2 bottom-2 font-sans text-[9px] font-bold tracking-[0.14em] text-gold uppercase">
                    Ver ↗
                  </span>
                </span>
                <span className="flex flex-1 flex-col gap-1.5 px-3 py-3">
                  <span className="nav-link text-[9px] text-gold">
                    {site.instagramHandle}
                  </span>
                  <span className="line-clamp-3 text-[13px] leading-snug font-bold text-cream">
                    {item.title}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
