export const INTRO_EVENT = "corredor61:intro-complete";
export const INTRO_STORAGE_KEY = "corredor61_intro_seen";
export const INTRO_BG = "#001124";

/** Tempo máximo total antes de a intro ser removida à força. */
export const INTRO_FAILSAFE_MS = 3500;

type IntroPhase = "play" | "running" | "done";

declare global {
  interface Window {
    __c61Intro?: IntroPhase;
  }
}

/**
 * Roda no <head>, antes do primeiro paint: decide se a intro toca nesta visita.
 * Sem JS, com "reduzir movimento", no /studio ou em visita repetida na sessão,
 * o atributo não é aplicado e o preloader nunca aparece.
 * O timeout cobre o caso de o bundle nunca hidratar.
 */
export const introInlineScript = `(function(){try{
var d=document.documentElement;
if(location.pathname.indexOf("/studio")===0)return;
if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))return;
sessionStorage.setItem("${INTRO_STORAGE_KEY}","1");
window.__c61Intro="play";
d.setAttribute("data-intro","play");
setTimeout(function(){if(window.__c61Intro!=="play")return;window.__c61Intro="done";d.removeAttribute("data-intro");},${INTRO_FAILSAFE_MS});
}catch(e){}})();`;

export const introCriticalCss = `
#c61-preloader{display:none}
html[data-intro="play"],html[data-intro="play"] body{background:${INTRO_BG};overflow:hidden}
html[data-intro="play"] #c61-preloader{display:block;position:fixed;inset:0;z-index:2147483000;background:${INTRO_BG};pointer-events:auto;contain:strict}
#c61-preloader .c61-veil{position:absolute;inset:0;width:100%;height:100%;display:block}
#c61-preloader .c61-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
#c61-preloader .c61-logo{display:block;width:clamp(188px,36vmin,340px);height:auto;aspect-ratio:1;overflow:visible;translate:-0.26% 0.62%;visibility:hidden}
html[data-intro="play"] [data-intro-reveal]{opacity:0}
html[data-intro="play"] [data-intro-reveal="headline"]{transform:translateY(20px)}
html[data-intro="play"] [data-intro-reveal="media"]{opacity:1;transform:scale(1.02)}
`;

export function introPhase(): IntroPhase | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__c61Intro;
}

/**
 * Registra uma animação da primeira dobra para depois do wipe.
 * Se a intro não está tocando nesta visita, nada acontece.
 */
export function onIntroComplete(callback: () => void) {
  const phase = introPhase();
  if (phase !== "play" && phase !== "running") return () => {};
  const handler = () => callback();
  window.addEventListener(INTRO_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, handler);
}
