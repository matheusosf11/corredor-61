import type { Cover } from "@/lib/types";
import { pickDemoImage } from "@/lib/demo-images";

type Variant = "light" | "hero-dark";

type Props = {
  cover: Cover;
  variant?: Variant;
  className?: string;
};

export { pickDemoImage };

/**
 * Placeholder de capa. Preenche 100% do elemento pai — quem chama controla
 * altura/proporção. O `alt` é exposto para leitores de tela via role="img".
 * Usa `cover.image` (capa de demonstração atribuída na camada de dados) e cai
 * para uma escolha por texto quando não houver.
 */
export function CoverMedia({
  cover,
  variant = "light",
  className = "",
}: Props) {
  const overlay =
    variant === "hero-dark"
      ? "linear-gradient(rgba(9,11,15,0.42),rgba(9,11,15,0.42)),"
      : "";

  const src = cover.image ?? pickDemoImage(cover.alt);

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

/** Foto decorativa simples (equipe, blocos ilustrativos). */
export function DemoPhoto({
  seed,
  className = "",
}: {
  seed: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ backgroundImage: `url("${pickDemoImage(seed)}")` }}
      className={`bg-cover bg-center ${className}`}
    />
  );
}
