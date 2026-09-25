"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { Category } from "@/lib/types";
import { Header } from "./Header";

export function SiteChrome({
  children,
  footer,
  categories,
}: {
  children: ReactNode;
  footer: ReactNode;
  categories: Category[];
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div id="site" className="flex min-h-full w-full flex-col bg-paper pb-[calc(60px_+_env(safe-area-inset-bottom))] md:pb-0">
        <Header categories={categories} />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        {footer}
      </div>
    </>
  );
}
