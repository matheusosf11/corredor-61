"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onIntroComplete } from "@/components/intro/introState";
import { cardNavItems } from "@/lib/nav";
import { site } from "@/lib/site";
import CardNav from "./CardNav";
import { MobileNav } from "./DesktopNav";

function useActive() {
  const pathname = usePathname();
  return (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
}

/* ---------- Data por extenso (barra utilitária do topo) ---------- */

const mastheadTz = "America/Sao_Paulo";

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: mastheadTz,
});

const timeFmt = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: mastheadTz,
});

function useTodayLabel() {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLabel(`${dateFmt.format(now)} · ${timeFmt.format(now)}`);
    };
    tick();
    const msToNextMinute = 60_000 - (Date.now() % 60_000) + 50;
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      tick();
      intervalId = window.setInterval(tick, 60_000);
    }, msToNextMinute);
    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);
  return label;
}

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
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
        active ? "text-gold" : "text-cream/70"
      }`}
    >
      {children}
      <span className="font-sans text-[9px] font-bold tracking-[0.06em] uppercase">
        {label}
      </span>
    </Link>
  );
}

function MobileBrand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} — página inicial`}
      className="flex items-center justify-center gap-2.5"
    >
      <Image
        src="/marca-corredor61.png"
        alt=""
        width={48}
        height={44}
        priority
        className="h-[40px] w-auto"
      />
      <Image
        src="/wordmark-corredor61.svg"
        alt={site.name}
        width={188}
        height={40}
        priority
        className="h-[32px] w-auto"
      />
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
  const todayLabel = useTodayLabel();
  const scrolled = useScrolled();

  useEffect(
    () =>
      onIntroComplete(() => {
        gsap.fromTo(
          '[data-intro-reveal="header"]',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            clearProps: "opacity",
          },
        );
      }),
    [],
  );

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
    <header className="bg-cream">
      {/* ============================================================
          Desktop — modelo 15a: marinho profundo, malha de réguas,
          nome grande ao centro e menu numerado com régua dourada
          ============================================================ */}

      {/* Barra utilitária — fica fixa no topo ao rolar (só desktop) */}
      <div
        className={`pad-x fixed inset-x-0 top-0 z-40 hidden transition-colors duration-300 md:block ${
          scrolled
            ? "bg-cream shadow-[0_10px_24px_-16px_rgba(16,31,60,0.35)]"
            : "bg-[#0b1730]"
        }`}
        style={{
          backgroundImage: scrolled
            ? "linear-gradient(90deg, rgba(16,31,60,0.08) 1px, transparent 1px)"
            : "linear-gradient(90deg, rgba(244,240,228,0.055) 1px, transparent 1px)",
          backgroundSize: "78px 100%",
        }}
      >
        <div
          data-intro-reveal="header"
          className={`flex items-center justify-between py-3 transition-colors duration-300 ${
            scrolled ? "border-b border-navy/12" : "border-b border-cream/10"
          }`}
        >
          <Link
            href="/busca"
            className={`inline-flex items-center gap-[34px] rounded-[2px] border px-[14px] py-[10px] transition-colors ${
              scrolled
                ? "border-navy/25 hover:border-gold-ink"
                : "border-cream/25 hover:border-gold/70"
            }`}
          >
            <span
              className={`font-sans text-[11px] leading-none font-bold tracking-[0.15em] uppercase transition-colors ${
                scrolled ? "text-navy" : "text-cream/80"
              }`}
            >
              Buscar
            </span>
            <span
              aria-hidden
              className={`text-[12px] leading-none transition-colors ${
                scrolled ? "text-navy/50" : "text-cream/60"
              }`}
            >
              ⌕
            </span>
          </Link>

          <span
            className={`flex items-center gap-[10px] font-sans text-[11px] leading-none font-bold tracking-[0.15em] uppercase transition-colors ${
              scrolled ? "text-navy" : "text-cream/80"
            }`}
          >
            <span
              aria-hidden
              className="h-[6px] w-[6px] rounded-full bg-gold shadow-[0_0_0_3px_rgba(201,160,68,0.22)]"
            />
            <span suppressHydrationWarning>
              Brasília{todayLabel ? ` · ${todayLabel}` : ""}
            </span>
          </span>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-sans text-[11px] leading-none font-bold tracking-[0.15em] text-gold uppercase transition-colors ${
              scrolled ? "hover:text-navy" : "hover:text-cream"
            }`}
          >
            Instagram ↗
          </a>
        </div>
      </div>

      {/* Marca + menu — rolam normalmente com a página
          (mt compensa a barra utilitária, que agora é fixed) */}
      <div
        className="pad-x relative z-30 hidden bg-[#0b1730] md:mt-[59px] md:block"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(244,240,228,0.055) 1px, transparent 1px)",
          backgroundSize: "78px 100%",
        }}
      >
        {/* Marca ao centro, entre réguas douradas */}
        <div
          data-intro-reveal="header"
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 pt-[34px] pb-[30px]"
        >
          <span aria-hidden />
          <Link
            href="/"
            aria-label={`${site.name} — página inicial`}
            className="relative flex items-center gap-[18px]"
          >
            <span
              aria-hidden
              className="absolute top-1/2 left-[-34px] h-px w-[22px] bg-gold/55"
            />
            <Image
              src="/marca-corredor61.png"
              alt=""
              width={84}
              height={84}
              priority
              className="h-[84px] w-auto"
            />
            <Image
              src="/wordmark-corredor61.svg"
              alt={site.name}
              width={402}
              height={86}
              priority
              className="h-[86px] w-auto"
            />
            <span
              aria-hidden
              className="absolute top-1/2 right-[-34px] h-px w-[22px] bg-gold/55"
            />
          </Link>
          <span aria-hidden />
        </div>

        <CardNav
          items={cardNavItems}
          baseColor="#f4f0e4"
          menuColor="#0b1730"
          buttonBgColor="#c9a044"
          buttonTextColor="#0b1730"
          buttonLabel="Buscar"
          buttonHref="/busca"
        />
      </div>

      {/* Régua dourada que fecha o topo (desktop) */}
      <div className="pointer-events-none hidden h-[3px] bg-[linear-gradient(90deg,#c9a044,rgba(201,160,68,0))] md:block" />

      {/* ============================================================
          Mobile — marca + wordmark no topo, tab bar inferior (azul)
          ============================================================ */}
      <div className="fixed inset-x-0 top-0 z-40 bg-[#0b1730] md:hidden">
        <div
          data-intro-reveal="header"
          className="flex justify-center px-4 py-2.5"
        >
          <MobileBrand />
        </div>
        <div className="h-[2px] bg-[linear-gradient(90deg,#c9a044,rgba(201,160,68,0.35))]" />
      </div>
      {/* Espaçador que compensa a faixa mobile fixed */}
      <div aria-hidden className="h-[66px] md:hidden" />

      {/* Mobile: tab bar inferior */}
      <nav
        aria-label="Navegação"
        className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-cream/15 bg-[#0b1730] pb-[env(safe-area-inset-bottom)] md:hidden"
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
            menuOpen ? "text-gold" : "text-cream/70"
          }`}
        >
          <IconMenu />
          <span className="font-sans text-[9px] font-bold tracking-[0.06em] uppercase">
            Menu
          </span>
        </button>
      </nav>

      {/* Mobile: menu aberto */}
      {menuOpen ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-navy md:hidden">
          <div className="grid grid-cols-[44px_1fr_44px] items-center border-b border-cream/15 bg-[#0b1730] px-3 py-2.5">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="flex h-11 w-11 items-center justify-center text-[22px] text-cream"
            >
              ×
            </button>
            <span className="flex justify-center">
              <MobileBrand onClick={closeMenu} />
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

            <MobileNav onNavigate={closeMenu} />

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
