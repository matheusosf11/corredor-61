import Link from "next/link";
import { editoriaCards, type EditoriaCard } from "@/lib/editorial";
import { pickDemoImage } from "@/lib/demo-images";

function EditoriaIcon({ icon }: { icon: EditoriaCard["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5 text-gold",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    "aria-hidden": true,
  } as const;

  switch (icon) {
    case "columns":
      return (
        <svg {...common}>
          <path d="M4 20V8M12 20V4M20 20V8M2 20h20" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      );
    case "opinion":
      return (
        <svg {...common}>
          <path d="M4 20V9h4v11M10 20V5h4v15M16 20v-8h4v8" />
        </svg>
      );
    case "gavel":
      return (
        <svg {...common}>
          <path d="m14 4 6 6M8.5 15.5 18 6M4 20h10M7 13l4 4" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19h16M7 16v-5M12 16V8M17 16v-8" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
          <circle cx="12" cy="11" r="1.8" />
        </svg>
      );
  }
}

export function EditoriaRail() {
  return (
    <aside>
      <p className="mb-3 font-sans text-[11px] font-extrabold tracking-[0.14em] text-[#0b1730] uppercase">
        Templates de seções editoriais
      </p>
      <ul className="flex flex-col gap-2.5">
        {editoriaCards.map((card) => (
          <li key={card.id}>
            <Link
              href={card.href}
              className="group relative flex min-h-[96px] overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ backgroundImage: `url("${pickDemoImage(card.seed)}")` }}
              />
              <div className="absolute inset-0 bg-[#07101f]/72" />
              <div className="relative z-10 flex flex-col justify-center px-4 py-3">
                <span className="mb-1.5">
                  <EditoriaIcon icon={card.icon} />
                </span>
                <span className="font-sans text-[15px] font-extrabold tracking-[0.08em] text-gold uppercase">
                  {card.label}
                </span>
                <span className="mt-0.5 text-[12.5px] leading-snug text-white/90">
                  {card.dek}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
