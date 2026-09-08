import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { SupportersGrid } from "@/components/supporters/SupportersBand";
import { getActiveSupporters } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Apoiadores Institucionais",
  description:
    "Empresas, escritórios, instituições e organizações que apoiam o Corredor 61 — exposição institucional, sem publicidade.",
};

export default async function ApoiadoresPage() {
  const items = await getActiveSupporters();

  return (
    <div>
      <PageHead
        eyebrow="Institucional"
        title="Apoiadores Institucionais"
        description="Empresas, escritórios, instituições e organizações que apoiam o projeto. Esta área não é espaço de anúncio, publicidade ou conteúdo patrocinado."
        meta={`${items.length} ${items.length === 1 ? "apoiador ativo" : "apoiadores ativos"}`}
      />
      <div className="pad-x bg-white py-14">
        <SupportersGrid items={items} />
      </div>
    </div>
  );
}
