import type { Cover } from "@/lib/types";

type Variant = "light" | "hero-dark";

type Props = {
  cover: Cover;
  variant?: Variant;
  className?: string;
};

/**
 * Capa da matéria. Preenche 100% do elemento pai — quem chama controla
 * altura/proporção. Sem imagem no Studio, usa o fundo de motivo da marca.
 */
export function CoverMedia({
  cover,
  variant = "light",
  className = "",
}: Props) {
  const src = cover.image;
  if (!src) {
    return (
      <div
        role="img"
        aria-label={cover.alt}
        className={`h-full w-full ${variant === "hero-dark" ? "motif-dark" : "motif"} ${className}`}
      />
    );
  }

  const overlay =
    variant === "hero-dark"
      ? "linear-gradient(rgba(9,11,15,0.42),rgba(9,11,15,0.42)),"
      : "";

  return (
    <div
      role="img"
      aria-label={cover.alt}
      style={{
        backgroundImage: `${overlay}url("${src}")`,
      }}
      className={`h-full w-full bg-cover bg-center ${className}`}
    />
  );
}
