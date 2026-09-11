"use client";
/* Componente de terceiros (React Bits) — cores e links adaptados ao portal. */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import "./CardNav.css";

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

const BAR_H = 40;

const CardNav = ({
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
  buttonLabel = "Buscar",
  buttonHref = "/busca",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const pathname = usePathname();

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 240;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content");
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        contentEl.offsetHeight;

        const topBar = BAR_H;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 240;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: BAR_H, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1",
    );

    return tl;
  };

  useEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  useEffect(() => {
    const tl = tlRef.current;
    setIsHamburgerOpen(false);
    setIsExpanded(false);
    if (tl) {
      tl.pause(0);
      tl.progress(0);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        const tl = tlRef.current;
        if (!tl) return;
        setIsHamburgerOpen(false);
        tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
        tl.reverse();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  const toggleMenu = () => {
    let tl = tlRef.current;
    if (!tl) {
      tl = createTimeline();
      tlRef.current = tl;
    }
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container ${className}`}
      style={{
        "--card-nav-bg": baseColor,
        "--card-nav-menu": menuColor || "#000",
      }}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""}`}
        aria-label="Principal"
      >
        <div className="card-nav-top">
          <button
            type="button"
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label={isExpanded ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isExpanded}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </button>

          <Link
            href={buttonHref}
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            {buttonLabel}
          </Link>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => {
                  const inner = (
                    <>
                      <ArrowIcon />
                      {lnk.label}
                    </>
                  );
                  if (lnk.external) {
                    return (
                      <a
                        key={`${lnk.label}-${i}`}
                        className="nav-card-link"
                        href={lnk.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={lnk.ariaLabel}
                      >
                        {inner}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link"
                      href={lnk.href}
                      aria-label={lnk.ariaLabel}
                    >
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
