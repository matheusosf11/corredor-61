"use client";

import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { onIntroComplete } from "@/components/intro/introState";
import type { Cover } from "@/lib/types";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { Pagination, PaginationItem } from "@/components/ui/pagination";
import { Eyebrow } from "./Eyebrow";

export type HeroSlide = {
  slug: string;
  title: string;
  dek: string;
  cover: Cover;
  categoryName: string;
  authorName: string;
  dateLabel: string;
};

const AUTOPLAY_MS = 6000;

function Slide({ item }: { item: HeroSlide }) {
  return (
    <Link
      href={`/noticias/${item.slug}`}
      className="group flex h-full w-full flex-col bg-blackish sm:grid sm:grid-cols-[1.25fr_1fr]"
    >
      <div className="h-[220px] overflow-hidden sm:h-full sm:min-h-[420px]">
        <div data-intro-reveal="media" className="h-full w-full">
          <CoverMedia
            cover={item.cover}
            variant="hero-dark"
            className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div
        data-intro-reveal="headline"
        className="flex flex-col justify-center gap-4 px-6 py-10 sm:px-9"
      >
        <span className="flex items-center gap-2.5">
          <span className="h-0.5 w-6 bg-gold" />
          <Eyebrow tone="on-dark" className="tracking-[0.18em]">
            {item.categoryName} · destaque
          </Eyebrow>
        </span>
        <h2 className="text-[26px] leading-[1.06] font-extrabold tracking-[-0.025em] text-cream text-pretty transition-colors group-hover:text-gold sm:text-[32px] lg:text-[34px]">
          {item.title}
        </h2>
        <p className="max-w-[46ch] font-serif text-[15.5px] leading-relaxed text-cream/70 text-pretty">
          {item.dek}
        </p>
        <span className="font-mono text-[11px] text-cream/45">
          por {item.authorName} · {item.dateLabel}
        </span>
      </div>
    </Link>
  );
}

export function HeroCarousel({ items }: { items: HeroSlide[] }) {
  const hasLoop = items.length > 1;
  // Trilho com clones nas pontas -> rotação contínua, sem "pulo".
  const slides = hasLoop
    ? [items[items.length - 1], ...items, items[0]]
    : items;

  const [index, setIndex] = useState(hasLoop ? 1 : 0);
  const [animating, setAnimating] = useState(true);
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);
  const releaseTimer = useRef<number | undefined>(undefined);

  // Libera o "trava" caso o transitionend não chegue (ex.: transição cancelada).
  const armRelease = () => {
    window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => {
      busy.current = false;
    }, 900);
  };

  const move = useCallback(
    (delta: number) => {
      if (!hasLoop || busy.current) return;
      busy.current = true;
      armRelease();
      setAnimating(true);
      setIndex((i) => i + delta);
    },
    [hasLoop],
  );

  const goTo = useCallback(
    (realIdx: number) => {
      if (!hasLoop || busy.current) return;
      busy.current = true;
      armRelease();
      setAnimating(true);
      setIndex(realIdx + 1);
    },
    [hasLoop],
  );

  useEffect(() => () => window.clearTimeout(releaseTimer.current), []);

  useEffect(
    () =>
      onIntroComplete(() => {
        gsap.fromTo(
          '[data-intro-reveal="headline"]',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
        );
        gsap.fromTo(
          '[data-intro-reveal="media"]',
          { scale: 1.02 },
          {
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            clearProps: "transform",
          },
        );
      }),
    [],
  );

  function handleTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {
    // Só o trilho — ignora transições que borbulham dos filhos (imagem, título…).
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;
    busy.current = false;
    window.clearTimeout(releaseTimer.current);
    if (index === slides.length - 1) {
      setAnimating(false);
      setIndex(1);
    } else if (index === 0) {
      setAnimating(false);
      setIndex(slides.length - 2);
    }
  }

  // Reativa a transição depois de um "snap" instantâneo nos clones.
  useEffect(() => {
    if (animating) return;
    const id = requestAnimationFrame(() => setAnimating(true));
    return () => cancelAnimationFrame(id);
  }, [animating]);

  // Avanço automático — pausa no hover/foco e com "reduzir movimento".
  useEffect(() => {
    if (!hasLoop || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => move(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [hasLoop, paused, move]);

  const realIndex = hasLoop
    ? (index - 1 + items.length) % items.length
    : 0;

  return (
    <div
      className="relative mt-8 lg:mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carrossel"
      aria-label="Notícias em destaque"
    >
      <div className="h-full overflow-hidden">
        <div
          className="carousel-track flex h-full"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: animating
              ? "transform 0.7s cubic-bezier(0.32, 0.72, 0, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((item, slideIndex) => (
            <div
              key={slideIndex}
              inert={hasLoop && slideIndex !== index ? true : undefined}
              className="w-full shrink-0"
            >
              <Slide item={item} />
            </div>
          ))}
        </div>
      </div>

      {hasLoop ? (
        <div className="pointer-events-none absolute inset-0 z-10">
          {/* Indicadores */}
          <div className="pointer-events-auto absolute left-4 top-4 flex gap-2 sm:top-auto sm:bottom-6 sm:left-9">
            {items.map((slide, i) => (
              <button
                key={slide.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para a notícia ${i + 1} de ${items.length}`}
                aria-current={i === realIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${
                  i === realIndex
                    ? "w-6 bg-gold"
                    : "w-1.5 bg-cream/40 hover:bg-cream/70"
                }`}
              />
            ))}
          </div>

          {/* Setas */}
          <Pagination
            aria-label="Navegar entre destaques"
            className="dark pointer-events-auto absolute right-4 bottom-4 gap-1.5 sm:right-6 sm:bottom-6"
          >
            <PaginationItem
              type="button"
              variant="outline"
              size="sm"
              onClick={() => move(-1)}
              aria-label="Notícia anterior"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </PaginationItem>
            <PaginationItem
              type="button"
              variant="outline"
              size="sm"
              onClick={() => move(1)}
              aria-label="Próxima notícia"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </PaginationItem>
          </Pagination>
        </div>
      ) : null}
    </div>
  );
}
