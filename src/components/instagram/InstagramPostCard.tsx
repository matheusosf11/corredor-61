import Image from "next/image";
import { site } from "@/lib/site";
import type { InstagramPost } from "@/lib/instagramPosts";

export function InstagramPostCard({
  post,
  variant = "reel",
}: {
  post: InstagramPost;
  variant?: "reel" | "news";
}) {
  if (variant === "news") {
    return (
      <a
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col"
      >
        <span className="relative aspect-[3/2] overflow-hidden rounded-lg border border-navy/10 bg-blackish">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </span>
        <span className="mt-4 text-[15px] text-navy lowercase transition-colors group-hover:text-gold-ink">
          {site.instagramHandle}
        </span>
        <span className="mt-1.5 line-clamp-3 text-[20px] leading-[1.15] font-extrabold tracking-[-0.01em] text-navy transition-colors group-hover:text-gold-ink md:text-[22px]">
          {post.title}
        </span>
        <span className="mt-3 text-[13px] text-navy/45">Ver no Instagram</span>
      </a>
    );
  }

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col border border-cream/20 bg-[#0b1730] transition-colors hover:border-gold"
    >
      <span className="relative aspect-[4/5] overflow-hidden border-b border-cream/15 bg-blackish">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes="220px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-2 bottom-2 font-sans text-[9px] font-bold tracking-[0.14em] text-gold uppercase">
          Ver ↗
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-1.5 px-3 py-3">
        <span className="nav-link text-[9px] text-gold">
          {site.instagramHandle}
        </span>
        <span className="line-clamp-3 text-[13px] leading-snug font-bold text-cream">
          {post.title}
        </span>
      </span>
    </a>
  );
}
