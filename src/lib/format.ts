const TZ = "America/Sao_Paulo";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: TZ,
});

export function formatDate(iso: string) {
  return formatter.format(new Date(iso)).replace(/\./g, "");
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  })
    .format(new Date(iso))
    .replace(/\./g, "");
}

/** "quinta, 3 de setembro de 2026 · Brasília, DF" (sem o sufixo de local) */
export function formatLongDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TZ,
  }).format(new Date(iso));
}

/** "4 de setembro de 2026" — data por extenso, sem dia da semana */
export function formatFullDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TZ,
  }).format(new Date(iso));
}

/** "3 set" — dia e mês curtos, para cartões e listas */
export function formatDayMonth(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    timeZone: TZ,
  })
    .format(new Date(iso))
    .replace(/\./g, "");
}

/** "08h20" */
export function formatTime(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  })
    .format(new Date(iso))
    .replace(":", "h");
}

export function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

function blockToText(block: unknown): string {
  if (!block || typeof block !== "object") return "";
  const row = block as {
    _type?: string;
    type?: string;
    text?: string;
    items?: string[];
    children?: { text?: string }[];
  };
  if (row._type === "block" && Array.isArray(row.children)) {
    return row.children.map((child) => child.text ?? "").join("");
  }
  if (row.type === "ul") return (row.items ?? []).join(" ");
  return row.text ?? "";
}

export function bodyToText(blocks: unknown) {
  if (!Array.isArray(blocks)) return "";
  return blocks.map(blockToText).join(" ");
}

/** Estimativa de tempo de leitura (~200 palavras/min), mínimo de 1 min */
export function readingMinutes(blocks: unknown) {
  const words = bodyToText(blocks).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
