"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "./Header";

export function SiteChrome({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
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
      <div className="flex min-h-full w-full flex-col bg-paper pb-[calc(56px_+_env(safe-area-inset-bottom))] md:pb-0">
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        {footer}
      </div>
    </>
  );
}
