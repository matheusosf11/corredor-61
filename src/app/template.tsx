"use client";

import { usePathname } from "next/navigation";
import { PageConstruct } from "@/components/motion/PageConstruct";

/**
 * template.tsx re-monta a cada navegação (ao contrário de layout.tsx),
 * então a página se reconstrói em toda troca de rota.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return children;

  return <PageConstruct>{children}</PageConstruct>;
}
