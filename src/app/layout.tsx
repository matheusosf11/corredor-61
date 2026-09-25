import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import { IntroPreloader } from "@/components/intro/IntroPreloader";
import {
  introCriticalCss,
  introInlineScript,
} from "@/components/intro/introState";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/marca-corredor61.png", alt: site.name }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: introCriticalCss }} />
        <script dangerouslySetInnerHTML={{ __html: introInlineScript }} />
      </head>
      <body className="min-h-full">
        <SiteChrome footer={<Footer />}>{children}</SiteChrome>
        <IntroPreloader />
      </body>
    </html>
  );
}
