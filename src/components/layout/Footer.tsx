import Image from "next/image";
import Link from "next/link";
import { getActiveSupporters } from "@/lib/queries";
import { site } from "@/lib/site";
import { SupporterLogo } from "@/components/supporters/SupportersBand";

const footerNav = [
  { href: "/noticias", label: "Notícias" },
  { href: "/mundo", label: "Mundo" },
  { href: "/brasil", label: "Brasil" },
  { href: "/cidades", label: "Cidades" },
  { href: "/bastidores", label: "Bastidores" },
  { href: "/artigos", label: "Artigos" },
  { href: "/videos", label: "Vídeos" },
  { href: "/autores", label: "Autores" },
  { href: "/sobre", label: "Sobre Nós" },
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

        <div className="mt-9 border-t border-cream/12 pt-6">
          <p className="mb-4 font-sans text-[11px] font-extrabold tracking-[0.16em] text-cream/45 uppercase">
            Apoiadores
          </p>
          <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {supporters.slice(0, 6).map((item) => (
              <li key={item.slug}>
                <SupporterLogo item={item} onDark />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-cream/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
