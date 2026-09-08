"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/noticias", label: "Notícias" },
  { href: "/artigos", label: "Artigos" },
  { href: "/autores", label: "Autores" },
  { href: "/sobre", label: "Sobre" },
];

const categorias = [
  { href: "/noticias?categoria=legislativo", label: "Legislativo" },
  { href: "/noticias?categoria=judiciario", label: "Judiciário" },
  { href: "/noticias?categoria=politica", label: "Política" },
  { href: "/noticias?categoria=institucional", label: "Institucional" },
];

function useActive() {
  const pathname = usePathname();
  return (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`nav-link px-[20px] py-3 text-[12.5px] whitespace-nowrap ${
        active
          ? "text-gold-ink shadow-[inset_0_-3px_0_#c9a044]"
          : "text-navy hover:text-gold-ink"
      }`}
    >
      {label}
    </Link>
  );
}

/* ---------- Ícones da tab bar (mobile) ---------- */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[22px] w-[22px]",
  "aria-hidden": true,
};

function IconHome() {
  return (
    <svg {...iconProps}>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6 10v10h12V10" />
    </svg>
  );
}

function IconNews() {
  return (
    <svg {...iconProps}>
      <path d="M5 5h14v14H5z" />
      <path d="M8 9h8M8 12.5h8M8 16h5" />
    </svg>
  );
}

function IconArticle() {
  return (
    <svg {...iconProps}>
      <path d="M13 3H7v18h10V7l-4-4Z" />
      <path d="M13 3v4h4M9 12h6M9 15.5h6" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg {...iconProps}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function MobileTab({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 ${
        active ? "text-gold-ink" : "text-navy/60"
      }`}
    >
      {children}
      <span className="font-sans text-[9px] font-bold tracking-[0.06em] uppercase">
        {label}
      </span>
    </Link>
  );
}

const mobileTabs = [
  { href: "/", label: "Início", icon: <IconHome /> },
  { href: "/noticias", label: "Notícias", icon: <IconNews /> },
  { href: "/artigos", label: "Artigos", icon: <IconArticle /> },
  { href: "/busca", label: "Buscar", icon: <IconSearch /> },
];

export function Header() {
  const isActive = useActive();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const buscaActive = pathname.startsWith("/busca");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const tabActive = (href: string) =>
    href === "/" ? pathname === "/" : isActive(href);

  return (
    <header className="sticky top-0 z-40 bg-cream">
      <div className="h-[6px] w-full bg-blackish" />

      {/* ---------- Desktop ---------- */}
      <div className="pad-x hidden pt-4 pb-1 md:flex md:flex-col md:items-center">
        <Link
          href="/"
          aria-label={`${site.name} — página inicial`}
          className="block"
        >
          <Image
            src="/logo-corredor61.svg"
            alt={site.name}
            width={150}
            height={150}
            priority
            className="h-[92px] w-auto lg:h-[104px]"
          />
        </Link>
        <nav
          aria-label="Principal"
          className="mt-4 flex w-full items-stretch justify-center border-t-2 border-navy border-b border-b-navy/15"
        >
          {nav.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index > 0 ? (
                <span className="h-3.5 w-px self-center bg-navy/25" />
              ) : null}
              <DesktopLink
                href={item.href}
                label={item.label}
                active={isActive(item.href)}
              />
            </div>
          ))}
          <span className="h-3.5 w-px self-center bg-navy/25" />
          <DesktopLink href="/busca" label="Buscar ⌕" active={buscaActive} />
        </nav>
      </div>

      {/* ---------- Mobile: faixa superior com a logo ---------- */}
      <div className="flex justify-center border-b border-navy/15 py-2.5 md:hidden">
        <Link href="/" aria-label={`${site.name} — página inicial`}>
          <Image
            src="/logo-corredor61.svg"
            alt={site.name}
            width={72}
            height={72}
            priority
            className="h-[52px] w-auto"
          />
        </Link>
      </div>

      {/* ---------- Mobile: tab bar inferior (estilo app) ---------- */}
      <nav
        aria-label="Navegação"
        className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-navy/15 bg-cream pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_-8px_rgba(16,31,60,0.25)] md:hidden"
      >
        {mobileTabs.map((tab) => (
          <MobileTab
            key={tab.href}
            href={tab.href}
            label={tab.label}
            active={tabActive(tab.href)}
          >
            {tab.icon}
          </MobileTab>
        ))}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 ${
            menuOpen ? "text-gold-ink" : "text-navy/60"
          }`}
        >
          <IconMenu />
          <span className="font-sans text-[9px] font-bold tracking-[0.06em] uppercase">
            Menu
          </span>
        </button>
      </nav>

      {/* ---------- Menu mobile aberto ---------- */}
      {menuOpen ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-navy md:hidden">
          <div className="grid grid-cols-[44px_1fr_44px] items-center border-b border-white/10 bg-cream px-3 py-2.5">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="flex h-11 w-11 items-center justify-center text-[22px] text-navy"
            >
              ×
            </button>
            <span className="flex justify-center">
              <Image
                src="/logo-corredor61.svg"
                alt={site.name}
                width={62}
                height={62}
                className="h-[52px] w-auto"
              />
            </span>
            <span />
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-4 pt-5 pb-8">
            <form
              action="/busca"
              method="get"
              role="search"
              className="mb-6 flex items-center gap-2.5 border border-gold/35 bg-white/[0.08] px-3.5"
            >
              <span aria-hidden className="text-base text-gold">
                ⌕
              </span>
              <label htmlFor="menu-q" className="sr-only">
                Buscar notícias e artigos
              </label>
              <input
                id="menu-q"
                name="q"
                type="search"
                placeholder="Buscar notícias e artigos"
                className="w-full bg-transparent py-3.5 font-serif text-sm text-cream placeholder:text-cream/45 focus:outline-none"
              />
            </form>

            <div className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="nav-link flex items-center justify-between border-b border-cream/15 py-4 text-[22px] tracking-[0.02em] text-[#f7f4ea]"
                >
                  {item.label === "Sobre" ? "Sobre Nós" : item.label}
                  <span className="text-gold">→</span>
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-0.5 border-t border-gold/30 pt-4.5">
              <span className="eyebrow mb-1.5 text-[9.5px] text-gold">
                Categorias
              </span>
              {categorias.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="py-2.5 font-sans text-sm text-cream/80"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="eyebrow mt-6 self-start bg-gold px-4.5 py-3.5 text-[10.5px] text-blackish"
            >
              {site.instagramHandle} ↗
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
