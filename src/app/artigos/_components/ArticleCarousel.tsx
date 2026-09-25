"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Cover } from "@/lib/types";
import { AuthorMark } from "@/components/ui/AuthorMark";
import { CoverMedia } from "@/components/ui/CoverMedia";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getVisiblePages } from "@/lib/pagination";

export type CarouselArticle = {
  slug: string;
  title: string;
  dek: string;
  cover: Cover;
  category: string;
  authorName: string;
  authorInitials: string;
  authorPhotoUrl?: string;
  dateLabel: string;
  minutes: number;
};

/** Artigos por slide: 1 destaque grande + 6 menores. */
const SLIDE_SIZE = 7;

function FeaturedCard({ article }: { article: CarouselArticle }) {
  return (
    <Link
      href={`/artigos/${article.slug}`}
      className="group relative flex h-full flex-col bg-blackish transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <div className="min-h-[220px] flex-1 overflow-hidden">
        <CoverMedia
          cover={article.cover}
          variant="hero-dark"
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col gap-3 px-6 pt-6 pb-7">
        <span className="nav-link text-[9.5px] text-gold">
          Destaque · {article.category}
        </span>
        <h2 className="text-[26px] leading-[1.1] font-extrabold tracking-[-0.028em] text-[#f7f4ea] text-pretty transition-colors group-hover:text-gold md:text-[30px]">
          {article.title}
        </h2>
        <p className="font-serif text-[16px] leading-relaxed text-[#f7f4ea]/70 text-pretty">
          {article.dek}
        </p>
        <div className="mt-1.5 flex items-center gap-2.5 border-t border-[#f7f4ea]/15 pt-4">
          <AuthorMark
            initials={article.authorInitials}
            photoUrl={article.authorPhotoUrl}
            name={article.authorName}
            size={34}
            onDark
          />
          <span className="eyebrow text-[11.5px] tracking-[0.05em] text-[#f7f4ea]">
            {article.authorName}
          </span>
        </div>
      </div>
    </Link>
  );
}

function Card({ article }: { article: CarouselArticle }) {
  return (
    <Link
      href={`/artigos/${article.slug}`}
      className="group relative flex flex-col gap-3 border-t-[3px] border-gold bg-white px-6 pt-5.5 pb-6.5 transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.03] hover:shadow-[0_18px_40px_-20px_rgba(16,31,60,0.45)] motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <span className="nav-link text-[9.5px] text-gold-ink">
        {article.category}
      </span>
      <h2 className="text-[22px] leading-tight font-bold tracking-[-0.022em] text-blackish text-pretty transition-colors group-hover:text-gold-ink">
        {article.title}
      </h2>
      <p className="font-serif text-[15px] leading-relaxed text-[#1a1a1a]/62 text-pretty">
        {article.dek}
      </p>
      <div className="mt-auto flex items-center gap-2.5 border-t border-navy/12 pt-3.5">
        <AuthorMark
          initials={article.authorInitials}
          photoUrl={article.authorPhotoUrl}
          name={article.authorName}
          size={30}
        />
        <div className="flex flex-col gap-0.5">
          <span className="eyebrow text-[11px] tracking-[0.05em] text-navy">
            {article.authorName}
          </span>
          <span className="font-mono text-[10px] text-navy/50">
            {article.dateLabel} · {article.minutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}

function Slide({ articles }: { articles: CarouselArticle[] }) {
  const [lead, ...rest] = articles;
  return (
    <div
      className={
        rest.length
          ? "grid w-full gap-7 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-stretch 2xl:grid-cols-[minmax(0,440px)_1fr]"
          : "grid w-full"
      }
    >
      <FeaturedCard article={lead} />
      {rest.length ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:h-full lg:grid-rows-3 2xl:grid-cols-3 2xl:grid-rows-2">
          {rest.map((article) => (
            <Card key={article.slug} article={article} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ArticleCarousel({ articles }: { articles: CarouselArticle[] }) {
  const pages: CarouselArticle[][] = [];
  for (let i = 0; i < articles.length; i += SLIDE_SIZE) {
    pages.push(articles.slice(i, i + SLIDE_SIZE));
  }
  const pageCount = Math.max(1, pages.length);

  // Trilho com clones nas pontas -> loop contínuo, estilo galeria.
  const hasLoop = pageCount > 1;
  const slides = hasLoop ? [pages[pageCount - 1], ...pages, pages[0]] : pages;

  const [index, setIndex] = useState(hasLoop ? 1 : 0);
  const [animating, setAnimating] = useState(true);
  const busy = useRef(false);

  useEffect(() => {
    busy.current = false;
    setAnimating(false);
    setIndex(hasLoop ? 1 : 0);
  }, [pageCount, hasLoop]);

  function move(delta: number) {
    if (!hasLoop || busy.current) return;
    busy.current = true;
    setAnimating(true);
    setIndex((i) => i + delta);
  }

  function goTo(pageIdx: number) {
    if (!hasLoop || busy.current || pageIdx + 1 === index) return;
    busy.current = true;
    setAnimating(true);
    setIndex(pageIdx + 1);
  }

  const realIndex = hasLoop ? (index - 1 + pageCount) % pageCount : 0;

  function handleTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "transform") return;
    busy.current = false;
    if (index === slides.length - 1) {
      setAnimating(false);
      setIndex(1);
    } else if (index === 0) {
      setAnimating(false);
      setIndex(slides.length - 2);
    }
  }

  useEffect(() => {
    if (animating) return;
    const id = requestAnimationFrame(() => setAnimating(true));
    return () => cancelAnimationFrame(id);
  }, [animating]);

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden">
        <div
          className="carousel-track flex"
          style={{
            transform: `translateX(-${(hasLoop ? index : 0) * 100}%)`,
            transition: animating
              ? "transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              inert={hasLoop && slideIndex !== index ? true : undefined}
              className="flex w-full shrink-0"
            >
              <Slide articles={slide} />
            </div>
          ))}
        </div>
      </div>

      {hasLoop ? (
        <Pagination aria-label="Mais artigos" className="mt-10 justify-end">
          <PaginationPrevious
            onClick={() => move(-1)}
            aria-label="Artigos anteriores"
            className="px-2 sm:px-3"
          >
            <span className="hidden sm:inline">Anterior</span>
          </PaginationPrevious>
          {getVisiblePages(realIndex + 1, pageCount).map((n, i) =>
            n === "..." ? (
              <PaginationEllipsis key={`ellipsis-${i}`} />
            ) : (
              <PaginationItem
                key={n}
                type="button"
                isActive={n === realIndex + 1}
                onClick={() => goTo(n - 1)}
                aria-label={`Página ${n} de ${pageCount}`}
              >
                {n}
              </PaginationItem>
            ),
          )}
          <PaginationNext
            onClick={() => move(1)}
            aria-label="Ver mais artigos"
            className="px-2 sm:px-3"
          >
            <span className="hidden sm:inline">Ver mais</span>
          </PaginationNext>
        </Pagination>
      ) : null}
    </div>
  );
}
