"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { onIntroComplete } from "@/components/intro/introState";
import { buildCardNavItems, buildPrimaryNav } from "@/lib/nav";
import { site } from "@/lib/site";
import type { Category } from "@/lib/types";
import CardNav from "./CardNav";
import { MobileNav } from "./DesktopNav";
import { OverlayHeader } from "./OverlayHeader";

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

/** Menu inferior clareia quando o rodapé entra na tela. */
function useFooterInView() {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "0px 0px -64px 0px", threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  return inView;
}

const iconBox = {
  viewBox: "0 0 24 24",
  fill: "none",
  className: "h-6 w-6",
  "aria-hidden": true,
} as const;

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconHome({ active }: { active?: boolean }) {
  return (
    <svg {...iconBox}>
      <path
        d="M4 10.6 12 4.2l8 6.4"
        {...stroke}
      />
      <path
        d="M6.4 10.2v8.6c0 .6.5 1.1 1.1 1.1h8.9c.7 0 1.2-.5 1.2-1.1v-8.6"
        {...stroke}
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.18 : 0}
      />
      <path
        d="M10.2 19.9v-4.2c0-.4.3-.7.7-.7h2.2c.4 0 .7.3.7.7v4.2"
        {...stroke}
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.4 : 0}
      />
    </svg>
  );
}

function IconNews({ active }: { active?: boolean }) {
  return (
    <svg {...iconBox}>
      <path
        d="M7.2 18.6V6.3c0-.6.5-1.1 1.1-1.1h9.4c.6 0 1.1.5 1.1 1.1v10.8c0 .8-.7 1.5-1.5 1.5H8.6"
        {...stroke}
      />
      <path
        d="M7.2 18.6A2.2 2.2 0 0 1 5 16.4V8.8"
        {...stroke}
      />
      <path
        d="M9.8 7.8h6.6v2.6H9.8z"
        {...stroke}
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.28 : 0}
      />
      <path d="M9.8 13h6.6M9.8 15.4h4.2" {...stroke} />
    </svg>
  );
}

function IconArticle({ active }: { active?: boolean }) {
  return (
    <svg {...iconBox}>
      <path
        d="M5.8 18.2V6.4c0-.7.6-1.2 1.3-1.2h4.3L12 7.8l.6-2.6h4.3c.7 0 1.3.5 1.3 1.2v11.8"
        {...stroke}
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.14 : 0}
      />
      <path d="M12 5.2v14" {...stroke} />
      <path d="M7.6 10.6h2.6M7.6 13.2h2.6M14 10.6h2.4M14 13.2h2.4" {...stroke} />
    </svg>
  );
}

function IconSearch({ active }: { active?: boolean }) {
  return (
    <svg {...iconBox}>
      <circle
        cx="11"
        cy="11"
        r="5.6"
        {...stroke}
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.16 : 0}
      />
      <path d="m15.3 15.3 4 4" {...stroke} />
    </svg>
  );
}

function IconMenu({ active }: { active?: boolean }) {
  return (
    <svg {...iconBox}>
      <path d="M5 8h14" {...stroke} />
      <path d="M5 12h14" {...stroke} />
      <path d="M5 16h9.2" {...stroke} />
      {active ? (
        <circle cx="18.2" cy="16" r="1.15" fill="currentColor" />
      ) : null}
    </svg>
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
        style={{ width: "auto" }}
      />
      <Image
        src="/wordmark-corredor61.svg"
        alt={site.name}
        width={206}
        height={44}
        priority
        className="h-[44px] w-auto"
        style={{ width: "auto" }}
      />
    </Link>
  );
}

const mobileTabs = [
  { href: "/", label: "Início", icon: IconHome },
  { href: "/noticias", label: "Notícias", icon: IconNews },
  { href: "/artigos", label: "Artigos", icon: IconArticle },
  { href: "/busca", label: "Buscar", icon: IconSearch },
] as const;

export function Header({ categories }: { categories: Category[] }) {
  const isActive = useActive();
  const pathname = usePathname();
  const cardNavItems = useMemo(() => buildCardNavItems(categories), [categories]);
  const primaryNav = useMemo(() => buildPrimaryNav(categories), [categories]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const todayLabel = useTodayLabel();
  const scrolled = useScrolled();
  const scrolledPastTop = useScrolled(48);
  const footerInView = useFooterInView();
  // Matéria de notícia: header transparente sobre o hero.
  const overlay = /^\/noticias\/[^/]+$/.test(pathname);

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

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setMenuShown(true));
      });
      return () => window.cancelAnimationFrame(id);
    }
    setMenuShown(false);
    const hide = window.setTimeout(() => setMenuMounted(false), 400);
    return () => window.clearTimeout(hide);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);
  const tabActive = (href: string) =>
    href === "/" ? pathname === "/" : isActive(href);
  const onRouteTab = mobileTabs.some((tab) => tabActive(tab.href));

  const tabBarRef = useRef<HTMLElement>(null);
  const tabPillRef = useRef<HTMLSpanElement>(null);

  const moveTabPill = useCallback((tab: HTMLElement | null, animate: boolean) => {
    const pill = tabPillRef.current;
    if (!pill || !tab) return;
    const write = () => {
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
    };
    if (!animate) {
      const prev = pill.style.transition;
      pill.style.transition = "none";
      write();
      void pill.offsetWidth;
      pill.style.transition = prev;
      return;
    }
    write();
  }, []);

  const activeTabEl = useCallback(() => {
    const bar = tabBarRef.current;
    if (!bar) return null;
    return (
      bar.querySelector<HTMLElement>('.t-tab[aria-selected="true"]') ??
      bar.querySelector<HTMLElement>(".t-tab")
    );
  }, []);

  useLayoutEffect(() => {
    moveTabPill(activeTabEl(), false);
  }, [pathname, menuOpen, moveTabPill, activeTabEl]);

  useEffect(() => {
    const onResize = () => moveTabPill(activeTabEl(), false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [moveTabPill, activeTabEl]);

  const slideTabPill = (el: HTMLElement) => {
    const bar = tabBarRef.current;
    if (!bar) return;
    bar.querySelectorAll(".t-tab").forEach((tab) => {
      tab.setAttribute("aria-selected", tab === el ? "true" : "false");
    });
    moveTabPill(el, true);
  };

  return (
    <header className={overlay ? undefined : "bg-cream"}>
      {overlay ? (
        <OverlayHeader scrolled={scrolledPastTop} cardNavItems={cardNavItems} primaryNav={primaryNav} />
      ) : null}

      {/* ============================================================
          Desktop — modelo 15a: marinho profundo, malha de réguas,
          nome grande ao centro e menu numerado com régua dourada
          ============================================================ */}
      {overlay ? null : (
      <>
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
              style={{ width: "auto" }}
            />
            <Image
              src="/wordmark-corredor61.svg"
              alt={site.name}
              width={514}
              height={110}
              priority
              className="h-[110px] w-auto"
              style={{ width: "auto" }}
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
      </>
      )}

      {/* ============================================================
          Mobile — marca + wordmark no topo, tab bar inferior (azul)
          ============================================================ */}
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 md:hidden ${
          overlay && !scrolledPastTop ? "bg-transparent" : "bg-[#0b1730]"
        }`}
      >
        <div
          data-intro-reveal="header"
          className="flex justify-center px-4 py-2.5"
        >
          <MobileBrand />
        </div>
        <div
          className={`h-[2px] bg-[linear-gradient(90deg,#c9a044,rgba(201,160,68,0.35))] transition-opacity duration-300 ${
            overlay && !scrolledPastTop ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      {/* Espaçador que compensa a faixa mobile fixed */}
      {overlay ? null : <div aria-hidden className="h-[66px] md:hidden" />}

      {/* Mobile: tab bar inferior — Tabs sliding (transitions.dev) */}
      <nav
        ref={tabBarRef}
        aria-label="Navegação"
        className={`t-tabs mobile-tabbar fixed inset-x-0 bottom-0 z-50 md:hidden${
          footerInView ? " is-light" : ""
        }`}
      >
        <span ref={tabPillRef} className="t-tabs-pill" aria-hidden="true" />
        {mobileTabs.map((tab) => {
          const active = !menuOpen && tabActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              role="tab"
              className="t-tab"
              aria-selected={active}
              aria-current={active ? "page" : undefined}
              onClick={(event) => slideTabPill(event.currentTarget)}
            >
              <Icon active={active} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          role="tab"
          className="t-tab"
          onClick={(event) => {
            slideTabPill(event.currentTarget);
            setMenuOpen((open) => {
              if (!open) setMenuMounted(true);
              return !open;
            });
          }}
          aria-label="Abrir menu"
          aria-selected={menuOpen || !onRouteTab}
          aria-expanded={menuOpen}
        >
          <IconMenu active={menuOpen} />
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile: menu — slide + itens em stagger */}
      {menuMounted ? (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            className={`mobile-menu-backdrop fixed top-0 left-0 bottom-[calc(60px+env(safe-area-inset-bottom))] z-[55] w-1/2 bg-[#0b1730]/45 md:hidden${
              menuShown ? " is-open" : ""
            }`}
            onClick={closeMenu}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className={`mobile-menu-panel t-stagger fixed top-0 right-0 bottom-[calc(60px+env(safe-area-inset-bottom))] z-[56] flex w-1/2 flex-col border-l border-cream/15 bg-[#0b1730] md:hidden${
              menuShown ? " is-open is-shown" : ""
            }`}
          >
            <div
              className="t-stagger-line flex items-center justify-between border-b border-cream/15 px-4 py-2.5"
              style={{ "--stagger-i": 0 } as CSSProperties}
            >
              <span className="font-sans text-[11px] font-bold tracking-[0.14em] text-cream uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Fechar menu"
                className="flex h-10 w-10 items-center justify-center text-[22px] text-cream"
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto px-4 pt-3 pb-4">
              <form
                action="/busca"
                method="get"
                role="search"
                className="t-stagger-line mb-4 flex items-center gap-2.5 border border-gold/35 bg-white/[0.08] px-3.5"
                style={{ "--stagger-i": 1 } as CSSProperties}
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
                  className="w-full bg-transparent py-3 font-serif text-sm text-cream placeholder:text-cream/45 focus:outline-none"
                />
              </form>

              <MobileNav
                onNavigate={closeMenu}
                items={primaryNav}
                staggerFrom={2}
              />

              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="t-stagger-line eyebrow mt-4 self-start bg-gold px-4.5 py-3 text-[10.5px] text-blackish"
                style={
                  {
                    "--stagger-i": 2 + primaryNav.length,
                  } as CSSProperties
                }
              >
                {site.instagramHandle} ↗
              </a>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
