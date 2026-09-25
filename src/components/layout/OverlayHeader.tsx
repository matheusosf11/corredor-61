"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  cardNavItems as defaultCards,
  navItemIsActive,
  primaryNav as defaultNav,
  type NavItem,
} from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import "./CardNav.css";

const CLOSE_DELAY_MS = 160;

/**
 * Header das páginas de matéria (desktop): transparente sobre o hero,
 * azul-escuro ao rolar e com o menu em cartões aberto no hover.
 */
export function OverlayHeader({
  scrolled,
  cardNavItems = defaultCards,
  primaryNav = defaultNav,
}: {
  scrolled: boolean;
  cardNavItems?: typeof defaultCards;
  primaryNav?: NavItem[];
}) {
  const pathname = usePathname();
  // Guarda a rota em que o menu foi aberto: ao navegar, ele fecha sozinho.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const closeTimer = useRef<number | undefined>(undefined);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpenOn(pathname);
  };
  const hide = (delay = CLOSE_DELAY_MS) => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenOn(null), delay);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const solid = scrolled || open;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-40 hidden transition-[background-color,box-shadow] duration-300 md:block",
        solid
          ? "bg-[#0b1730] shadow-[0_12px_28px_-18px_rgba(0,0,0,0.6)]"
          : "bg-transparent",
      )}
      onMouseEnter={show}
      onMouseLeave={() => hide()}
      onFocus={show}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          hide(0);
        }
      }}
    >
      <div
        data-intro-reveal="header"
        className="pad-x grid h-[59px] grid-cols-[1fr_auto_1fr] items-center gap-6"
      >
        <Link
          href="/"
          aria-label={`${site.name} — página inicial`}
          className="flex items-center gap-2.5 justify-self-start"
        >
          <Image
            src="/marca-corredor61.png"
            alt=""
            width={34}
            height={34}
            className="h-[30px] w-auto"
            style={{ width: "auto" }}
          />
          <Image
            src="/wordmark-corredor61.svg"
            alt=""
            width={140}
            height={30}
            className="hidden h-[30px] w-auto lg:block"
            style={{ width: "auto" }}
          />
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-4 lg:gap-6 xl:gap-8">
            {primaryNav.map((item) => {
              const active = navItemIsActive(item, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 font-sans text-[10.5px] leading-none font-bold tracking-[0.12em] whitespace-nowrap uppercase transition-colors lg:text-[11.5px] lg:tracking-[0.14em]",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-gold after:transition-transform after:duration-300",
                      active
                        ? "text-cream after:scale-x-100"
                        : "text-cream/80 after:scale-x-0 hover:text-cream hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/busca"
          aria-label="Buscar"
          className="grid h-9 w-9 place-items-center justify-self-end text-cream/85 transition-colors hover:text-gold"
        >
          <Search className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
        </Link>
      </div>

      {/* Menu expandido — mesmos cartões do menu da home */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        inert={!open}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <div className="pad-x pt-1 pb-6">
            <div className="overlay-nav-cards grid grid-cols-4 gap-[10px] rounded-[2px] border border-gold/45 bg-cream p-[0.55rem] xl:flex xl:h-[232px]">
              {cardNavItems.map((item, idx) => (
                <div
                  key={item.label}
                  className={cn(
                    "nav-card transition-[opacity,transform] duration-400 ease-out",
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  )}
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.textColor,
                    transitionDelay: open ? `${80 + idx * 45}ms` : "0ms",
                  }}
                >
                  <div className="nav-card-label">{item.label}</div>
                  <div className="nav-card-links">
                    {item.links.map((lnk) =>
                      lnk.external ? (
                        <a
                          key={lnk.label}
                          className="nav-card-link"
                          href={lnk.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={lnk.ariaLabel}
                        >
                          <ArrowIcon />
                          {lnk.label}
                        </a>
                      ) : (
                        <Link
                          key={lnk.label}
                          className="nav-card-link"
                          href={lnk.href}
                          aria-label={lnk.ariaLabel}
                        >
                          <ArrowIcon />
                          {lnk.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="nav-card-link-icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}
