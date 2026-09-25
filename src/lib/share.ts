import type { Metadata } from "next";
import { pickDemoImage } from "./demo-images";
import type { Cover } from "./types";

export function coverImageUrl(cover: Cover) {
  return cover.image ?? pickDemoImage(cover.alt);
}

/** Tags og/twitter para o preview no WhatsApp e nas redes. */
export function shareMetadata(
  title: string,
  description: string,
  cover: Cover,
  publishedAt?: string,
): Pick<Metadata, "openGraph" | "twitter"> {
  const url = coverImageUrl(cover);
  const images = [{ url, alt: cover.alt, width: 1200, height: 630 }];

  return {
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedAt,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [url],
    },
  };
}
