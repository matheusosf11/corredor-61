import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pad-x bg-blackish py-28 text-center">
      <span className="eyebrow block text-[10px] text-gold">Erro 404</span>
      <h1 className="mt-3 text-[30px] font-extrabold tracking-[-0.025em] text-cream md:text-[38px]">
        Página não encontrada
      </h1>
      <p className="mx-auto mt-3 max-w-md font-serif text-[16px] leading-relaxed text-cream/70">
        O endereço não existe ou o conteúdo ainda não foi publicado. Volte à
        página inicial ou use a busca do portal.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <Link
          href="/"
          className="eyebrow bg-gold px-4 py-3 text-[11px] tracking-[0.14em] text-blackish"
        >
          Página inicial
        </Link>
        <Link
          href="/busca"
          className="eyebrow border border-cream/30 px-4 py-3 text-[11px] tracking-[0.14em] text-cream"
        >
          Ir para a busca
        </Link>
      </div>
    </div>
  );
}
