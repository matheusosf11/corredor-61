"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { editorialNav, moreNav, navItemIsActive } from "@/lib/nav";
import { site } from "@/lib/site";

function IconSearch() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

function IconMenu({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function DesktopNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  return (
    <>
      {editorialNav.map((item) => {
        const active = navItemIsActive(item, pathname, search);
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`font-sans text-[11px] font-extrabold tracking-[0.14em] uppercase transition-colors ${
              active ? "text-gold" : "text-cream/85 hover:text-gold"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0b1730]">
      <div className="pad-x flex h-[72px] items-center gap-4 lg:gap-8">
        <Link
          href="/"
          aria-label={`${site.name} — página inicial`}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src="/marca-corredor61.png"
            alt=""
            width={44}
            height={40}
            priority
            className="h-[38px] w-auto"
          />
          <span className="flex flex-col">
            <Image
              src="/wordmark-corredor61.svg"
              alt={site.name}
              width={168}
              height={28}
              priority
              className="h-[26px] w-auto"
            />
            <span className="mt-0.5 font-sans text-[8px] font-bold tracking-[0.18em] text-cream/70 uppercase">
              {site.kicker}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="ml-auto hidden items-center gap-5 xl:gap-6 lg:flex"
        >
          <Suspense fallback={null}>
            <DesktopNavLinks />
          </Suspense>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Link
            href="/busca"
            aria-label="Buscar"
            className="grid h-10 w-10 place-items-center text-cream/85 transition-colors hover:text-gold"
          >
            <IconSearch />
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center text-cream/85 transition-colors hover:text-gold"
          >
            <IconMenu open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="absolute inset-x-0 top-full border-t border-cream/10 bg-[#0b1730] shadow-xl">
          <div className="pad-x grid gap-8 py-8 md:grid-cols-2">
            <div className="flex flex-col lg:hidden">
              {editorialNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-cream/10 py-3 font-sans text-[15px] font-extrabold tracking-[0.12em] text-cream uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              {moreNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-cream/10 py-3 font-sans text-[15px] font-extrabold tracking-[0.12em] text-cream uppercase"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="py-3 font-sans text-[15px] font-extrabold tracking-[0.12em] text-gold uppercase"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
