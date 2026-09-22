import type { Metadata } from "next";
import { InstagramPostCard } from "@/components/instagram/InstagramPostCard";
import { instagramPosts } from "@/lib/instagramPosts";
import { PageHead } from "@/components/ui/PageHead";

export const metadata: Metadata = {
  title: "Vídeos",
  description:
    "Podcasts e publicações do Corredor 61 no Instagram. O vídeo abre lá; aqui só o convite.",
};

export default function VideosPage() {
  return (
    <div>
      <PageHead
        eyebrow="Instagram"
        title="Vídeos"
        description="Não há player no portal: cada card redireciona para o Instagram, no mesmo espírito de um link no WhatsApp. Assim o site permanece leve e as visitas reforçam o perfil."
      />
      <div className="pad-x bg-cream py-14">
        <ul className="grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {instagramPosts.map((post) => (
            <li key={post.href}>
              <InstagramPostCard post={post} variant="news" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
