"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const chip =
  "eyebrow rounded-full border border-navy/20 px-3.5 py-2.5 text-[10.5px] tracking-[0.1em] text-navy transition-colors hover:border-navy";

export function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function whatsapp() {
    const text = `${title} — ${window.location.href}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={copy} className={chip}>
        {copied ? "link copiado" : "copiar link"}
      </button>
      <button type="button" onClick={whatsapp} className={chip}>
        whatsapp
      </button>
      <a
        className={chip}
        target="_blank"
        rel="noopener noreferrer"
        href={site.instagram}
      >
        instagram
      </a>
    </div>
  );
}
