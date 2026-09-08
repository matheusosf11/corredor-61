"use client";

import { useEffect, useState } from "react";

/** Barra fina de progresso de leitura, fixada abaixo do header. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="sticky top-[var(--header-h)] z-30 h-[3px] w-full bg-navy/12">
      <div
        className="h-full bg-gold transition-[width] duration-150 ease-out"
        style={{ width: `${Math.max(progress * 100, 2)}%` }}
      />
    </div>
  );
}
