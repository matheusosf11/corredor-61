import Image from "next/image";
import Link from "next/link";
import { getActiveSupporters } from "@/lib/queries";
import { site } from "@/lib/site";
import { SupporterLogo } from "@/components/supporters/SupportersBand";

const footerNav = [
  { href: "/noticias", label: "Notícias" },
  { href: "/noticias?categoria=politica", label: "Bastidores" },
  { href: "/artigos", label: "Opinião" },
  { href: "/videos", label: "Vídeos" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/apoiadores", label: "Apoiadores" },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10a2.2 2.2 0 0 0 2.2-2.2V7A2.2 2.2 0 0 0 17 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.35-3.05a.85.85 0 1 1-.85.85.85.85 0 0 1 .85-.85Z" />
    </svg>
  );
}

export async function Footer() {
  const supporters = await getActiveSupporters();

  return (
    <footer>
      {/* Faixa de apoiadores */}
      <div className="pad-x border-t border-navy/15 bg-cream pt-7 pb-14 md:pt-9 md:pb-20">
        <div className="mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="font-sans text-[19px] leading-none font-extrabold tracking-[-0.01em] text-navy uppercase md:text-[24px]">
            Apoiadores Institucionais
          </h2>
        </div>
        <ul className="grid grid-cols-3 gap-2.5 md:grid-cols-6 md:gap-4">
          {supporters.slice(0, 6).map((item) => (
            <li key={item.slug}>
              <SupporterLogo item={item} />
            </li>
          ))}
        </ul>
      </div>

      {/* Rodapé institucional — mesmo azul da faixa do logo */}
      <div className="pad-x bg-[#001630] py-12 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            aria-label={`${site.name} — página inicial`}
            className="shrink-0"
          >
            <Image
              src="/logo-corredor61-wordmark.svg"
              alt={site.name}
              width={280}
              height={60}
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <nav
            aria-label="Rodapé"
            className="flex flex-wrap gap-x-7 gap-y-3 md:justify-end"
          >
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-[13px] text-cream/85 hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-cream/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] text-cream/45">
            © {new Date().getFullYear()} {site.name} · Brasília, DF
          </span>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram do ${site.name}`}
            className="text-cream/65 transition-colors hover:text-cream"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
