"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import {
  IntroLogo,
  ROAD_APEX,
  SWEEP_LENGTH,
  VANISHING_POINT,
} from "./IntroLogo";
import { LOGO_VIEWBOX } from "./logoPaths";
import { INTRO_BG, INTRO_EVENT, INTRO_FAILSAFE_MS } from "./introState";

/** Fração da volta que cobre o C inteiro (base a 90° até a ponta a ~316°). */
const C_SWEEP_FRACTION = 226 / 360;
const READY_TIMEOUT_S = 1;

function decodeHeroMedia(media: Element) {
  const img = media.querySelector("img");
  if (img) {
    return img.complete ? Promise.resolve() : img.decode().catch(() => {});
  }
  const bg = getComputedStyle(media.firstElementChild ?? media).backgroundImage;
  const url = /url\(["']?(.*?)["']?\)/.exec(bg)?.[1];
  if (!url) return Promise.resolve();
  const probe = new Image();
  probe.src = url;
  return probe.decode().catch(() => {});
}

function waitForFirstFold() {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const media = Array.from(
    document.querySelectorAll('[data-intro-reveal="media"]'),
    decodeHeroMedia,
  );
  return Promise.all([fonts, ...media]);
}

export function IntroPreloader() {
  const [active, setActive] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const veilCircleRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const logo = logoRef.current;
    const veilCircle = veilCircleRef.current;
    const phase = window.__c61Intro;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      !root ||
      !logo ||
      !veilCircle ||
      (phase !== "play" && phase !== "running") ||
      reduceMotion
    ) {
      if (phase === "play" || phase === "running") {
        window.__c61Intro = "done";
        html.removeAttribute("data-intro");
      }
      setActive(false);
      return;
    }

    // O Strict Mode de dev limpa atributos do <html> ao remontar.
    window.__c61Intro = "running";
    html.setAttribute("data-intro", "play");

    const blocked = [
      document.getElementById("site"),
      document.querySelector<HTMLElement>(".skip-link"),
    ].filter((el): el is HTMLElement => el !== null);
    blocked.forEach((el) => el.setAttribute("inert", ""));

    const lockup = logo.querySelector<SVGGElement>("#c61-lockup")!;
    const logoCircle = logo.querySelector<SVGCircleElement>(
      "#c61-iris-logo-circle",
    )!;

    const geom = { cx: 0, cy: 0, scale: 1, finalR: 0, measured: false };
    const iris = { p: 0 };

    const measure = () => {
      const box = root.getBoundingClientRect();
      const lr = logo.getBoundingClientRect();
      const scale = lr.width / LOGO_VIEWBOX;
      const cx = lr.left - box.left + VANISHING_POINT.x * scale;
      const cy = lr.top - box.top + VANISHING_POINT.y * scale;
      geom.cx = cx;
      geom.cy = cy;
      geom.scale = scale;
      geom.finalR =
        Math.hypot(Math.max(cx, box.width - cx), Math.max(cy, box.height - cy)) +
        2;
      geom.measured = true;
      veilCircle.setAttribute("cx", String(cx));
      veilCircle.setAttribute("cy", String(cy));
    };

    const applyIris = () => {
      const r = iris.p * geom.finalR;
      veilCircle.setAttribute("r", String(r));
      logoCircle.setAttribute("r", String(r / geom.scale));
    };

    const onResize = () => {
      if (!geom.measured) return;
      measure();
      applyIris();
    };

    let finished = false;
    let ready = false;
    let waiting = false;
    let tl: gsap.core.Timeline | undefined;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(failsafe);
      tl?.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);

      root.style.visibility = "hidden";
      root.style.pointerEvents = "none";
      window.__c61Intro = "done";
      window.dispatchEvent(new CustomEvent(INTRO_EVENT));
      html.removeAttribute("data-intro");
      blocked.forEach((el) => el.removeAttribute("inert"));
      setActive(false);
    };

    const failsafe = window.setTimeout(finish, INTRO_FAILSAFE_MS);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(logo);
      const road = q("#c61-road");
      const cSweep = q("#c61-c-sweep");
      const wipeRect = q("#c61-wordmark-wipe");
      const wordmark = q("#c61-wordmark-inner");
      const bars = q("#c61-bar-left, #c61-bar-right");
      const vp = `${VANISHING_POINT.x} ${VANISHING_POINT.y}`;
      const layers = [1, 2, 3, 4, 5, 6].map((d) => q(`[data-depth="${d}"]`));

      gsap.set(logo, { scale: 1.03, transformOrigin: "50% 50%" });
      gsap.set(road, {
        scale: 0,
        opacity: 0,
        svgOrigin: `${ROAD_APEX.x} ${ROAD_APEX.y}`,
      });
      gsap.set(layers.flat(), { opacity: 0, scale: 0.75, svgOrigin: vp });
      gsap.set(wipeRect, { scaleX: 0, svgOrigin: "70 915" });
      gsap.set(wordmark, { opacity: 0, x: -36 });
      gsap.set(bars, { opacity: 0 });
      gsap.set(logo, { visibility: "visible" });

      tl = gsap.timeline({ paused: true, onComplete: finish });

      // 1 — faixa dourada nasce do ponto de fuga
      tl.to(
        road,
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" },
        0,
      );

      // 2 — o C se desenha no sentido horário (máscara sobre o path oficial)
      tl.to(
        cSweep,
        {
          attr: { "stroke-dashoffset": SWEEP_LENGTH * (1 - C_SWEEP_FRACTION) },
          duration: 0.65,
          ease: "power2.inOut",
        },
        0.15,
      );

      // 3 — corredor se forma do fundo para a frente
      layers.forEach((layer, i) => {
        tl!.to(
          layer,
          { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
          0.5 + i * 0.04,
        );
      });

      // 4 — wordmark revelado na horizontal
      tl.to(wipeRect, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 0.85);
      tl.to(
        wordmark,
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
        0.85,
      );
      tl.to(
        bars,
        { opacity: 1, duration: 0.3, ease: "power1.out", stagger: 0.06 },
        0.98,
      );

      // 5 — assentamento do lockup
      tl.to(logo, { scale: 1, duration: 0.55, ease: "power2.out" }, 1.05);

      // 6 — íris a partir do ponto de fuga revela a página real
      tl.addLabel("wipe", 1.6);
      tl.call(
        () => {
          measure();
          root.style.background = "transparent";
          lockup.setAttribute("mask", "url(#c61-iris-logo)");
          if (!ready) {
            waiting = true;
            tl!.pause();
          }
        },
        [],
        "wipe",
      );
      tl.to(
        iris,
        { p: 1, duration: 0.7, ease: "expo.inOut", onUpdate: applyIris },
        "wipe+=0.02",
      );
    }, root);

    const markReady = () => {
      if (ready) return;
      ready = true;
      if (waiting && !finished) {
        waiting = false;
        measure();
        tl?.play();
      }
    };
    const readyTimeout = gsap.delayedCall(READY_TIMEOUT_S, markReady);
    waitForFirstFold().then(markReady, markReady);

    try {
      tl?.play();
    } catch {
      finish();
    }
    return () => {
      window.clearTimeout(failsafe);
      readyTimeout.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (finished) return;
      ctx.revert();
      lockup.removeAttribute("mask");
      root.style.background = "";
      veilCircle.setAttribute("r", "0");
      logoCircle.setAttribute("r", "0");
      blocked.forEach((el) => el.removeAttribute("inert"));
      window.__c61Intro = "play";
    };
  }, []);

  if (!active) return null;

  return (
    <div id="c61-preloader" ref={rootRef} aria-hidden="true">
      <svg className="c61-veil" width="100%" height="100%" focusable="false">
        <defs>
          <mask id="c61-iris-veil">
            <rect width="100%" height="100%" fill="#fff" />
            <circle
              id="revealCircle"
              ref={veilCircleRef}
              cx="0"
              cy="0"
              r="0"
              fill="#000"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={INTRO_BG}
          mask="url(#c61-iris-veil)"
        />
      </svg>
      <div className="c61-stage">
        <IntroLogo ref={logoRef} />
      </div>
    </div>
  );
}
