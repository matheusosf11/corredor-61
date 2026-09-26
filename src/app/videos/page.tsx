import type { Metadata } from "next";
import { InstagramPostCard } from "@/components/instagram/InstagramPostCard";
import { getInstagramPosts } from "@/lib/queries";
import { PageHead } from "@/components/ui/PageHead";

export const metadata: Metadata = {
  title: "Vídeos",
  description:
    "Podcasts e publicações do Corredor 61 no Instagram. O vídeo abre lá; aqui só o convite.",
};

export default async function VideosPage() {
  const posts = await getInstagramPosts();
  return (
    <div>
      <PageHead title="Vídeos" />
      <div className="pad-x bg-cream py-14">
        {posts.length === 0 ? (
          <p className="py-16 text-center font-serif text-[15px] text-navy/60">
            Nenhum vídeo publicado no estúdio por enquanto.
          </p>
        ) : (
          <ul className="grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {posts.map((post) => (
              <li key={post.href}>
                <InstagramPostCard post={post} variant="news" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
