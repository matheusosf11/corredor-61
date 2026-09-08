/**
 * Imagens de demonstração — placeholder até entrar o CMS com as capas reais.
 * `demoImageAt` distribui em rodízio por índice, então cada matéria/artigo de
 * uma mesma lista recebe uma imagem diferente (sem repetição visível).
 */
export const DEMO_IMAGES = [
  "/demo/1.webp",
  "/demo/2.webp",
  "/demo/3.webp",
  "/demo/4.webp",
  "/demo/5.webp",
  "/demo/6.webp",
  "/demo/7.webp",
  "/demo/8.webp",
  "/demo/9.webp",
  "/demo/10.webp",
  "/demo/11.webp",
];

/** Imagem estável para a posição `index` de uma lista (rodízio). */
export function demoImageAt(index: number) {
  const len = DEMO_IMAGES.length;
  return DEMO_IMAGES[((index % len) + len) % len];
}

/** Escolha determinística por texto — usada em blocos decorativos avulsos. */
export function pickDemoImage(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (Math.imul(hash, 31) + seed.charCodeAt(i)) | 0;
  }
  return DEMO_IMAGES[Math.abs(hash) % DEMO_IMAGES.length];
}
