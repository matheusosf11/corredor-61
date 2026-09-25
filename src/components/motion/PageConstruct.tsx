"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { introPhase, onIntroComplete } from "@/components/intro/introState";

const UNIT_SELECTOR = [
  ".grid > *",
  "ul.grid > li",
  "section > :not(.grid)",
  "article p",
  "article h2",
  "article h3",
  "article figure",
  "article blockquote",
  "article ul",
  "article ol",
  "aside",
  "[data-construct]",
].join(",");

function afterIntro(callback: () => void) {
  const phase = introPhase();
  if (phase === "play" || phase === "running") {
    return onIntroComplete(callback);
  }
  callback();
  return () => {};
}

function collectUnits(root: HTMLElement, heading: HTMLElement | null) {
  const raw = [...root.querySelectorAll(UNIT_SELECTOR)].filter(
    (el): el is HTMLElement => el instanceof HTMLElement,
  );
  if (heading?.previousElementSibling instanceof HTMLElement) {
    raw.push(heading.previousElementSibling);
  }
  if (heading?.nextElementSibling instanceof HTMLElement) {
    raw.push(heading.nextElementSibling);
  }

  const pageRoot = root.firstElementChild;
  if (pageRoot) {
    for (const child of pageRoot.children) {
      if (!(child instanceof HTMLElement)) continue;
      if (child.matches("h1.sr-only")) continue;
      if (heading && child.contains(heading)) continue;
      raw.push(child);
    }
  }

  const unique = [...new Set(raw)];
  return unique.filter((el) => {
    if (heading && (el === heading || heading.contains(el) || el.contains(heading))) {
      return false;
    }
    return !unique.some((other) => other !== el && el.contains(other));
  });
}

function inFirstScreen(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.88 && rect.bottom > 40;
}

function hideUnits(els: HTMLElement[]) {
  gsap.set(els, {
    y: 18,
    opacity: 0,
    filter: "blur(3px)",
  });
}

function showUnits(els: HTMLElement[], stagger = 0.05) {
  if (!els.length) return;
  gsap.to(els, {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 0.5,
    stagger,
    ease: "power2.out",
    overwrite: true,
  });
}

export function PageConstruct({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduceMotion) {
      root.dataset.ready = "1";
      return;
    }

    let timeline: gsap.core.Timeline | undefined;
    let observer: IntersectionObserver | undefined;
    const failsafe = window.setTimeout(() => {
      root.dataset.ready = "1";
    }, 1200);

    const stopIntro = afterIntro(() => {
      const heading = root.querySelector<HTMLElement>("h1:not(.sr-only)");
      const words = [
        ...root.querySelectorAll<HTMLElement>(".t-construct-word-inner"),
      ];
      const units = collectUnits(root, heading);
      const first = units.filter(inFirstScreen);
      const later = units.filter((el) => !first.includes(el));

      gsap.set(words, {
        yPercent: 110,
        opacity: 0,
        filter: "blur(3px)",
      });
      hideUnits(units);
      window.clearTimeout(failsafe);
      root.dataset.ready = "1";

      timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      if (words.length) {
        timeline.to(words, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.52,
          stagger: 0.048,
        });
      }
      if (first.length) {
        timeline.to(
          first,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.055,
          },
          words.length ? "-=0.28" : 0,
        );
      }

      if (later.length) {
        observer = new IntersectionObserver(
          (entries) => {
            const incoming = entries
              .filter((entry) => entry.isIntersecting)
              .map((entry) => entry.target)
              .filter((el): el is HTMLElement => el instanceof HTMLElement)
              .sort(
                (a, b) =>
                  a.getBoundingClientRect().top - b.getBoundingClientRect().top,
              );
            if (!incoming.length) return;
            incoming.forEach((el) => observer?.unobserve(el));
            showUnits(incoming, 0.05);
          },
          { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
        );
        later.forEach((el) => observer?.observe(el));
      }
    });

    return () => {
      window.clearTimeout(failsafe);
      stopIntro();
      timeline?.kill();
      observer?.disconnect();
      root.removeAttribute("data-ready");
    };
  }, [pathname, reduceMotion]);

  return (
    <div ref={rootRef} className="page-construct">
      {children}
    </div>
  );
}
