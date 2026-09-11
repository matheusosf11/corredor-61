"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navItemIsActive, primaryNav, type NavItem } from "@/lib/nav";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M2 4.5 6 8l4-3.5" />
    </svg>
  );
}

export function DesktopNav() {
  const pathname = usePathname();
  const [openHref, setOpen] = useState<string | null>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const openItem = primaryNav.find((item) => item.href === openHref) ?? null;

  useEffect(() => {
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (!openHref) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    const onPointer = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [openHref]);

  return (
    <nav
      ref={wrapRef}
      aria-label="Principal"
      className="relative z-20"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="grid grid-cols-4 gap-x-[34px]">
        {primaryNav.map((item) => {
          const active = navItemIsActive(item, pathname);
          const open = openHref === item.href;
          const hasMenu = Boolean(item.groups?.length);
          return (
            <div
              key={item.href}
              onMouseEnter={() => hasMenu && setOpen(item.href)}
            >
              <div
                className={`flex items-stretch border-t transition-colors ${
                  active || open
                    ? "border-t-gold text-cream"
                    : "border-t-cream/15 text-cream/80 hover:border-t-gold hover:text-cream"
                }`}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="flex min-w-0 flex-1 items-center py-4"
                >
                  <span className="font-sans text-[12.5px] leading-none font-bold tracking-[0.15em] uppercase">
                    {item.label}
                  </span>
                </Link>
                {hasMenu ? (
                  <button
                    type="button"
                    aria-label={`${open ? "Fechar" : "Abrir"} submenu de ${item.label}`}
                    aria-expanded={open}
                    aria-controls={menuId}
                    onClick={() =>
                      setOpen((current) =>
                        current === item.href ? null : item.href,
                      )
                    }
                    className="grid w-10 shrink-0 place-items-center text-gold"
                  >
                    <Chevron open={open} />
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 top-full z-50">
        {openItem?.groups ? (
          <div
            id={menuId}
            className="border border-gold/40 border-t-gold bg-cream px-8 py-6 shadow-[0_22px_50px_-20px_rgba(11,23,48,0.6)]"
          >
            <div
              className={`grid gap-10 ${
                openItem.groups.length > 1 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {openItem.groups.map((group) => (
                <div key={group.heading} className="flex flex-col gap-2">
                  <span className="eyebrow text-[9.5px] text-gold-ink">
                    {group.heading}
                  </span>
                  {group.items.map((child) =>
                    child.external ? (
                      <a
                        key={child.href + child.label}
                        href={child.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[13px] font-semibold tracking-[0.06em] text-navy uppercase transition-colors hover:text-gold-ink"
                      >
                        {child.label} ↗
                      </a>
                    ) : (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className="font-sans text-[13px] font-semibold tracking-[0.06em] text-navy uppercase transition-colors hover:text-gold-ink"
                      >
                        {child.label}
                      </Link>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

function MobileSection({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasMenu = Boolean(item.groups?.length);

  return (
    <div className="border-b border-cream/15">
      <div className="flex items-stretch">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="nav-link flex flex-1 items-center py-4 text-[22px] tracking-[0.02em] text-[#f7f4ea]"
        >
          {item.label}
        </Link>
        {hasMenu ? (
          <button
            type="button"
            aria-expanded={open}
            aria-label={`${open ? "Recolher" : "Expandir"} ${item.label}`}
            onClick={() => setOpen((value) => !value)}
            className="grid w-12 place-items-center text-gold"
          >
            <Chevron open={open} />
          </button>
        ) : (
          <span className="grid w-12 place-items-center text-gold">→</span>
        )}
      </div>
      {hasMenu && open
        ? item.groups?.map((group) => (
            <div key={group.heading} className="flex flex-col gap-0.5 pb-4 pl-1">
              <span className="eyebrow mb-1 text-[9.5px] text-gold">
                {group.heading}
              </span>
              {group.items.map((child) =>
                child.external ? (
                  <a
                    key={child.href + child.label}
                    href={child.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                    className="py-2 font-sans text-sm text-cream/80"
                  >
                    {child.label} ↗
                  </a>
                ) : (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    onClick={onNavigate}
                    className="py-2 font-sans text-sm text-cream/80"
                  >
                    {child.label}
                  </Link>
                ),
              )}
            </div>
          ))
        : null}
    </div>
  );
}

export function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col">
      {primaryNav.map((item) => (
        <MobileSection key={item.href} item={item} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
